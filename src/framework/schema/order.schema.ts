import { GoodsAttributeAndValue } from "./product.schema"

export interface OderListItem {
  _id: string
  version: string
  orderNumber: string
  currencyCode: string
  remark: string
  isSubscription: Boolean
  buyer: TradeBuyer
  shippingAddress: CustomerAddress
  shippingInfo: TradeShippingInfo
  tradePrice: TradePrice
  tradeState: TradeState
  payInfo: TradePayInfo
  lineItem: TradeLineItem[]
  logs: TradeLogs[]
}

export interface TradeBuyer {
  customerId: string
  customerName: string
  nickName: string
  customerEmail: string
  isMember: Boolean
  phone: string
  customerLevel: string
}

export interface CustomerAddress {
  id: string
  customerId?: string
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

export interface TradeShippingInfo {
  shippingTime: string//Time
  expectedShippingDate: string//Time
  shippingCompany: string
  trackingId: string
  isReturn: string
  status: string
  deliverys: TradeShippingInfoDeliverys
}
export interface TradeShippingInfoDeliverys {
  time: string
  context: string
  areaCode: string
  areaName: string
  status: string
}
export enum TradeTradeStateOrderStateEnum {
  UNPAID,
  TO_SHIP,
  SHIPPED,
  COMPLETED,
  VOID
}
export interface TradeState {
  orderState: TradeTradeStateOrderStateEnum
  createdAt: string//Time
  createdby: string
  lastModifiedAt: string//Time
  lastModifiedBy: string
  orderType: string
  storeId: string
}

export interface TradePrice {
  goodsPrice: number
  deliveryPrice: number
  totalPrice: number
  taxRate: number
  discountsPrice: number
}

export interface TradePayInfo {
  PayInfoID: string
  Amount: string
  PayStartTime: string
  PayFinishTime: string
  LastModifiedBy: string
  PayWayCode: string
  PayWayOrderID: string
  PaymentState: string
}

export interface TradeLineItem {
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
  goodsSpecifications: string
  bundle: Boolean
  BundleSkuNos: [string]
  GoodsAttributeAndValues: GoodsAttributeAndValue[]
  FeedingDays: number
}

export enum TradeLogsIdEnum {
  initialization,
  pay,
  shiped,
  complete
}

export enum TradeLogsEventEnum {
  initialization,
  pay,
  ship,
  complete
}
export interface TradeLogs {
  id: TradeLogsIdEnum
  event: TradeLogsEventEnum
  staus: Boolean
  createdAt: string //Time
  createdby: string
  request: string
  response: string
}
