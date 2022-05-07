import Table from "./components/Table";
import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import { Account } from "@/framework/types/wechat";
import { formItems } from "./modules/form";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";
import { getAccountList } from '@/framework/api/wechatSetting'
// import Mock from "mockjs";
// import { dataSource } from "./modules/mockdata";

const AccountList = () => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [pages, setPages] = useState({
    page: 1,
    limit: 10,
    total: 10,
  });

  useEffect(() => {
    // setAccountList(Mock.mock(dataSource).array);
    getAccounts()
  }, []);

  const getAccounts= async (items = {}) => {
    let res = await getAccountList(items);
    setAccountList(res)
  };

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getAccounts} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table getAccounts={getAccounts} accountList={accountList} pages={pages} setPages={setPages} />
      </TableContainer>
    </ContentContainer>
  );
};
export default AccountList;
