import { session } from '@/utils/global'
import { normaliseOrder } from '../normalize/order'
import { Order } from '../types/order'
import ApiRoot, { isMock } from './fetcher'
import { orderDetailSource, orderListSource } from "@/views/orderDetail/modules/mockdata"
import Mock from 'mockjs'

export const getOrderList = async  (queryOrderListParams: any): Promise<{ total: number; records: any[] }> {
  const isMock = true
  try {
    if (isMock) {
      console.log('1111111')
      return Mock.mock(orderListSource('UNPAID')).array
    } else {
      console.log('query orders view params', queryOrderListParams)
      let res = await ApiRoot.orders().getOrders({ queryOrderListParams })
      const { records, total } = res.orders
      let record = (records || []).map((order: any) => normaliseOrder(order))
      console.log('query orders view list', res)
      return {
        total: total || 0,
        records: record,
      }
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

  try {
    if (isMock) {
      console.log('22222222222222222 ',)
      return Mock.mock(orderDetailSource("UNPAID"))
    } else {
      let { getOrder } = await ApiRoot.orders().getOrder({ storeId: '12345678', orderNum })
      console.info('res', getOrder)
      const detail = normaliseOrder(getOrder)
      console.info('list', detail)
      return detail
    }
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

export const completedOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
      operator: 'zz',
    })
    console.info('completed order view params', params)
    let res = await ApiRoot.orders().completedOrder({body:params})
    console.info('completed order data view', res)
    return res.completedOrder||false
  } catch (e) {
    console.log(e)
    return false
  }
}
