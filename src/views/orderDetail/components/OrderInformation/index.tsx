import { Divider, Table } from "antd";
import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Order } from "@/framework/types/order";

const priceCode = "￥";

const column = [
  {
    title: "No",
    key: "no",
    render: (text: any, record: any, index: number) => `${index + 1}`,
  },
  {
    title: "Product",
    dataIndex: "pic",
    key: "pic",
    render: (text: any, record: any) => (
      <div className="flex flex-row items-center">
        <img src={text} className="w-10 h-10 mr-2" />
        <span>
          {record.skuName}
          <br />
          <span>{record.skuId}</span>
        </span>
      </div>
    ),
  },
  {
    title: "Unit price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "num",
    key: "num",
  },
  {
    title: "Subtotal",
    key: "Subtotal",
    render: (text: any, record: any) => (
      <div>
        {priceCode}
        {(record.price * record.num).toFixed(2)}
      </div>
    ),
  },
];

const OrderInformation = ({ orderDetail }: { orderDetail: Order }) => {
  const [showMore, setShowMore] = useState(true);

  return (
    <div className="flex justify-start mt-4 bg-white px-4 py-2">
      <span className="iconfont icon-bianzu-1 text-red-500" />
      <div className="ml-4 w-full">
        <div className="text-left">Order Information</div>
        <div className="mt-2">
          <Table
            columns={column}
            dataSource={orderDetail.tradeItem}
            pagination={false}
          />
        </div>
        <div className="flex flex-col mt-4 ">
          <Divider orientation="right" orientationMargin="0">
            <span className="inline-flex items-center font-normal">
              <span className="mr-2">View order amount detail</span>
              {showMore ? (
                <UpOutlined
                  onClick={() => {
                    setShowMore(false);
                  }}
                />
              ) : (
                <DownOutlined
                  onClick={() => {
                    setShowMore(true);
                  }}
                />
              )}
            </span>
          </Divider>
          <div className="flex flex-row border-b mt-0">
            <div className="flex flex-col text-right w-3/4 border-r pr-2">
              <span>Products amount</span>
              <span>Promotion amount</span>
              <span>Shipping fee</span>
              <span>Order amount</span>
            </div>
            <div className="flex flex-col text-right w-1/4">
              <span>
                {priceCode}
                {orderDetail.tradePrice.goodsPrice}
              </span>
              <span>
                {priceCode}
                {orderDetail.tradePrice.discountsPrice}
              </span>
              <span>
                {priceCode}
                {orderDetail.tradePrice.deliveryPrice}
              </span>
              <span className="text-red-500">
                {priceCode}
                {orderDetail.tradePrice.totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderInformation;
