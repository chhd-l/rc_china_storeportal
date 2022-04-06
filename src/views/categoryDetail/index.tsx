import "./index.less";
import { Button, Switch, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { dataSource } from "./modules/mockdata";
import Mock from "mockjs";
import ProTable from "@/components/common/ProTable";
import { useState } from "react";
import { columns } from "./modules/constant";
import { CategoryProductProps } from "@/framework/types/product";
const detailData = Mock.mock(dataSource);

const CategoryDetail = () => {
  const hanleChangeVisble = (visible: boolean) => {
    console.info(visible);
  };
  const [cateInfos, setCateInfos] = useState<CategoryProductProps>(
    detailData.cateInfos
  );
  console.info("cateInfos", cateInfos);
  return (
    <div className="category-detail  bg-gray-50 py-14 px-20 text-left">
      <div className="bg-white mb-8 px-6 py-4">
        <div className="flex justify-between">
          <div className="font-bold text-lg">
            {cateInfos.displayName} <EditOutlined />
          </div>
          <div>
            Activate the category make it visible
            <Switch
              className="ml-3"
              defaultChecked
              onChange={hanleChangeVisble}
            />
          </div>
        </div>
        <div className="text-gray-400 mt-4">
          Created By:{" "}
          <span className="text-black mx-2">
            {cateInfos.createdUser} | {cateInfos.type}
          </span>{" "}
          Product(s):{cateInfos.productNum}
        </div>
      </div>
      <div className="bg-white px-6 py-4">
        <div className="flex justify-between">
          <div>
            <div>Product List</div>
            <div className="text-gray-400 py-2">
              If your products meet the filtering rule criteria,they will
              automatically be added into your shop category
            </div>
            <div>
              Set Filtering Rules:
              {cateInfos.rules.map((el) => (
                <Tag className="ml-2">{el.name}</Tag>
              ))}
            </div>
          </div>
          <Button type="primary" icon={<EditOutlined />}>
            Edit Filtering Rules
          </Button>
        </div>
        <ProTable
          columns={columns}
          search={false}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.info("cateInfos.productList", cateInfos.productList);
            console.log("test sort", params, sorter, filter);
            return Promise.resolve({
              data: cateInfos.productList,
              success: true,
            });
          }}
        />
      </div>
    </div>
  );
};

export default CategoryDetail;
