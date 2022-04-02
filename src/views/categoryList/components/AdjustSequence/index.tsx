import "./index.less";
import { productItem } from "@/framework/types/shop";
import { dataSource } from "../../modules/mockdata";
import Mock from "mockjs";
import { DragSortTable, ProColumns } from "@/components/common/ProTable";

import { message } from "antd";
import { useState } from "react";
interface AdjustSequenceProps {
  productList: productItem[];
}

const columns: ProColumns<any>[] = [
  {
    title: "product Name",
    dataIndex: "productName",
  },
  {
    title: "MarketingPrice",
    dataIndex: "marketingPrice",
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
];
const AdjustSequence = ({ productList }: AdjustSequenceProps) => {
  const [dataSource, setDatasource] = useState(productList);
  const handleDragSortEnd = (newDataSource: any) => {
    console.log("排序后的数据", newDataSource);
    setDatasource(newDataSource);
    message.success("修改列表排序成功");
  };
  return (
    <div className="adjust-sequence">
      <DragSortTable
        headerTitle="拖拽排序(默认把手)"
        columns={columns}
        rowKey="key"
        pagination={false}
        dataSource={dataSource}
        dragSortKey="sort"
        onDragSortEnd={handleDragSortEnd}
      />
    </div>
  );
};

export default AdjustSequence;
