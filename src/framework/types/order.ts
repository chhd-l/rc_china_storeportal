export interface Order {
  id: string;
  order_number: string;
  customerImg: string;
  customerName: string;
  tradeItem: OrderTradeItem[]; //对应后端lineItem
  tradeState: TradeState;
  carrierType: string; //后端未定义这个字段
  tradePrice: TradePrice;
  payInfo: PayInfo;
  subscriptionId?: string;
}

export interface PayInfo {
  payTypeName: string;
}

export interface TradeState {
  orderState: string;
}

export interface TradePrice {
  totalPrice: number;
}

export interface OrderTradeItem {
  skuId: string;
  pic: string;
  skuName: string;
  size?: string; //为符合原型展示定义的字段
  color?: string; //为符合原型展示定义的字段
  num: number;
  description?: string; //不知道是不是规格
}
