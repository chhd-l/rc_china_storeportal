import apis from '../config/api-config'
import ApiRoot from './fetcher'
import { CateItemProps, Product } from '../schema/product.schema'
import {
  ProductDetailProps,
  ProductListProps,
  ProductListQueryProps,
  SaveShopCategoryInput,
  SearchCreateType,
  SearchListType,
  SearchUpdateType,
  ShopCategoryFilterRulesInput,
  ShopCategoryProductRelInput,
  ShopCategoryUpdateInput,
  shopCateQuery,
  SwitchType,
} from '../types/product'
import {
  normaliseAttrProps,
  normaliseDetailforFe,
  normaliseEditPDP,
  normaliseProductCreatFor,
  normaliseProductListSpu,
  normaliseScProductsforFe,
  normalizeNullDataRemove,
} from '../normalize/product'
import { PageProps } from '../types/common'
import { normaliseBrands } from '../normalize/wechatSetting'
// import { detailMock } from '../mock/productdetail'

export const getCategories = async (): Promise<CateItemProps[]> => {
  try {
    let categoryList = await ApiRoot({ url: apis?.sc_product }).products().getProductCategories({ storeId: 'storeIdMock' })
    return categoryList.productCategoryFind
  } catch (e) {
    console.log(e)
    return []
  }
}
export const getFindShopCategoryProductPage = async (params: any): Promise<any> => {
  try {
    return await ApiRoot({ url: apis?.shop_category }).products().findShopCategoryProductPage(params)
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
    let { specifications, variants, attributeRelations } = paramsData
    if (specifications?.length) {
      diffData.specifications = specifications
    }
    if (variants?.length) {
      diffData.variants = variants
    }
    paramsData = Object.assign({}, diffData, {
      attributeRelations,
      // spuNo: paramsData.spuNo,
      id: paramsData.id,
      asserts: paramsData.asserts,//后面有排序处理，不太好操作先全量
      // productName: paramsData.productName,
      // type: paramsData.type,
      // brandId: paramsData.brandId,
      // productCategoryId: paramsData.productCategoryId,
      shelvesStatus: params.shelvesStatus,
      // defaultImage: paramsData.defaultImage,
      // salesStatus: paramsData.salesStatus,
    })
  }
  paramsData.variants?.forEach((el: any) => {
    if (el?.skuName) {
      el.name = el.skuName
      delete el.skuName
    }
    if (el?.variantBundles) {
      el.variantBundles?.forEach((cel: any) => {
        if (typeof cel.subSkuStock !== 'undefined') {
          delete cel.subSkuStock
        }
        if (typeof cel.marketingPrice !== 'undefined') {
          delete cel.marketingPrice
        }
        if (typeof cel.subscriptionPrice !== 'undefined') {
          delete cel.subscriptionPrice
        }
        if (typeof cel.listPrice !== 'undefined') {
          delete cel.listPrice
        }
        if (typeof cel.stock !== 'undefined') {
          delete cel.stock
        }
      })
      //名字更换，
      // el.variantBundles = el.variantBundles
      // delete el.variantBundles
    }

  })
  paramsData.asserts?.forEach((el: any, idx: number) => {
    el.rank = idx + 1
  })
  console.info('paramsData', paramsData)
  try {
    const data = await ApiRoot({ url: apis?.sc_product }).products().createProduct({ body: paramsData })
    console.info('createProduct', data)
    return data?.productCreate
  } catch (err) {
    console.info('createProduct err', err)
    return false
  }
}
export const getAttrs = async ({ categoryId }: { categoryId: string }) => {
  try {
    let data = []
    let params: any = { storeId: "storeIdMock" }
    if (categoryId) {
      params.categoryId = categoryId
    }
    const { productAttributeFindByCategoryId: attributeList } = await ApiRoot({ url: apis?.product }).products().getAttrList(params)
    data = normaliseAttrProps(attributeList)
    return data
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getProduct = async ({
  storeId,
  productId,
}: { storeId: string, productId: string }): Promise<ProductDetailProps> => {
  // debugger
  try {
    const detailinfo = await ApiRoot({ url: apis?.sc_product }).products().getProductBySpu({ storeId, productId })
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
    const res = await ApiRoot({ url: apis?.sc_product }).products().getAllProducts(params)
    const list = res.products.map((product: Product) => normaliseProductListSpu(product))
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
export const getESProducts = async (params:
  any): Promise<any> => {
  try {
    const res = await ApiRoot({ url: apis?.product_es_list }).products().getESProductLists(params)
    return res.productFindPageByEs
  } catch (e) {
    return []
  }
}

export const getProductDetail = async ({ storeId, productId }: { storeId: string, productId: string }) => {
  let info: any = {}
  try {
    const res = await ApiRoot({ url: apis?.sc_product }).products().getProductDetail({ storeId, productId })
    // const { productDetail } = detailMock.data
    const { listAttributeGet, listCategoryGet, findProductByProductId } = res
    let detail = Object.assign({}, findProductByProductId, { listAttributeGet, listCategoryGet })
    info = normaliseDetailforFe(detail)
    // debugger
    return { afterData: info, beforeData: findProductByProductId }
  } catch (e) {
    console.log(e)
    return { afterData: info, beforeData: {} }
  }
}
export const deleteProducts = async ({ productId }: { productId: string[] }) => {
  try {
    const data = await ApiRoot({ url: apis?.sc_product }).products().deleteMutation({ storeId: "storeIdMock", ids: productId })
    return true
  } catch (e) {
    console.log(e)
    return false
  }

}


export const switchShelves = async ({ productId, status }: { productId: string[], status: boolean }) => {
  try {
    const data = await ApiRoot({ url: apis?.sc_product }).products().switchShelvesMutation({ ids: productId, status })
    return true
  } catch (e) {
    console.log(e)
    return false
  }

}

export const getScProducts = async (params: ProductListQueryProps): Promise<any> => {
  try {
    let sample = normalizeNullDataRemove(params.sample)
    delete params.sample
    params.sample = { ...sample }
    const res = await ApiRoot({ url: apis?.sc_product }).products().getScProducts(params)
    const data = normaliseScProductsforFe(res)
    return data
  } catch (e) {
    console.log(e)
    return { total: 0, products: [] }
  }
}

export const getShopCategories = async (params: shopCateQuery): Promise<any> => {
  try {
    let res = await ApiRoot({ url: apis?.shop_category }).products().getShopCategoryList(params)
    return res.shopCategoryFindPage
  } catch (e) {
    console.log(e)
  }
}

export const createShopCategoryProductRel = async (params: ShopCategoryProductRelInput[]): Promise<any> => {
  try {
    let res = await ApiRoot({ url: apis?.shop_category }).products().createShopCategoryProductRel({ body: params })
  } catch (e) {
    console.log(e)
  }
}

export const updateShopCategory = async (params: any): Promise<any> => {
  try {
    let res = await ApiRoot({ url: apis?.shop_category }).products().updateShopCategory({ body: params })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const shopCategoryFilterRules = async (params: ShopCategoryFilterRulesInput[]): Promise<any> => {
  console.log(params, 2222222)
  debugger
  try {
    let res = await ApiRoot({ url: apis?.shop_category }).products().shopCategoryFilterRules({ body: params })
  } catch (e) {
    console.log(e)
  }
}

export const saveShopCategory = async (params: SaveShopCategoryInput): Promise<any> => {
  try {
    let res = await ApiRoot({ url: apis?.shop_category }).products().saveShopCategory({ body: params })
    return res
  } catch (e) {
    console.log(e)
  }
}

export const detleShopCateRel = async (params: any): Promise<any> => {
  try {
    return await ApiRoot({ url: apis?.shop_category }).products().detleShopCateRel(params)
  } catch (e) {
    console.log(e)
  }
}


export const getBundleProductvariants = async (params: any) => {
  let data: any = []
  try {
    let res = await ApiRoot({ url: apis?.sc_product }).products().getBundleProductvariants(params)
    data = res?.productRegularFindPage || []
  } catch (e) {
    console.log(e)
    // return
  }
  return data
}


export const HotSearchVisibleSwitch = async (params: SwitchType): Promise<CateItemProps[]> => {
  try {
    let categoryList = await ApiRoot({ url: apis?.product_search }).products().hotSearchVisibleSwitch(params.status, params.storeId)
    return categoryList
  } catch (e) {
    console.log(e)
    return []
  }
}


export const getHotSearchFindPage = async (params: PageProps<SearchListType>): Promise<any> => {
  try {
    let categoryList = await ApiRoot({ url: apis?.product }).products().hotSearchFindPage(params)
    return categoryList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const hotSearchUpdate = async (params: SearchUpdateType): Promise<any> => {
  try {
    let categoryList = await ApiRoot({ url: apis?.product_search }).products().hotSearchUpdate(params)
    return categoryList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const hotSearchCreate = async (params: SearchCreateType): Promise<any> => {
  try {
    let categoryList = await ApiRoot({ url: apis?.product_search }).products().hotSearchCreate(params)
    return categoryList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getBrands = async () => {
  try {
    let res = await ApiRoot({ url: apis?.sc_product }).products().getBarndList()
    console.log('getBrands', res)
    let list = normaliseBrands(res || [])
    return list
  } catch (e) {
    console.log(e)
    return []
  }
}