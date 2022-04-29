import { Avatar, Col, Empty, Row, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { CarrierType, Order, OrderTradeItem } from '@/framework/types/order'
import OrderActions from '../OrderActions'
import './index.less'
import { KeyRules } from '@/framework/types/common'
import { getExpressCompanyList } from '@/framework/api/get-order'
import { formatMoney } from '@/utils/utils'

const orderStatusType: KeyRules = {
  UNPAID: 'Unpaid',
  TO_SHIP: 'To ship',
  SHIPPED: 'Shipped',
  COMPLETED: 'Completed',
  VOID: 'Cancellation',
}

const OrderTable = ({ orderList }: { orderList: Order[] }) => {
  const [carrierTypes, setCarrierTypes] = useState<CarrierType[]>([])

  const getExpressCompanys = async () => {
    const res = await getExpressCompanyList()
    setCarrierTypes(res)
  }

  useEffect(() => {
    getExpressCompanys()
  }, [])

  return (
    <div>
      <Row className="bg-gray1 border py-2 px-4">
        <Col span={8}>Product(s)</Col>
        <Col span={4} className="text-right">
          Order Total
        </Col>
        <Col span={4} className="text-right">
          Order status
        </Col>
        <Col span={6} className="text-center">
          <Select
            onChange={(val, a) => {}}
            getPopupContainer={(trigger: any) => trigger.parentNode}
            value="Carrier"
            className="order-table-select"
          >
            {carrierTypes.map((item) => (
              <Select.Option value={item.code} key={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={2} className="text-center">
          Actions
        </Col>
      </Row>
      {orderList.length > 0 ? (
        orderList.map((item: Order) => (
          <div className="border mt-2" key={item.id}>
            <Row className="bg-gray1 border-b py-2 px-4">
              <Col span={12} className="flex items-center">
                <Avatar icon={<img src={item.buyer.image} alt={''}/>} />
                <span className="ml-2">{item.buyer.name}</span>
              </Col>
              <Col span={12} className="text-right">
                <div>
                  order ID:{item.id}
                  <br />
                  {item.subscriptionId ? (
                    <span>
                      <span className="iconfont icon-Frame1 primary-color mr-2" />
                      Subscription ID:{item.id}
                    </span>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row className="p-2 flex items-start">
              <Col span={8} className="flex flex-col justify-start">
                {item.tradeItem.map((product: OrderTradeItem, index: number) => (
                  <Row className="items-center" key={product.skuId}>
                    <Col span={8}>
                      <img src={product.pic} className="w-20 h-20" />
                    </Col>
                    <Col span={16}>
                      <Row
                        className={`${
                          item.tradeItem.length > 1 && index !== item.tradeItem.length - 1 ? 'border-b pb-2' : ''
                        }`}
                      >
                        <Col span={20}>
                          <span>{product.skuName}</span>
                          <br />
                          <span className="text-gray-400 text-sm">Variation:{product.goodsSpecifications}</span>
                        </Col>
                        <Col span={4} className="items-start text-right">
                          x{product.num}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col span={4} className="text-right">
                <div>
                  {formatMoney(item.tradePrice.totalPrice)}
                  <br />
                  <span className="text-gray-400">{item?.payInfo?.payTypeName}</span>
                </div>
              </Col>
              <Col span={4} className="text-right">
                <div>{orderStatusType[item.tradeState.orderState]}</div>
              </Col>
              <Col span={6} className="text-center">
                {item.carrierType}
              </Col>
              <Col span={2} className="text-center">
                <OrderActions
                  orderState={item.tradeState.orderState}
                  orderId={item.id}
                  orderAddress={item.shippingAddress}
                />
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  )
}
export default OrderTable
