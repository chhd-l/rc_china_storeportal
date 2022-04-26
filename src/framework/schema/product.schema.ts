export enum IsSupport100 {
  Yes = 'YES',
  No = 'No',
}
export enum GoodsType {
  Bundle = 'BUNDLE',
  Regular = 'REGULAR',
  Other = 'OTHER',
}
export enum IsShelves {
  OnShelves = 'ON_SHELVES',
  OffShleves = 'OFF_SHELVES',
  Other = 'OTHER',
}
export interface GoodsAttribute {
  id: string
  attributeName: string
  attributeNameEn: string
  // attributeRank: number
  // storeId: string
  // isDeleted: number
  values: GoodsAttributeValue[]
}
export interface GoodsAttributeValue {
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
export interface BrandInfo {
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
export interface GoodsSpecificationDetail {
  id: string
  // goodsId: string
  goodsSpecificationId: string
  specificationDetailName: string
  // specificationDetailNameEn: string
  // storeId: string
  // lastModifiedBy: string
  // createdAt: string
  // createdBy: string
  // lastModifiedAt: string
  // iDeleted: string
}
export interface GoodsSpecification {
  id: string
  // GoodsId: string
  specificationName: string
  specificationNameEn: string
  goodsSpecificationDetail: GoodsSpecificationDetail[]
  // createdAt: string
  // createdBy: string
  // lastModifiedAt: string
  // lastModifiedBy: string
  // isDeleted: Boolean
}
export interface GoodsSpecificationValueRel {
  goodsSpecificationId: string
  goodsSpecificationDetailId: string
  // goodsVariantId: string
  id: string
}
export interface GoodsVariants {
  id: string
  // goodsId: string
  skuNo: string
  stock: number
  eanCode: string
  name: string
  // skuType: number
  marketingPrice: number // 当前价格
  listPrice: number // 划线价
  // shelvesStatus: IsShelves
  // shelvesTime: string
  // storeId: string
  defaultImage: string
  // subscriptionStatus: number //？？
  feedingDays: number //？？
  subscriptionPrice: number //？？
  // created_at: string
  // created_by: string
  // last_modified_at: string
  // last_modified_by: string
  // is_deleted: string //？？
  goodsSpecificationRel: GoodsSpecificationValueRel[]
}
export interface GoodsAssets {
  // id: string
  // goodsId: string
  // goodsVariantId: string
  artworkUrl: string
  type: string
  // storeId: string
  // createdAt: string
  // is_default: string
  // createdBy: string
  // lastModifiedAt: string
  // lastModifiedBy: string
}

export interface GoodsAttributeAndValue {
  attributeName: string
  attributeNameEn: string
  attributeValueName: string
  attributeValueNameEn: string
  relId: string
  attributeId: string
  attributeValueId: string
  goodsId: string
}
export interface Goods {
  id: string
  spuNo: string
  goodsName: string
  cardName: string //？？
  goodsDescription: string
  isSupport100: IsSupport100 //？？
  type: string
  brandId: string //？？
  goodsCategoryId: string //？？
  // shelvesStatus: IsShelves
  defaultImage: string//？？
  salesStatus: number //？？
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
  goodsSpecifications: GoodsSpecification[]
  goodsVariants: GoodsVariants[]
  goodsAsserts: GoodsAssets[]
  goodsAttributeValueRel: GoodsAttributeAndValue[] //？？
}
