import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import {
  TradeItem,
  Progress,
  Address,
  Carrier,
  OperationLog,
  Comment,
  CustomerInfo,
  Payment,
} from "./components";
import { orderDataSource } from "./modules/mockdata";
import { useLocation } from "react-router-dom";

const OrderDetail = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetail, setOrderDetail] = useState({
    id: "",
    tradeItem: [],
    tradeState: {
      orderState: "",
    },
    carrierType: "",
    tradePrice: {
      goodsPrice: 0,
      deliveryPrice: 0,
      totalPrice: 0,
      discountsPrice: 0,
    },
    subscriptionId: "",
    shippingAddress:{},
    buyer:{}
  });
  const location = useLocation();
  const {
    subscriptionId,
    tradeState,
    shippingAddress,
    buyer,
    tradeItem,
    tradePrice,
  } = orderDetail;

  useEffect(() => {
    const state: any = location.state;
    setOrderId(state.id);
    setOrderDetail(Mock.mock(orderDataSource));
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
              <Address orderAddress={shippingAddress} />
              <Carrier />
            </div>
            <CustomerInfo buyer={buyer} />
            <TradeItem tradeItem={tradeItem} tradePrice={tradePrice} />
            <Payment />
          </div>
          <div className="w-1/4">
            <Comment />
            <OperationLog />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default OrderDetail;
