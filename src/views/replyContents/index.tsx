import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import Mock from "mockjs";
import { dataListSource } from "@/views/addAutoReply/modules/mockdata";
import { ReplyContent } from "@/framework/types/wechat";
import { formItems } from "./modules/form";
import Table from "./components/Table";

const SelectContentModal = () => {
  const [replyContents, setReplyContents] = useState<ReplyContent[]>([]);

  useEffect(() => {
    setReplyContents(Mock.mock(dataListSource).array);
  }, []);

  const getReplyContents = () => {};

  return (
    <div className="bg-gray-50 p-4">
      <Search query={getReplyContents} formItems={formItems} />
      <Table replyContents={replyContents} />
    </div>
  );
};
export default SelectContentModal;
