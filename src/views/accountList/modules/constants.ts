import { BaseListProps } from "@/framework/types/common";

export const officialTypeList: BaseListProps[] = [
  {
    label: "Regular Subscription Account",
    key: "subscription",
  },
  {
    label: "Regular Service Account",
    key: "service",
  },
  {
    label: "Authentication Subscription Account",
    key: "authSubscription",
  },
];

export const statusList: BaseListProps[] = [
  {
    label: "Enable",
    key: true,
  },
  {
    label: "Disable",
    key: false,
  },
];
