import { useEffect, useState } from "react";
import { ContentContainer, InfoContainer } from "@/components/ui"
import { Button, Form, Input, Select, InputNumber } from "antd";
import { getAccountList, upsertAppQrCodes } from '@/framework/api/wechatSetting'
import { useLocation, useNavigate } from "react-router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
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

const MpQrDetail = () => {
  const navigator = useNavigate();
  const [list, setList] = useState<any>([])
  const { state }: any = useLocation();

  const depy = (arr: any[]) => {
    if (!arr.length) return
    const lists: any[] = []
    arr.forEach((item) => {
      if (item.accountType === 'MiniProgram')
        lists.push({
          label: item.accountName,
          value: item.id
        })
    })
    setList(lists)
  }

  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: "12345678" },
    })
    depy(res?.records || [])
  }

  const handlok = async (item: any) => {
    await upsertAppQrCodes({
      ...item,
      operator: 'zz',
    }).then(() => {
      navigator('/mpqr/mpqr-list')
    })
  }

  useEffect(() => {
    getAccountName()
  }, [])

  // const formItemList = useFormItems()

  return (
    <ContentContainer className="mp-qr-detail">
      <InfoContainer title="Add New QR Code">
        <Form
          {...layout}
          className="w-1/2 "
          layout="horizontal"
          initialValues={state ? state : null}
          onFinish={async (values) => {
            handlok(values)
          }}
        >
          <Form.Item label='Channel Type' name='accountId' rules={[
            {
              required: true,
              message: "Please select Channel Type!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={list} />
          </Form.Item>

          <Form.Item label='QR Code Style' name='type' rules={[
            {
              required: true,
              message: "Please select QR Code Style!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={[
              {label: 'Normal', value: 'Normal'}
            ]} />
          </Form.Item>

          <Form.Item label='Scenario Type' name='scenarioId' rules={[
            {
              required: true,
              message: "Please select Channel Type!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={[
              {label: 'Campaign QR code', value: 'CampaignQRcode'}
            ]} />
          </Form.Item>

          <Form.Item label='QR Code Key Value' name='key' rules={[
            {
              required: true,
              message: "Please input QR Code Key Value",
            },
          ]}>
            <Input disabled={state} placeholder='Input' />
          </Form.Item>

          <Form.Item label='Mini Program Path' name='appInternalPath' rules={[
            {
              required: true,
              message: "Please input Mini Program Path!",
            },
          ]}>
            <Input disabled={state} placeholder='Input' />
          </Form.Item>

          <Form.Item label='QR Code Size' name='width' rules={[
            {
              required: true,
              message: "Please input QR Code Size",
            },
          ]}>
            <InputNumber disabled={state} style={{ width: '100%' }} max={1280} min={280} placeholder='Minimun280,Maximun1280' />
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
          <Form.Item label='Transparent background' name='isHyaline' rules={[
            {
              required: true,
              message: "Please select Transparent background!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]} />
          </Form.Item>
          <Form.Item
          >
            <div style={{ width: '70vw' }} className="flex justify-end">
            <Button
              danger
              className="mr-4"
              onClick={() => {
                navigator("/mpqr/mpqr-list");
              }}
            >
              Cancel
            </Button>
            {
               state ? null : (
                <Button type="primary" htmlType="submit" danger>
                  Confirm
                </Button>
               )
            }
            </div>
          </Form.Item>
          {/* <input type="color" name="bgColor" /> */}
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}

export default MpQrDetail
