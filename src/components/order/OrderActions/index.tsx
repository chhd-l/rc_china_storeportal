import { Tooltip, Modal } from "antd";
import React, { useState } from "react";
import ShipmentModal from "../ShipmentModal";
import { useNavigate } from "react-router-dom";
import { Order } from "@/framework/types/order";
import { useLocation } from "react-router-dom";

enum ORDERSTATUS {
  TOSHIP = "toShip",
  SHIPPED = "shipped",
}

const OrderActions = ({ orderDetail }: { orderDetail: Order }) => {
  const [shipModalVisible, setShipModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();

  return (
    <div className="flex items-center">
      {location.pathname !== "/order-detail" && (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-Vector1 text-red-500"
            onClick={() => {
              navigator("/order-detail", {
                state: { id: orderDetail?.id },
              });
            }}
          />
        </Tooltip>
      )}
      {/*发货*/}
      {orderDetail?.tradeState?.orderState === ORDERSTATUS["TOSHIP"] && (
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
      {orderDetail?.tradeState?.orderState === ORDERSTATUS["SHIPPED"] && (
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
        orderId={orderDetail?.id}
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
