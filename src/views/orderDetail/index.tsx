import React, { useEffect, useState } from 'react'
import { OrderItem, Progress, Address, Carrier, OperationLog, Comment, Consumer, Payment } from './components'
import { useLocation } from 'react-router-dom'
import { initOrderDetail } from './modules/constants'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import { getOrderDetail } from '@/framework/api/get-order'
import { Empty, Spin } from 'antd'

const OrderDetail = () => {
  const [orderId, setOrderId] = useState('')
  const [orderDetail, setOrderDetail] = useState<any>(initOrderDetail)
  const location = useLocation()
  const {
    subscriptionNo,
    subscriptionId,
    orderState,
    shippingAddress,
    buyer,
    orderItem,
    orderPrice,
    carrier,
    payment,
    logs,
    comments,
    id,
    expectedShippingDate,
  } = orderDetail
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const state: any = location.state
    setOrderId(state.id)
    console.info('state.id', state.id)
    getDetail(state.id)
  }, [])

  const getDetail = async (orderNum = orderId) => {
    setLoading(true)
    let data: any = await getOrderDetail({ orderNum })
    console.log('333', data)
    setOrderDetail(data)
    setLoading(false)
  }

  return (
    <>
      <Spin spinning={loading}>
        {orderDetail?.id ? (
          <ContentContainer>
            <div className="flex flex-row">
              <div className="mr-4 w-3/4">
                <InfoContainer>
                  <Progress
                    orderState={orderState.orderState}
                    orderId={orderId}
                    subscriptionNo={subscriptionNo}
                    subscriptionId={subscriptionId}
                    orderAddress={shippingAddress}
                    logs={logs}
                    buyer={buyer}
                    shipOrCompleteSuccess={getDetail}
                    expectedShippingDate={expectedShippingDate}
                  />
                </InfoContainer>
                <DivideArea />
                <InfoContainer>
                  <Address address={shippingAddress} />
                  <Carrier carrier={carrier} />
                </InfoContainer>
                <DivideArea />
                <InfoContainer>
                  <Consumer buyer={buyer} />
                </InfoContainer>
                <DivideArea />
                <InfoContainer>
                  <OrderItem orderItem={orderItem} orderPrice={orderPrice} isSubscription={subscriptionNo !== ''} />
                </InfoContainer>
                <DivideArea />
                <InfoContainer>
                  <Payment payment={payment} />
                </InfoContainer>
              </div>
              <div className="w-1/4">
                <Comment comments={comments} orderNum={id} updateSuccess={() => getDetail(orderId)} />
                <OperationLog logs={logs} />
              </div>
            </div>
          </ContentContainer>
        ) : (
          <Empty className="mt-48" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Spin>
    </>
  )
}
export default OrderDetail
