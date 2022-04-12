import { Button, Input, Select } from "antd";
import React, { useState } from "react";

interface SearchParamsProps {
  name: string;
  type: string;
  status: string;
}

const AccountSearch = ({ query }: { query: Function }) => {
  const initSearchParams: SearchParamsProps = {
    name: "",
    type: "",
    status: "",
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
    <div className="p-8 mb-2 bg-white">
      <div className="flex flex-row justify-start">
        <div className="flex flex-row items-center">
          <div className="w-auto mr-2">Account Name</div>
          <Input
            style={{ width: "300px" }}
            placeholder="Input"
            value={searchParams.name}
            onChange={(e) => {
              updateSearchParams(e.target.value, "name");
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="w-auto mr-2 ml-4">Official Account Type</div>
          <Select
            style={{ width: "300px" }}
            placeholder="Select"
            value={searchParams.type}
            onChange={(e) => {
              updateSearchParams(e, "phone");
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 ml-4">Status</div>
          <Select
            style={{ width: "300px" }}
            placeholder="Select"
            value={searchParams.status}
            onChange={(e) => {
              updateSearchParams(e, "status");
            }}
          />
        </div>
      </div>
      <div className="mt-5 flex">
        <Button
          className="w-20 mr-8"
          type="primary"
          danger
          onClick={() => query()}
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
  );
};

export default AccountSearch;
