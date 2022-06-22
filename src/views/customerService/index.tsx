import { message, Modal, Switch } from 'antd'
import { useState } from 'react'
import './index.less'

const CustomerService = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [chek, setChek] = useState(false)

  const handleOk = () => {
    try {
      setChek(!chek)
      setIsModalVisible(false)
      message.success({ className: 'rc-message', content: 'Operation success' })
    } catch (err) {
      console.log('err', err)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div className="customerService">
      <div className="content">
        <div>
          <div className="title">Customer Service</div>
          <div className="span">
            Seller Center Supported Controls the enable/disable of the mobile customer service.
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>Mini program</div>
          <Switch checked={chek} onChange={() => setIsModalVisible(true)} />
        </div>
      </div>
      <Modal title="Notice" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure {chek ? 'enable' : 'disabled'} this item</p>
      </Modal>
    </div>
  )
}

export default CustomerService
