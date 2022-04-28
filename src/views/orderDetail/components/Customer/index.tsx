import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";
import { Customer } from "@/framework/types/customer";

const CustomerInformation = ({ buyer }: { buyer: Customer | any }) => {
  const navigation = useNavigate();
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <Avatar size="large" icon={<UserOutlined />} />
        <span className="ml-4">{buyer.name}</span>
      </div>
      <Button
        type="primary"
        danger
        onClick={() => {
          navigation("/petOwner/pet-owner-detail", { state: { id: buyer.id } });
        }}
      >
        Detail
      </Button>
    </div>
  );
};
export default CustomerInformation;
