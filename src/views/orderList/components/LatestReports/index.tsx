import OrderTable from '@/components/order/OrderTable';
import { ContentContainer, TableContainer } from '@/components/ui';
import { getOrderList } from '@/framework/api/get-order'
import React, { useEffect, useState } from 'react'
import { Order } from '@/framework/types/order'
import { Button, Table } from 'antd';
import { type } from 'os';
import "./index.less"
import { ColumnsType } from 'antd/lib/table';

const dataSource = [
  {
    key: '1',
    name: 'Order.shipping.20211101_20211110.xlsx',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: 'Order.all.20211101_20211110.xlsx',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

type TableList = typeof dataSource[number]
const columns: ColumnsType<TableList> = [
  {
    title: 'Report_Nmae',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
    align: "center",
    render: () => {
      return (
        <Button type='primary' className='rounded-4'>Download</Button>
      )
    }
  }
];


const LatestReport = () => {
  return (
    <TableContainer>
      <div className='dropdown-btn'>
        <div className='title text-left text-xl font-bold pl-4 py-2'>Latest Reports</div>
        <div className='the-clues py-2 pl-4'>Here are the reports you have not downloaded</div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <div className='flex pl-4 py-2 items-center'>
          <div style={{ color: "#b9b9b9", fontSize: "12px" }}>View all in</div>
          <div className='ml-2 '>
            <span className='icon iconfont icon-a-bianzu11'></span>
            <span className='font-bold' style={{ color: "#164766" }}>My Reports</span>
          </div>
        </div></div>
    </TableContainer>
  );
}
export default LatestReport