import { BaseListProps } from "@/framework/types/common";
import { OrderStatus } from "@/framework/types/order";

export const tabList: BaseListProps[] = [
  {
    label: "All",
    key: "",
  },
  {
    label: 'Unpaid',
    key: OrderStatus.Unpaid,
  },
  {
    label: 'To ship',
    key: OrderStatus.Toship,
  },
  {
    label: 'Shipped',
    key: OrderStatus.Shipped,
  },
  {
    label: 'Completed',
    key: OrderStatus.Completed,
  },
  {
    label: 'Cancellation',
    key: OrderStatus.Cancellation,
  },
];

export const searchTypeList: BaseListProps[] = [
  {
    label: "Order ID",
    key: "orderId",
  },
  {
    label: "Subscription ID",
    key: "subscriptionId",
  },
  {
    label: "Phone Number",
    key: "phoneNumber",
  },
  {
    label: "Pet Owner Name",
    key: "customerName",
  },
  {
    label: "Product Name",
    key: "skuName",
  },
  {
    label: "Order Type",
    key: "orderType",
  },
];

export const carrierTypeList: BaseListProps[] = [
  {
    label: "All Carrier",
    key: "",
  },
  {
    label: "SF Express",
    key: "SF",
  },
  {
    label: "STO Express",
    key: "STO",
  },
  {
    label: "YTO Express",
    key: "YTO",
  },
  {
    label: "ZTO Express",
    key: "ZTO",
  },
  {
    label: "BEST Express",
    key: "BEST",
  },
  {
    label: "Yunda Express",
    key: "Yunda",
  },
];
