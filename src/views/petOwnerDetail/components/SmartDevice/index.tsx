import { Table } from "antd";
import React from "react";
import { SmartDevice } from "@/framework/types/customer";

interface SmartDeviceInfoProps {
  smartDeviceList: SmartDevice[];
  id: string;
}

const SmartDevices = ({ smartDeviceList,id }: SmartDeviceInfoProps) => {
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
          rowKey='id'
          className='rc-table'
        />
      </div>
    </div>
  );
};
export default SmartDevices;
