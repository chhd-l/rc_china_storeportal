import { Avatar, Col, Empty, Row, Select } from 'antd'
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

const OrderTable = ({
  orderList,
  shipOrCompleteSuccess,
  changeCarrier,
  origin = 'order',
}: {
  orderList: Order[]
  shipOrCompleteSuccess: Function
  changeCarrier: Function
  origin?: string
}) => {
  const [carrierTypes, setCarrierTypes] = useState<CarrierType[]>([])
  const selectRef = React.useRef<any>(null)

  const getExpressCompanies = async () => {
    const res = await getExpressCompanyList()
    setCarrierTypes(res)
  }

  useEffect(() => {
    getExpressCompanies()
  }, [])

  return (
    <div className="order-list-page">
      <Row className="bg-gray1 border py-2 px-4">
        <Col span={10}>Product(s)</Col>
        <Col span={4} className="text-left">
          Order Total
        </Col>
        <Col span={origin !== 'voucher'?4:6} className="text-left">
          Order status
        </Col>
        {origin !== 'voucher' ? (
          <Col span={4} className="text-left">
            <Select
              ref={selectRef}
              onChange={(val, a) => {
                console.log(val)
                selectRef.current!.blur()
                changeCarrier && changeCarrier(val)
              }}
              getPopupContainer={(trigger: any) => trigger.parentNode}
              value="Carrier"
              className="order-table-select"
              style={{ width: '150px' }}
            >
              {carrierTypes
                .concat([{ nameEn: 'All', code: '' }])
                .reverse()
                .map((item) => (
                  <Select.Option value={item.code} key={item.code}>
                    {item.nameEn}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        ) : null}
        <Col span={origin !== 'voucher'?2:4} className="text-left">
          Actions
        </Col>
      </Row>
      {orderList.length > 0 ? (
        orderList.map((item: Order) => (
          <div className="border mt-4" key={item.id}>
            <Row className="bg-gray1 border-b py-2 px-4 content-center justify-between">
              <Col span={12} className="flex items-center">
                <Avatar icon={<img src={item.buyer.image} alt={''} />} />
                <span className="ml-2">{item.buyer.name}</span>
              </Col>
              <Col span={12} className="text-right">
                Order ID:{item.id}
                {item.subscriptionId ? (
                  <>
                    <br />
                    <span>
                      <span className="iconfont icon-Frame1 primary-color mr-2" />
                      Subscription ID:{item.subscriptionNo}
                    </span>
                  </>
                ) : null}
              </Col>
            </Row>
            <Row className="p-2 flex items-start">
              <Col span={10} className="flex flex-col justify-start">
                {item.tradeItem.map((product: OrderTradeItem, index: number) => (
                  <Row
                    className={`${index !== item.tradeItem.length - 1 ? ' mb-1 pb-2' : ''} items-start`}
                    key={product.skuId}
                  >
                    <Col span={6}>
                      <img src={product.pic} className="w-16 h-16 order-img" alt="" />
                    </Col>
                    <Col span={16}>
                      <Row
                        className={`${
                          item.tradeItem.length > 1 && index !== item.tradeItem.length - 1 ? 'border-b h-20 pb-2' : ''
                        }`}
                      >
                        <Col span={20}>
                          <span>{product.skuName}</span>
                          <br />
                          <span className="text-gray-400 text-sm">Variation:{product.goodsSpecifications}</span>
                        </Col>
                        <Col span={4} className="items-start text-left">
                          x{product.num}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </Col>
              <Col span={4} className="text-left">
                <div>
                  {formatMoney(item.tradePrice.totalPrice)}
                  <br />
                  <span className="text-gray-400 ">{item?.payInfo?.payTypeName}</span>
                </div>
              </Col>
              <Col span={origin !== 'voucher'?4:6} className="text-left">
                <div>{orderStatusType[item.tradeState.orderState]}</div>
              </Col>
              {origin !== 'voucher' ? (
                <Col span={4} className="text-left">
                  {item.carrierType}
                </Col>
              ) : null}
              <Col span={origin !== 'voucher'?2:4} className="text-left">
                <OrderActions
                  orderState={item.tradeState.orderState}
                  orderId={item.id}
                  subscriptionId={item.subscriptionId}
                  orderAddress={item.shippingAddress}
                  orderBuyer={item.buyer}
                  shipOrCompleteSuccess={shipOrCompleteSuccess}
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
