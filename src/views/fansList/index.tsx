import Table from "./components/Table";
import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { formItems } from "./modules/form";
import Search from "@/components/common/Search";
import { Fans } from "@/framework/types/wechat";
import { fansDetailListSource } from "@/views/fansDetail/modules/mockdata";

const FanList = () => {
  const [fanList, setFanList] = useState<Fans[]>([]);

  useEffect(() => {
    setFanList(Mock.mock(fansDetailListSource).array);
  }, []);

  const getFanList = () => {};

  return (
    <div className="bg-gray1 py-4 pl-4">
      <Search query={getFanList} formItems={formItems} />
      <Table fanList={fanList} />
    </div>
  );
};
export default FanList;
