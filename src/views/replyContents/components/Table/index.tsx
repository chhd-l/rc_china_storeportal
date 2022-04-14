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
    render: (text: any) => <Switch checked={text} onChange={() => {}} />,
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

const Index = ({ replyContents }: { replyContents: ReplyContent[] }) => {
  const navigator = useNavigate();
  return (
    <div>
      <div className="flex flex-row justify-end mb-4">
        <Button
          danger
          className="mr-4"
          onClick={() => {
            navigator("/add-reply-content");
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        columns={column}
        dataSource={replyContents}
        rowKey={"id"}
        className="rc-table"
      />
    </div>
  );
};
export default Index;
