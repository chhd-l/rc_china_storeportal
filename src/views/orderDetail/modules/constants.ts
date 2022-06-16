import { OrderStatus } from "@/framework/types/order";
import { BaseListProps } from "@/framework/types/common";

interface StepProps {
  updateTime?: string;
  label:string
  key:string
}

export const stepList: StepProps[] = [
  {
    label: "Unpaid",
    key: "UNPAID",
  },
  {
    label: "To ship",
    key: "TO_SHIP",
  },
  {
    label: "Shipped",
    key: "SHIPPED",
  },
  {
    label: "Completed",
    key: "COMPLETED",
  },
  {
    label: "Cancellation",
    key: "VOID",
  },
];

export const initOrderDetail={
  id: "",
  orderItem: [],
  orderState: {
    orderState: "",
  },
  carrierType: "",
  orderPrice: {
    productPrice: 0,
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
