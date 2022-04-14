import { Avatar, Table, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Customer } from "@/framework/types/customer";

interface PetOwnerTableProps {
  petOwnerList: Customer[];
}

const Index = ({ petOwnerList }: PetOwnerTableProps) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Profile Photo",
      dataIndex: "img",
      key: "img",
      render: (text: any, record: any) => (
        <Avatar size="large" icon={<UserOutlined />} />
      ),
    },
    {
      title: "WeChat Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Options",
      key: "Options",
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-Vector1 text-red-500"
            onClick={() => {
              navigator("/pet-owner-detail", { state: { id: record.id } });
            }}
          />
        </Tooltip>
      ),
    },
  ];
  return (
    <Table
      dataSource={petOwnerList}
      columns={columns}
      rowKey="id"
      className="rc-table"
    />
  );
};

export default Index;
