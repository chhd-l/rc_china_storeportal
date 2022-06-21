import { ProductAttributeAndValue } from "./product.schema"

export interface OderListItem {
  _id: string
  version: string
  orderNumber: string
  currencyCode: string
  remark: string
  isSubscription: Boolean
  buyer: OrderBuyer
  shippingAddress: ConsumerAddress
  shippingInfo: OrderShippingInfo
  orderPrice: OrderPrice
  orderState: OrderState
  payInfo: OrderPayInfo
  lineItem: OrderLineItem[]
  logs: OrderLogs[]
}

export interface OrderBuyer {
  consumerId: string
  consumerName: string
  nickName: string
  consumerEmail: string
  isMember: Boolean
  phone: string
  consumerLevel: string
}

export interface ConsumerAddress {
  id: string
  consumerId?: string
  receiver?: string
  receiverName?: string
  phone: string
  province: string
  city: string
  detail: string
  postcode: string
  isDefault: number
  country: string
  region: string
}

export interface OrderShippingInfo {
  shippingTime: string//Time
  expectedShippingDate: string//Time
  shippingCompany: string
  trackingId: string
  isReturn: string
  status: string
  deliverys: OrderShippingInfoDeliverys
}
export interface OrderShippingInfoDeliverys {
  time: string
  context: string
  areaCode: string
  areaName: string
  status: string
}
export enum OrderOrderStateOrderStateEnum {
  UNPAID,
  TO_SHIP,
  SHIPPED,
  COMPLETED,
  VOID
}
export interface OrderState {
  orderState: OrderOrderStateOrderStateEnum
  createdAt: string//Time
  createdby: string
  lastModifiedAt: string//Time
  lastModifiedBy: string
  orderType: string
  storeId: string
}

export interface OrderPrice {
  productPrice: number
  deliveryPrice: number
  totalPrice: number
  taxRate: number
  discountsPrice: number
}

export interface OrderPayInfo {
  paymentId: string
  amount: string
  paymentStartTime: string
  paymentFinishTime: string
  lastModifiedBy: string
  payWayCode: string
  payWayOrderId: string
  paymentState: string
}

export interface OrderLineItem {
  id: string
  spuId: string
  spuNo: string
  spuName: string
  skuId: string
  skuNo: string
  skuName: string
  pic: string
  num: number
  description: string
  price: number
  productSpecifications: string
  bundle: Boolean
  bundleSkuNos: [string]
  productAttributeAndValues: ProductAttributeAndValue[]
  feedingDays: number
}

export enum OrderLogsIdEnum {
  initialization,
  pay,
  shiped,
  complete
}

export enum OrderLogsEventEnum {
  initialization,
  pay,
  ship,
  complete
}
export interface OrderLogs {
  id: OrderLogsIdEnum
  event: OrderLogsEventEnum
  staus: Boolean
  createdAt: string //Time
  createdby: string
  request: string
  response: string
}
