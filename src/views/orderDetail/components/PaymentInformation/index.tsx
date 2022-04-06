import React from "react";

const PaymentInformation = ({}) => {
  return (
    <div className="mt-4 bg-white px-4 py-2 flex justify-start flex-row">
      <span className="iconfont icon-Frame2 text-red-500" />
      <div className="ml-4 w-3/4">
        <div className="text-left">Payment</div>
        <div className="flex flex-row flex-wrap justify-start text-left text-gray-400">
          <div className="w-1/2">Payment method:Wechat payment</div>
          <div className="w-1/2">Appid:wxd6hjjjj</div>
          <div className="w-1/2">Payment time:2021/05/23 13:23</div>
          <div className="w-1/2">Out_trade_no:234239840928309482039</div>
        </div>
      </div>
    </div>
  );
};
export default PaymentInformation;
