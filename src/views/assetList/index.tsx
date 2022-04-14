import { Tabs } from "antd";
import React, { useState } from "react";
import { tabList } from "./modules/constants";
import { Picture, Graphic, Video, Voice } from "./components";

const PetOwnerList = () => {
  const [activeKey, setActiveKey] = useState("picture");

  return (
    <>
      <div className="bg-gray1 py-4 pl-4">
        <div className="bg-white pb-4 px-8">
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
        </div>
      </div>
    </>
  );
};
export default PetOwnerList;
