import { Table, Tooltip } from "antd";
import React from "react";
import { CouponCode } from "@/framework/types/customer";

interface CouponInfoProps {
  couponCodeList: CouponCode[];
  id: string;
}

const CouponInformation = ({ couponCodeList, id }: CouponInfoProps) => {
  const columns = [
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Coupon Name",
      dataIndex: "couponName",
      key: "couponName",
    },
    {
      title: "Coupon Type",
      dataIndex: "couponType",
      key: "couponType",
    },
    {
      title: "Coupon Value",
      dataIndex: "couponValue",
      key: "couponValue",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Expiration Time",
      dataIndex: "expirationTime",
      key: "expirationTime",
    },
    {
      title: "Coupon Status",
      dataIndex: "couponStatus",
      key: "couponStatus",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Options",
      dataIndex: "Options",
      key: "Options",
      render: (text: any, record: any) => (
        <Tooltip title="Deletes">
          <span
            className="cursor-pointer iconfont icon-Frame3 text-red-500 text-xl"
            onClick={() => {}}
          />
        </Tooltip>
      ),
    },
  ];
  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">
        Coupon Information
      </div>
      <div className="py-4">
        <Table
          dataSource={couponCodeList}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </div>
    </div>
  );
};
export default CouponInformation;
