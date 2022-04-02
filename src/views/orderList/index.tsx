import { Input, DatePicker, Button, Tabs, Select, Pagination } from "antd";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import OrderTable from "@/components/order/OrderTable";
import { Order } from "@/framework/types/order";
import { dataSource } from "./modules/mockdata";
import {
  orderStatusList,
  searchTypeList,
} from "@/components/order/OrderConstants";

interface SearchParamsProps {
  orderCreateDate: string;
  searchType: string;
  searchTypeValue: string;
}

const PetOwnerList = () => {
  const initSearchParams: SearchParamsProps = {
    orderCreateDate: "",
    searchType: "",
    searchTypeValue: "",
  };
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [searchParams, setSearchParams] =
    useState<SearchParamsProps>(initSearchParams);
  const [activeKey, setActiveKey] = useState("toShip");
  const [orderTotal, setOrderTotal] = useState(897);

  useEffect(() => {
    setOrderList(Mock.mock(dataSource).array);
    if (window.location.pathname.includes("shipment-list")) {
      setActiveKey("toShip");
      console.log(activeKey);
    }
  }, [activeKey]);

  const updateSearchParams = (value: any, name: string) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const getOrderList = () => {};

  return (
    <>
      <div className="bg-gray1 py-4 pl-4">
        <div className="bg-white pb-4 px-8">
          <Tabs defaultActiveKey={activeKey} onChange={() => {}}>
            {orderStatusList.map((item) => (
              <Tabs.TabPane tab={item.label} key={item.key} />
            ))}
          </Tabs>
          {/*search*/}
          <div className="mt-4 ">
            <div className="flex flex-row items-center justify-end">
              <div className="w-auto mr-3">Order Creation Date</div>
              <DatePicker
                style={{ width: "200px" }}
                onChange={(date, dateString) => {
                  updateSearchParams(dateString, "loginStartTime");
                }}
              />
              <Button className="ml-3">Export</Button>
            </div>
            <div className="flex flex-row items-center mt-3">
              <Input.Group compact>
                <Select
                  onChange={(value, a) => {
                    setSearchParams({ ...searchParams, searchType: value });
                  }}
                  getPopupContainer={(trigger: any) => trigger.parentNode}
                  value={searchParams.searchType}
                  style={{ width: "20%" }}
                >
                  {searchTypeList.map((item) => (
                    <Select.Option value={item.key}>{item.label}</Select.Option>
                  ))}
                </Select>
                <Input
                  style={{ width: "80%" }}
                  value={searchParams.searchTypeValue}
                  onChange={(e) => {
                    setSearchParams({
                      ...searchParams,
                      searchTypeValue: e.target.value,
                    });
                  }}
                />
              </Input.Group>
              <Button
                className="w-32 mx-3"
                type="primary"
                danger
                onClick={() => getOrderList()}
              >
                Search
              </Button>
              <Button
                className="w-32"
                danger
                onClick={(e) => {
                  setSearchParams(initSearchParams);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
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
