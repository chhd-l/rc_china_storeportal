import { handlePageParams } from '@/utils/utils'

export const handleQueryParams = (params: any) => {
  let page = handlePageParams({
    currentPage: params.current,
    pageSize: params.pageSize,
  })
  let data: any = {
    ...page,
    hasTotal: true,
    sample: {},
  }
  if (params.goodsCategoryId?.length > 0) {
    data.sample.goodsCategoryId = params.goodsCategoryId[params.goodsCategoryId.length - 1]
  }
  if (params.startPrice) {
    data.sample.startPrice = params.startPrice
  }
  if (params.endPrice) {
    data.sample.endPrice = params.endPrice
  }
  if (params.brand) {
    data.sample.brand = params.brand
  }
  if (params.username) {
    if (params.selectName === '3') {
      data.sample.spu = params.username
    } else if (params.selectName === '2') {
      data.sample.sku = params.username
    } else {
      data.sample.goodsName = params.username
    }
  }
  return data
}
