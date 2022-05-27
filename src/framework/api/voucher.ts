import ApiRoot from './fetcher'

//获取优惠券列表
export const getVouchers = async (parma: any) => {
  try {
    let res = await ApiRoot.vouchers().getVouchers({ ...parma, isNeedTotal: true, operator: 'zz' })
    return {
      total: res?.voucherFindPage?.total || 0,
      records: res?.voucherFindPage?.records || [],
    }
  } catch (e) {
    console.log(e)
    return {
      total: 0,
      records: [],
    }
  }
}

//获取优惠券详情
export const getVoucherById = async (Id: string) => {
  try {
    let res = await ApiRoot.vouchers().getVoucherById(Id)
    console.log('get voucher by id view data', res)
    return res?.voucherFindById || null
  } catch (e) {
    console.log(e)
    return null
  }
}

//创建优惠券
export const createVoucher = async (parma: any) => {
  try {
    let res = await ApiRoot.vouchers().createVoucher({
      ...parma,
      storeId: '123456',
      operator: 'zz',
    })
    return res?.voucherInsert || false
  } catch (e) {
    console.log(e)
    return false
  }
}

//编辑优惠券
export const updateVoucher = async (parma: any) => {
  try {
    let res = await ApiRoot.vouchers().updateVoucher({
      ...parma,
      storeId: '123456',
      operator: 'zz',
    })
    return res?.voucherUpsert || false
  } catch (e) {
    console.log(e)
    return false
  }
}

//删除优惠券
export const deleteVoucher = async (Id: string) => {
  try {
    let res = await ApiRoot.vouchers().deleteVoucher(Id)
    console.log('delete voucher view data', res)
    return res?.voucherDelete || false
  } catch (e) {
    console.log(e)
    return false
  }
}

//end 优惠券
export const endVoucher = async (Id: string) => {
  try {
    let res = await ApiRoot.vouchers().voucherActivityEnd({
      voucherId: Id,
      voucherStatus: 'Expired',
      storeId: '123456',
      operator: 'zz',
    })
    console.log('end voucher view data', res)
    return res?.voucherActivityEnd || false
  } catch (e) {
    console.log(e)
    return false
  }
}

//删除优惠券绑定的商品
export const goodsRelatedDelete = async () => {
  try {
    //ids:string[]
    let res = await ApiRoot.vouchers().goodsRelatedDelete([])
    console.log('goodsRelatedDelete view data', res)
    return res?.goodsRelatedDelete || false
  } catch (e) {
    console.log(e)
    return false
  }
}
//删除优惠券绑定的商品
export const getCustomerVouchers = async (params: any) => {
  try {
    //ids:string[]
    let res = await ApiRoot.vouchers().getCustomerVouchers(params)
    console.log('getCustomerVouchers view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getVoucherKeyMetric = async () => {
  try {
    let res = await ApiRoot.vouchers().getVoucherKeyMetric()
    console.log('getVoucherKeyMetric view data', res)
    return res?.voucherKeyMetric || null
  } catch (e) {
    console.log(e)
    return null
  }
}
