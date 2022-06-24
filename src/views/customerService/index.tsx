import { getStoreSetting, updateStoreSetting } from '@/framework/api/customerService'
import { message, Modal, Switch } from 'antd'
import { useEffect, useState } from 'react'
import './index.less'

const CustomerService = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [serviceInfo, setServiceInfo] = useState({
    isEnabled: false
  })

  const handleOk = async () => {
    try {
      await updateStoreSetting({...serviceInfo, isEnabled: !serviceInfo.isEnabled})
      getCustomerService()
      setIsModalVisible(false)
      message.success({ className: 'rc-message', content: 'Operation success' })
    } catch (err) {
      console.log('err', err)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const getCustomerService = async () => {
    const res = await getStoreSetting('store_客服开关')
    setServiceInfo(res)
  }

  useEffect(() => {
    getCustomerService()
  }, [])

  return (
    <div className="customerService py-6">
      <div className="content">
        <div>
          <div className="title">Customer Service</div>
          <div className="span">
            Seller Center support Controls the enable/disable of the mobile customer service.
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>Mini program</div>
          <Switch checked={serviceInfo.isEnabled} onChange={() => setIsModalVisible(true)} />
        </div>
      </div>
      <Modal title="Notice" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure {serviceInfo.isEnabled ? 'disabled' : 'enable'} this item ?</p>
      </Modal>
    </div>
  )
}

export default CustomerService
