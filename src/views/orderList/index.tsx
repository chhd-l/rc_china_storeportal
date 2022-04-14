import { Tabs, Pagination } from "antd";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import OrderTable from "@/components/order/OrderTable";
import { Order } from "@/framework/types/order";
import { orderListSource } from "@/views/orderDetail/modules/mockdata";
import { tabList } from "./modules/constants";
import { useLocation } from "react-router-dom";
import Search from "./components/Search";
import { OrderStatus } from "@/framework/types/order";

const PetOwnerList = () => {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [activeKey, setActiveKey] = useState("");
  const [orderTotal, setOrderTotal] = useState(897);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/shipment-list") {
      setActiveKey(OrderStatus.Toship);
    } else {
      setActiveKey("");
    }
  }, [location.pathname]);

  useEffect(() => {
    setOrderList(Mock.mock(orderListSource(activeKey)).array);
  }, [activeKey]);

  const getOrderList = () => {};

  return (
    <>
      <div className="bg-gray1 p-4">
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
          <Search query={getOrderList} />
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
