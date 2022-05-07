import ApiRoot from './fetcher'
import { CateItemProps, Goods } from '../schema/product.schema'
import { ProductDetailProps, ProductListProps, ProductListQueryProps, SaveShopCategoryInput, ShopCategoryFilterRulesInput, ShopCategoryGoodsRelInput, ShopCategoryUpdateInput, shopCateQuery, TreeDataProps } from '../types/product'
import { normaliseAttrProps, normaliseCateProps, normaliseDetailforFe, normaliseProductCreatFor, normaliseProductListSpu, normaliseScProductsforFe, normalizeNullDataRemove, normaliseEditPDP } from '../normalize/product'
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

export const createProduct = async (params: any, beforeData?: any) => {
  let paramsData: any = normaliseProductCreatFor(params, beforeData)
  if (beforeData?.id) {
    //编辑
    let diffData: any = normaliseEditPDP(beforeData, paramsData)
    let { goodsSpecifications, goodsVariants, goodsAttributeValueRel } = paramsData
    if (goodsSpecifications?.length) {
      diffData.goodsSpecifications = goodsSpecifications
    }
    if (goodsVariants?.length) {
      diffData.goodsVariants = goodsVariants
    }
    paramsData = Object.assign({}, diffData, {
      goodsAttributeValueRel,
      spuNo: paramsData.spuNo,
      id: paramsData.id
    })
  }
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
  // debugger
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


export const getESProducts = async (params: any): Promise<any> => {
  try {
    const res = await ApiRoot.products().getESProductLists(params)
    console.info('res', res)
  } catch (e) {
    console.log(e)
  }
}

export const getProductDetail = async ({ storeId, goodsId }: { storeId: string, goodsId: string }) => {
  let info: any = {}
  try {
    const { productDetail } = await ApiRoot.products().getProductDetail({ storeId, goodsId })
    const { listAttributeGet, listCategoryGet, findGoodsByGoodsId } = productDetail
    let detail = Object.assign({}, findGoodsByGoodsId, { listAttributeGet, listCategoryGet })
    info = normaliseDetailforFe(detail)
    // debugger
    return { afterData: info, beforeData: findGoodsByGoodsId }
  } catch (e) {
    console.log(e)
    return { afterData: info, beforeData: {} }
  }
}
export const deleteProducts = async ({ goodsId }: { goodsId: string[] }) => {
  try {
    const data = await ApiRoot.products().deleteMutation({ goodsId, storeId: "12345678" })
    console.info('{ goodsId }', goodsId)
  } catch (e) {
    console.log(e)
    return {}
  }

}


export const switchShelves = async ({ goodsId, status }: { goodsId: string[], status: boolean }) => {
  try {
    const data = await ApiRoot.products().switchShelvesMutation({ goodsId, status })
    console.info('{ goodsId }', goodsId)
  } catch (e) {
    console.log(e)
    return {}
  }

}

export const getScProducts = async (params: ProductListQueryProps): Promise<any> => {
  try {
    console.info('params', params)
    let sample = normalizeNullDataRemove(params.sample)
    delete params.sample
    params.sample = { ...sample }
    console.info('paramsparams', JSON.stringify(params))
    const res = await ApiRoot.products().getScProducts(params)
    const data = normaliseScProductsforFe(res.getScProducts)
    console.info('resgetScProductsresgetScProducts', data)
    return data
  } catch (e) {
    console.log(e)
    return { total: 0, products: [] }
  }
}

export const getShopCategories = async (params: shopCateQuery): Promise<any> => {
  try {
    let res = await ApiRoot.products().getShopCategoryList(params)
    console.info('getShopCategories', res)
  } catch (e) {
    console.log(e)
  }
}

export const createShopCategoryGoodsRel = async (params: ShopCategoryGoodsRelInput[]): Promise<any> => {
  try {
    let res = await ApiRoot.products().createShopCategoryGoodsRel({ body: params })
    console.info('createShopCategoryGoodsRel', res)
  } catch (e) {
    console.log(e)
  }
}

export const updateShopCategory = async (params: ShopCategoryUpdateInput): Promise<any> => {
  try {
    let res = await ApiRoot.products().updateShopCategory({ body: params })
    console.info('updateShopCategory', res)
  } catch (e) {
    console.log(e)
  }
}

export const shopCategoryFilterRules = async (params: ShopCategoryFilterRulesInput[]): Promise<any> => {
  try {
    let res = await ApiRoot.products().shopCategoryFilterRules(params)
    console.info('shopCategoryFilterRules', res)
  } catch (e) {
    console.log(e)
  }
}

export const saveShopCategory = async (params: SaveShopCategoryInput): Promise<any> => {
  try {
    let res = await ApiRoot.products().saveShopCategory(params)
    console.info('saveShopCategory', res)
  } catch (e) {
    console.log(e)
  }
}


