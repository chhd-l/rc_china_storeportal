import type { Rule } from "antd/lib/form";
import { ReactNode } from "react";
import type { FormListFieldData } from "antd/lib/form/FormList";
import {  OrderStatus } from "./order";

export interface FormItemProps {
  name: string;
  placeholder: string;
  rules?: any[];
}

export interface FormProps {
  field: FormListFieldData;
  parentName?: Array<any>;
  name?: string;
  layout?: any;
}
export interface KeyRules {
  [key: string]: string;
}

export interface OptionsProps {
  name: string;
  value: string;
}

export interface LabelOptionProps {
  label: ReactNode | string;
  value: string;
}

export interface InputBaseProps {
  name: string;
  label?: string;
  className?: string;
  type: "select" | "input";
  layout?: any;
  rules?: Rule[];
}
export interface InputSelectProps extends InputBaseProps {
  options: OptionsProps[];
}
export interface InputTextProps extends InputBaseProps {
  addonBefore?: string;
}

export interface BaseListProps {
  label: string ;
  key?: string | OrderStatus;
  value?: string | OrderStatus;
  children?: any[];
}
