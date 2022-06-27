import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { OrderOrderItem, OrderPrice } from '@/framework/types/order'
import { formatMoney } from '@/utils/utils'
import { cloneDeep } from 'lodash'

const column = [
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
    title: 'Subtotal',
    key: 'Subtotal',
    render: (text: any, record: any) => <div>{formatMoney(record.price * record.num)}</div>,
  },
]

const subscriptionColumn = {
  title: 'Freshness',
  key: 'freshType',
  dataIndex: 'freshType',
  render: (text: any, record: any) => <div>{record?.isGift ? '-' : text === 'FRESH_100_DAYS' ? '100' : 'Normal'}</div>,
}

const OrderInformation = ({
  orderItem,
  orderPrice,
  isSubscription,
}: {
  orderItem: OrderOrderItem[]
  orderPrice: OrderPrice
  isSubscription: boolean
}) => {
  const [showMore, setShowMore] = useState(true)
  const { productPrice, discountsPrice, deliveryPrice, totalPrice,vipDiscountsPrice } = orderPrice
  const [columns, setColumns] = useState(column)

  useEffect(() => {
    if (isSubscription) {
      let tempColumn = cloneDeep(column)
      tempColumn?.splice(4, 0, subscriptionColumn)
      setColumns(tempColumn)
    }
  }, [isSubscription])

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-md">
        <span className="iconfont icon-bianzu-1 text-theme-red text-lg" />
        <span className="text-left text-base ml-md">Order Information</span>
      </div>
      <div className="pl-8 w-full">
        <Table columns={columns} dataSource={orderItem} pagination={false} rowKey="skuId" className="rc-table" />
        <div className="flex flex-col mt-4 ">
          <div
            className="flex justify-end mb-4 items-center hover:cursor-pointer"
            onClick={() => {
              setShowMore(!showMore)
            }}
          >
            <span className="mr-2">View order amount detail</span>
            {showMore ? <UpOutlined /> : <DownOutlined />}
          </div>
          {showMore ? (
            <div className="flex flex-row border-b -mt-3 pb-2">
              <div className="flex flex-col text-right w-3/4 pr-2">
                <span>Products amount</span>
                <span>Promotion amount</span>
                <span>Shipping fee</span>
                <span>Order amount</span>
              </div>
              <div className="flex flex-col text-right w-1/4">
                <span>{formatMoney(productPrice)}</span>
                <span>{formatMoney(discountsPrice+vipDiscountsPrice)}</span>
                <span>{formatMoney(deliveryPrice)}</span>
                <span className="text-theme-red">{formatMoney(totalPrice)}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default OrderInformation
