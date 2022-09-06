import React from 'react'
import { Table } from 'antd'
import { formatMoney } from '@/utils/utils'
import { SubscriptionFreshType } from '@/framework/constants/subscription'
import intl from 'react-intl-universal'

const ProductList = ({ productList, freshType }: { productList: any[]; freshType: any }) => {
  const columns = [
    {
      title: intl.get('"public.no') + '.',
      key: 'no',
      render: (text: any, record: any, index: number) => `${index + 1}`,
    },
    {
      title: intl.get('subscription.Product'),
      dataIndex: 'productName',
      key: 'productName',
      render: (text: any, record: any) => (
        <div className="flex flex-row items-center">
          <img src={record?.variants?.defaultImage} className="w-10 h-10 mr-2" alt="" />
          <div>
            <div className="max-w-xs truncate">{record?.variants?.name}</div>
            <span className="text-gray-400">{record?.variants?.skuNo}</span>
          </div>
        </div>
      ),
    },
    {
      title: intl.get('subscription.Unit price'),
      dataIndex: 'price',
      key: 'price',
      render: (text: any, record: any) => <div>{formatMoney(record?.variants?.subscriptionPrice)}</div>,
    },
    {
      title: intl.get('subscription.Quantity'),
      dataIndex: 'num',
      key: 'num',
      render: (text: any, record: any) => <div>{record?.variants?.num}</div>,
    },
    {
      title: intl.get('subscription.Freshness'),
      dataIndex: 'cycle',
      key: 'cycle',
      render: () => <div>{SubscriptionFreshType[freshType]}</div>,
    },
    {
      title: intl.get('subscription.Subtotal'),
      key: 'Subtotal',
      render: (text: any, record: any) => (
        <div>{formatMoney(record?.variants?.subscriptionPrice * record?.variants?.num)}</div>
      ),
    },
  ]
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <span>{intl.get('subscription.Subscription Product')}</span>
      </div>
      <div className="mt-4">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={productList}
          pagination={false}
          size="small"
          className="rc-table"
        />
      </div>
    </div>
  )
}

export default ProductList
