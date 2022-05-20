import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import Mock from "mockjs";
import { replyContentsSource } from "@/views/replyContents/modules/mockdata";
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

  useEffect(() => {
    console.log('111sss')
    getReplyContents(1)
  }, []);

  const getReplyContents = async (current: number) => {
    const list = await getReplyContentList({
      offset: current * 10 - 10,
      limit: 10
    });
    setReplyContents(normaliseReplyContent(list.records));
  };

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getReplyContents} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table replyContents={replyContents} />
      </TableContainer>
    </ContentContainer>
  );
};
export default SelectContentModal;
