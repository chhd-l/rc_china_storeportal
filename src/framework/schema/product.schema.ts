export enum IsSupport100 {
  Yes = 'YES',
  No = 'No',
}
export enum ProductType {
  Bundle = 'BUNDLE',
  Regular = 'REGULAR',
  Other = 'OTHER',
}
export enum IsShelves {
  OnShelves = 'ON_SHELVES',
  OffShleves = 'OFF_SHELVES',
  Other = 'OTHER',
}
export interface ProductAttribute {
  id: string
  attributeName: string
  attributeNameEn: string
  // attributeRank: number
  // storeId: string
  // isDeleted: number
  values: ProductAttributeValue[]
}
export interface ProductAttributeValue {
  id: string
  attributeId: string
  attributeValueName: string
  attributeValueNameEn: string
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: string
}
export interface Brand {
  id: string
  name: string
  displayName: string
  logo: string
  status: boolean
  companyId: string
  isDeleted: boolean
  createdAt: string
  createdBy: string
  lastModifiedAt: string
  lastModifiedBy: string
}
export interface CateItemProps {
  id: number
  categoryLevel: number
  parentId: number
  categoryName: string
  categoryRank: number
  // categoryPath: string
  // storeId: string
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: number
}
export interface ProductSpecificationDetail {
  id: string
  // productId: string
  specificationId: string
  specificationDetailName: string
  // specificationDetailNameEn: string
  // storeId: string
  // lastModifiedBy: string
  // createdAt: string
  // createdBy: string
  // lastModifiedAt: string
  // iDeleted: string
}
export interface ProductSpecification {
  id: string
  // ProductId: string
  specificationName: string
  specificationNameEn: string
  specificationDetails: ProductSpecificationDetail[]
  // createdAt: string
  // createdBy: string
  // lastModifiedAt: string
  // lastModifiedBy: string
  // isDeleted: Boolean
}
export interface ProductVariantBundleRel {
  id: string
  variantId: string
  subVariantId: string
  bundleNumber: number
  skuNo: string
  stock?: number
  storeId?: string
  operator?: string
  isDeleted?: boolean
}
export interface ProductSpecificationValueRel {
  specificationId: string
  specificationDetailId: string
  // variantId: string
  id: string
}
export interface ProductVariants {
  id: string
  // productId: string
  skuNo: string
  stock: number
  eanCode: string
  name: string
  skuType: string
  marketingPrice: string // 当前价格
  listPrice: number // 划线价
  shelvesStatus: boolean
  // shelvesTime: string
  storeId: string
  isSupport100: boolean
  defaultImage: string
  subscriptionStatus: number //？？
  feedingDays: number //？？
  subscriptionPrice: number //？？
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: string //？？
  specificationRelations: ProductSpecificationValueRel[]
  variantBundles: ProductVariantBundleRel[]
}
export interface ProductAssets {
  id: string
  // productId: string
  // variantId: string
  artworkUrl: string
  type: string
  storeId: string
  isDeleted: boolean
  // createdAt: string
  // is_default: string
  // createdBy: string
  // lastModifiedAt: string
  // lastModifiedBy: string
}

export interface ProductAttributeAndValue {
  attributeName: string
  attributeNameEn: string
  attributeValueName: string
  attributeValueNameEn: string
  relId: string
  attributeId: string
  attributeValueId: string
  productId: string
}
export interface Product {
  id: string
  spuNo: string
  name: string
  cardName: string //？？
  description: string
  isSupport100: IsSupport100 //？？
  type: string
  brandId: string //？？
  categoryId: string //？？
  // shelvesStatus: IsShelves
  defaultImage: string//？？
  salesStatus: boolean //？？
  weight: number //？？
  weightUnit: string //？？
  parcelSizeLong: string
  parcelSizeIongunit: string
  parcelSizeHeight: string
  parcelSizeHeightUnit: string
  parcelSizeWidth: string
  parcelSizeWidthUnit: string
  // storeId: string  //？？
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: number//？？
  specifications: ProductSpecification[]
  variants: ProductVariants[]
  asserts: ProductAssets[]
  attributeValueRelations: ProductAttributeAndValue[] //？？
}
