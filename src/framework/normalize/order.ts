import { normaliseAttrProps } from './product'
import { OrderLogs, OrderPayment } from '../schema/order.schema'
import { Order } from '../types/order'
import { handleReturnTime } from '@/utils/utils'

export enum OrderOrderStateOrderStateEnum {
  unpaid = 'UNPAID',
  toShip = 'TO_SHIP',
  shipped = 'SHIPPED',
  completed = 'COMPLETED',
  viod = 'VOID',
}

const normalisePayment = (payment: OrderPayment, orderState: any) => {
  let info =
    orderState === OrderOrderStateOrderStateEnum.unpaid || orderState === 'CANCELLATION'
      ? {
        payTypeName: '',
        appId: '',
        payTime: '',
        outOrderNo: '',
      }
      : {
        payTypeName: 'Wechat Pay',
        appId: payment.paymentId,
        payTime: handleReturnTime(payment.paymentStartTime),
        outOrderNo: payment.payWayOrderId,
        payWayOrderID: payment.payWayOrderId,
        payWayCode: payment.payWayCode,
      }
  return info
}

export const normaliseOrder = (data: any, expressCompanies: any): any => {
  const { consumerId, nickName, phone, avatarUrl, openId, unionId } = data.consumer
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
  let { orderState, lineItem, orderPrice, payment: payment, logs, delivery: shippingInfo, subscriptionId, subscriptionNo } = data
  const company = expressCompanies.filter((item: any) => item.code === shippingInfo.shippingCompany)
  const carrierType = company.length > 0 ? company[0].nameEn : ''
  // let { orderState } = orderState
  let orderItem = {
    orderNumber: data.orderNumber,
    id: data._id,
    subscriptionId: subscriptionId || '',
    subscriptionNo: subscriptionNo || '',
    freshType: data?.freshType || '',
    buyer: {
      id: consumerId,
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
    orderItem:
      lineItem?.map((item: any) => {
        const { skuId, pic, skuName, num, price, productSpecifications, isGift } = item
        return {
          skuId,
          pic,
          skuName,
          productSpecifications,
          num,
          price,
          freshType: data?.freshType || '',
          isGift
        }
      }) || [],
    orderState: {
      orderState: orderState,
    },
    expectedShippingDate: shippingInfo?.expectedShippingDate || '',
    carrier: shippingInfo?.trackingId
      ? [
        {
          packId: shippingInfo.trackingId,
          company: carrierType,
          orderItem:
            lineItem?.map((item: any) => {
              const { skuId, pic, skuName } = item
              return {
                skuId,
                pic,
                skuName,
              }
            }) || [],
          deliveries: shippingInfo?.deliveryItems,
        },
      ]
      : [],
    carrierType: carrierType,
    orderPrice: {
      productPrice: orderPrice.productPrice,
      discountsPrice: orderPrice?.discountsPrice || 0,
      deliveryPrice: orderPrice?.deliveryPrice || 0,
      totalPrice: orderPrice.totalPrice,
    },
    payment: payment ? normalisePayment(payment, orderState) : {},
    logs,
    comments: data?.comments,
  }
  return orderItem
}

export const normalizeLogisticsIntegration = (logisticsIntegration: any) => {
  const { id, type, parameter, isEnabled, remark, storeId } = logisticsIntegration
  const newParameter = JSON.parse(parameter)
  return {
    id: id || '',
    type: type || '',
    parameter: parameter || '',
    isEnabled: isEnabled || false,
    remark: remark || '',
    storeId: storeId || '12345678',
    key: newParameter.KEY || '',
    consumer: newParameter.consumer || '',
    pullUrl: newParameter.pullURL || '',
    queryUrl: newParameter.queryURL || '',
    callbackUrl: newParameter.callbackURL || '',
  }
}
