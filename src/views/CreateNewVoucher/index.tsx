import { ContentContainer } from '@/components/ui'
import { Button, Form } from 'antd'
import { useEffect, useState } from 'react'
import BasicInformation from './components/BasicInformation'
import RuleSettings from './components/RuleSettings'
import ApplicableProducts from './components/ApplicableProducts'
import './Style.less'
import { createVoucher, updateVoucher } from '@/framework/api/voucher'

const CreateNewVoucher = () => {
  const [VoucherType, setVoucherType] = useState('Shop Voucher')

  const addNewVoucher=async ()=>{
    const res=await createVoucher()
    console.log('create voucher',res)
  }

  const updateVouchers=async ()=>{
    const res=await updateVoucher()
    console.log('update voucher',res)
  }

  useEffect(()=>{
    addNewVoucher()
    updateVouchers()
  },[])

  return (
    <ContentContainer>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
        className="CreateNewVoucher"
        onFinish={(v) => {
          console.log('v', v)
          addNewVoucher()
        }}
      >
        <BasicInformation VoucherType={VoucherType} setVoucherType={setVoucherType} />
        <RuleSettings />
        <ApplicableProducts VoucherType={VoucherType} />
        <Form.Item className="w-full flex items-center justify-end py-8">
          <div className="flex items-center justify-end">
            <Button htmlType="button" onClick={() => {}}>
              Cancel
            </Button>
            <Button className="ml-4" type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </ContentContainer>
  )
}

export default CreateNewVoucher
