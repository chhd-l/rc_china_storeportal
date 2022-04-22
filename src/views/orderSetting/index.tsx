import React, { useState } from "react";
import { Input, Switch } from "antd";
import { ContentContainer, InfoContainer, DivideArea } from "@/components/ui";

const OrderSetting = () => {
  const [autoCancel, setAutoCancel] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const [cancelHours, setCancelHours] = useState<number | string>(0.5);
  const [completeDays, setCompleteDays] = useState<number | string>(7);

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-xl font-medium"> Order Setting</div>
      </InfoContainer>
      <DivideArea />
      <InfoContainer>
        <div className="text-left font-medium">General order setting</div>
      </InfoContainer>
      <InfoContainer>
        <div className="border p-2 flex justify-between items-center">
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
            days of the order status is shipped,the order would be automatically
            completed
          </span>
          <Switch
            defaultChecked={autoComplete}
            onChange={() => {
              setAutoComplete(!autoComplete);
            }}
          />
        </div>
      </InfoContainer>
    </ContentContainer>
  );
};
export default OrderSetting;
