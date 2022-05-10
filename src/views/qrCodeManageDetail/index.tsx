import ProForm from "@ant-design/pro-form"
import { Button, Form, Input, Select, Upload, DatePicker } from "antd";
// import ProFormItem from "@/components/common/ProFormItem"
// import { useFormItems } from "./modules/constant"
// import Mock from "mockjs"
// import { mockList } from "../mpBannerList/modules/mockdata"
import { ContentContainer, InfoContainer } from "@/components/ui"
import "./index.less"
import { createQrCode } from "@/framework/api/wechatSetting";
import { useNavigate } from "react-router";
// const mockData = Mock.mock(mockList).list[0]
// mockData.img = [{ url: mockData.img }] //单独处理图片数据

const typeValueEnum = [
  {
    label: 'QR_SCENE',
    value: 'QR_SCENE'
  },
  {
    label: 'QR_STR_SCENE',
    value: 'QR_STR_SCENE'
  },
  {
    label: 'QR_LIMIT_SCENE',
    value: 'QR_LIMIT_SCENE'
  },
  {
    label: 'QR_LIMIT_STR_SCENE',
    value: 'QR_LIMIT_STR_SCENE'
  },
]

const QrCodeManageDetail = () => {
  const navigator = useNavigate();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  // const formItemList = useFormItems()

  return (
    <ContentContainer className="qr-code-manage-detail">
      <InfoContainer title="Add QR Code">
        <Form
          {...layout}
          className="w-1/2 "
          layout="horizontal"
          onFinish={async (values) => {
            values.expiredTime = new Date(values.expiredTime).toISOString()
            console.info(values)
            await createQrCode(values)
          }}
        >
          <Form.Item label='QR Code Name' name='name'>
            <Input placeholder='input' />
          </Form.Item>
          <Form.Item label='QR Code Type' name='type'>
            <Select placeholder='select' options={typeValueEnum} />
          </Form.Item>
          <Form.Item label='Expired Time' name='expiredTime'>
            <DatePicker inputReadOnly placement='bottomRight' style={{ width: '82%' }} placeholder='Select' />
          </Form.Item>
          <Form.Item label='Scenario ID' name='scenarioId'>
            <Input placeholder='input' />
          </Form.Item>
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
            className="w-full flex justify-end"
          >
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
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}

export default QrCodeManageDetail
