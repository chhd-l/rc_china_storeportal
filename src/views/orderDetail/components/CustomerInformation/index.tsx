import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";

const CustomerInformation = ({}) => {
  const navigation = useNavigate();
  return (
    <div className="bg-white mt-4 px-4 py-2 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center">
        <Avatar size="large" icon={<UserOutlined />} />
        <span className="ml-4">lihhhagh</span>
      </div>
      <Button
        type="primary"
        danger
        onClick={() => {
          navigation("/pet-owner-detail", { state: { id: "111" } });
        }}
      >
        Detail
      </Button>
    </div>
  );
};
export default CustomerInformation;
