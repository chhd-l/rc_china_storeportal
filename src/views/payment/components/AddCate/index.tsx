import './index.less'
import ProForm, {
  ModalForm,
  ProFormTextArea,
  ProFormText,
} from '@ant-design/pro-form'
import { useEffect, useRef, useState } from 'react'
import type { ProFormInstance } from '@ant-design/pro-form'
import { payWayGet, payWayUpdate } from '@/framework/api/payment'

interface AddCateProps {
  visible: boolean;
  id: string;
  handleVisible: (a: boolean) => void;
  handleUpdate: (a: boolean) => void
}

const AddCate = ({ visible, handleVisible, handleUpdate, id }: AddCateProps) => {
  const formRef = useRef<ProFormInstance>()
  const [obj, setObj] = useState<any>({})
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  }

  const getDetail = async (id: any) => {
    let res = await payWayGet(id)
    console.log(res, 9999)
    if (res?.id) {
      let obj = {};
      if (res?.code === "WECHAT_PAY") {
        obj = {
          account: res.settings.find((i: { code: string }) => i.code === 'WECHAT_PAY_MCH_ID')?.value || '',
          number: res.settings.find((i: { code: string }) => i.code === 'WECHAT_PAY_MCH_CERTIFICATE_SERIAL_NUMBER')?.value || '',
          key: res.settings.find((i: { code: string }) => i.code === 'WECHAT_PAY_MCH_PRIVATE_KEY')?.value || '',
          appid: res.settings.find((i: { code: string }) => i.code === 'WECHAT_PAY_APP_ID')?.value || '',
          url: res.settings.find((i: { code: string }) => i.code === 'WECHAT_PAY_NOTIFY_URL')?.value || '',
          vkey: res.settings.find((i: { code: string }) => i.code === 'WECHAT_PAY_MCH_API_V3_KEY')?.value || '',
        }
      } else if (res?.code === "ALI_PAY") {
        obj = {
          appid: res.settings.find((i: { code: string }) => i.code === 'ALI_PAY_APP_ID')?.value || '',
          url: res.settings.find((i: { code: string }) => i.code === 'ALI_PAY_NOTIFY_URL')?.value || '',
          pkey: res.settings.find((i: { code: string }) => i.code === 'ALI_PAY_PUBLIC_KEY')?.value || '',
        }
      }
      formRef?.current?.setFieldsValue(obj)
      setObj(res)
    }

  }
  useEffect(() => {
    if (id && visible) {
      getDetail(id)
    }
  }, [id, visible])
  const onFinish = async (values: any) => {
    return new Promise(async (resolve) => {
      if (obj.id) {
        obj.settings.forEach((item: { code: string; value: any }) => {
          if (obj.code === "WECHAT_PAY" && item.code === 'WECHAT_PAY_MCH_ID') {
            item.value = values.account
          } else if (obj.code === "WECHAT_PAY" && item.code === 'WECHAT_PAY_MCH_CERTIFICATE_SERIAL_NUMBER') {
            item.value = values.number
          } else if (obj.code === "WECHAT_PAY" && item.code === 'WECHAT_PAY_MCH_PRIVATE_KEY') {
            item.value = values.key
          } else if (obj.code === "WECHAT_PAY" && item.code === 'WECHAT_PAY_APP_ID') {
            item.value = values.appid
          } else if (obj.code === "WECHAT_PAY" && item.code === 'WECHAT_PAY_NOTIFY_URL') {
            item.value = values.url
          } else if (obj.code === "WECHAT_PAY" && item.code === 'WECHAT_PAY_MCH_API_V3_KEY') {
            item.value = values.vkey
          } else if (obj.code === "ALI_PAY" && item.code === 'ALI_PAY_APP_ID') {
            item.value = values.appid
          } else if (obj.code === "ALI_PAY" && item.code === 'ALI_PAY_NOTIFY_URL') {
            item.value = values.url
          } else if (obj.code === "ALI_PAY" && item.code === 'ALI_PAY_PUBLIC_KEY') {
            item.value = values.pkey
          }
        })
        let res = await payWayUpdate(obj)
        resolve(res)
      }
    })
  }
  return (
    <ModalForm
      {...layout}
      layout='horizontal'
      title='Payment Setting'
      visible={visible}
      onFinish={async (value: any) => {
        return !!(await onFinish(value))
      }}
      formRef={formRef}
      onVisibleChange={(value) => {
        handleVisible(value)
        formRef?.current?.resetFields()
      }}
      modalProps={{ width: 600, okText: 'Confirm', cancelText: 'Cancel' }}
    >
      <ProFormText
        width='lg'
        rules={[{ required: false, message: 'Missing Merchat Account' }]}
        name='account'
        label='Merchat Account'
        placeholder='Enter a Merchat Account'
      />
      <ProFormTextArea
        width='lg'
        fieldProps={{
          rows: 1,
          autoSize: true,
        }}
        label='Certificate Number'
        name='number'
        rules={[{ required: false, message: 'Missing Certificate Number' }]}
        placeholder='Enter a Certificate Number'
      />
      <ProFormTextArea
        width='lg'
        fieldProps={{
          rows: 1,
          autoSize: {
            maxRows: 5,
          },
        }}
        label='Private Key'
        name='key'
        rules={[{ required: false, message: 'Missing Private Key' }]}
        placeholder='Enter a Private Key'
      />
      <ProFormTextArea
        width='lg'
        fieldProps={{
          rows: 1,
          autoSize: true,
        }}
        label='App ID'
        name='appid'
        rules={[{ required: false, message: 'Missing App ID' }]}
        placeholder='Enter a App ID'
      />
      <ProFormTextArea
        width='lg'
        fieldProps={{
          rows: 1,
          autoSize: true,
        }}
        label='URL'
        name='url'
        rules={[{ required: false, message: 'Missing URL' }]}
        placeholder='Enter a URL'
      />
      <ProFormTextArea
        width='lg'
        fieldProps={{
          rows: 1,
          autoSize: true,
        }}
        label='API_V3_KEY'
        name='vkey'
        rules={[{ required: false, message: 'Missing API_V3_KEY' }]}
        placeholder='Enter a API_V3_KEY'
      />
      <ProFormTextArea
        width='lg'
        fieldProps={{
          rows: 1,
          autoSize: true,
        }}
        label='Public Key'
        name='pkey'
        rules={[{ required: false, message: 'Missing API_V3_KEY' }]}
        placeholder='Enter a Public Key'
      />
    </ModalForm>
  )
}

export default AddCate
