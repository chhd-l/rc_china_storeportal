import { LabelOptionProps } from "@/framework/types/common";
import { ReactNode } from "react";

export const getCurrencyCode = () => {
  return "￥";
};

export const formatMoney = (price: number) => {
  return getCurrencyCode() + price.toFixed(2);
};

export const handleValueEnum = (list: LabelOptionProps[]) => {
  let newEnum: { [x: string]: ReactNode } = {};
  list.forEach((item: LabelOptionProps) => {
    newEnum[item.value] = { text: item.label };
  });
  return newEnum;
};
