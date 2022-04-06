import { Steps } from "antd";
import OrderActions from "@/components/order/OrderActions";
import { Order } from "@/framework/types/order";
import { useEffect, useState } from "react";
import { KeyRules } from "@/framework/types/common";

const OrderStep: KeyRules = {
  unpaid: "0",
  toShip: "1",
  shipped: "2",
  completed: "3",
  cancellation: "4",
};

const OrderProgress = ({ orderDetail }: { orderDetail: Order }) => {
  const [currentStep, setCurrentStep] = useState(OrderStep["unpaid"]);

  useEffect(() => {
    if (orderDetail?.tradeState?.orderState) {
      setCurrentStep(OrderStep[orderDetail.tradeState.orderState]);
    }
  }, [orderDetail?.tradeState?.orderState]);

  return (
    <div className="bg-white py-2 px-4 ">
      <div className="flex flex-row justify-between">
        <div className="text-left flex flex-row">
          <span className="icon-Frame1 iconfont text-red-500" />
          <span className="ml-4">
            Order ID:{orderDetail?.id}
            <br />
            <span>Subscription ID:{orderDetail?.subscriptionId}</span>
          </span>
        </div>
        {orderDetail ? (
          <div className="justify-items-end">
            <OrderActions orderDetail={orderDetail} />
          </div>
        ) : null}
      </div>
      <div className="mt-4">
        <Steps progressDot current={Number(currentStep)}>
          <Steps.Step title="Unpaid" description="2021/05/23 13:23" />
          {orderDetail?.tradeState?.orderState === "cancellation" ? (
            <Steps.Step title="Cancellation" description="" />
          ) : (
            <>
              <Steps.Step title="To ship" description="" />
              <Steps.Step title="Shipped" description="" />
              <Steps.Step title="Completed" description="" />
            </>
          )}
        </Steps>
      </div>
    </div>
  );
};
export default OrderProgress;
