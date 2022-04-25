import { ProductService } from './../../rc-china-commerce/packages/common/lib/services/product.service'
import { Product } from './../../api/models/Product'
import { productLists } from './../../views/categoryDetail/modules/mockdata'
import ApiRoot from './fetcher'
import Mock from 'mockjs'
import { detail } from '../mock/productdetail'
import { CateItemProps, Goods } from '../schema/product.schema'
import { ProductDetailProps, ProductListProps, ProductListQueryProps, TreeDataProps } from '../types/product'
import { normaliseAttrProps, normaliseCateProps, normaliseDetailforFe, normaliseProductListSpu } from '../normalize/product'
import { brandList } from '../mock/brands'
import { attributeList } from '../mock/attributelist'
import { categoryList } from '../mock/categorylist'
// import {ApiRoot} from '@/rc-china-commerce/packages/fetch/lib/index'
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
export const getAttrs = async ({ storeId, categoryId }: { storeId: string, categoryId: string }) => {

  try {
    const { getAttributes: attributeList } = await ApiRoot.products().getAttrList({ storeId, categoryId })
    let data = normaliseAttrProps(attributeList)
    console.info('getAttrslist', data)
    return data
  } catch (e) {
    console.log(e)
    return []
  }
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

export const getAllProducts = async (params: ProductListQueryProps): Promise<ProductListProps> => {
  try {
    const res = await ApiRoot.products().getAllProducts(params)
    const list = res.products.map((product: Goods) => normaliseProductListSpu(product))
    let data = {
      products: list,
      all: 'string',
      live: 'string',
      soldOut: 'string',
      disabled: 'string',

    }
    return data

  } catch (e) {
    console.log(e)
    return {
      products: [],
      all: '0',
      live: '0',
      soldOut: '0',
      disabled: '0',
    }
  }
}

export const getProductBySpuId = async (params: ProductListQueryProps) => {
  // console.info('ApiRoot')
  const data = await ApiRoot.products().getAllProducts(params)
  console.info('.......getAllProducts', data)
  // const detailinfo = detail
  // const normalizedData = normaliseDetailforFe(detailinfo)
  try {
    // return detailinfo
    // const pets = await ApiRoot.products().getProduct({ customerId })
    // return normalisePets(pets)
  } catch (e) {
    console.log(e)
    // return
  }
  return data
}
