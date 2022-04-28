import { Tabs } from "antd";
import React, { useState } from "react";
import { tabList } from "./modules/constants";
import { Picture, Graphic, Video, Voice } from "./components";
import { ContentContainer, SearchContainer } from "@/components/ui";
import "./index.less"

const PetOwnerList = () => {
  const [activeKey, setActiveKey] = useState("picture");

  return (
    <ContentContainer className="assetslist">
      <SearchContainer className="asset-tab-top">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
        >
          {tabList.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        {activeKey === "picture" ? <Picture /> : null}
        {activeKey === "graphic" ? <Graphic /> : null}
        {activeKey === "voice" ? <Voice /> : null}
        {activeKey === "video" ? <Video /> : null}
      </SearchContainer>
    </ContentContainer>
  );
};
export default PetOwnerList;
