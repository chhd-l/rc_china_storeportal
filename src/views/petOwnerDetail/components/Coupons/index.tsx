import { Table, Tooltip } from "antd";
import React, { useEffect, useState } from 'react'
import { CouponCode } from "@/framework/types/customer";

interface CouponInfoProps {
  customerId: string;
  id: string;
}

const CouponInformation = ({  id,customerId }: CouponInfoProps) => {
  const [couponCodeList, setCouponCodeList] = useState<any>([])
  useEffect(() => {
    if (customerId !== '') {
      // setCouponCodeList(arr)
    }
  }, [customerId])

  const columns = [
    {
      title: "Voucher Name",
      dataIndex: "couponName",
      key: "couponName",

    },
    {
      title: "Voucher Code",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Voucher Value",
      dataIndex: "couponValue",
      key: "couponValue",
    },
    {
      title: "Status",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Options",
      dataIndex: "Options",
      key: "Options",
      className: "text-center",
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-kjafg primary-color text-xl"
            onClick={() => {}}
          />
        </Tooltip>
      ),
    },
  ];
  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">
        Voucher Information
      </div>
      <div className="py-4">
        <Table
          dataSource={couponCodeList}
          columns={columns}
          pagination={false}
          rowKey="id"
          className="rc-table"
        />
      </div>
    </div>
  );
};
export default CouponInformation;
