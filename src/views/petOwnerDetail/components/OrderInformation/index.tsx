import { Avatar, Col, DatePicker, Row, Tooltip } from "antd";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";
import { Order } from "@/framework/types/order";
import {OrderTradeItem} from "@/framework/types/order";

interface OrderInfoProps {
  orderList: Order[];
  id: string;
}

const OrderInformation = ({ orderList,id }: OrderInfoProps) => {
  const navigator = useNavigate();

  return (
    <div id={id}>
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
      <Row className="bg-gray1 border p-2">
        <Col span={8}>Product(s)</Col>
        <Col span={4} className="text-right">
          Order Total
        </Col>
        <Col span={4} className="text-right">
          Order status
        </Col>
        <Col span={6} className="text-right">
          Carrier
        </Col>
        <Col span={2} className="text-right">
          Actions
        </Col>
      </Row>
      {orderList.map((item: Order) => (
        <div className="border mt-2">
          <Row className="bg-gray1 border-b p-2">
            <Col span={12} className="flex items-center">
              <Avatar icon={<UserOutlined />} />
              <span className="ml-2">{item.customerName}</span>
            </Col>
            <Col span={12} className="text-right">
              <div>order ID:{item.id}</div>
            </Col>
          </Row>
          <Row className="p-2 flex items-center">
            <Col span={8} className="flex flex-row items-center">
              {item.products.map((product: OrderTradeItem) => (
                <Row className="items-center">
                  <Col span={8}>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                  </Col>
                  <Col span={14}>
                    <span>{product.productName}</span>
                    <br />
                    <span>
                      Variation:{product.size},{product.color}
                    </span>
                  </Col>
                  <Col span={2}>x{product.quantity}</Col>
                </Row>
              ))}
            </Col>
            <Col span={4} className="text-right">
              <div>{item.orderTotal}</div>
            </Col>
            <Col span={4} className="text-right">
              <div>{item.orderStatus}</div>
            </Col>
            <Col span={6} className="text-right" />
            <Col span={2} className="text-right">
              <Tooltip title="View Details">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigator("/order-detail", {
                      state: { id: item.id },
                    });
                  }}
                >
                  <EyeOutlined
                    style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
                  />
                </span>
              </Tooltip>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
export default OrderInformation;
