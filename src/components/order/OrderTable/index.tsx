import { Avatar, Col, Row, Tooltip, Modal } from "antd";
import { EyeOutlined, UserOutlined, BorderOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Order } from "@/framework/types/order";
import { OrderTradeItem } from "@/framework/types/order";
import { useNavigate } from "react-router";
import ShipmentModal from "../ShipmentModal";

const OrderTable = ({ orderList }: { orderList: Order[] }) => {
  const [shipModalVisible, setShipModalVisible] = useState(false);
  const navigator = useNavigate();

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
        <Col span={6} className="text-right">
          Carrier
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
              <span className="ml-2">{item.customerName}</span>
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
            <Col span={8} className="flex flex-row items-center">
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
              <Tooltip title="Arrange shipment">
                <span
                  className="cursor-pointer ml-2"
                  onClick={() => {
                    setShipModalVisible(true);
                  }}
                >
                  <BorderOutlined
                    style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
                  />
                </span>
              </Tooltip>
            </Col>
          </Row>
        </div>
      ))}
      <ShipmentModal shipModalVisible={shipModalVisible} />
    </div>
  );
};
export default OrderTable;
