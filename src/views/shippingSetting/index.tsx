import React, { useState } from "react";
import { Divider, Switch } from "antd";
import ShippingSettingModal from "./components/ShippingSettingModal";

const ShippingSetting = () => {
  const [enableExpress, setEnableExpress] = useState(false);
  const [shipModalVisible, setShipModalVisible] = useState(false);

  return (
    <div className="bg-gray1 p-4 h-full">
      <div className="bg-white h-full p-2">
        <div className="text-left text-xl font-medium">Shipping Setting</div>
        <Divider />
        <div className="border p-2 flex justify-between items-center">
          <span>Express 100</span>
          <div className="flex items-center">
            <Switch
              defaultChecked={enableExpress}
              onChange={() => {
                setEnableExpress(!enableExpress);
              }}
            />
            {enableExpress && (
              <span
                className="iconfont icon-a-Group437 text-red-500 ml-4"
                onClick={() => {
                  setShipModalVisible(true);
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ShippingSettingModal
        shipModalVisible={shipModalVisible}
        onCancel={() => {
          setShipModalVisible(false);
        }}
      />
    </div>
  );
};
export default ShippingSetting;
