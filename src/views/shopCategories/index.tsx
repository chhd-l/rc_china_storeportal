import { Button, Alert } from "antd";
import { Link } from "react-router-dom";
import { dataSource } from "./modules/mockdata";
import Mock from "mockjs";
import "./index.less";
import { Switch } from "antd";
import AddCate from "./components/AddCate";
import {
  EyeOutlined,
  SyncOutlined,
  SettingOutlined,
  InfoCircleTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import ProTable from "@/components/common/ProTable";
import type { ProColumns } from "@ant-design/pro-table";
import { CategoryBaseProps } from "@/framework/types/shop";
import { useState } from "react";
const ShopCategories = () => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const [addVisible, setAddvisible] = useState(false);
  const columns: ProColumns<CategoryBaseProps>[] = [
    {
      title: "Category Display Name",
      dataIndex: "displayName",
    },
    {
      title: "Created By",
      dataIndex: "createdUser",
    },
    {
      title: "Product(s)",
      dataIndex: "productNum",
    },
    {
      title: "Display On/Off",
      dataIndex: "isDispaly",
      render: (_, record) => (
        <Switch checked={record.isDispaly} onChange={onChange} />
      ),
    },
    {
      title: "操作",
      key: "option",
      width: 180,
      valueType: "option",
      render: (_, record) => [
        <a className="text-xl mr-4">+</a>,
        <a className=" mr-4">
          <SettingOutlined />
        </a>,
        <a className=" mr-4">
          <DeleteOutlined />
        </a>,
      ],
    },
  ];
  const handleAddCate = (visible: boolean) => {
    setAddvisible(visible);
  };
  return (
    <div className="shop-categories bg-gray-50 py-14 px-6 text-left">
      <div className="bg-white p-6 ">
        <div className="flex justify-between">
          <div>My Shop Categories</div>
          <div>
            <Button className=" mr-4" icon={<EyeOutlined />}>
              Preview
            </Button>
            <Button className=" mr-4" icon={<SyncOutlined />}>
              Adjust Sequence
            </Button>
            <Button
              className=" mr-4"
              onClick={() => {
                handleAddCate(true);
              }}
              type="primary"
            >
              + Add Category
            </Button>
          </div>
        </div>
        <Alert
          className="my-6"
          showIcon
          // icon={<InfoCircleTwoTone />}
          message="Your edits will be displayed in your Shop Page within 30 minutes"
          type="info"
        />
        <ProTable
          search={false}
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log("test sort", params, sorter, filter);
            return Promise.resolve({
              data: Mock.mock(dataSource).array,
              success: true,
            });
          }}
        />
      </div>
      <AddCate visible={addVisible} handleVisible={handleAddCate} />
    </div>
  );
};

export default ShopCategories;
