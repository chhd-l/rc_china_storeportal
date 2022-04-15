import React, { useState } from "react";
import { Input, Switch } from "antd";

const OrderSetting = () => {
  const [autoCancel, setAutoCancel] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const [cancelHours, setCancelHours] = useState<number | string>(0.5);
  const [completeDays, setCompleteDays] = useState<number | string>(7);

  return (
    <div className="bg-gray1 p-4 h-full">
      <div className="bg-white p-4 text-left text-xl font-medium">
        Order Setting
      </div>
      <div className="bg-white p-4 mt-2">
        <div className="text-left font-medium">General order setting</div>
        <div className="p-4">
          <div className="border p-2 flex justify-between items-center mt-2">
            <span>
              After{" "}
              <Input
                type="number"
                value={cancelHours}
                onChange={(e) => {
                  setCancelHours(e.target.value);
                }}
                className="w-20"
              />{" "}
              hours,if the PO has not paid successfully,the order would be
              automatically cancelled
            </span>
            <Switch
              defaultChecked={autoCancel}
              onChange={() => {
                setAutoCancel(!autoCancel);
              }}
            />
          </div>
          <div className="border p-2 flex justify-between items-center mt-2">
            <span>
              After{" "}
              <Input
                type="number"
                value={completeDays}
                onChange={(e) => {
                  setCompleteDays(e.target.value);
                }}
                className="w-20"
              />{" "}
              days of the order status is shipped,the order would be
              automatically completed
            </span>
            <Switch
              defaultChecked={autoComplete}
              onChange={() => {
                setAutoComplete(!autoComplete);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSetting;
