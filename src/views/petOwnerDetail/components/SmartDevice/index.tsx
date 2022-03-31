import { Table } from "antd";
import React from "react";

const SmartDevice = ({ smartDeviceList,id }: any) => {
  const columns = [
    {
      title: "Smart Device Name",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Smart Device SKU",
      dataIndex: "deviceSku",
      key: "deviceSku",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Locked Time",
      dataIndex: "lockedTime",
      key: "lockedTime",
    },
    {
      title: "Subscription No.",
      dataIndex: "subscriptionNumber",
      key: "subscriptionNumber",
    },
    {
      title: "Subscription Time",
      dataIndex: "subscriptionTime",
      key: "subscriptionTime",
    },
  ];
  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">Smart Device</div>
      <div className="py-4">
        <Table
          dataSource={smartDeviceList}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};
export default SmartDevice;
