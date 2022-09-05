import { getStoreSetting, updateStoreSetting } from '@/framework/api/storeSetting'
import { message, Modal, Switch } from 'antd'
import { useEffect, useState } from 'react'
import intl from 'react-intl-universal'
import './index.less'

const CustomerService = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [serviceInfo, setServiceInfo] = useState({
    isEnabled: true
  })

  const handleOk = async () => {
    try {
      await updateStoreSetting({...serviceInfo, isEnabled: !serviceInfo.isEnabled})
      getCustomerService()
      setIsModalVisible(false)
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
    } catch (err) {
      console.log('err', err)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const getCustomerService = async () => {
    const res = await getStoreSetting('store_客服开关')
    if(JSON.stringify(res) !== '[]') {
      setServiceInfo(res)
    }
  }

  useEffect(() => {
    getCustomerService()
  }, [])

  return (
    <div className="customerService py-6">
      <div className="content">
        <div>
          <div className="title">{intl.get('customer.customer_service')}</div>
          <div className="span">
            {intl.get('customer.dtc_center_support')}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>{intl.get('customer.mini_program')}</div>
          <Switch checked={serviceInfo.isEnabled} onChange={() => setIsModalVisible(true)} />
        </div>
      </div>
      <Modal title="Notice" visible={isModalVisible} onOk={handleOk} okText='Confirm' onCancel={handleCancel}>
        <p>{intl.get(serviceInfo.isEnabled ? 'public.are_you_sure_disable' : 'public.are_you_sure_enable')}</p>
      </Modal>
    </div>
  )
}

export default CustomerService
