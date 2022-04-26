import ApiRoot from './fetcher'
import Mock from 'mockjs'
import { CateItemProps } from '../schema/product.schema'
import { ProductDetailProps, TreeDataProps } from '../types/product'
import { normaliseAttrProps, normaliseCateProps, normaliseDetailforFe } from '../normalize/product'
import { brandList } from '../mock/brands'
import { attributeList } from '../mock/attributelist'
// import { categoryList } from '../mock/categorylist'
// import {ApiRoot} from '@/rc-china-commerce/packages/fetch/lib/index'
export const getCategories = async ({ storeId }: { storeId: string }): Promise<TreeDataProps[]> => {

  try {
    let categoryList = await ApiRoot.products().getProductCategories({ storeId })
    const cateList: TreeDataProps[] = normaliseCateProps(categoryList.getProductCates)
    console.info('list', cateList)
    return cateList
    // return normalisePets(pets)
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getBrands = () => {
  try {
    console.info('list', brandList)
  } catch (e) {
    console.log(e)
  }
  return brandList
}
export const getAttrs = () => {
  let data = normaliseAttrProps(attributeList)
  try {
    console.info('getAttrslist', data)
  } catch (e) {
    console.log(e)
  }
  return data
}

export const getProduct = async ({ storeId, goodsId }: { storeId: string, goodsId: string }): Promise<ProductDetailProps> => {

  try {
    const detailinfo = await ApiRoot.products().getProductBySpu({ storeId, goodsId })
    // const detailinfo = detail
    const normalizedData = normaliseDetailforFe(detailinfo)
    return normalizedData

  } catch (e) {
    console.log(e)
    return {} as ProductDetailProps
  }
}

export const getProductBySpuId = async () => {
  const data = await ApiRoot.products().getAllProducts()
  console.info('.......getAllProducts', data)
  try {
  } catch (e) {
    console.log(e)
    // return
  }
  return data
}


export const getProductDetail = async ({ storeId, goodsId }: { storeId: string, goodsId: string }) => {

  try {
    const { productDetail } = await ApiRoot.products().getProductDetail({ storeId, goodsId })
    const { listAttributeGet, listCategoryGet, findGoodsByGoodsId } = productDetail
    let detail = Object.assign({}, findGoodsByGoodsId, { listAttributeGet, listCategoryGet })
    let info = normaliseDetailforFe(detail)
    return info
  } catch (e) {
    console.log(e)
    return {}
  }
}




