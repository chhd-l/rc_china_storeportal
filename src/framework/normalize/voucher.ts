import { formatMoney } from '@/utils/utils'

export const normaliseVoucherProduct = (productList: any) => {
  const getMarketPrice = (record: any) => {
    if (record?.goodsVariants?.length <= 1) {
      return formatMoney(record?.goodsVariants[0]?.marketingPrice)
    } else if (record?.goodsVariants?.length > 1) {
      let arr = record?.goodsVariants?.sort((a: any, b: any) => {
        return a.marketingPrice - b.marketingPrice
      })
      return formatMoney(arr[0]?.marketingPrice) + '-' + formatMoney(arr[arr.length - 1]?.marketingPrice)
    }
  }
  const setNum = (arr: any) => {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += Number(arr[i].stock) // 点开看 有两个值
    }
    return result
  }
  return productList.map((el: any) => {
    el.goodsVariants = el.goodsVariant || el.goodsVariants
    return {
      id: el.id,
      goodsName: el.goodsName,
      defaultImage: el?.defaultImage || el?.goodsVariants[0]?.defaultImage || '',
      spuNo: el.spuNo,
      brandId: el.brandId === 'B1' ? 'Royal Canin' : 'Eukanuba',
      marketingPrice: getMarketPrice(el),
      stock: el?.goodsVariants?.length > 0 ? setNum(el?.goodsVariants) : 0,
    }
  })
}
