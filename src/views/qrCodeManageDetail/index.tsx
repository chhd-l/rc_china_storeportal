import ProForm from "@ant-design/pro-form"
import { Button, Form, Input, Select, Upload, DatePicker, InputNumber } from "antd";
// import ProFormItem from "@/components/common/ProFormItem"
// import { useFormItems } from "./modules/constant"
// import Mock from "mockjs"
// import { mockList } from "../mpBannerList/modules/mockdata"
import { ContentContainer, InfoContainer } from "@/components/ui"
import "./index.less"
import ReplyModal from "@/components/wechat/ReplyModal";
import { WxReplyContent } from "@/framework/types/wechat";
import { createQrCode } from "@/framework/api/wechatSetting";
import { useNavigate } from "react-router";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
// const mockData = Mock.mock(mockList).list[0]
// mockData.img = [{ url: mockData.img }] //单独处理图片数据

const typeValueEnum = [
  {
    label: 'Temporary integer parameter',
    value: 'QR_SCENE'
  },
  {
    label: 'Temporary string parameter',
    value: 'QR_STR_SCENE'
  },
  {
    label: 'Permanent integer parameter',
    value: 'QR_LIMIT_SCENE'
  },
  {
    label: 'Permanent string parameter',
    value: 'QR_LIMIT_STR_SCENE'
  },
]

const QrCodeManageDetail = () => {
  const navigator = useNavigate();
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
  const time = 30*24*60*60*1000
  const pickTime = new Date(cut._d).getTime()
  const dateTime = new Date().getTime() - 24*60*60*1000
  return !((pickTime > dateTime) && ((pickTime - dateTime < time) && (pickTime - dateTime >= 0)))
}

const handleChooseReplyContent = (reply: WxReplyContent) => {
  setReply(reply);
  form.setFieldsValue({ description: reply.description });
  setVisible(false);
}

  return (
    <ContentContainer className="qr-code-manage-detail">
      <InfoContainer title="Add QR Code">
        <Form
          {...layout}
          form={form}
          className="w-1/2 "
          layout="horizontal"
          onFinish={async (values) => {
            setIsRequset(true)
            if(values.expiredTime) {
              values.expiredTime = moment(values.expiredTime).utc().format()
            }
            const { description, ...rest } = values;
            await createQrCode({...rest, replyContentId: reply.id, accountId: "000001"}).then(() => {
              navigator("/QrcodeManage/qrcode-manage-list");
            })
            setIsRequset(false)
          }}
        >
          <Form.Item label='QR Code Name' name='name' rules={[
            {
              required: true,
              message: "Please input QR Code Name!",
            },
          ]}>
            <Input placeholder='Input' />
          </Form.Item>

          <Form.Item label='QR Code Type' name='type' rules={[
            {
              required: true,
              message: "Please select QR Code Type!",
            },
          ]}>
            <Select onChange={QRCodeType} placeholder='Select' options={typeValueEnum} />
          </Form.Item>

          {
            isOpen === 'QR_SCENE' || isOpen ==='QR_STR_SCENE' ? (
              <Form.Item label='Expired Time' name='expiredTime' rules={[
                {
                  required: true,
                  message: "Please select QR Code Type!",
                },
              ]}>
                <DatePicker disabledDate={disabledDate} style={{width: '100%'}} placeholder='Select' />
              </Form.Item>
            ) : null
          }


          {
            (isOpen === 'QR_SCENE' || isOpen === 'QR_LIMIT_SCENE') ? (
              <Form.Item label='Scenario ID' name='scenarioId' key='scenarioId' rules={[
                {
                  required: true,
                  message: "Please input Scenario ID!",
                },
              ]}>
                <InputNumber min={0} style={{width: '100%'}} placeholder='Input'/>
              </Form.Item>
            ) : (
              <Form.Item label='Scenario STR' name='scenarioStr' key='scenarioStr' rules={[
                {
                  required: true,
                  pattern: /^((?!.*(\_)).)*$/,
                  message: "Please input Scenario STR, and do not contain _",
                },
              ]}>
                <Input placeholder='Input' />
              </Form.Item>
            )
          }

          <Form.Item label='Response Content' name='description' rules={[
            {
              required: true,
              message: "Please select Reply Content!"
            }
          ]}>
            <Input
              readOnly
              placeholder="Select"
              onClick={() => setVisible(true)}
              suffix={<SearchOutlined onClick={() => setVisible(true)} className="text-gray-400" />}
            />
          </Form.Item>
          <Form.Item label='Comment' name='comment'>
            <Input placeholder="Input" />
          </Form.Item>

          <Form.Item
          >
            <div style={{width: '70vw'}} className="flex justify-end">
            <Button
              danger
              className="mr-4"
              onClick={() => {
                navigator("/QrcodeManage/qrcode-manage-list");
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isRequset}>
              Confirm
            </Button>
            </div>
          </Form.Item>
        </Form>
        {visible ? <ReplyModal
          visible={visible}
          onlyEnabled={true}
          onCancel={() => setVisible(false)}
          onConfirm={handleChooseReplyContent}
        /> : null}
      </InfoContainer>
    </ContentContainer>
  )
}

export default QrCodeManageDetail
