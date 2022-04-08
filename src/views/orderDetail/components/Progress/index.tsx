import { Steps } from "antd";
import OrderActions from "@/components/order/OrderActions";
import React, { useEffect, useState } from "react";
import { OrderStatus } from "@/framework/types/order";
import { stepList } from "../../modules/constants";

const OrderProgress = ({
  orderState,
  orderId,
  subscriptionId,
}: {
  orderState: string;
  orderId: string;
  subscriptionId: string|undefined;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [filterSteps, setFilterSteps] = useState(stepList);

  useEffect(() => {
    if (orderState === OrderStatus.Cancellation) {
      setFilterSteps(
        stepList.filter(
          (el) =>
            el.key === OrderStatus.Unpaid ||
            el.key === OrderStatus.Cancellation
        )
      );
    } else {
      setFilterSteps(
        stepList.filter((el) => el.key !== OrderStatus.Cancellation)
      );
    }
  }, [orderState]);

  useEffect(() => {
    filterSteps.map((el, i) => {
      if (orderState === el.key) {
        setCurrentStep(i);
      }
    });
  }, [filterSteps, orderState]);

  return (
    <div className="bg-white py-2 px-4 ">
      <div className="flex flex-row justify-between">
        <div className="text-left flex flex-row">
          <span className="icon-Frame1 iconfont text-red-500" />
          <span className="ml-4">
            Order ID:{orderId}
            <br />
            <span>Subscription ID:{subscriptionId}</span>
          </span>
        </div>
        <div className="justify-items-end">
          <OrderActions orderState={orderState} orderId={orderId} />
        </div>
      </div>
      <div className="mt-4">
        <Steps progressDot current={currentStep}>
          {filterSteps.map((el) => (
            <Steps.Step
              title={el.label}
              description={el.updateTime}
              key={el.key}
            />
          ))}
        </Steps>
      </div>
    </div>
  );
};
export default OrderProgress;
