import { Link } from "react-router-dom";
import { Button } from "antd";
import ProTable from "@/components/common/ProTable";
import { useState } from "react";
import { dataSource } from "./modules/mockdata";
import Mock from "mockjs";
import { LISTTAB } from "@/framework/enum/product";
import type { productBase } from "@/framework/types/product";
import SearchHeader from "./components/SearchHeader";
import RenderBadge from "./components/RenderBadge";
import { OptionsProps } from "@/framework/types/common";
import { columns } from "./modules/tablecolums";
const ProductList = () => {
  const [activeKey, setActiveKey] = useState<React.Key>(LISTTAB["ALL"]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([""]);
  const onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const toolbarList: OptionsProps[] = [
    {
      name: "ALL",
      value: "11",
    },
    {
      name: "LIVE",
      value: "1",
    },
    {
      name: "SOLDOUT",
      value: "3",
    },
    {
      name: "DISABLED",
      value: "8",
    },
  ];
  const getFormData = (data: any) => {
    console.info(data, "data");
  };
  return (
    <div className="bg-gray-50 py-14 px-6 text-left">
      <SearchHeader getFormData={getFormData} />
      <ProTable
        columns={columns}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, sorter, filter);
          return Promise.resolve({
            data: Mock.mock(dataSource).array,
            success: true,
          });
        }}
        toolbar={{
          menu: {
            type: "tab",
            activeKey: activeKey,
            items: toolbarList.map((el: any) => {
              let toolbar = {
                key: el.name,
                label: (
                  <span>
                    {el.name}
                    <RenderBadge
                      count={el.value}
                      active={activeKey === el.name}
                    />
                  </span>
                ),
              };
              return toolbar;
            }),
            onChange: (key) => {
              setActiveKey(key as string);
            },
          },
          actions: [
            <Link to="/product/add">
              <Button type="primary">Add a New Product</Button>
            </Link>,
            <Button>Export</Button>,
          ],
        }}
        tableAlertRender={() => false}
        rowKey={(record) => record.key}
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        className="pt-4 bg-white"
        dateFormatter="string"
        options={{
          setting: {
            draggable: true,
            checkable: true,
            checkedReset: false,
            extra: [<a>确认</a>],
          },
        }}
      />
      <div className="bg-white flex justify-between py-4">
        <div></div>
        <div>
          <span className="mr-4">4 products selected</span>
          <Button className="mr-4">Delete</Button>
          <Button className="mr-4">Delist</Button>
          <Button className="mr-4" type="primary">
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
