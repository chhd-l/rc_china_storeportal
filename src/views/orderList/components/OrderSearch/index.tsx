import { Button, DatePicker, Input, Select } from "antd";
import React, { useState } from "react";
import { searchTypeList } from "@/lib/order-constants";

interface SearchParamsProps {
  orderCreateDate: string;
  searchType: string;
  searchTypeValue: string;
}

const OrderSearch = ({ getOrderList }: { getOrderList: Function }) => {
  const initSearchParams: SearchParamsProps = {
    orderCreateDate: "",
    searchType: "orderId",
    searchTypeValue: "",
  };
  const [searchParams, setSearchParams] =
    useState<SearchParamsProps>(initSearchParams);

  const updateSearchParams = (value: any, name: string) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  return (
    <div className="mt-4">
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
  );
};

export default OrderSearch;
