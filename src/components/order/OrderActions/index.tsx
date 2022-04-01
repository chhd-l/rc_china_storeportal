import { Tooltip, Modal } from "antd";
import {
  BorderOutlined,
  CheckSquareOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ShipmentModal from "../ShipmentModal";
import { useNavigate } from "react-router";

const OrderActions = ({ orderId }: { orderId: string }) => {
  const [shipModalVisible, setShipModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const navigator = useNavigate();

  return (
    <>
      <Tooltip title="View Details">
        <span
          className="cursor-pointer"
          onClick={() => {
            navigator("/order-detail", {
              state: { id: orderId },
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
      <Tooltip title="Completed">
        <span
          className="cursor-pointer ml-2"
          onClick={() => setCompleteModalVisible(true)}
        >
          <CheckSquareOutlined
            style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
          />
        </span>
      </Tooltip>
      <ShipmentModal shipModalVisible={shipModalVisible} />
      <Modal
        title="提示"
        visible={completeModalVisible}
        onOk={() => setCompleteModalVisible(false)}
        onCancel={() => setCompleteModalVisible(false)}
      >
        <p>是否确定完成</p>
      </Modal>
    </>
  );
};
export default OrderActions;
