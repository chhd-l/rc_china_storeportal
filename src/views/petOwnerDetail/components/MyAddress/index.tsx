import { Table } from "antd";
import { StarFilled } from "@ant-design/icons";
import React from "react";

const MyAddress = ({ addressList,id }: any) => {
  const columns = [
    {
      title: "No.",
      dataIndex: "unionId",
      key: "unionId",
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode",
      key: "postalCode",
    },
    {
      title: "Default",
      dataIndex: "isDefault",
      key: "isDefault",
      render: (text: any, record: any) =>
        text === 1 ? (
          <StarFilled
            style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
          />
        ) : null,
    },
  ];
  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">My Address</div>
      <div className="py-4">
        <Table dataSource={addressList} columns={columns} pagination={false} />
      </div>
    </div>
  );
};
export default MyAddress;
