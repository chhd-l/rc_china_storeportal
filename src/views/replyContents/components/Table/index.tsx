import { Button, Switch, Table, Tooltip } from "antd";
import React from "react";
import { ReplyContent } from "@/framework/types/wechat";
import { useNavigate } from "react-router-dom";

const column = [
  {
    title: "Reply Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Content description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text: any) => <Switch checked={text} onChange={() => { }} />,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text: any) => (
      <>
        <Tooltip title="Edit">
          <span
            className="cursor-pointer iconfont icon-a-Group437 text-red-500"
            onClick={() => { }}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <span
            className="cursor-pointer iconfont icon-delete text-red-500 ml-2"
            onClick={() => { }}
          />
        </Tooltip>
      </>
    ),
  },
];

const Index = ({ replyContents, onPageChange, pages }: { replyContents: ReplyContent[], onPageChange: Function, pages: any }) => {
  const navigator = useNavigate();
  return (
    <div className="pt-4">
      <div className="flex flex-row justify-end mb-4">
        <Button
          danger
          className="mr-4"
          onClick={() => {
            navigator("/reply/add-reply-content");
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        columns={column}
        dataSource={replyContents}
        rowKey="id"
        className="rc-table"
        pagination={{
          current: pages.page,
          total: pages.total,
          onChange: (page) => {
            onPageChange(page)
          }
        }}
      />
    </div>
  );
};
export default Index;
