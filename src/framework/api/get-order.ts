import { session } from '@/utils/global'
import { normaliseOrder, normalizeLogisticsIntegration } from '../normalize/order'
import ApiRoot from './fetcher'
import { orderDetailSource, orderListSource } from '@/views/orderDetail/modules/mockdata'
import Mock from 'mockjs'
import { initOrderDetail } from '@/views/orderDetail/modules/constants'

const isMock = false

export const getOrderList = async (queryOrderListParams: any): Promise<{ total: number; records: any[] }> => {
  try {
    if (isMock) {
      return {
        records: Mock.mock(orderListSource('SHIPPED')).array,
        total: 0,
      }
    } else {
      let expressCompanies = await getExpressCompanyList()
      let res = await ApiRoot.orders().getOrders({ queryOrderListParams })
      console.log('query orders view list', res)
      if (res?.orderFindPage?.records) {
        const { records, total } = res.orderFindPage
        let record = (records || []).map((order: any) => normaliseOrder(order, expressCompanies))
        return {
          total: total || 0,
          records: record,
        }
      } else {
        return {
          total: 0,
          records: [],
        }
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
      console.log('22222222222222222 ')
      return Mock.mock(orderDetailSource('UNPAID'))
    } else {
      let expressCompanies = await getExpressCompanyList()
      let data = await ApiRoot.orders().getOrder({ storeId: '12345678', orderNum })
      console.info('res', data)
      const detail = data?.orderGet ? normaliseOrder(data.orderGet, expressCompanies) : initOrderDetail
      console.info('list', detail)
      return detail
    }
  } catch (e) {
    console.log(e)
    return initOrderDetail
  }
}

export const getOrderSetting = async () => {
  try {
    let res = await ApiRoot.orders().getOrderSetting({ storeId: '12345678' })
    console.info('get orderSetting data view', res)
    return res || []
  } catch (e) {
    console.log(e)
    return []
  }
}

export const updateOrderSetting = async (params: any) => {
  try {
    let res = await ApiRoot.orders().modifyOrderSetting({ body: params })
    console.info('updateOrderSetting data view', res)
    return res?.orderSettingBatchUpdate || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getLogisticsIntegration = async () => {
  try {
    let res = await ApiRoot.orders().getLogisticsIntegration({ storeId: '12345678' })
    console.info('getLogisticsIntegration data view', res)
    return normalizeLogisticsIntegration(res.logisticsIntegrationGet || null)
  } catch (e) {
    console.log(e)
    return null
  }
}

export const modifyLogisticsIntegration = async (params: any) => {
  try {
    let res = await ApiRoot.orders().modifyLogisticsIntegration(params)
    console.info('modifyLogisticsIntegration data view', res)
    return res?.logisticsIntegrationUpdate || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getExpressCompanyList = async () => {
  try {
    let expressCompanyList = session.get('express-company-list')
    if (expressCompanyList === null) {
      let res = await ApiRoot.orders().getExpressCompany({ storeId: '12345678' })
      console.info('get expressCompany data view', res)
      expressCompanyList = res.expressCompanyFind || []
      if (expressCompanyList.length > 0) {
        session.set('express-company-list', expressCompanyList)
      }
    }
    return expressCompanyList || []
  } catch (e) {
    console.log(e)
    return []
  }
}

export const shippedOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
    })
    console.info('shipped order view params', params)
    let res = await ApiRoot.orders().shippedOrder({ body: params })
    console.info('shipped order data view', res)
    return res?.orderShip || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const completedOrder = async (params: any) => {
  try {
    params = Object.assign(params, {
      storeId: '12345678',
    })
    console.info('completed order view params', params)
    let res = await ApiRoot.orders().completedOrder({ body: params })
    console.info('completed order data view', res)
    return res?.orderCompleted || false
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateComment = async (params: any) => {
  try {
    console.info('update comment view params', params)
    let res = await ApiRoot.orders().updateComment({ body: params })
    console.info('completed order data view', res)
    return res?.orderCommentModify || false
  } catch (e) {
    console.log(e)
    return false
  }
}

