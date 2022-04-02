import "./index.less";
import { ProductItem } from "@/framework/types/product";
import { columnsAdjustSequence } from "../../modules/constant";
import Mock from "mockjs";
import { DragSortTable, ProColumns } from "@/components/common/ProTable";

import { message } from "antd";
import { useState } from "react";
interface AdjustSequenceProps {
  productList: ProductItem[];
}

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
        columns={columnsAdjustSequence}
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
