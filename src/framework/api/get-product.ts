import ApiRoot from './fetcher'
import Mock from 'mockjs'
import { detail } from '../mock/productdetail'
import { CateItemProps } from '../schema/product.schema'
import { ProductDetailProps, TreeDataProps } from '../types/product'
import { normaliseAttrProps, normaliseCateProps, normaliseDetailforFe } from '../normalize/product'
import { brandList } from '../mock/brands'
import { attributeList } from '../mock/attributelist'
import { categoryList } from '../mock/categorylist'
export const getCategories = (): TreeDataProps[] => {
  const cateList: TreeDataProps[] = normaliseCateProps(categoryList)
  try {
    console.info('list', cateList)
    // const pets = await ApiRoot.products().getCategories({ customerId })
    // return normalisePets(pets)
  } catch (e) {
    console.log(e)
  }
  return cateList
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

export const getProduct = (): ProductDetailProps => {
  const detailinfo = detail
  const normalizedData = normaliseDetailforFe(detailinfo)
  try {
    // return detailinfo
    // const pets = await ApiRoot.products().getProduct({ customerId })
    // return normalisePets(pets)
  } catch (e) {
    console.log(e)
    // return
  }
  return normalizedData
}
