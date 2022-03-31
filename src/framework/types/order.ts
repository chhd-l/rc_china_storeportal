export interface Order {
  id: string;
  customerImg: string;
  customerName: string;
  products: OrderTradeItem[];
  orderStatus: string;
  carrierType: string;
  orderTotal: number;
}

export interface OrderTradeItem {
  id: string;
  productImg: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
}
