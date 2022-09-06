import React from 'react'
import { Table, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { ColumnProps } from 'antd/es/table'
import intl from 'react-intl-universal'

const columns: ColumnProps<any>[] = [
  {
    title: intl.get('"public.no') + '.',
    key: 'no',
    render: (text: any, record: any, index: number) => `${index + 1}`,
  },
  {
    title: intl.get('subscription.Benefit Name'),
    dataIndex: 'name',
    key: 'name',
    render: (text: any, record: any) => (
      <div className="flex flex-row items-center">
        <img src={record?.defaultImage} className="w-10 h-10 mr-2" alt="" />
        <div>
          <div className="max-w-xs truncate">{text}</div>
          <span className="text-gray-400">{record?.variants?.skuNo}</span>
        </div>
      </div>
    ),
  },
  {
    title: intl.get('subscription.Quantity'),
    dataIndex: 'num',
    key: 'num',
    render: (text: any, record: any) => <div>{record?.variants?.num}</div>,
  },
  {
    title: intl.get('subscription.Benefit Type'),
    dataIndex: 'type',
    key: 'type',
    render: () => <div>Product</div>,
  },
  {
    title: intl.get('subscription.Actions'),
    dataIndex: 'acs',
    key: 'acs',
    render: (text: any, record: any) => (
      <Tooltip title="View Detail">
        <Link
          to="/product/product-detail"
          state={record?.id}
          className="cursor-pointer iconfont icon-kjafg primary-color"
        />
      </Tooltip>
    ),
  },
]

const SubscriptionGifts = ({ benefits }: { benefits: any[] }) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <span className="iconfont icon-Frame2 primary-color text-lg" />
        <span>{intl.get('subscription.Subscription Benefits')}</span>
      </div>
      <div className="mt-4">
        <Table size="small" columns={columns} dataSource={benefits} pagination={false} className="rc-table" />
      </div>
    </div>
  )
}

export default SubscriptionGifts
