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
export interface PageProps<T = Record<string, any>> {
  offset: number
  limit: number
  withTotal: boolean
  operator?: string
  sample?: T
}
export interface FormItemProps {
  name: string
  placeholder?: string
  rules?: Rule[]
  type?: string
  label?: string
  dependencies?: string[]
  selectList?: BaseListProps[]
}

export interface FormProps {
  field: FormListFieldData
  parentName?: Array<any>
  name?: string
  layout?: any
  form?: any
}
export interface KeyRules {
  [key: string]: string
}

export interface OptionsProps {
  name: string
  value: string | number | boolean
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
  type: "select" | "input" | "inputNumber"
  layout?: any
  rules?: Rule[]
}
export interface InputSelectProps extends InputBaseProps {
  options: OptionsProps[]
}
export interface InputTextProps extends InputBaseProps {
  addonBefore?: string
  dataTips?: string
}

export interface BaseListProps {
  label: string
  key?: string | OrderStatus | boolean | number
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

export interface User {
  id: string
  type: string
  name: string
  nickname: string
  username: string
  email: string
  isEmailVerified: boolean
  phone: string
  isPhoneVerified: boolean
  status: string
}
