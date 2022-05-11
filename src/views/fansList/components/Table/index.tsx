import { Button, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Fans } from "@/framework/types/wechat";
import { handleReturnTime } from "@/utils/utils";
import { syncFans } from "@/framework/api/wechatSetting";

const Index = ({ fanList, pages, setPages, getFanList, total }: { 
  fanList: Fans[],
  pages: any,
  setPages: Function,
  getFanList: Function,
  total: number
 }) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Wechat Account",
      dataIndex: "accountId",
      key: "accountId",
    },
    {
      title: "Avatar",
      dataIndex: "headimgurl",
      key: "headimgurl",
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "name",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      render: (sex: string) => sex === '0' ? 'Male' : 'Female'
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
      // align:"center"
    },
    {
      title: "Follow Time",
      dataIndex: "subscribeTime",
      key: "subscribeTime",
      render: (text: any) => handleReturnTime(text)
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => 'Normal'
    },
    {
      title: "Action",
      key: "Action",
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-kjafg primary-color"
            onClick={() => {
              navigator("/fans/fans-detail", { state: record });
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
    <div>
      <div className="flex flex-row mb-4 pt-6">
        {/* <Button className="mr-4" onClick={() => { }}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Synchronize All Openid
        </Button> */}
        <Button className="mr-4" onClick={() => syncFans()}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Synchronize All Fan Information
        </Button>
        <Button onClick={() => { }}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Partial sync
        </Button>
      </div>
      <Table
        rowSelection={{ onChange: changeSelect }}
        dataSource={fanList}
        columns={columns}
        rowKey="id"
        className="rc-table"
        pagination={{
          current: pages.page,
          pageSize: pages.limit,
          total: total,
          onChange: (page, pageSize) => {
            setPages({
              page,
              limit: pageSize,
            })
            getFanList(page, pageSize)
          }
        }}
      />
    </div>
  );
};
export default Index;
