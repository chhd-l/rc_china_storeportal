import React from "react";
import { PayInfo } from "@/framework/types/order";

const PaymentInformation = ({ payInfo }: { payInfo: PayInfo | any }) => {
  const { payTypeName, payWayCode, payTime, payWayOrderID } = payInfo;

  return (
    <div className="flex justify-start flex-row">
      <span className="iconfont icon-Frame2 primary-color" />
      <div className="ml-4 w-3/4">
        <div className="text-left text-base">Payment</div>
        {payTypeName ? (
          <div className="flex flex-row flex-wrap justify-start text-left text-gray-400">
            <div className="w-1/2">Payment method:{payTypeName}</div>
            <div className="w-1/2">payWayCode:{payWayCode}</div>
            <div className="w-1/2">Payment time:{payTime}</div>
            <div className="w-1/2">payWayOrderId:{payWayOrderID}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default PaymentInformation;
