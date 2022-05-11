import { normaliseAttrProps } from './product'
import { TradeLogs, TradePayInfo } from '../schema/order.schema'
import { Order } from '../types/order'

export enum TradeTradeStateOrderStateEnum {
  unpaid = 'UNPAID',
  toShip = 'TO_SHIP',
  shipped = 'SHIPPED',
  completed = 'COMPLETED',
  viod = 'VOID',
}

const normalisePayInfo = (payInfo: TradePayInfo, orderState: any) => {
  let info =
    orderState === TradeTradeStateOrderStateEnum.unpaid || orderState === 'CANCELLATION'
      ? {
          payTypeName: '',
          appId: '',
          payTime: '',
          outTradeNo: '',
        }
      : {
          payTypeName: 'Wechat Pay',
          appId: payInfo.payInfoID,
          payTime: payInfo.payStartTime,
          outTradeNo: payInfo.payWayOrderID,
          payWayOrderID: payInfo.payWayOrderID,
          payWayCode: payInfo.payWayCode,
        }
  return info
}

export const normaliseOrder = (data: any, expressCompanies: any): any => {
  const { customerId, nickName, phone, avatarUrl, openId, unionId } = data.buyer
  const {
    receiverName,
    id,
    phone: addressPhone,
    province,
    city,
    region,
    detail,
    postcode: postCode,
    isDefault,
  } = data.shippingAddress
  let { tradeState, lineItem, tradePrice, payInfo, logs, shippingInfo, subscriptionId } = data
  const company = expressCompanies.filter((item: any) => item.code === shippingInfo.shippingCompany)
  const carrierType = company.length > 0 ? company[0].nameEn : ''
  let { orderState } = tradeState
  let orderItem = {
    orderNumber: data.orderNumber,
    id: data._id,
    subscriptionId: subscriptionId || '',
    buyer: {
      id: customerId,
      name: nickName,
      phone,
      image: avatarUrl,
      openId,
      unionId,
    },
    shippingAddress: {
      id,
      receiverName,
      phone: addressPhone,
      province,
      city,
      region,
      detail,
      postCode,
      isDefault,
    },
    tradeItem:
      lineItem?.map((item: any) => {
        const { skuId, pic, skuName, num, price, goodsSpecifications } = item
        return {
          skuId,
          pic,
          skuName,
          goodsSpecifications,
          num,
          price,
        }
      }) || [],
    tradeState: {
      orderState: orderState,
    },
    carrier: shippingInfo?.trackingId
      ? [
          {
            packId: shippingInfo.trackingId,
            company: carrierType,
            tradeItem:
              lineItem?.map((item: any) => {
                const { skuId, pic, skuName } = item
                return {
                  skuId,
                  pic,
                  skuName,
                }
              }) || [],
            deliveries: shippingInfo?.deliveries,
          },
        ]
      : [],
    carrierType: carrierType,
    tradePrice: {
      goodsPrice: tradePrice.goodsPrice,
      discountsPrice: tradePrice?.discountsPrice || 0,
      deliveryPrice: tradePrice?.deliveryPrice || 0,
      totalPrice: tradePrice.totalPrice,
    },
    payInfo: payInfo ? normalisePayInfo(payInfo, orderState) : {},
    logs,
    comments: data?.comments,
  }
  return orderItem
}
