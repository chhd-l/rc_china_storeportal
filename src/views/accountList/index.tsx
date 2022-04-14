import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { dataSource } from "./modules/mockdata";
import Search from "@/components/common/Search";
import { Account } from "@/framework/types/wechat";
import { formItems } from "./modules/form";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";

const AccountList = () => {
  const [accountList, setAccountList] = useState<Account[]>([]);

  useEffect(() => {
    setAccountList(Mock.mock(dataSource).array);
  }, []);

  const getAccountList = () => {};

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getAccountList} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table accountList={accountList} />
      </TableContainer>
    </ContentContainer>
  );
};
export default AccountList;
