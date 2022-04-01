import { orderStatusTabProps } from "@/framework/types/common";

export const orderStatusList: orderStatusTabProps[] = [
  {
    label: "All",
    key: "",
  },
  {
    label: "Unpaid",
    key: "unpaid",
  },
  {
    label: "To ship",
    key: "toShip",
  },
  {
    label: "Shipped",
    key: "shipped",
  },
  {
    label: "Completed",
    key: "completed",
  },
  {
    label: "Cancellation",
    key: "cancellation",
  },
];
