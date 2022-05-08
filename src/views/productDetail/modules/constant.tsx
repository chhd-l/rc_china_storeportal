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
    dataTips: '',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    addonBefore: '¥',
    label: 'List Price',
    name: 'listPrice',
    dataTips: '',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    addonBefore: '¥',
    dataTips: '',
    label: 'Marketing Price',
    name: 'marketingPrice',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    addonBefore: '¥',
    dataTips: '',
    label: 'Subscription Price',
    name: 'subscriptionPrice',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    label: 'Stock',
    dataTips: '',
    name: 'stock',
    rules: [{ required: true }],
  },
  {
    type: 'input',
    label: 'Feeding Days',
    dataTips: '',
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
    dataTips: '',
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
    render: (field: FormListFieldData, form: any) => <BasicInfo field={field} form={form} />,
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
    render: (field: FormListFieldData, form: any) => <SalesInfo field={field} form={form} />,
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
export const headerOrigition: any = [
  {
    label: 'Image',
    type: 'upload',
    keyVal: 'defaultImage',
    dataTips: `Variation Image:
  <p>Variation image should be clear and in line with the variation name</p>
  <p>Image for each of the variations should also be in the same format</p>
  `,
  },
  {
    label: '*SKU',
    type: 'input',
    require: true,
    keyVal: 'skuNo',
    dataTips: `SKU:<p>SKU should be unique and conform to coding rules</p>
  `,
  },
  {
    label: 'SKUName',
    type: 'input',
    require: true,
    keyVal: 'skuName',
    dataTips: `SKU Name:
  <p>SKU Name should be related to the variation option</p>
  `,
  },
  {
    label: 'Sub-SKU',
    type: 'subSku',
    keyVal: `Sub-SKU:<p>Sub-SKU should add the sub-products that the SKU needs to be bound and sold</p>`,
  },
  {
    label: 'EAN',
    type: 'input',
    keyVal: 'eanCode',
    dataTips: `EAN:
    <p>EAN should be associated with SKUs and conform to coding rules</p>
    `,
  },
  {
    label: 'Subscription',
    type: 'select',
    keyVal: 'subscriptionStatus',
    dataTips: `Subscription:<p>Support subscription should configure Y</p>    
    <p>Subscription not supported should be N</p>
    `,
    options: [
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ],
  },
  {
    label: 'List Price',
    type: 'priceInput',
    keyVal: 'listPrice',
    dataTips: `List Price:
  <p>List Price should include VAT and remain stable over time.</p>`,
  },
  {
    label: 'Marketing Price',
    type: 'priceInput',
    keyVal: 'marketingPrice',
    dataTips: `Marketing Price:
  <p>Marketing Price should include VAT and remain stable over time.</p>`,
  },

  {
    label: 'Subscription Price',
    type: 'priceInput',
    keyVal: 'subscriptionPrice',
    dataTips: `Subscription Price:
  <p>Subscription price should include VAT and no more than the market price.</p>
  <p>Subscription status is N, and the subscription price cannot be entered.</p>
  `,
  },
  {
    label: 'Stock',
    type: 'number',
    keyVal: 'stock',
    dataTips: `Stock:
    <p>Number of stocks should reflect the actual stock that is ready to ship.</p>
    <p>If out of stock, please fill in 0, to avoid non-filfillment rate (NFR) or late shipment rate (LSR).</p>
    `,
  },
  {
    label: 'Feeding Days',
    type: 'number',
    keyVal: 'feedingDays',
    dataTips: `Feeding Days:
  <p>Feeding days should be filled reasonably according to the product specifications.</p>
    `,
  },
  {
    label: '*Support 100',
    type: 'select',
    require: true,
    keyVal: 'isSupport100',
    dataTips: `Support 100:
<p>Product production date is set to Y within 100 days, and set to N when not within 100 days</p>`,
    options: [
      { label: 'Yes', value: 'true', name: 'true' },
      { label: 'No', value: 'false', name: 'false' },
    ],
  },
  {
    label: 'Live/Dellist',
    type: 'shelves',
    keyVal: 'shelvesStatus',
    dataTips: `Live/Delist:
 <p> Live: SKU on the shelf</p>
  <p>Delist: SKU off the shelf</p>`,
  }, //上下架
]

export const SortContainer = SortableContainer(({ children }: { children: any }) => {
  return <ul>{children}</ul>
})
