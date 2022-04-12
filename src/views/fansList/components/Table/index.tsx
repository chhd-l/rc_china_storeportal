import { Button, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Fans } from "@/framework/types/wechat";

const Index = ({ fanList }: { fanList: Fans[] }) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Wechat Account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
    },
    {
      title: "Nickname",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Address",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Is Member",
      dataIndex: "isMember",
      key: "isMember",
      render: (text: any) => `${text ? "Yes" : "No"}`,
    },
    {
      title: "Follow Time",
      dataIndex: "followTime",
      key: "followTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "Action",
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-Vector1 text-red-500"
            onClick={() => {
              navigator("/fans-detail", { state: { id: record.id } });
            }}
          />
        </Tooltip>
      ),
    },
  ];

  const changeSelect = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
  };

  return (
    <div className="bg-white p-8">
      <div className="flex flex-row mb-4">
        <Button className="mr-4" onClick={() => {}}>
          Synchronize All Openid
        </Button>
        <Button className="mr-4" onClick={() => {}}>
          Synchronize All Fan Information
        </Button>
        <Button onClick={() => {}}>Partial sync</Button>
      </div>
      <Table
        rowSelection={{ onChange: changeSelect }}
        dataSource={fanList}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};
export default Index;
