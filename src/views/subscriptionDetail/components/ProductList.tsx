import React from 'react'
import { Table } from 'antd'
import { formatMoney } from '@/utils/utils'

const ProductList: React.FC = () => {
  const columns = [
    {
      title: 'No',
      key: 'no',
      render: (text: any, record: any, index: number) => `${index + 1}`,
    },
    {
      title: 'Product',
      dataIndex: 'pic',
      key: 'pic',
      render: (text: any, record: any) => (
        <div className="flex flex-row items-center">
          <img src={text} className="w-10 h-10 mr-2" alt="" />
          <span>
            {record.skuName}
            <br />
            <span>{record.skuId}</span>
          </span>
        </div>
      ),
    },
    {
      title: 'Unit price',
      dataIndex: 'price',
      key: 'price',
      render: (text: any, record: any) => <div>{formatMoney(text)}</div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: 'Subscription Cycle',
      dataIndex: 'cycle',
      key: 'cycle',
    },
    {
      title: 'Subtotal',
      key: 'Subtotal',
      render: (text: any, record: any) => <div>{formatMoney(record.price * record.num)}</div>,
    },
  ]
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <span>Subscription product</span>
      </div>
      <div className="mt-4">
        <Table rowKey="skuId" columns={columns} dataSource={[]} pagination={false} size="small" className="rc-table" />
      </div>
    </div>
  )
}

export default ProductList
