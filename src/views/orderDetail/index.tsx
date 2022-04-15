import Mock from "mockjs"
import React, { useEffect, useState } from "react"
import {
  TradeItem,
  Progress,
  Address,
  Carrier,
  OperationLog,
  Comment,
  Customer,
  Payment,
} from "./components"
import { orderDetailSource } from "./modules/mockdata"
import { useLocation } from "react-router-dom"
import { initOrderDetail } from "./modules/constants"
import { ContentContainer, InfoContainer, DivideArea } from "@/components/ui"

const OrderDetail = () => {
  const [orderId, setOrderId] = useState("")
  const [orderDetail, setOrderDetail] = useState(initOrderDetail)
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
  } = orderDetail

  useEffect(() => {
    const state: any = location.state
    setOrderId(state.id)
    setOrderDetail(Mock.mock(orderDetailSource(state.status)))
  }, [])

  return (
    <>
      {orderDetail ? (
        <ContentContainer>
          <div className="flex flex-row">
            <div className="mr-2 w-3/4">
              <InfoContainer>
                <Progress
                  orderState={tradeState.orderState}
                  orderId={orderId}
                  subscriptionId={subscriptionId}
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
              <Comment comments={comments} />
              <OperationLog logs={logs} />
            </div>
          </div>
        </ContentContainer>
      ) : null}
    </>
  )
}
export default OrderDetail
