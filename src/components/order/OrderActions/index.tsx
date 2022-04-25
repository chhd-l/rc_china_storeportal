import { Tooltip, Modal } from 'antd'
import React, { useState } from 'react'
import ShipmentModal from '../ShipmentModal'
import { useNavigate } from 'react-router-dom'
import { OrderStatus } from '@/framework/types/order'
import { useLocation } from 'react-router-dom'
import { shippedOrder } from '@/framework/api/get-order'
import _ from 'lodash'

const OrderActions = ({
  orderState,
  orderId,
  orderAddress,
}: {
  orderState: string
  orderId: string
  orderAddress: any
}) => {
  const [shipModalVisible, setShipModalVisible] = useState(false)
  const [completeModalVisible, setCompleteModalVisible] = useState(false)
  const navigator = useNavigate()
  const location = useLocation()

  const shipped = async (tradeShippingInfoInput: any) => {
    const params = {
      TradeShippingInfoInput: tradeShippingInfoInput,
      address: _.omit(orderAddress, ['isDefault', 'postCode']),
      orderNum: orderId,
      nowOrderState: orderState,
    }
    const res = await shippedOrder(params)
    if (res) {
      setShipModalVisible(false)
    }
  }

  return (
    <div className="flex items-center">
      {location.pathname !== '/order-detail' && (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-Vector1 text-red-500"
            onClick={() => {
              navigator('/order-detail', {
                state: { id: orderId, status: orderState },
              })
            }}
          />
        </Tooltip>
      )}
      {/*发货*/}
      {orderState === OrderStatus['Toship'] && (
        <Tooltip title="Arrange shipment">
          <span
            className="cursor-pointer ml-2 iconfont icon-dabaodaifahuo text-red-500"
            style={{ fontSize: '20px' }}
            onClick={() => {
              setShipModalVisible(true)
            }}
          />
        </Tooltip>
      )}
      {/*收货*/}
      {orderState === OrderStatus['Shipped'] && (
        <Tooltip title="Completed">
          <span
            className="cursor-pointer ml-2 iconfont icon-Order text-red-500 text-red-500"
            style={{ fontSize: '20px' }}
            onClick={() => setCompleteModalVisible(true)}
          />
        </Tooltip>
      )}
      <ShipmentModal
        shipModalVisible={shipModalVisible}
        orderId={orderId}
        onCancel={() => setShipModalVisible(false)}
        shipped={shipped}
      />
      <Modal
        title="提示"
        visible={completeModalVisible}
        onOk={() => setCompleteModalVisible(false)}
        onCancel={() => setCompleteModalVisible(false)}
      >
        <p>是否确定完成</p>
      </Modal>
    </div>
  )
}
export default OrderActions
