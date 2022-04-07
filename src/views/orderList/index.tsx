import { Tabs, Pagination } from "antd";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import OrderTable from "@/components/order/OrderTable";
import { Order } from "@/framework/types/order";
import { dataSource } from "./modules/mockdata";
import { tabList } from "./modules/constants";
import { useLocation } from "react-router-dom";
import Search from "./components/Search";

const PetOwnerList = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [activeKey, setActiveKey] = useState("");
  const [orderTotal, setOrderTotal] = useState(897);
  const location = useLocation();

  useEffect(() => {
    setOrderList(Mock.mock(dataSource).array);
    console.log(location);
    if (location.pathname === "/shipment-list") {
      setActiveKey("toShip");
    } else {
      setActiveKey("");
    }
  }, [location.pathname]);

  const getOrderList = () => {};

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
          {/*search*/}
          <Search getOrderList={getOrderList} />
          <div className="mt-4 text-left text-xl font-bold">
            {orderTotal} Orders
          </div>
          <div className="mt-4  text-left">
            <OrderTable orderList={orderList} />
          </div>
          <div className="text-right pt-4">
            <Pagination defaultCurrent={1} total={50} showSizeChanger={true} />
          </div>
        </div>
      </div>
    </>
  );
};
export default PetOwnerList;
