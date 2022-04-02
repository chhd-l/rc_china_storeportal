import { Tooltip, Modal } from "antd";
import {
  BorderOutlined,
  CheckSquareOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ShipmentModal from "../ShipmentModal";
import { useNavigate } from "react-router";
import { Order } from "@/framework/types/order";

enum ORDERSTATUS {
  TOSHIP = "toShip",
  SHIPPED = "shipped",
}

const OrderActions = ({ orderDetail }: { orderDetail: Order }) => {
  const [shipModalVisible, setShipModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const navigator = useNavigate();

  return (
    <div className="flex items-center">
      <Tooltip title="View Details">
        <span
          className="cursor-pointer"
          onClick={() => {
            navigator("/order-detail", {
              state: { id: orderDetail.id },
            });
          }}
        >
          <EyeOutlined
            style={{ color: "rgba(239, 68, 68,1)", fontSize: "20px" }}
          />
        </span>
      </Tooltip>
      {/*发货*/}
      {orderDetail.tradeState.orderState === ORDERSTATUS["TOSHIP"] && (
        <Tooltip title="Arrange shipment">
          <span
            className="cursor-pointer ml-2 iconfont icon-dabaodaifahuo text-red-500"
            style={{ fontSize: "20px" }}
            onClick={() => {
              setShipModalVisible(true);
            }}
          />
        </Tooltip>
      )}
      {/*收货*/}
      {orderDetail.tradeState.orderState === ORDERSTATUS["SHIPPED"] && (
        <Tooltip title="Completed">
          <span
            className="cursor-pointer ml-2 iconfont icon-Order text-red-500 text-red-500"
            style={{ fontSize: "20px" }}
            onClick={() => setCompleteModalVisible(true)}
          />
        </Tooltip>
      )}
      <ShipmentModal
        shipModalVisible={shipModalVisible}
        orderId={orderDetail.id}
        onCancel={() => setShipModalVisible(false)}
      />
      <Modal
        title="提示"
        visible={completeModalVisible}
        onOk={() => setCompleteModalVisible(false)}
        onCancel={() => setCompleteModalVisible(false)}
      >
        <p>是否确定完成</p>
      </Modal>
    </div>
  );
};
export default OrderActions;
