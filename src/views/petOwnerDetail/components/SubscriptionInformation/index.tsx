import { Avatar, DatePicker, Row, Col, Tooltip } from "antd";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";

const SubscriptionInformation = ({ subscriptionList, id }: any) => {
  const navigator = useNavigate();

  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">
        Subscription Information
      </div>
      <div className="px-2 py-4 flex flex-row items-center justify-end">
        <div className="flex flex-row items-center mr-10">
          <div className="mr-4">Subscription Time Date:</div>
          <DatePicker />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-4">to:</div>
          <DatePicker />
        </div>
      </div>
      <Row className="bg-gray1 border p-2">
        <Col span={6}>Product(s)</Col>
        <Col span={6} className="text-right">
          Subscription Status
        </Col>
        <Col span={6} className="text-right">
          Subscription Type
        </Col>
        <Col span={6} className="text-right">
          Subscription Actions
        </Col>
      </Row>
      {subscriptionList.map((item: any) => (
        <div className="border mt-2" key={item.subscriptionId}>
          <Row className="bg-gray1 border-b p-2">
            <Col span={12} className="flex items-center">
              <Avatar icon={<UserOutlined />} />
              <span className="ml-2">{item.customerName}</span>
            </Col>
            <Col span={12} className="text-right">
              <div>subscription ID:{item.subscriptionId}</div>
            </Col>
          </Row>
          <Row className="p-2 flex items-center">
            <Col span={6} className="flex flex-row items-center">
              {item.products.map((product: any) => (
                <Row className="items-center" key={product.id}>
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
            <Col span={6} className="text-right">
              <div>{item.subscriptionStatus}</div>
            </Col>
            <Col span={6} className="text-right">
              <div>{item.subscriptionType}</div>
            </Col>
            <Col span={6} className="text-right">
              <Tooltip title="View Details">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigator("/subscription-detail", {
                      state: { id: item.subscriptionId },
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
export default SubscriptionInformation;
