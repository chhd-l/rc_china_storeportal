import ProForm from "@ant-design/pro-form"
import { Button, Form, Input, Select, Upload, DatePicker, InputNumber } from "antd";
// import ProFormItem from "@/components/common/ProFormItem"
// import { useFormItems } from "./modules/constant"
// import Mock from "mockjs"
// import { mockList } from "../mpBannerList/modules/mockdata"
import { ContentContainer, InfoContainer } from "@/components/ui"
import "./index.less"
import { createQrCode } from "@/framework/api/wechatSetting";
import { useNavigate } from "react-router";
import { useState } from "react";
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
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  // const formItemList = useFormItems()
const QRCodeType = (v: string) => {
  setIsOpen(v)
}

  return (
    <ContentContainer className="qr-code-manage-detail">
      <InfoContainer title="Add QR Code">
        <Form
          {...layout}
          className="w-1/2 "
          layout="horizontal"
          onFinish={async (values) => {
            await createQrCode({...values, accountId: "000001"}).then(() => {
              navigator("/QrcodeManage/qrcode-manage-list");
            })
          }}
        >
          <Form.Item label='QR Code Name' name='name' rules={[
            {
              required: true,
              message: "Please input QR Code Name!",
            },
          ]}>
            <Input placeholder='input' />
          </Form.Item>
          <Form.Item label='QR Code Type' name='type' rules={[
            {
              required: true,
              message: "Please select QR Code Type!",
            },
          ]}>
            <Select onChange={QRCodeType} placeholder='select' options={typeValueEnum} />
          </Form.Item>
          <Form.Item label='Expired Time' name='expiredTime' rules={[
            {
              required: (isOpen === 'QR_SCENE' || isOpen ==='QR_STR_SCENE') ? true : false,
              message: "Please select QR Code Type!",
            },
          ]}>
            <InputNumber min={0} controls={false} style={{width: '100%'}} placeholder='input' />
          </Form.Item>
          {
            (isOpen === 'QR_SCENE' || isOpen === 'QR_LIMIT_SCENE') ? (
              <Form.Item label='Scenario ID' name='scenarioId' key='scenarioId' rules={[
                {
                  required: true,
                  message: "Please input Scenario ID!",
                },
              ]}>
                <InputNumber min={0} controls={false} style={{width: '100%'}} placeholder='input' />
              </Form.Item>
            ) : (
              <Form.Item label='Scenario STR' name='scenarioStr' key='scenarioStr' rules={[
                {
                  required: true,
                  message: "Please input Scenario STR!",
                },
              ]}>
                <Input placeholder='input' />
              </Form.Item>
            )
          }
          {/* <Form.Item label='Response Content' name='url'>
            <Input.Group>
              <Input
                placeholder='input'
                style={{ width: "82%" }}
              />
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>Select</Button>
              </Upload>
            </Input.Group>
          </Form.Item> */}
          <Form.Item label='Comment' name='comment'>
            <Input placeholder='input' />
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
            <Button type="primary" htmlType="submit" danger>
              Confirm
            </Button>
            </div>
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}

export default QrCodeManageDetail
