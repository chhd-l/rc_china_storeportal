import { Button, Switch, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Account } from "@/framework/types/wechat";

const Index = ({ accountList }: { accountList: Account[] }) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Account Principal",
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Account Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Account Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Official Account Type",
      dataIndex: "officialType",
      key: "officialType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any) => (
        <Switch checked={text} onChange={() => changeAccountStatus()} />
      ),
    },
    {
      title: "Options",
      key: "Options",
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Edit">
            <span
              className="cursor-pointer iconfont icon-a-Group437 text-red-500 text-base"
              onClick={() => { }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-Frame3 text-red-500 text-xl"
              onClick={() => { }}
            />
          </Tooltip>
          <Tooltip title="View QR Code">
            <span
              className="cursor-pointer ml-2 iconfont icon-Frame-1 text-red-500 text-xl"
              onClick={() => { }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const changeAccountStatus = () => { };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          danger
          onClick={() => {
            navigator("/account/add-account");
          }}
        >
          + Add Account
        </Button>
      </div>
      <Table
        dataSource={accountList}
        columns={columns}
        rowKey="id"
        className="rc-table"
      />
    </>
  );
};

export default Index;
