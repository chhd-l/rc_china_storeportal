import OrderTable from '@/components/order/OrderTable';
import { ContentContainer, TableContainer } from '@/components/ui';
import { getOrderList } from '@/framework/api/get-order'
import React, { useEffect, useState } from 'react'
import { Order } from '@/framework/types/order'
import { Table } from 'antd';
import { type } from 'os';

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
  export type tableList=[{
    title: 'Report Nmae',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Options',
    dataIndex: 'options',
    key: 'options',
    align:"center",
    // render:((props:any)=>React.ReactNode)
  },]
//   export type   render=
//   | ((props: any) => React.ReactNode)
//   | undefined;
  const columns:tableList= [
    {
      title: 'Report Nmae',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      key: 'options',
      align:"center",
    //   render: (props)=>{
    //       <div>heiheiheiheih</div>
    //   }
    }
  ];


const LatestReport=()=>{
   return (
    <ContentContainer>
        <TableContainer className='py-0 pb-7'>
        <div className='text-left text-xl font-bold'>LatestReports</div>
                 <Table dataSource={dataSource} columns={columns} pagination={false}/>
       </TableContainer>
       </ContentContainer>
      );
}
export default LatestReport