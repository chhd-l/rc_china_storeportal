import { Divider, Table } from "antd";
import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const OrderInformation = ({}) => {
  const column = [
    {
      title: "No",
      key: "no",
    },
    {
      title: "Product",
      dataIndex: "img",
      key: "img",
      render: (text: any, record: any) => (
        <div>
          <img src={text} />
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
      dataIndex: "img",
      key: "img",
    },
    {
      title: "Quantity",
      dataIndex: "num",
      key: "num",
    },
    {
      title: "Subtotal",
      dataIndex: "num",
      key: "num",
    },
  ];
  const tradeItem = [
    {
      skuName: "Thick hoodle",
      skuId: "SKU",
      num: 1,
      price: 198.0,
    },
  ];
  const [showMore, setShowMore] = useState(true);
  return (
    <div className="flex justify-start mt-4 bg-white px-4 py-2">
      <span className="iconfont icon-bianzu-1 text-red-500" />
      <div className="ml-4 w-full">
        <div className="text-left">Order Information</div>
        <div className="mt-2">
          <Table columns={column} dataSource={tradeItem} pagination={false} />
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
              <span>￥198.00</span>
              <span>￥8.00</span>
              <span>￥0.00</span>
              <span className="text-red-500">￥190.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderInformation;
