import React from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/es/table'

const columns: ColumnProps<any>[] = [
  {
    title: 'No.',
  },
  {
    title: 'Benefit Name',
  },
  {
    title: 'Quantity',
  },
  {
    title: 'Benefit Type'
  },
  {
    title: 'Actions'
  }
]

const SubscriptionGifts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <span className="iconfont icon-Frame2 primary-color text-lg" />
        <span>Subscription benefits</span>
      </div>
      <div className="mt-4">
        <Table size="small" columns={columns} dataSource={[]} className="rc-table" />
      </div>
    </div>
  )
}

export default SubscriptionGifts
