import { Table } from "antd";
import { StarFilled } from "@ant-design/icons";
import React from "react";
import { Address } from "@/framework/types/customer";

interface AddressInfoProps {
  addressList: Address[];
  id: string;
}

const MyAddress = ({ addressList, id }: AddressInfoProps) => {
  const columns = [
    {
      title: "No.",
      key: "no",
      render: (text: any, record: any, index: number) => `${index + 1}`,
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      key: "receiverName",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
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
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Address",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Postal Code",
      dataIndex: "postCode",
      key: "postCode",
    },
    {
      title: "Default",
      dataIndex: "isDefault",
      key: "isDefault",
      className: "text-center",
      render: (text: any, record: any) =>
        text === 1 ? (
          <StarFilled
            style={{ color: "rgba(239, 68, 68,1)", fontSize: "24px" }}
          />
        ) : null,
    },
  ];
  return (
    <div id={id} className="mt-4">
      <div className="py-4 px-2 border-b text-xl font-medium">My Address</div>
      <div className="py-4">
        <Table
          dataSource={addressList}
          columns={columns}
          pagination={false}
          rowKey="id"
          className="rc-table"
        />
      </div>
    </div>
  );
};
export default MyAddress;
