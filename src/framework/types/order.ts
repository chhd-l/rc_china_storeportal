import { Address, Customer } from "./customer";

export interface Order {
  id: string;
  orderNumber: string;
  tradeItem: OrderTradeItem[]; //对应后端lineItem
  tradeState: TradeState;
  carrierType?: string; //后端未定义这个字段
  tradePrice: TradePrice;
  payInfo?: PayInfo;
  subscriptionId?: string;
  shippingAddress?: Address|any;
  buyer?: Customer|any;
  carrier?:Carrier[];
  logs:Log[]
  comments:Comment[]
}

export interface Comment{
  createdAt:string,
  createdBy:string,
  content:string,
  id:string
}

export interface Log{
  createdAt:string,
  createdBy:string,
  status:string,
  id:string
}

export interface Carrier{
  packId:string
  company:string
  tradeItem:OrderTradeItem[]
}

export interface PayInfo {
  payTypeName: string;
  appId:string;
  payTime:string;
  outTradeNo:string
}

export interface TradeState {
  orderState: string;
}

export interface TradePrice {
  goodsPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  discountsPrice: number;
}

export interface OrderTradeItem {
  skuId: string;
  pic: string;
  skuName: string;
  size?: string; //为符合原型展示定义的字段
  color?: string; //为符合原型展示定义的字段
  num: number;
  description?: string; //不知道是不是规格
  price: number;
}

export enum OrderStatus {
  Unpaid = "UNPAID",
  Toship = "TOSHIP",
  Shipped = "SHIPPED",
  Completed = "COMPLETED",
  Cancellation = "CANCELLATION",
}
