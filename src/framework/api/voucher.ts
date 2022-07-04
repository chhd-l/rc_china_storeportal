import apis from '@/framework/config/api-config'
import ApiRoot from './fetcher'

//获取优惠券列表
export const getVouchers = async (parma: any) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().getVouchers({ ...parma, isNeedTotal: true })
    return {
      total: res?.total || 0,
      records: res?.records || [],
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
    let res = await ApiRoot({url:apis?.voucher}).vouchers().getVoucherById(Id)
    console.log('get voucher by id view data', res)
    return res
  } catch (e) {
    console.log(e)
    return null
  }
}

//创建优惠券
export const createVoucher = async (parma: any) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().createVoucher(parma)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

//编辑优惠券
export const updateVoucher = async (parma: any) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().updateVoucher(parma)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

//删除优惠券
export const deleteVoucher = async (Id: string) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().deleteVoucher(Id)
    console.log('delete voucher view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

//end 优惠券
export const endVoucher = async (Id: string) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().voucherActivityEnd({
      voucherId: Id,
      voucherStatus: 'Expired',
    })
    console.log('end voucher view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

//删除优惠券绑定的商品
export const productRelatedDelete = async () => {
  try {
    //ids:string[]
    let res = await ApiRoot({url:apis?.voucher}).vouchers().productRelatedDelete([])
    console.log('productRelatedDelete view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

//获取PO优惠券列表
export const getConsumerVouchers = async (params: any) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().getConsumerVouchers(params)
    console.log('getConsumerVouchers view data', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getVoucherKeyMetric = async (parmas: any) => {
  try {
    let res = await ApiRoot({url:apis?.voucher}).vouchers().getVoucherKeyMetric(parmas)
    console.log('getVoucherKeyMetric view data', res)
    return res
  } catch (e) {
    console.log(e)
    return null
  }
}
