import { Button, Switch, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { AutoReplies } from "@/framework/types/wechat";

const Index = ({
  autoReplies,
  pages,
  loading,
  onPageChange
}: {
  autoReplies: AutoReplies[]
  pages: { page: number, limit: number, total: number }
  loading: boolean
  onPageChange: Function
}) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Official Name",
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
      render: (text: any) => <Switch checked={text} onChange={() => { }} />,
    },
    {
      title: "Action",
      key: "Action",
      render: (text: any, record: any) => (
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

  return (
    <div className="pt-4">
      <div className="flex flex-row justify-end mb-4">
        <Button
          type="primary"
          danger
          className="mr-4"
          onClick={() => {
            navigator("/auto-reply/add-auto-reply");
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        dataSource={autoReplies}
        columns={columns}
        loading={loading}
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
