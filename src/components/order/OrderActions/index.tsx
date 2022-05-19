import { Tooltip, Modal, Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ShipmentModal from '../ShipmentModal'
import { useNavigate } from 'react-router-dom'
import { OrderStatus } from '@/framework/types/order'
import { useLocation } from 'react-router-dom'
import { completedOrder, shippedOrder } from '@/framework/api/get-order'
import _ from 'lodash'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'

const OrderActions = ({
  orderState,
  orderId,
  orderAddress,
  orderBuyer,
  shipOrCompleteSuccess,
  origin = 'table',
}: {
  orderState: string
  orderId: string
  orderAddress: any
  orderBuyer: any
  shipOrCompleteSuccess: Function
  origin?: string
}) => {
  const [shipModalVisible, setShipModalVisible] = useState(false)
  const [completeModalVisible, setCompleteModalVisible] = useState(false)
  const navigator = useNavigate()
  const location = useLocation()
  const [userInfo] = useAtom(userAtom)

  const shipped = async (tradeShippingInfoInput: any) => {
    const params = {
      tradeShippingInfoInput: tradeShippingInfoInput,
      address: _.omit(orderAddress, ['isDefault', 'postCode']),
      orderNum: orderId,
      nowOrderState: orderState,
      wxUserInfo: {
        openId: orderBuyer.openId,
        unionId: orderBuyer.unionId,
        nickName: orderBuyer.name,
      },
      operator: userInfo?.nickname||'system',
    }
    const res = await shippedOrder(params)
    if (res) {
      message.success({ className: 'rc-message', content: 'Operation success' })
      setShipModalVisible(false)
      shipOrCompleteSuccess && shipOrCompleteSuccess()
    }else{
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
  }

  const completed = async () => {
    const res = await completedOrder({
      orderNum: orderId,
      nowOrderState: orderState,
      operator: userInfo?.nickname||'system',
    })
    if (res) {
      message.success({ className: 'rc-message', content: 'Operation success' })
      setCompleteModalVisible(false)
      shipOrCompleteSuccess && shipOrCompleteSuccess()
    }else{
      message.error({ className: 'rc-message', content: 'Operation failed' })
    }
  }

  return (
    <div className="flex items-center">
      {location.pathname !== '/order/order-detail' && (
        <Tooltip title="View order details">
          <span
            className="cursor-pointer iconfont icon-kjafg text-theme-red"
            onClick={() => {
              navigator('/order/order-detail', {
                state: { id: orderId, status: orderState },
              })
            }}
          />
        </Tooltip>
      )}
      {/*发货*/}
      {orderState === OrderStatus['Toship'] && origin === 'table' ? (
        <Tooltip title="Arrange shipment">
          <span
            className="cursor-pointer ml-2 iconfont icon-dabaodaifahuo text-theme-red"
            style={{ fontSize: '20px' }}
            onClick={() => {
              setShipModalVisible(true)
            }}
          />
        </Tooltip>
      ): orderState === OrderStatus['Toship'] ? (
        <Tooltip title="Arrange shipment">
          <Button
            type='primary'
            className="cursor-pointer ml-2 text-white rounded-4"
            onClick={() => setShipModalVisible(true)}
          >
            Arrange shipment
          </Button>
        </Tooltip>
      ) :null}
      {/*收货*/}
      {orderState === OrderStatus['Shipped'] && origin === 'table' ? (
        <Tooltip title="Completed">
          <span
            className="cursor-pointer ml-2 iconfont icon-Order text-theme-red"
            style={{ fontSize: '20px' }}
            onClick={() => setCompleteModalVisible(true)}
          />
        </Tooltip>
      ) : orderState === OrderStatus['Shipped'] ? (
        <Tooltip title="Completed">
          <Button
            type='primary'
            className="cursor-pointer ml-2 text-white rounded-4"
            // style={{ fontSize: '20px' }}
            onClick={() => setCompleteModalVisible(true)}
          >
            Completed
          </Button>
        </Tooltip>
      ) : null}
      <ShipmentModal
        shipModalVisible={shipModalVisible}
        orderId={orderId}
        onCancel={() => setShipModalVisible(false)}
        shipped={shipped}
      />
      <Modal
        className="rc-modal"
        title="Order Completed"
        okText={'Confirm'}
        visible={completeModalVisible}
        onOk={() => completed()}
        onCancel={() => setCompleteModalVisible(false)}
      >
        <p>Are you sure you want to complete the order?</p>
      </Modal>
    </div>
  )
}
export default OrderActions
