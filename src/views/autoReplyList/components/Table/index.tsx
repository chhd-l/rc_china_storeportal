import { Button, Switch, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AutoReplies } from "@/framework/types/wechat";

const Index = ({ autoReplies }: { autoReplies: AutoReplies[] }) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Account Principal",
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Match Type",
      dataIndex: "matchType",
      key: "matchType",
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
    },
    {
      title: "Response Type",
      dataIndex: "responseType",
      key: "responseType",
    },
    {
      title: "Response Description",
      dataIndex: "responseDes",
      key: "responseDes",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => <Switch checked={text} onChange={() => {}} />,
    },
    {
      title: "Action",
      key: "Action",
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Edit">
            <span
              className="cursor-pointer iconfont icon-a-Group437 text-red-500"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span
              className="cursor-pointer iconfont icon-Frame3 text-red-500 ml-2"
              onClick={() => {}}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white p-8">
      <div className="flex flex-row justify-end mb-4">
        <Button
          danger
          className="mr-4"
          onClick={() => {
            navigator("/add-auto-reply");
          }}
        >
          + Add
        </Button>
      </div>
      <Table dataSource={autoReplies} columns={columns} rowKey="id" />
    </div>
  );
};
export default Index;
