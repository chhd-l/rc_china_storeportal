import React, { useState } from "react";
import { Divider, Switch } from "antd";
import Modal from "./components/Modal";
import { ContentContainer, InfoContainer } from "@/components/ui";
import "./index.less"

const ShippingSetting = () => {
  const [enableExpress, setEnableExpress] = useState(false);
  const [shipModalVisible, setShipModalVisible] = useState(false);

  return (
    <ContentContainer>
      <div className="shipping-setting">
        <div>
          <div className="title bg-white px-6 py-6">Shipping Setting</div>
          <Divider className="line" />
        </div>
        <InfoContainer>
          <div className="border p-4 flex justify-between items-center content">
            <span>Express 100</span>
            <div className="flex items-center">
              <Switch
                defaultChecked={enableExpress}
                onChange={() => {
                  setEnableExpress(!enableExpress);
                }}
              />
              {/* {enableExpress && ( */}
              <span
                className="iconfont icon-a-Group437 primary-color ml-4 edit"
                onClick={() => {
                  setShipModalVisible(true);
                }}
              />
              {/* )} */}
            </div>
          </div>
        </InfoContainer>
        <Modal
          shipModalVisible={shipModalVisible}
          onCancel={() => {
            setShipModalVisible(false);
          }}
        />
      </div>
    </ContentContainer>
  );
};
export default ShippingSetting;
