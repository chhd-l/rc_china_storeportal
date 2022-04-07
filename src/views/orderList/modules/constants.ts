import { BaseListProps } from "@/framework/types/common";
import { OrderStatusLabel, OrderStatusValue } from "@/framework/types/order";

export const tabList: BaseListProps[] = [
  {
    label: "All",
    key: "",
  },
  {
    label: OrderStatusLabel.Unpaid,
    key: OrderStatusValue.Unpaid,
  },
  {
    label: OrderStatusLabel.Toship,
    key: OrderStatusValue.Toship,
  },
  {
    label: OrderStatusLabel.Shipped,
    key: OrderStatusValue.Shipped,
  },
  {
    label: OrderStatusLabel.Completed,
    key: OrderStatusValue.Completed,
  },
  {
    label: OrderStatusLabel.Cancellation,
    key: OrderStatusValue.Cancellation,
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
