import ApiRoot from './fetcher'
import { CateItemProps, Goods } from '../schema/product.schema'
import { ProductDetailProps, ProductListProps, ProductListQueryProps, TreeDataProps } from '../types/product'
import { normaliseAttrProps, normaliseCateProps, normaliseDetailforFe, normaliseProductCreatFor, normaliseProductListSpu } from '../normalize/product'
import { brandList } from '../mock/brands'
export const getCategories = async ({ storeId }: { storeId: string }): Promise<CateItemProps[]> => {

  try {
    let categoryList = await ApiRoot.products().getProductCategories({ storeId })
    // const cateList: TreeDataProps[] = normaliseCateProps(categoryList.getProductCates)
    console.info('list', categoryList.getProductCates)
    return categoryList.getProductCates
    // return normalisePets(pets)
  } catch (e) {
    console.log(e)
    return []
  }
}

export const createProduct = async (params: any) => {
  let paramsData = normaliseProductCreatFor(params)
  console.info('paramsData', paramsData)
  const data = await ApiRoot.products().createProduct({ body: paramsData })
  console.info('createProduct', data)
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
    return data
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getProduct = async ({ storeId, goodsId }: { storeId: string, goodsId: string }): Promise<ProductDetailProps> => {
  debugger
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
    debugger
    return info
  } catch (e) {
    console.log(e)
    return {}
  }
}




