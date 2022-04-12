import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { dataSource } from "./modules/mockdata";
import Search from "@/components/common/Search";
import { Account } from "@/framework/types/wechat";
import { formItems } from "./modules/form";

const AccountList = () => {
  const [accountList, setAccountList] = useState<Account[]>([]);

  useEffect(() => {
    setAccountList(Mock.mock(dataSource).array);
  }, []);

  const getAccountList = () => {};

  return (
    <>
      <div className="bg-gray1 py-4 pl-4">
        <Search query={getAccountList} formItems={formItems} />
        <div className="bg-white p-8">
          <Table accountList={accountList} />
        </div>
      </div>
    </>
  );
};
export default AccountList;
