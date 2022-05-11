import ApiRoot from './fetcher'
import { CateItemProps, Goods } from '../schema/product.schema'
import { ProductDetailProps, ProductListProps, ProductListQueryProps, SaveShopCategoryInput, ShopCategoryFilterRulesInput, ShopCategoryGoodsRelInput, ShopCategoryUpdateInput, shopCateQuery, TreeDataProps } from '../types/product'
import { normaliseAttrProps, normaliseCateProps, normaliseDetailforFe, normaliseProductCreatFor, normaliseProductListSpu, normaliseScProductsforFe, normalizeNullDataRemove, normaliseEditPDP } from '../normalize/product'
import { brandList } from '../mock/brands'
export const getCategories = async ({ storeId }: { storeId: string }): Promise<CateItemProps[]> => {

  try {
    let categoryList = await ApiRoot.products().getProductCategories({ storeId })
    // const cateList: TreeDataProps[] = normaliseCateProps(categoryList.getProductCates)
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
      // spuNo: paramsData.spuNo,
      id: paramsData.id,
      goodsAsserts: paramsData.goodsAsserts//后面有排序处理，不太好操作先全量
      // goodsName: paramsData.goodsName,
      // type: paramsData.type,
      // brandId: paramsData.brandId,
      // goodsCategoryId: paramsData.goodsCategoryId,
      // shelvesStatus: paramsData.shelvesStatus,
      // defaultImage: paramsData.defaultImage,
      // salesStatus: paramsData.salesStatus,
    })
  }
  paramsData.goodsVariants?.forEach((el: any) => {
    if (el?.skuName) {
      el.name = el.skuName
      delete el.skuName
    }
  })
  console.info('paramsData', paramsData)
  try {
    const data = await ApiRoot.products().createProduct({ body: paramsData })
    console.info('createProduct', data)
    return data?.createProduct
  } catch (err) {
    console.info('createProduct err', err)
    return false
  }
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
  const data = await ApiRoot.products().getAllProducts(params)
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
  } catch (e) {
    console.log(e)
    return {}
  }

}


export const switchShelves = async ({ goodsId, status }: { goodsId: string[], status: boolean }) => {
  try {
    const data = await ApiRoot.products().switchShelvesMutation({ goodsId, status })
  } catch (e) {
    console.log(e)
    return {}
  }

}

export const getScProducts = async (params: ProductListQueryProps): Promise<any> => {
  try {
    let sample = normalizeNullDataRemove(params.sample)
    delete params.sample
    params.sample = { ...sample }
    const res = await ApiRoot.products().getScProducts(params)
    const data = normaliseScProductsforFe(res.getScProducts)
    return data
  } catch (e) {
    console.log(e)
    return { total: 0, products: [] }
  }
}

export const getShopCategories = async (params: shopCateQuery): Promise<any> => {
  try {
    let res = await ApiRoot.products().getShopCategoryList(params)
    return res.getShopCategories
  } catch (e) {
    console.log(e)
  }
}

export const createShopCategoryGoodsRel = async (params: ShopCategoryGoodsRelInput[]): Promise<any> => {
  try {
    let res = await ApiRoot.products().createShopCategoryGoodsRel({ body: params })
  } catch (e) {
    console.log(e)
  }
}

export const updateShopCategory = async (params: ShopCategoryUpdateInput): Promise<any> => {
  try {
    let res = await ApiRoot.products().updateShopCategory({ body: params })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const shopCategoryFilterRules = async (params: ShopCategoryFilterRulesInput[]): Promise<any> => {
  try {
    let res = await ApiRoot.products().shopCategoryFilterRules(params)
  } catch (e) {
    console.log(e)
  }
}

export const saveShopCategory = async (params: SaveShopCategoryInput): Promise<any> => {
  try {
    let res = await ApiRoot.products().saveShopCategory({ body: params })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const detleShopCateRel = async (id: string[]): Promise<any> => {
  try {
    let res = await ApiRoot.products().detleShopCateRel({ id })
    console.info('detleShopCateRel', res)
  } catch (e) {
    console.log(e)
  }
}


export const getBundleGoodsvariants = async (params: any) => {
  let data: any = []
  try {
    let res = await ApiRoot.products().getBundleGoodsvariants(params)
    data = res?.findBundleGoodsVariantList || []
  } catch (e) {
    console.log(e)
    // return
  }
  return data
}


