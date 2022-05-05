import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { formItems } from "./modules/form";
import Search from "@/components/common/Search";
import { Fans } from "@/framework/types/wechat";
import { fansDetailListSource } from "@/views/fansDetail/modules/mockdata";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";
import { getFansList } from '@/framework/api/wechatSetting'

const FanList = () => {
  const [fanList, setFanList] = useState<Fans[]>([]);

  useEffect(() => {
    setFanList(Mock.mock(fansDetailListSource).array);
    getFanList()
  }, []);

  const getFanList = async () => {
    await getFansList({})
  };

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getFanList} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table fanList={fanList} />
      </TableContainer>
    </ContentContainer>
  );
};
export default FanList;
