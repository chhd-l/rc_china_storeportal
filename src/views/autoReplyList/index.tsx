import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { dataListSource } from "./modules/mockdata";
import { formItems } from "./modules/form";
import Search from "@/components/common/Search";
import { AutoReplies } from "@/framework/types/wechat";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";

const FanList = () => {
  const [autoReplies, setAutoReplies] = useState<AutoReplies[]>([]);

  useEffect(() => {
    setAutoReplies(Mock.mock(dataListSource).array);
  }, []);

  const getFanList = () => {};

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getFanList} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table autoReplies={autoReplies} />
      </TableContainer>
    </ContentContainer>
  );
};
export default FanList;
