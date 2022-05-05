import { ReactNode } from 'react'
import { GoodsAttributeAndValue } from '../schema/product.schema'
import { OptionsProps, PageProps } from './common'

export interface TableHeadersItemProps {
  title: string
  dataIndex: string
  sortDirection?: string
  render?: (spu: ProductListItemProps, spuIdx: number) => ReactNode
}

// categories
export interface CategoryBaseProps {
  displayName: string
  type: number
  createdUser: string
  productNum: number
  isDisplay: boolean
  id: string
}
export interface ProductForCateProps {
  productName: string
  marketingPrice: number
  stock: number
}
export interface CategoryProductProps extends CategoryBaseProps {
  rules: OptionsProps[]
  productList: ProductForCateProps[] | []
}
export interface ProductBaseProps {
  id: number
  price: number
  status: number
  stock: number
  skuId: string
}

export interface AssertsProps {
  type: string
  url: string
}
export interface TreeDataProps {
  value: string
  label: string
  children: TreeDataProps
}
export interface AttributeListProps {
  id: string
  attributeName: string
  attributeNameEn: string
  defaultVal?: string
  // attributeRank: number
  name: string
  label: string
  options: AttributeValListProps[]
}

export interface AttributeValListProps {
  name: string
  value: string
  id: string
  relId: string
  attributeName: string
  attributeNameEn: string
  attributeId: string
  attributeValueName: string
  attributeValueNameEn: string
}
export interface ProductDetailProps {
  // age: string
  brandId: string
  // breeds: string
  cardName: string
  cateId: string
  goodsDescription: string
  // feedingDays: string
  // functions: string
  height: string
  assets: AssertsProps[]
  length: string
  brandList: [],
  goodsAttributeValueRel?: GoodsAttributeAndValue[]
  // attributeList: AttributeListProps[],
  categoryList?: TreeDataProps[],
  // lifeStage: string
  // listPrice: string
  // marketingPrice: string
  // name: string
  salesStatus: string
  // size: string
  // spu: string
  // stock: string
  // subscription: string
  // subscriptionPrice: string
  isSupport100?: string
  // technology: string
  // video: string
  weight: string
  width: string
  // zone: string
}
export interface ProductListSkuItem {
  id: string
  no: string
  specs: string
  price: string
  stock: number
}
export interface ProductListItemProps {
  skus: ProductListSkuItem[]
  img: string
  id: string
  no: string
  shelvesStatus: boolean
  showAll?: boolean
  checked?: boolean
  specs: string
  price: string
  stock: number
  name: string

}
export interface ProductListProps {
  products: ProductListItemProps[]
  all: string
  live: string
  soldOut: string
  disabled: string,
  total?: number
}
export enum ProductType {
  Regular = 'REGULAR',
  // Bundle = 'BUNDLE',
}

export enum AddCateType {
  ManualSelection = '0',
  RuleBasedFiltering = '1',
}
export interface SpecificationListProps {
  option: string
  id?: string
  isDeleted?: boolean
}
export interface VarationProps {
  name: string
  id?: string
  isDeleted?: boolean
  specificationList: SpecificationListProps[]
}
export interface VarationsFormProps {
  changeType: ChangeType
  variationList: VarationProps[]
}
export interface ProductListSimpleQueryProps {
  storeId?: string
  goodsName?: string
  cateId?: string
  productType?: string
  startStock?: string
  endStock?: string
  SKU?: string
  SPU?: string
  SubscriptionStatus?: string
}
export interface ProductListQueryProps extends PageProps {
  sample?: ProductListSimpleQueryProps
}
export enum ChangeType {
  handleVariation = 'VARIATION',
  // addVariation,
  handleSpec = 'SPEC',
  // addSpec,
  // drag
}

export interface shopCateQuery extends PageProps {
  sample?: GoodsPageSampleInput,
}
export interface GoodsPageSampleInput {
  storeId?: string
  goodsName?: string
  cateId?: string
  type?: string
  startStock?: number
  endStock?: number
  spu?: string
  sku?: string
  subscriptionStatus?: boolean
}