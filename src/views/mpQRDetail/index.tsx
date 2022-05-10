// import ProForm from "@ant-design/pro-form"
// import "./index.less"
// import ProFormItem from "@/components/common/ProFormItem"
// import { useFormItems } from "./modules/constant"
// import { mockList } from "../mpQRList/modules/mockdata"
// import Mock from "mockjs"
import { useEffect, useState } from "react";
import { ContentContainer, InfoContainer } from "@/components/ui"
import { Button, Form, Input, Select, Upload, InputNumber } from "antd";
import { getAccountList } from '@/framework/api/wechatSetting'
// const mockData = Mock.mock(mockList).list[0]

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

const MpQrDetail = () => {
  const [list, setList] = useState<any>([])
  
  const depy = (arr: any[]) => {
    if(!arr.length) return
    const lists: any[] = []
    arr.forEach((item) => {
      if(lists.indexOf(item.accountName) === -1 && item.accountType === 'SERVICE_ACCOUNT')
      lists.push({
        label : item.accountName,
        value: item.accountName
      })
    })
    console.log('lists',lists)
    setList(lists)
  }

  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: {storeId: "12345678"},
    })
    console.log('res',res)
    depy(res?.records || [])
  } 

  useEffect(() => {
    getAccountName()
  }, [])

  // const formItemList = useFormItems()
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

  return (
    <ContentContainer className="mp-qr-detail">
      <InfoContainer title="Add New QR Code">
        <Form
          {...layout}
          className="w-1/2 "
          layout="horizontal"
          onFinish={async (values) => {
            console.info(values)
          }}
        >
          <Form.Item label='Channel Type' name='name' rules={[
            {
              required: true,
              message: "Please select Channel Type!",
            },
          ]}>
            <Select placeholder='select' options={list} />
          </Form.Item>
          <Form.Item label='QR Code Type' name='type'>
            <Select placeholder='select' options={typeValueEnum} />
          </Form.Item>
          <Form.Item label='Scenario Type' name='expiredTime'>
            <Input placeholder='input' />
          </Form.Item>
          <Form.Item label='二维码键值' name='scenarioId' rules={[
            {
              required: true,
              message: "Please input 二维码键值!",
            },
          ]}>
            <Input placeholder='input' />
          </Form.Item>
          <Form.Item label='Mini Program Path' name='scenarioId'>
            <Input placeholder='input' />
          </Form.Item>
          <Form.Item label='QR Code Size' name='scenarioId'>
            <InputNumber style={{ width:'100%' }} max={1280} min={280} placeholder='最小280,最大1280' />
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
          <Form.Item label='Transparent background' name='comment'>
            <Select placeholder='select' options={[
              {label: 'Yes', value: true},
              {label: 'No', value: false},
            ]} />
          </Form.Item>
          <Form.Item
            className="w-full flex"
          >
            <Button
              danger
              className="mr-4"
              onClick={() => {
                // navigator("/QrcodeManage/qrcode-manage-list");
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" danger>
              Confirm
            </Button>
          </Form.Item>
          {/* <input type="color" name="bgColor" /> */}
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}

export default MpQrDetail
