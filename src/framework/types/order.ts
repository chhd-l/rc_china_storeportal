import { Address, Consumer } from './consumer'

export interface Order {
  id: string
  orderNumber: string
  orderItem: OrderOrderItem[] | [] //对应后端lineItem
  orderState: OrderState
  carrierType?: string //后端未定义这个字段
  orderPrice: OrderPrice
  payment?: Payment
  subscriptionId?: string
  subscriptionNo?:string
  freshType?:string
  shippingAddress?: Address | any
  buyer?: Consumer | any
  carrier?: Carrier[]
  logs: Log[]
  comments: Comment[]
  expectedShippingDate?:string
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
  orderItem: OrderOrderItem[]
  deliveries?: Deliveries[]
}

export interface Deliveries {
  areaCode?: string
  areaName?: string
  context: string
  status: string
  time: string
}

export interface Payment {
  payTypeName: string
  appId: string
  payTime: string
  outOrderNo: string
  payWayOrderID?: string
  payWayCode?: string
}

export interface OrderState {
  orderState: string
}

export interface OrderPrice {
  productPrice: number
  deliveryPrice: number
  totalPrice: number
  discountsPrice: number
}

export interface OrderOrderItem {
  skuId: string
  pic: string
  skuName: string
  productSpecifications?: string
  size?: string //为符合原型展示定义的字段
  color?: string //为符合原型展示定义的字段
  num: number
  description?: string //不知道是不是规格
  price: number
  freshType?:string
  isGift?:boolean
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
  consumer: string
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
