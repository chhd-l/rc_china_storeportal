import { useEffect, useState } from "react";
import { ContentContainer, InfoContainer } from "@/components/ui"
import { Button, Form, Input, Select, InputNumber, Popover } from "antd";
import { getAccountList, upsertAppQrCodes } from '@/framework/api/wechatSetting'
import { useLocation, useNavigate } from "react-router";
import ColorInput from "./components/color-input";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

const MpQrDetail = () => {
  const navigator = useNavigate();
  const [list, setList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [qrType, setQrType] = useState<string>("QR_CODE");
  const { state }: any = useLocation();

  const depy = (arr: any[]) => {
    if (!arr.length) return
    const lists: any[] = []
    arr.forEach((item) => {
      if (item.type === 'WxMiniProgram' || item.type === 'AliMiniProgram')
        lists.push({
          label: item.name,
          value: item.id
        })
    })
    setList(lists)
  }

  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: "12345678", status: true },
    })
    depy(res?.records || [])
  }

  const handlok = async (item: any) => {
    const param = qrType === "SUN_CODE" ? {
      ...item
    } : {
      accountId: item.accountId,
      qrType: item.qrType,
      appInternalPath: item.appInternalPath,
      width: item.width,
    };
    setLoading(true);
    const success = await upsertAppQrCodes({
      ...param,
    });
    if (success) {
      navigator('/mpqr/mpqr-list')
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAccountName()
    if (state?.qrType) {
      setQrType(state.qrType);
    }
  }, [])

  // const formItemList = useFormItems()

  return (
    <ContentContainer className="mp-qr-detail">
      <InfoContainer title={state ? 'QR Code Detail' : 'Add New QR Code'}>
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

          <Form.Item label='QR Code Type' name='qrType' rules={[
            {
              required: true,
              message: "Please select QR Code Type!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={[
              {label: 'Normal', value: 'QR_CODE'},
              {label: 'Sun Code', value: 'SUN_CODE'}
            ]} onChange={(val: string) => setQrType(val)} />
          </Form.Item>

          {qrType === "SUN_CODE" ? <Form.Item label='QR Code Color' name='lineColor' rules={[
            {
              required: true,
              message: 'Please choose color!',
            }
          ]}>
            {state ? <Input disabled={true} placeholder="Select" /> : <ColorInput />}
          </Form.Item> : null}

          {qrType === "SUN_CODE" ? <Form.Item label='Scenario Type' name='scenarioId' rules={[
            {
              required: true,
              message: "Please select Channel Type!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={[
              {label: 'Campaign QR code', value: 'Campaign QR code'}
            ]} />
          </Form.Item> : null}

          {qrType === "SUN_CODE" ? <Form.Item label='QR Code Key Value' name='key' rules={[
            {
              required: true,
              message: "Please input QR Code Key Value",
            },
          ]}>
            <Input disabled={state} placeholder='Input' />
          </Form.Item> : null}

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
          
          {qrType === "SUN_CODE" ? <Form.Item label='Transparent background' name='isHyaline' rules={[
            {
              required: true,
              message: "Please select Transparent background!",
            },
          ]}>
            <Select disabled={state} placeholder='Select' options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]} />
          </Form.Item> : null}

          <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
            <div className="flex space-x-4 justify-end">
            <Button
              danger
              onClick={() => {
                navigator("/mpqr/mpqr-list");
              }}
            >
              Cancel
            </Button>
            {
               state ? null : (
                <Button type="primary" htmlType="submit" loading={loading}>
                  Confirm
                </Button>
               )
            }
            </div>
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}

export default MpQrDetail
