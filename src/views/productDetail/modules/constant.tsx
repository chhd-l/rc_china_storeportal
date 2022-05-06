import { InputSelectProps, InputTextProps, LabelOptionProps } from '@/framework/types/common'
import { EyeOutlined } from '@ant-design/icons'
import { ReactNode, useRef, useState } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import BasicInfo from '../components/BasicInfo'
import Specification from '../components/Specification'
import SalesInfo from '../components/SalesInfo'
import Shipping from '../components/Shipping'
import { FormListFieldData } from 'antd/lib/form/FormList'

export const selectList: (InputTextProps | InputSelectProps)[] = [
  {
    options: [{ name: 'zone', value: 'zone' }],
    name: 'zone',
    label: 'Zone',
    className: 'w-1/2',
    type: 'select',
  },
  {
    options: [{ name: 'breeds', value: 'breeds' }],
    name: 'breeds',
    label: 'Breeds',
    className: 'w-1/2',
    type: 'select',
  },
  {
    options: [{ name: 'age', value: 'age' }],
    name: 'age',
    label: 'Age',
    className: 'w-1/2',
    type: 'select',
  },
  {
    options: [{ name: 'lifeStage', value: 'lifeStage' }],
    name: 'lifeStage',
    label: 'Life Stage',
    className: 'w-1/2',
    type: 'select',
  },
  {
    options: [{ name: 'functions', value: 'functions' }],
    name: 'functions',
    label: 'Functions',
    className: 'w-1/2',
    type: 'select',
  },
  {
    options: [{ name: 'size', value: 'size' }],
    name: 'size',
    label: 'Size',
    className: 'w-1/2',
    type: 'select',
  },
  {
    options: [{ name: 'technology', value: 'technology' }],
    name: 'technology',
    label: 'Technology',
    className: 'w-1/2',
    type: 'select',
  },
]

export const noSkuForm: (InputTextProps | InputSelectProps | LabelOptionProps)[] = [
  {
    options: [
      { name: '0', value: '0', label: 'false' },
      { name: '1', value: '1', label: 'true' },
    ],
    name: 'subscriptionStatus',
    label: 'Subscription',
    type: 'select',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    addonBefore: '¥',
    label: 'List Price',
    name: 'listPrice',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    addonBefore: '¥',
    label: 'Marketing Price',
    name: 'marketingPrice',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    addonBefore: '¥',
    label: 'Subscription Price',
    name: 'subscriptionPrice',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    label: 'Stock',
    name: 'stock',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    label: 'Feeding Days',
    name: 'feedingDays',
    rules: [{ required: true }],
  },
  {
    options: [
      { label: 'Yes', value: 'true', name: 'true' },
      { label: 'No', value: 'false', name: 'false' },
    ],
    // options: [
    //   { name: 'Yes', value: 'true' },
    //   { name: 'No', value: 'false' },
    // ],
    type: 'select',
    label: 'Support 100',
    name: 'isSupport100',
    rules: [{ required: true }],
  },
]

interface StepsProps {
  title: string
  anchor: string
  subTitle?: string
  tips: string
  rightSlot?: ReactNode | null
  render: Function
}

export const steps: StepsProps[] = [
  {
    title: 'Basic Infomation',
    anchor: 'product_basic_infomation',
    subTitle: '',
    tips: 'Basic Infomation',
    rightSlot: <EyeOutlined />,
    render: (field: FormListFieldData) => <BasicInfo field={field} />,
  },
  {
    title: 'Specification',
    anchor: 'product_specification',
    tips: 'Specification',
    subTitle: 'Complete: Fill in more attributes to boost the exposure of your product.',
    rightSlot: null,
    render: (field: FormListFieldData) => <Specification field={field} />,
  },
  {
    title: 'Sales Infomation',
    anchor: 'product_sales_infomation',
    subTitle: '',
    tips: 'Sales Infomation',
    rightSlot: null,
    render: (field: FormListFieldData) => <SalesInfo field={field} />,
  },
  {
    title: 'Shipping',
    tips: 'Shipping',
    anchor: 'product_shipping',
    subTitle: '',
    rightSlot: null,
    render: (field: FormListFieldData) => <Shipping field={field} />,
  },
]
export enum FormKey {
  BasicInfomation,
  Specification,
  SaleInfomation,
  Shipping,
}

export const formInitialValues = {
  product: Array(1)
    .fill(1)
    .map((el, idx) => {
      let newEl = {
        fieldKey: idx,
        isListField: true,
        key: idx,
        name: idx,
      }
      return newEl
    }),
}
export const headerOrigition = [
  { label: 'Image', type: 'upload', keyVal: 'defaultImage' },
  { label: '*SKU', type: 'input', require: true, keyVal: 'skuNo' },
  { label: 'SKUName', type: 'input', require: true, keyVal: 'skuName' },
  // { label: 'Sub-SKU', type: 'subSku', keyVal: '' },
  { label: 'EAN', type: 'input', keyVal: 'eanCode' },
  {
    label: 'Subscription',
    type: 'select',
    keyVal: 'subscriptionStatus',
    options: [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ],
  },
  { label: 'List Price', type: 'priceInput', keyVal: 'listPrice' },
  { label: 'Marketing Price', type: 'priceInput', keyVal: 'marketingPrice' },
  { label: 'Subscription Price', type: 'priceInput', keyVal: 'subscriptionPrice' },
  { label: 'Stock', type: 'number', keyVal: 'stock' },
  { label: 'Feeding Days', type: 'number', keyVal: 'feedingDays' },
  {
    label: '*Support 100',
    type: 'select',
    require: true,
    keyVal: 'isSupport100',
    options: [
      { label: 'Yes', value: 'true', name: 'true' },
      { label: 'No', value: 'false', name: 'false' },
    ],
  },
  { label: 'Live/Dellist', type: 'shelves', keyVal: 'shelvesStatus' }, //上下架
]

export const SortContainer = SortableContainer(({ children }: { children: any }) => {
  return <ul>{children}</ul>
})
