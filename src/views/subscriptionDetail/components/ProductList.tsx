import React from 'react'
import { Table } from 'antd'
import { formatMoney } from '@/utils/utils'
import { SubscriptionFreshType } from '@/framework/constants/subscription'

const ProductList = ({ productList, freshType }: { productList: any[], freshType: any }) => {
  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text: any, record: any, index: number) => `${index + 1}`,
    },
    {
      title: 'Product',
      dataIndex: 'goodsName',
      key: 'goodsName',
      render: (text: any, record: any) => (
        <div className="flex flex-row items-center">
          <img src={record?.goodsVariant?.defaultImage} className="w-10 h-10 mr-2" alt="" />
          <div>
            <div className="w-80 truncate">{text}</div>
            <span className="text-gray-400">{record?.goodsVariant?.skuNo}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit price',
      dataIndex: 'price',
      key: 'price',
      render: (text: any, record: any) => <div>{formatMoney(record?.goodsVariant?.subscriptionPrice)}</div>,
    },
    {
      title: 'Quantity',
      dataIndex: 'num',
      key: 'num',
      render: (text: any, record: any) => <div>{record?.goodsVariant?.num}</div>
    },
    {
      title: 'Freshness',
      dataIndex: 'cycle',
      key: 'cycle',
      render: () => <div>{SubscriptionFreshType[freshType]}</div>
    },
    {
      title: 'Subtotal',
      key: 'Subtotal',
      render: (text: any, record: any) => <div>{formatMoney(record?.goodsVariant?.subscriptionPrice * record?.goodsVariant?.num)}</div>,
    },
  ]
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <span>Subscription Product</span>
      </div>
      <div className="mt-4">
        <Table rowKey="id" columns={columns} dataSource={productList} pagination={false} size="small" className="rc-table" />
      </div>
    </div>
  )
}

export default ProductList
