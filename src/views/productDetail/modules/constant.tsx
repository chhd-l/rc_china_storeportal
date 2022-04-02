import type {
  InputSelectProps,
  InputTextProps,
} from "@/framework/types/common";
import { EyeOutlined } from "@ant-design/icons";
import { ReactNode, useRef, useState } from "react";
export const selectList: (InputTextProps | InputSelectProps)[] = [
  {
    options: [{ name: "zone", value: "zone" }],
    name: "zone",
    label: "Zone",
    className: "w-1/2",
    type: "select",
  },
  {
    options: [{ name: "breeds", value: "breeds" }],
    name: "breeds",
    label: "Breeds",
    className: "w-1/2",
    type: "select",
  },
  {
    options: [{ name: "age", value: "age" }],
    name: "age",
    label: "Age",
    className: "w-1/2",
    type: "select",
  },
  {
    options: [{ name: "lifeStage", value: "lifeStage" }],
    name: "lifeStage",
    label: "Life Stage",
    className: "w-1/2",
    type: "select",
  },
  {
    options: [{ name: "functions", value: "functions" }],
    name: "functions",
    label: "Functions",
    className: "w-1/2",
    type: "select",
  },
  {
    options: [{ name: "size", value: "size" }],
    name: "size",
    label: "Size",
    className: "w-1/2",
    type: "select",
  },
  {
    options: [{ name: "technology", value: "technology" }],
    name: "technology",
    label: "Technology",
    className: "w-1/2",
    type: "select",
  },
];

export const noSkuForm: (InputTextProps | InputSelectProps)[] = [
  {
    options: [{ name: "size", value: "size" }],
    name: "subscription",
    label: "Subscription",
    type: "select",
    rules: [{ required: true }],
  },
  {
    type: "input",
    addonBefore: "¥",
    label: "List Price",
    name: "listPrice",
    rules: [{ required: true }],
  },
  {
    type: "input",
    addonBefore: "¥",
    label: "Marketing Price",
    name: "marketingPrice",
    rules: [{ required: true }],
  },
  {
    type: "input",
    addonBefore: "¥",
    label: "Subscription Price",
    name: "subscriptionPrice",
    rules: [{ required: true }],
  },
  {
    type: "input",
    label: "Stock",
    name: "stock",
    rules: [{ required: true }],
  },
  {
    type: "input",
    label: "Feeding Days",
    name: "feedingDays",
    rules: [{ required: true }],
  },
  {
    type: "input",
    label: "Support 100",
    name: "support100",
    rules: [{ required: true }],
  },
];

interface StepsProps {
  title: string;
  anchor: string;
  subTitle?: string;
  tips: string;
  rightSlot?: ReactNode | null;
}

export const steps: StepsProps[] = [
  {
    title: "Basic Infomation",
    anchor: "product_basic_infomation",
    subTitle: "",
    tips: "Basic Infomation",
    rightSlot: <EyeOutlined />,
  },
  {
    title: "Specification",
    anchor: "product_specification",
    tips: "Specification",
    subTitle:
      "Complete: 1 / 7 Fill in more attributes to boost the exposure of your product.",
    rightSlot: null,
  },
  {
    title: "Sales Infomation",
    anchor: "product_sales_infomation",
    subTitle: "",
    tips: "Sales Infomation",
    rightSlot: null,
  },
  {
    title: "Shipping",
    tips: "Shipping",
    anchor: "product_shipping",
    subTitle: "",
    rightSlot: null,
  },
];
export enum FormKey {
  BasicInfomation,
  Specification,
  SaleInfomation,
  Shipping,
}

export const formInitialValues = {
  product: [
    {
      fieldKey: 0,
      isListField: true,
      key: 0,
      name: 0,
    },
    {
      fieldKey: 1,
      isListField: true,
      key: 1,
      name: 1,
    },
    {
      fieldKey: 2,
      isListField: true,
      key: 2,
      name: 2,
    },
    {
      fieldKey: 3,
      isListField: true,
      key: 3,
      name: 3,
    },
  ],
};
