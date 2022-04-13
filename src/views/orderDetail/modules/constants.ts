import { OrderStatus } from "@/framework/types/order";
import { BaseListProps } from "@/framework/types/common";

interface StepProps extends BaseListProps {
  updateTime?: string;
}

export const stepList: StepProps[] = [
  {
    label: "Unpaid",
    key: OrderStatus.Unpaid,
  },
  {
    label: "To ship",
    key: OrderStatus.Toship,
  },
  {
    label: "Shipped",
    key: OrderStatus.Shipped,
  },
  {
    label: "Completed",
    key: OrderStatus.Completed,
  },
  {
    label: "Cancellation",
    key: OrderStatus.Cancellation,
  },
];

export const initOrderDetail={
  id: "",
  tradeItem: [],
  tradeState: {
    orderState: "",
  },
  carrierType: "",
  tradePrice: {
    goodsPrice: 0,
    deliveryPrice: 0,
    totalPrice: 0,
    discountsPrice: 0,
  },
  subscriptionId: "",
  shippingAddress: {},
  buyer: {},
  carrier: [],
  payInfo: {},
  logs: [],
  comments: [],
}
