import { DatePicker } from "antd";
import React from "react";
import { Order } from "@/framework/types/order";
import OrderTable from "@/components/order/OrderTable";

interface OrderInfoProps {
  orderList: Order[];
  id: string;
}

const OrderInformation = ({ orderList, id }: OrderInfoProps) => {
  return (
    <div id={id} className="mt-4">
      <div className="py-4 px-2 border-b text-xl font-medium">
        Order Information
      </div>
      <div className="px-2 py-4 flex flex-row items-center justify-end">
        <div className="flex flex-row items-center mr-10">
          <div className="mr-4">Order Time Date:</div>
          <DatePicker />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-4">to:</div>
          <DatePicker />
        </div>
      </div>
      <OrderTable orderList={orderList} />
    </div>
  );
};
export default OrderInformation;
