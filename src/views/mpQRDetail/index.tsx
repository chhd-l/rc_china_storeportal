import { useEffect, useState } from "react";
import { ContentContainer, InfoContainer } from "@/components/ui"
import { Button, Form, Input, Select, InputNumber, Popover } from "antd";
import { getAccountList, upsertAppQrCodes } from '@/framework/api/wechatSetting'
import { useLocation, useNavigate } from "react-router";
import ColorInput from "./components/color-input";
import intl from 'react-intl-universal';

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
      <InfoContainer title={state ? intl.get('wx.qr_code_detail') : intl.get('wx.add_new_qr_code')}>
        <Form
          {...layout}
          className="w-1/2 "
          layout="horizontal"
          initialValues={state ? state : null}
          onFinish={async (values) => {
            handlok(values)
          }}
        >
          <Form.Item label={intl.get('wx.channel_type')} name='accountId' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <Select disabled={state} placeholder={intl.get('public.select')} options={list} />
          </Form.Item>

          <Form.Item label={intl.get('wx.qr_code_type')} name='qrType' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <Select disabled={state} placeholder={intl.get('public.select')} options={[
              {label: 'Normal', value: 'QR_CODE'},
              {label: 'Sun Code', value: 'SUN_CODE'}
            ]} onChange={(val: string) => setQrType(val)} />
          </Form.Item>

          {qrType === "SUN_CODE" ? <Form.Item label={intl.get('wx.qr_code_color')} name='lineColor' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            }
          ]}>
            {state ? <Input disabled={true} placeholder={intl.get('public.select')} /> : <ColorInput />}
          </Form.Item> : null}

          {qrType === "SUN_CODE" ? <Form.Item label={intl.get('wx.scenario_type')} name='scenarioId' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <Select disabled={state} placeholder={intl.get('public.select')} options={[
              {label: 'Campaign QR code', value: 'Campaign QR code'}
            ]} />
          </Form.Item> : null}

          {qrType === "SUN_CODE" ? <Form.Item label={intl.get('wx.qr_code_key_value')} name='key' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <Input disabled={state} placeholder={intl.get('public.input')} />
          </Form.Item> : null}

          <Form.Item label={intl.get('wx.mini_program_path')} name='appInternalPath' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <Input disabled={state} placeholder={intl.get('public.input')} />
          </Form.Item>

          <Form.Item label={intl.get('wx.qr_code_size')} name='width' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <InputNumber disabled={state} style={{ width: '100%' }} max={1280} min={280} placeholder={intl.get('wx.qr_code_size_recom')} />
          </Form.Item>
          
          {qrType === "SUN_CODE" ? <Form.Item label={intl.get('wx.trans_background')} name='isHyaline' rules={[
            {
              required: true,
              message: intl.get('public.field_required'),
            },
          ]}>
            <Select disabled={state} placeholder={intl.get('public.select')} options={[
              { label: intl.get('public.yes'), value: true },
              { label: intl.get('public.no'), value: false },
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
              {intl.get('public.cancel')}
            </Button>
            {
               state ? null : (
                <Button type="primary" htmlType="submit" loading={loading}>
                  {intl.get('public.confirm')}
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
