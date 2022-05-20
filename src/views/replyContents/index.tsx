import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import { ReplyContent } from "@/framework/types/wechat";
import { normaliseReplyContent } from "@/framework/normalize/wechatSetting";
import { getReplyContentList } from "@/framework/api/wechatSetting";
import { formItems } from "./modules/form";
import Table from "./components/Table";
import {
  ContentContainer,
  DivideArea,
  SearchContainer,
  TableContainer,
} from "@/components/ui";

const SelectContentModal = () => {
  const [replyContents, setReplyContents] = useState<ReplyContent[]>([]);
  const [pages, setPages] = useState<{page: number, limit: number, total: number}>({page: 1, limit: 10, total: 0});
  const [quneryParams, setQueryParams] = useState<any>({});

  useEffect(() => {
    getReplyContents(1, 10, {})
  }, []);

  const getReplyContents = async (current: number, limit: number, params: any) => {
    const list = await getReplyContentList({
      offset: current * limit - limit,
      limit: limit,
      sample: {
        responseDescribeFuzzy: params?.description ?? undefined,
        responseType: params?.type ?? undefined,
        isActive: params?.status ?? undefined
      }
    });
    setQueryParams(params);
    setPages(Object.assign({}, pages, { total: list?.total ?? 0 }));
    setReplyContents(normaliseReplyContent(list.records));
  };

  const handlePageChange = (current: number) => {
    setPages(Object.assign({}, pages, { page: current }));
    getReplyContents(current, pages.limit, quneryParams);
  }

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getReplyContents} formItems={formItems} pages={pages} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table replyContents={replyContents} onPageChange={handlePageChange} pages={pages} />
      </TableContainer>
    </ContentContainer>
  );
};
export default SelectContentModal;
