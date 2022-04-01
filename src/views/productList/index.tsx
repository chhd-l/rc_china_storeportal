import { Link } from "react-router-dom";
import { Button, Badge } from "antd";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@/components/common/ProTable";
import { useEffect, useState } from "react";
import { dataSource } from "./modules/mockdata";
import Mock from "mockjs";
import type { productBase } from "@/framework/types/product";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import SearchHeader from "./components/SearchHeader";

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginTop: -2,
        marginLeft: 4,
        color: active ? "#1890FF" : "#999",
        backgroundColor: active ? "#E6F7FF" : "#eee",
      }}
    />
  );
};
const ProductList = () => {
  const [activeKey, setActiveKey] = useState<React.Key>("tab1");
  const [selectedRowKeys, setSelectedRowKeys] = useState([""]);
  const onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  // const handleChange = (value: any) => {
  //   console.log('vale', value)
  // }
  const columns: ProColumns<productBase>[] = [
    {
      title: "Product Name",
      dataIndex: "name",
      // render: (_) => {_},
    },
    {
      title: "SKU",
      dataIndex: "skuId",
    },
    {
      title: "Varitions",
      dataIndex: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "left",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      width: 140,
      key: "since",
      dataIndex: "stock",
      valueType: "date",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "操作",
      key: "option",
      width: 180,
      valueType: "option",
      render: (_, record) => [
        <a>
          <EyeOutlined />
        </a>,
        <Link to={`/product/${record.id}`}>
          <EditOutlined />
        </Link>,
        <a>
          <DownloadOutlined />
        </a>,
        <a>
          <DeleteOutlined />
        </a>,
      ],
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
          console.log(params, sorter, filter);
          return Promise.resolve({
            data: Mock.mock(dataSource).array,
            success: true,
          });
        }}
        toolbar={{
          menu: {
            type: "tab",
            activeKey: activeKey,
            items: [
              {
                key: "tab1",
                label: <span>All{renderBadge(99, activeKey === "tab1")}</span>,
              },
              {
                key: "tab2",
                label: <span>Live{renderBadge(30, activeKey === "tab2")}</span>,
              },
              {
                key: "tab3",
                label: (
                  <span>Sold out{renderBadge(30, activeKey === "tab3")}</span>
                ),
              },
              {
                key: "tab4",
                label: (
                  <span>Disabled{renderBadge(30, activeKey === "tab4")}</span>
                ),
              },
            ],
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
