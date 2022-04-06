import { Avatar, Col, Row, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Order } from "@/framework/types/order";
import { OrderTradeItem } from "@/framework/types/order";
import { carrierTypeList } from "../OrderConstants";
import OrderActions from "../OrderActions";

const OrderTable = ({ orderList }: { orderList: Order[] }) => {
  return (
    <div>
      <Row className="bg-gray1 border p-2">
        <Col span={8}>Product(s)</Col>
        <Col span={4} className="text-right">
          Order Total
        </Col>
        <Col span={4} className="text-right">
          Order status
        </Col>
        <Col span={6} className="text-center">
          <Select
            onChange={(val, a) => {}}
            getPopupContainer={(trigger: any) => trigger.parentNode}
            value="Carrier"
          >
            {carrierTypeList.map((item) => (
              <Select.Option value={item.key} key={item.key}>{item.label}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={2} className="text-right">
          Actions
        </Col>
      </Row>
      {orderList.map((item: Order) => (
        <div className="border mt-2" key={item.id}>
          <Row className="bg-gray1 border-b p-2">
            <Col span={12} className="flex items-center">
              <Avatar icon={<UserOutlined />} />
              <span className="ml-2">{item.buyer.name}</span>
            </Col>
            <Col span={12} className="text-right">
              <div>
                order ID:{item.id}
                <br />
                {item.subscriptionId ? (
                  <span>Subscription ID:{item.id}</span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="p-2 flex items-center">
            <Col span={8} className="flex flex-col justify-start">
              {item.tradeItem.map((product: OrderTradeItem) => (
                <Row className="items-center" key={product.skuId}>
                  <Col span={8}>
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                  </Col>
                  <Col span={14}>
                    <span>{product.skuName}</span>
                    <br />
                    <span>
                      Variation:{product.size},{product.color}
                    </span>
                  </Col>
                  <Col span={2}>x{product.num}</Col>
                </Row>
              ))}
            </Col>
            <Col span={4} className="text-right">
              <div>
                {item.tradePrice.totalPrice}
                <br />
                <span className="text-gray-400">
                  {item.payInfo.payTypeName}
                </span>
              </div>
            </Col>
            <Col span={4} className="text-right">
              <div>{item.tradeState.orderState}</div>
            </Col>
            <Col span={6} className="text-center">
              {item.carrierType}
            </Col>
            <Col span={2} className="text-right items-center">
              <OrderActions orderDetail={item} />
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
export default OrderTable;
