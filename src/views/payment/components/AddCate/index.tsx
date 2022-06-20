import './index.less'
import ProForm, {
  ModalForm,
  ProFormTextArea,
  ProFormText,
} from '@ant-design/pro-form'
import { useRef } from 'react'

import type { ProFormInstance } from '@ant-design/pro-form'
import { saveShopCategory } from '@/framework/api/get-product'
import { userAtom } from '@/store/user.store'
import { useAtom } from 'jotai'

interface AddCateProps {
  visible: boolean;
  handleVisible: (a: boolean) => void;
  handleUpdate: (a: boolean) => void
}

const AddCate = ({ visible, handleVisible, handleUpdate }: AddCateProps) => {
  const [userInfo] = useAtom(userAtom)
  const formRef = useRef<ProFormInstance>()
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  }
  const onFinish = async (values: any) => {
    console.log(values)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    // if (res.saveShopCategory.id) {
    //   formRef?.current?.resetFields()
    //   handleUpdate(true)
    //   return true
    // } else {
    //   return false
    // }
  }
  return (
    <ModalForm
      {...layout}
      layout='horizontal'
      title='Payment Setting'
      visible={visible}
      onFinish={async(value:any)=>{
        return !!(await onFinish(value));
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
        rules={[{ required: true, message: 'Missing Merchat Account' }]}
        name='displayName'
        label='Merchat Account'
        placeholder='Enter a Merchat Account'
      />
      <ProFormTextArea
        width="lg"
        fieldProps={{
          rows:1,
          autoSize:true
        }}
        label="Certificate Number"
        name="remark"
        rules={[{ required: true, message: 'Missing Certificate Number' }]}
        placeholder='Enter a Certificate Number'
      />
      <ProFormTextArea
        width="lg"
        fieldProps={{
          rows:1,
          autoSize:true
        }}
        label="Private Key"
        name="remark"
        rules={[{ required: true, message: 'Missing Private Key' }]}
        placeholder='Enter a Private Key'
      />
      <ProFormTextArea
        width="lg"
        fieldProps={{
          rows:1,
          autoSize:true
        }}
        label="App ID"
        name="remark"
        rules={[{ required: true, message: 'Missing App ID' }]}
        placeholder='Enter a App ID'
      />
      <ProFormTextArea
        width="lg"
        fieldProps={{
          rows:1,
          autoSize:true
        }}
        label="URL"
        name="remark"
        rules={[{ required: true, message: 'Missing URL' }]}
        placeholder='Enter a URL'
      />
      <ProFormTextArea
        width="lg"
        fieldProps={{
          rows:1,
          autoSize:true
        }}
        label="API_V3_KEY"
        name="remark"
        rules={[{ required: true, message: 'Missing API_V3_KEY' }]}
        placeholder='Enter a API_V3_KEY'
      />
    </ModalForm>
  )
}

export default AddCate
