import Table from "./components/Table";
import React, { useEffect, useState } from "react";
import { formItems } from "./modules/form";
import Search from "./components/search";
import { Fans } from "@/framework/types/wechat";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";
import { getFansList } from '@/framework/api/wechatSetting'
import "./index.less"
// import Mock from "mockjs";
// import { fansDetailListSource } from "@/views/fansDetail/modules/mockdata";

const FanList = () => {
  const [fanList, setFanList] = useState<Fans[]>([]);
  const [params, setParams] = useState<Fans[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // setFanList(Mock.mock(fansDetailListSource).array);
    getFanList()
  }, []);
  const getParams = async(params:any) => {
    setParams(params)
    getFanList(0,10,params)
    setPages({
      page: 1,
      limit: 10,
    })
  }
  const getFanList = async (offset = pages.page, limit = pages.limit, item = {}) => {
    console.log(item,999999)
    let val: {
    offset: number
    limit: number
    isNeedTotal: boolean
    accountId: string
    sample?: any
   } =  {
    offset: (offset - 1) * 10,
    limit,
    isNeedTotal: true,
    accountId: '000001'
   }
    if(item==='page'){
      if(JSON.stringify(params) !== '{}') {
        val.sample = params
      }
    } else {
      if(JSON.stringify(item) !== '{}') {
        val.sample = item
      }
    }
   setLoading(true);
   let res = await getFansList(val)
   setFanList(res?.records || [])
   setTotal(res?.total || 10)
   setLoading(false);
  };

  return (
    <ContentContainer className="fans-list">
      <SearchContainer>
        <Search query={getFanList} formItems={formItems} data={getParams}/>
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table pages={pages} setPages={setPages} fanList={fanList} getFanList={getFanList} total={total} loading={loading} setLoading={setLoading} />
      </TableContainer>
    </ContentContainer>
  );
};
export default FanList;
