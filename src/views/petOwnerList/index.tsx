import { Input, DatePicker, Button } from "antd";
import PetOwnerListTable from "./components/PetOwnerListTable";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { PHONEREGCONST } from "@/lib/constants";

const dataSource = {
  "array|6": [
    {
      id: "@id",
      img: Mock.Random.image(),
      name: "@cname",
      phone: PHONEREGCONST,
    },
  ],
};

const PetOwnerList = () => {
  const initSearchParams = {
    name: "",
    phone: "",
    loginStartTime: "",
    loginEndTime: "",
  };
  const [petOwnerList, setPetOwnerList] = useState([]);
  const [searchParams, setSearchParams] = useState(initSearchParams);

  useEffect(() => {
    setPetOwnerList(Mock.mock(dataSource).array);
  }, []);

  const updateSearchParams = (value: any, name: any) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const getPetOwnerList = () => {};

  return (
    <>
      <div className="bg-gray1 py-4 pl-4">
        <div className="bg-white">
          <div className="p-2 pb-4 text-xl font-medium text-left border-b">
            <span className="pl-4">My Pet Owner</span>
          </div>
          {/*search*/}
          <div className="mt-8 px-8">
            <div className="flex flex-row justify-start">
              <div className="flex flex-row items-center">
                <div className="w-auto mr-2">WeChat Name:</div>
                <Input
                  style={{ width: "200px" }}
                  placeholder="Enter WeChat name"
                  value={searchParams.name}
                  onChange={(e) => {
                    updateSearchParams(e.target.value, "name");
                  }}
                />
              </div>
              <div className="flex flex-row items-center">
                <div className="w-auto mr-2 ml-4">Phone Number:</div>
                <Input
                  style={{ width: "200px" }}
                  placeholder="Enter phone number"
                  value={searchParams.phone}
                  onChange={(e) => {
                    updateSearchParams(e.target.value, "phone");
                  }}
                />
              </div>
              <div className="flex flex-row items-center">
                <div className="mr-2 ml-4">Login Time:</div>
                <DatePicker
                  style={{ width: "200px" }}
                  onChange={(date, dateString) => {
                    updateSearchParams(dateString, "loginStartTime");
                  }}
                />
              </div>
              <div className="flex flex-row items-center">
                <div className="mr-2 ml-4">To:</div>
                <DatePicker
                  style={{ width: "200px" }}
                  onChange={(date, dateString) => {
                    updateSearchParams(dateString, "loginEndTime");
                  }}
                />
              </div>
            </div>
            <div className="mt-5 flex">
              <Button
                className="w-20 mr-8"
                type="primary"
                danger
                onClick={() => getPetOwnerList()}
              >
                Search
              </Button>
              <Button
                className="w-20"
                danger
                onClick={(e) => {
                  setSearchParams(initSearchParams);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="p-8">
            <PetOwnerListTable petOwnerList={petOwnerList} />
          </div>
        </div>
      </div>
    </>
  );
};
export default PetOwnerList;
