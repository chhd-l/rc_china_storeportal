import React, { useState } from "react";
import { Divider, Switch } from "antd";
import Modal from "./components/Modal";
import { ContentContainer, InfoContainer } from "@/components/ui";

const ShippingSetting = () => {
  const [enableExpress, setEnableExpress] = useState(false);
  const [shipModalVisible, setShipModalVisible] = useState(false);

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-xl font-medium">Shipping Setting</div>
        <Divider />
        <div className="border p-4 flex justify-between items-center">
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
      </InfoContainer>
      <Modal
        shipModalVisible={shipModalVisible}
        onCancel={() => {
          setShipModalVisible(false);
        }}
      />
    </ContentContainer>
  );
};
export default ShippingSetting;
