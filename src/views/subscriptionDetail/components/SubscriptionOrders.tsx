import React from 'react'
import { Table, Tabs } from 'antd'
import { ColumnProps } from 'antd/es/table'

const columns_tostart: ColumnProps<any>[] = [
  {
    title: 'Sequence',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Product Name',
    dataIndex: 'pic',
    key: 'p'
  },
  {
    title: 'Quantity',
    dataIndex: 'qu',
    key: 'q'
  },
  {
    title: 'Shipment date',
    dataIndex: 'sh',
    key: 'shi'
  },
  {
    title: 'Actions',
    key: 'ac'
  }
];
const columns_completed: ColumnProps<any>[] = [
  {
    title: 'Sequency',
    dataIndex: 'seq',
    key: 'seq'
  },
  {
    title: 'Order ID',
    dataIndex: 'or',
    key: 'or'
  },
  {
    title: 'Product Name',
    dataIndex: 'pr',
    key: 'pr'
  },
  {
    title: 'Quantity',
    dataIndex: 'qu',
    key: 'qu'
  },
  {
    title: 'Shipment date',
    dataIndex: 'sh',
    key: 'sh'
  },
  {
    title: 'Order status',
    dataIndex: 'or',
    key: 'or'
  },
  {
    title: 'Actions',
    dataIndex: 'ac',
    key: 'ac'
  }
]
const SubscriptionOrders: React.FC = () => {
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <div>Subscription information</div>
      </div>
      <div className="mt-4">
        <Tabs type="card">
          <Tabs.TabPane tab="To start" key="1">
            <Table size="small" columns={columns_tostart} dataSource={[]} className="rc-table" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Completed" key="2">
            <Table size="small" columns={columns_completed} dataSource={[]} className="rc-table" />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default SubscriptionOrders
