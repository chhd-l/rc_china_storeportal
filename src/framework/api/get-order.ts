import { session } from '@/utils/global'
import { normaliseOrder } from '../normalize/order'
import ApiRoot from './fetcher'

export const getOrderList = async (queryOrderListParams: any): Promise<{ total: number; records: any[] }> => {
  try {
    console.log('query orders view params', queryOrderListParams)
    let res = await ApiRoot.orders().getOrders({ queryOrderListParams })
    const { records, total } = res.orders
    let record = (records || []).map((order: any) => normaliseOrder(order))
    console.log('query orders view list', res)
    return {
      total: total || 0,
      records: record,
    }
  } catch (e) {
    console.log(e)
    return {
      total: 0,
      records: [],
    }
  }
}

export const getOrderDetail = async ({ orderNum }: { orderNum: string }) => {
  let { getOrder } = await ApiRoot.orders().getOrder({ storeId: '12345678', orderNum })
  console.info('res', getOrder)
  const detail = normaliseOrder(getOrder)
  try {
    console.info('list', detail)
    return detail
  } catch (e) {
    console.log(e)
    return {}
  }
}

export const getOrderSetting = async () => {
  try {
    let res = await ApiRoot.orders().getOrderSetting({ storeId: '12345678' })
    console.info('get orderSetting data view', res)
    return res.orderSetting || []
  } catch (e) {
    console.log(e)
    return []
  }
}

export const getExpressCompanyList = async () => {
  try {
    let expressCompanyList = session.get('express-company-list')
    if (!expressCompanyList) {
      let res = await ApiRoot.orders().getExpressCompany({ storeId: '12345678' })
      console.info('get expressCompany data view', res)
      expressCompanyList = res.expressCompanys || []
      session.set('express-company-list', expressCompanyList)
    }
    return expressCompanyList
  } catch (e) {
    console.log(e)
    return []
  }
}

export const shippedOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
      operator: 'zz',
    })
    console.info('shipped order view params', params)
    let res = await ApiRoot.orders().shippedOrder({body:params})
    console.info('shipped order data view', res)
    return res.shippedOrder||false
  } catch (e) {
    console.log(e)
    return false
  }
}
