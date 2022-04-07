import { Avatar, Col, Row, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Order, OrderTradeItem } from "@/framework/types/order";
import { carrierTypeList } from "@/views/orderList/modules/constants";
import OrderActions from "../OrderActions";
import "./index.less";

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
            className="order-table-select"
          >
            {carrierTypeList.map((item) => (
              <Select.Option value={item.key} key={item.key}>
                {item.label}
              </Select.Option>
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
                  <span>
                    <span className="iconfont icon-Frame1 text-red-500 mr-2" />
                    Subscription ID:{item.id}
                  </span>
                ) : null}
              </div>
            </Col>
          </Row>
          <Row className="p-2 flex items-start">
            <Col span={8} className="flex flex-col justify-start">
              {item.tradeItem.map((product: OrderTradeItem, index: number) => (
                <Row className="items-center" key={product.skuId}>
                  <Col span={8}>
                    <img src={product.pic} className="w-20 h-20" />
                  </Col>
                  <Col span={16}>
                    <Row
                      className={`${
                        item.tradeItem.length > 1 &&
                        index !== item.tradeItem.length - 1
                          ? "border-b pb-2"
                          : ""
                      }`}
                    >
                      <Col span={20}>
                        <span>{product.skuName}</span>
                        <br />
                        <span className="text-gray-400 text-sm">
                          Variation:{product.size},{product.color}
                        </span>
                      </Col>
                      <Col span={4} className="items-start text-right">
                        x{product.num}
                      </Col>
                    </Row>
                  </Col>
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
