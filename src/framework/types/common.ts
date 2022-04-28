import type { Rule } from "antd/lib/form"
import { ReactNode } from "react"
import type { FormListFieldData } from "antd/lib/form/FormList"
import { OrderStatus } from "./order"
export enum IsDefault {
  Yes,
  No,
}
export enum IsTransparent {
  Yes = "Yes",
  No = "No",
}
export enum FormItemType {
  Input,
  Select,
  Upload,
  Digit,
}
export interface PageProps {
  offset: number
  limit: number
  isNeedTotal: boolean
  operator?: string
}
export interface FormItemProps {
  name: string
  placeholder?: string
  rules?: any[]
  type?: string
  label?: string
  selectList?: BaseListProps[]
}

export interface FormProps {
  field: FormListFieldData
  parentName?: Array<any>
  name?: string
  layout?: any
}
export interface KeyRules {
  [key: string]: string
}

export interface OptionsProps {
  name: string
  value: string | number
  label?: string
}

export interface LabelOptionProps {
  label: ReactNode | string
  value: string
  children?: LabelOptionProps
}

export interface InputBaseProps {
  name: string
  label?: string
  className?: string
  type: "select" | "input"
  layout?: any
  rules?: Rule[]
}
export interface InputSelectProps extends InputBaseProps {
  options: OptionsProps[]
}
export interface InputTextProps extends InputBaseProps {
  addonBefore?: string
}

export interface BaseListProps {
  label: string
  key?: string | OrderStatus
  value?: string | OrderStatus
  children?: any[]
}

export interface SearchFormItemProps extends FormItemProps {
  type?: string
  label?: string
  selectList?: BaseListProps[]
}

//分页组件
export interface PageParamsProps {
  currentPage: number,
  pageSize: number,
}
