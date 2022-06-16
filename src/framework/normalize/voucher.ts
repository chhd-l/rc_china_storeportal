import { formatMoney } from '@/utils/utils'

export const normaliseVoucherProduct = (productList: any) => {
  const getMarketPrice = (record: any) => {
    if (record?.productVariants?.length <= 1) {
      return formatMoney(record?.productVariants[0]?.marketingPrice)
    } else if (record?.productVariants?.length > 1) {
      let arr = record?.productVariants?.sort((a: any, b: any) => {
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
    el.productVariants = el.productVariant || el.productVariants
    return {
      id: el.id,
      productName: el.productName,
      defaultImage: el?.defaultImage || el?.productVariants[0]?.defaultImage || '',
      spuNo: el.spuNo,
      brandId: el.brandId === 'B1' ? 'Royal Canin' : 'Eukanuba',
      marketingPrice: getMarketPrice(el),
      stock: el?.productVariants?.length > 0 ? setNum(el?.productVariants) : 0,
    }
  })
}
