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

export const searchTypeList: orderStatusTabProps[] = [
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

export const carrierTypeList: orderStatusTabProps[] = [
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
