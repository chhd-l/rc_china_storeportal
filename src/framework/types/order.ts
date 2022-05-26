import { Address, Customer } from './customer'

export interface Order {
  id: string
  orderNumber: string
  tradeItem: OrderTradeItem[] | [] //对应后端lineItem
  tradeState: TradeState
  carrierType?: string //后端未定义这个字段
  tradePrice: TradePrice
  payInfo?: PayInfo
  subscriptionId?: string
  subscriptionNo?:string
  shippingAddress?: Address | any
  buyer?: Customer | any
  carrier?: Carrier[]
  logs: Log[]
  comments: Comment[]
}

export interface Comment {
  lastModifiedBy?: string
  lastModifiedAt?: string
  createdAt?: string
  createdBy?: string
  createId?: string
  content?: string
  id?: string
  avatarUrl?: string
}

export interface Log {
  createdAt: string
  createdBy: string
  status: string
  id: string
  event: string
}

export interface Carrier {
  packId: string
  company: string
  tradeItem: OrderTradeItem[]
  deliveries?: Deliveries[]
}

export interface Deliveries {
  areaCode?: string
  areaName?: string
  context: string
  status: string
  time: string
}

export interface PayInfo {
  payTypeName: string
  appId: string
  payTime: string
  outTradeNo: string
  payWayOrderID?: string
  payWayCode?: string
}

export interface TradeState {
  orderState: string
}

export interface TradePrice {
  goodsPrice: number
  deliveryPrice: number
  totalPrice: number
  discountsPrice: number
}

export interface OrderTradeItem {
  skuId: string
  pic: string
  skuName: string
  goodsSpecifications?: string
  size?: string //为符合原型展示定义的字段
  color?: string //为符合原型展示定义的字段
  num: number
  description?: string //不知道是不是规格
  price: number
}

export enum OrderStatus {
  Unpaid = 'UNPAID',
  Toship = 'TO_SHIP',
  Shipped = 'SHIPPED',
  Completed = 'COMPLETED',
  Cancellation = 'VOID',
}

export interface OrderSearchParamsProps {
  startTime: string
  endTime: string
  searchType: string
  searchTypeValue: string
}

export interface CarrierType {
  id?: string
  name?: string
  nameEn?: string
  code?: string
  isChecked?: boolean
  isDeleted?: boolean
  isEnabled?: boolean
  storeId?: string
}

export interface LogisticsIntegration {
  id: string
  type: string
  parameter: string
  isEnabled: boolean
  remark: string
  storeId: string
  key: string
  customer: string
  pullUrl: string
  queryUrl: string
  callbackUrl: string
}

export interface OrderSettingItem {
  id: string
  key?: string
  code: string
  type: string
  name: string
  remark: string
  isEnabled: boolean
  context: string
  storeId: string
  isDeleted: boolean
}
