import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table'

const columns: ColumnProps<any>[] = [
  {
    title: 'No.',
    key: 'no',
    render: (text: any, record: any, index: number) => `${index + 1}`,
  },
  {
    title: 'Benefit Name',
    dataIndex: 'goodsName',
    key: 'goodsName',
    render: (text: any, record: any) => (
      <div className="flex flex-row items-center">
        <img src={record?.defaultImage} className="w-10 h-10 mr-2" alt="" />
        <span>
          {text}
          <br />
          <span>{record?.goodsVariant?.skuNo}</span>
        </span>
      </div>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'num',
    key: 'num',
    render: (text: any, record: any) => <div>{record?.goodsVariant?.num}</div>
  },
  {
    title: 'Benefit Type',
    dataIndex: 'type',
    key: 'type',
    render: () => <div>Product</div>
  },
  {
    title: 'Actions'
  }
]

const SubscriptionGifts = ({ benefits }: { benefits: any[] }) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <span className="iconfont icon-Frame2 primary-color text-lg" />
        <span>Subscription benefits</span>
      </div>
      <div className="mt-4">
        <Table size="small" columns={columns} dataSource={benefits} pagination={false} className="rc-table" />
      </div>
    </div>
  )
}

export default SubscriptionGifts
