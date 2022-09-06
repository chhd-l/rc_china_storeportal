import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd'
// import ProFormItem from "@/components/common/ProFormItem"
// import { useFormItems } from "./modules/constant"
// import Mock from "mockjs"
// import { mockList } from "../mpBannerList/modules/mockdata"
import { ContentContainer, InfoContainer } from '@/components/ui'
import ReplyModal from '@/components/wechat/ReplyModal'
import { createQrCode } from '@/framework/api/wechatSetting'
import { WxReplyContent } from '@/framework/types/wechat'
import { SearchOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import intl from 'react-intl-universal'
import './index.less'
// const mockData = Mock.mock(mockList).list[0]
// mockData.img = [{ url: mockData.img }] //单独处理图片数据

const typeValueEnum = [
  {
    label: intl.get('qrCode.Temporary integer parametere'),
    value: 'QR_SCENE',
  },
  {
    label: intl.get('qrCode.Temporary string parameter'),
    value: 'QR_STR_SCENE',
  },
  {
    label: intl.get('qrCode.Permanent integer parameter'),
    value: 'QR_LIMIT_SCENE',
  },
  {
    label: intl.get('qrCode.Permanent string parameter'),
    value: 'QR_LIMIT_STR_SCENE',
  },
]

const QrCodeManageDetail = () => {
  const navigator = useNavigate()
  const [isOpen, setIsOpen] = useState('')
  const [isRequset, setIsRequset] = useState(false)
  const [reply, setReply] = useState<any>({})
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  // const formItemList = useFormItems()
  const QRCodeType = (v: string) => {
    setIsOpen(v)
  }

  const disabledDate = (cut: any) => {
    const time = 30 * 24 * 60 * 60 * 1000
    const pickTime = new Date(cut._d).getTime()
    const dateTime = new Date().getTime() - 24 * 60 * 60 * 1000
    return !(pickTime > dateTime && pickTime - dateTime < time && pickTime - dateTime >= 0)
  }

  const handleChooseReplyContent = (reply: WxReplyContent) => {
    setReply(reply)
    form.setFieldsValue({ description: reply.description })
    setVisible(false)
  }

  return (
    <ContentContainer className="qr-code-manage-detail">
      <InfoContainer title={intl.get('qrCode.Add QR Code')}>
        <Form
          {...layout}
          form={form}
          className="w-1/2 "
          layout="horizontal"
          onFinish={async (values) => {
            setIsRequset(true)
            if (values.expiredTime) {
              values.expiredTime = moment(values.expiredTime).utc().format()
            }
            const { description, ...rest } = values
            await createQrCode({ ...rest, replyContentId: reply.id, accountId: '000001' }).then(() => {
              navigator('/QrcodeManage/qrcode-manage-list')
            })
            setIsRequset(false)
          }}
        >
          <Form.Item
            label={intl.get('qrCode.QR Code Name')}
            name="name"
            rules={[
              {
                required: true,
                message: intl.get('qrCode.Please input QR Code Name!'),
              },
            ]}
          >
            <Input placeholder={intl.get('public.input')} />
          </Form.Item>

          <Form.Item
            label={intl.get('qrCode.QR Code Type')}
            name="type"
            rules={[
              {
                required: true,
                message: intl.get('qrCode.Please select QR Code Type!'),
              },
            ]}
          >
            <Select onChange={QRCodeType} placeholder={intl.get('public.select')} options={typeValueEnum} />
          </Form.Item>

          {isOpen === 'QR_SCENE' || isOpen === 'QR_STR_SCENE' ? (
            <Form.Item
              label={intl.get('qrCode.Expired Time')}
              name="expiredTime"
              rules={[
                {
                  required: true,
                  message: intl.get('qrCode.Please select QR Code Type!'),
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                style={{ width: '100%' }}
                placeholder={intl.get('public.select')}
              />
            </Form.Item>
          ) : null}

          {isOpen === 'QR_SCENE' || isOpen === 'QR_LIMIT_SCENE' ? (
            <Form.Item
              label={intl.get('qrCode.Scenario ID')}
              name="scenarioId"
              key="scenarioId"
              rules={[
                {
                  required: true,
                  message: intl.get('qrCode.Please input Scenario ID!'),
                },
              ]}
            >
              <InputNumber min={0} style={{ width: '100%' }} placeholder={intl.get('public.input')} />
            </Form.Item>
          ) : (
            <Form.Item
              label={intl.get('qrCode.Scenario STR')}
              name="scenarioStr"
              key="scenarioStr"
              rules={[
                {
                  required: true,
                  pattern: /^((?!.*(\_)).)*$/,
                  message: intl.get('qrCode.Please input Scenario STR, and do not contain _'),
                },
              ]}
            >
              <Input placeholder={intl.get('public.input')} />
            </Form.Item>
          )}

          <Form.Item
            label={intl.get('qrCode.Response Content')}
            name="description"
            rules={[
              {
                required: true,
                message: intl.get('qrCode.Please select Reply Content!'),
              },
            ]}
          >
            <Input
              readOnly
              placeholder={intl.get('public.select')}
              onClick={() => setVisible(true)}
              suffix={<SearchOutlined onClick={() => setVisible(true)} className="text-gray-400" />}
            />
          </Form.Item>
          <Form.Item label={intl.get('qrCode.Comment')} name="comment">
            <Input placeholder={intl.get('public.input')} />
          </Form.Item>

          <Form.Item>
            <div style={{ width: '70vw' }} className="flex justify-end">
              <Button
                danger
                className="mr-4"
                onClick={() => {
                  navigator('/QrcodeManage/qrcode-manage-list')
                }}
              >
                {intl.get('public.cancel')}
              </Button>
              <Button type="primary" htmlType="submit" loading={isRequset}>
                {intl.get('public.confirm')}
              </Button>
            </div>
          </Form.Item>
        </Form>
        {visible ? (
          <ReplyModal
            visible={visible}
            onlyEnabled={true}
            onCancel={() => setVisible(false)}
            onConfirm={handleChooseReplyContent}
          />
        ) : null}
      </InfoContainer>
    </ContentContainer>
  )
}

export default QrCodeManageDetail
