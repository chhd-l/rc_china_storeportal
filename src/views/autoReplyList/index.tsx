import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { dataListSource } from "./modules/mockdata";
import { formItems } from "./modules/form";
import Search from "@/components/common/Search";
import {AutoReplies} from "@/framework/types/wechat";

const FanList = () => {
  const [autoReplies, setAutoReplies] = useState<AutoReplies[]>([]);

  useEffect(() => {
    setAutoReplies(Mock.mock(dataListSource).array);
  }, []);

  const getFanList = () => {};

  return (
    <div className="bg-gray1 py-4 pl-4">
      <Search query={getFanList} formItems={formItems} />
      <Table autoReplies={autoReplies} />
    </div>
  );
};
export default FanList;
