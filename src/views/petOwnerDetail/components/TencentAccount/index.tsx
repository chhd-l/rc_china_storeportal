import { Table } from "antd";
import React from "react";
import { TencentAccount } from "@/framework/types/customer";

interface TencentAccountProps {
  tencentAccountList: TencentAccount[];
  id: string;
}

const TencentAccounts = ({ tencentAccountList, id }: TencentAccountProps) => {
  const columns = [
    {
      title: "UnionId",
      dataIndex: "unionId",
      key: "unionId",
    },
    {
      title: "OpenId",
      dataIndex: "openId",
      key: "openId",
    },
    {
      title: "UserType",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Follow Status",
      dataIndex: "followStatus",
      key: "followStatus",
    },
    {
      title: "Followed Time",
      dataIndex: "followedTime",
      key: "followedTime",
    },
    {
      title: "Unfollowed Time",
      dataIndex: "unfollowedTime",
      key: "unfollowedTime",
    },
  ];

  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium mb-2">
        Tencent Account
      </div>
      <Table
        dataSource={tencentAccountList}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default TencentAccounts;
