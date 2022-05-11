import React, { useEffect, useState } from 'react'
import { TradeItem, Progress, Address, Carrier, OperationLog, Comment, Customer, Payment } from './components'
import { useLocation } from 'react-router-dom'
import { initOrderDetail } from './modules/constants'
import { ContentContainer, InfoContainer, DivideArea } from '@/components/ui'
import { getOrderDetail } from '@/framework/api/get-order'

const OrderDetail = () => {
  const [orderId, setOrderId] = useState('')
  const [orderDetail, setOrderDetail] = useState<any>(initOrderDetail)
  const location = useLocation()
  const {
    subscriptionId,
    tradeState,
    shippingAddress,
    buyer,
    tradeItem,
    tradePrice,
    carrier,
    payInfo,
    logs,
    comments,
    id,
  } = orderDetail

  useEffect(() => {
    const state: any = location.state
    setOrderId(state.id)
    console.info('state.id', state.id)
    getDetail(state.id)
  }, [])

  const getDetail = async (orderNum = orderId) => {
    let data: any = await getOrderDetail({ orderNum })
    console.log('333', data)
    setOrderDetail(data)
  }

  return (
    <>
      {orderDetail ? (
        <ContentContainer>
          <div className="flex flex-row">
            <div className="mr-4 w-3/4">
              <InfoContainer>
                <Progress
                  orderState={tradeState.orderState}
                  orderId={orderId}
                  subscriptionId={subscriptionId}
                  orderAddress={shippingAddress}
                  logs={logs}
                  buyer={buyer}
                  shipOrCompleteSuccess={getDetail}
                />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
                <Address address={shippingAddress} />
                <Carrier carrier={carrier} />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
                <Customer buyer={buyer} />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
                <TradeItem tradeItem={tradeItem} tradePrice={tradePrice} />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
                <Payment payInfo={payInfo} />
              </InfoContainer>
            </div>
            <div className="w-1/4">
              <Comment comments={comments} orderNum={id} updateSuccess={() => getDetail(orderId)} />
              <OperationLog logs={logs} />
            </div>
          </div>
        </ContentContainer>
      ) : null}
    </>
  )
}
export default OrderDetail
