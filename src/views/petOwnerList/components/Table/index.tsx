import { Avatar, Table, Tooltip } from "antd";
import { UserOutlined, EyeOutlined } from "@ant-design/icons";
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
            className="cursor-pointer"
            onClick={() => {
              navigator("/pet-owner-detail", { state: { id: record.id } });
            }}
          >
            <EyeOutlined
              style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
            />
          </span>
        </Tooltip>
      ),
    },
  ];
  return <Table dataSource={petOwnerList} columns={columns} rowKey='id'/>;
};

export default Index;
