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
import { Order } from "@/framework/types/order";

const OrderDetail = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetail, setOrderDetail] = useState<Order | any>(null);
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    console.log("111", state.id);
    console.log(orderId);
    setOrderId(state.id);
    setOrderDetail(Mock.mock(orderDataSource));
  }, []);

  return (
    <>
      {orderDetail ? (
        <div className="bg-gray1 p-2 flex flex-row">
          <div className="mr-2 w-3/4">
            <Progress orderDetail={orderDetail} />
            <div className="bg-white py-2 px-4 mt-4">
              <Address orderAddress={orderDetail?.shippingAddress} />
              <Carrier />
            </div>
            <CustomerInfo buyer={orderDetail.buyer} />
            <TradeItem orderDetail={orderDetail} />
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
