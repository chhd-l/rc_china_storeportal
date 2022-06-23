import { ContentContainer } from '@/components/ui'
import ProTable, { ProColumns } from '@/components/common/ProTable'
import { handlePageParams } from '@/utils/utils'
import { CategoryBaseProps } from '@/framework/types/product'
import { getShopCategories, updateShopCategory } from '@/framework/api/get-product'
import { useEffect, useRef, useState } from 'react'
import { Col, Modal, Row, Tooltip, Switch } from 'antd'
import './index.less'
import wx from '@/assets/images/wx.png'
import AddCate from './components/AddCate'

const PaymentSettings = () => {
  const ref = useRef<any>()
  const [addVisible, setAddvisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const [isSwithVisible, setIsSwithVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddCate = (visible: boolean) => {
    setAddvisible(visible)
  }
  const handleUpdate = (visible: boolean) => {
    ref.current.reload()
  }
  const confirmSwitch = async () => {
    setIsSwithVisible(false)
    setChecked(!checked)
  }

  return (
    <ContentContainer>
      <div className='bg-white p-6 '>
        <div className='mb-10'>
          <div className='text-xl font-semibold'>Supported Payment Method</div>
          <div className='text-gray-400 mt-1'>A payment method provided by a payment service provider approved by Seller
            Center.
          </div>
        </div>
        <div className="table-header">
          <Row>
            <Col span={8}>
              <img src={wx} alt='' />
            </Col>
            <Col span={8} />
            <Col span={8} className='flex items-center justify-end'>
              <Tooltip title='Configure'>
                <a className='mr-4' onClick={(e) => {
                  setAddvisible(true)
                }}>
                  <span className='iconfont icon-group52' />
                </a></Tooltip>
              <Switch checked={checked} onChange={(checked: boolean) => {
                  setIsSwithVisible(true)
                  setStatus(checked)
              }} />
            </Col>
          </Row>
        </div>
        <div className="table-content">
          <Row className='mb-10'>
             <Col span={8}>Provider</Col>
             <Col span={8} style={{textAlign:'center'}}>Status</Col>
             <Col span={8} style={{textAlign:'right'}}>Transaction Fee</Col>
          </Row>
          <Row>
            <Col span={8}>1</Col>
            <Col span={8} style={{textAlign:'center'}}>2</Col>
            <Col span={8} style={{textAlign:'right'}}>3</Col>
          </Row>
        </div>
      </div>
      <AddCate visible={addVisible} handleVisible={handleAddCate} handleUpdate={handleUpdate} />
      <Modal
        className='rc-modal'
        title='Notice'
        okText='Confirm'
        visible={isSwithVisible}
        onOk={confirmSwitch}
        confirmLoading={loading}
        onCancel={() => setIsSwithVisible(false)}
      >
        <p>{status ? 'Are you sure you want to enable the item ?' : 'Are you sure you want to disable the item ?'}</p>
      </Modal>
    </ContentContainer>
  )
}
export default PaymentSettings