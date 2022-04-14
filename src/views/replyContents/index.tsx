import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import Mock from "mockjs";
import { replyContentsSource } from "@/views/replyContents/modules/mockdata";
import { ReplyContent } from "@/framework/types/wechat";
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
    setReplyContents(Mock.mock(replyContentsSource).array);
  }, []);

  const getReplyContents = () => {};

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
