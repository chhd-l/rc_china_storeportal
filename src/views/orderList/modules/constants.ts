import { BaseListProps } from "@/framework/types/common";
import {OrderSearchParamsProps, OrderStatus} from "@/framework/types/order";

export const tabList: any[] = [
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
    key: "orderNumber",
  },
  {
    label: "Subscription ID",
    key: "subscriptionNo",
  },
  {
    label: "Phone Number",
    key: "phone",
  },
  {
    label: "Pet Owner Name",
    key: "petNameLike",
  },
  {
    label: "Product Name",
    key: "spuName",
  },
  {
    label: "Order Type",
    key: "isSubscription",
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

export const initSearchParams: OrderSearchParamsProps = {
  startTime: "",
  endTime:"",
  searchType: "orderNumber",
  searchTypeValue: "",
};

export const orderTypeList: BaseListProps[] = [
  { label: 'Single Order', key: false },
  { label: 'Subscription', key: true },
];
