import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import {
  TradeItem,
  Progress,
  Address,
  Carrier,
  OperationLog,
  Comment,
  Customer,
  Payment,
} from "./components";
import { orderDetailSource } from "./modules/mockdata";
import { useLocation } from "react-router-dom";
import { initOrderDetail } from "./modules/constants";

const OrderDetail = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetail, setOrderDetail] = useState(initOrderDetail);
  const location = useLocation();
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
  } = orderDetail;

  useEffect(() => {
    const state: any = location.state;
    setOrderId(state.id);
    setOrderDetail(Mock.mock(orderDetailSource));
  }, []);

  return (
    <>
      {orderDetail ? (
        <div className="bg-gray1 p-2 flex flex-row">
          <div className="mr-2 w-3/4">
            <Progress
              orderState={tradeState.orderState}
              orderId={orderId}
              subscriptionId={subscriptionId}
            />
            <div className="bg-white py-2 px-4 mt-4">
              <Address address={shippingAddress} />
              <Carrier carrier={carrier} />
            </div>
            <Customer buyer={buyer} />
            <TradeItem tradeItem={tradeItem} tradePrice={tradePrice} />
            <Payment payInfo={payInfo} />
          </div>
          <div className="w-1/4">
            <Comment comments={comments} />
            <OperationLog logs={logs} />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default OrderDetail;
