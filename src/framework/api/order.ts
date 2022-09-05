import { session } from '@/utils/global'
import { normaliseOrder, normalizeLogisticsIntegration } from '../normalize/order'
import ApiRoot from './fetcher'
import { orderDetailSource, orderListSource } from '@/views/orderDetail/modules/mockdata'
import Mock from 'mockjs'
import { initOrderDetail } from '@/views/orderDetail/modules/constants'
import apis from '@/framework/config/api-config'

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
      let res = await ApiRoot({ url: apis?.orderList }).orders().getOrders({ queryOrderListParams })
      console.log('query orders view list', res)
      if (res?.records) {
        const { records, total } = res
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
      let data = await ApiRoot({ url: apis?.orderDetail }).orders().getOrder({ orderNum })
      console.info('res', data)
      const detail = data ? normaliseOrder(data, expressCompanies) : initOrderDetail
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
    let res = await ApiRoot({ url: apis?.orderList }).orders().getOrderSetting()
    console.info('get orderSetting data view', res)
    return res || []
  } catch (e) {
    console.log(e)
    return []
  }
}

export const updateOrderSetting = async (params: any) => {
  try {
    let res = await ApiRoot({ url: apis?.order_action }).orders().modifyOrderSetting({ body: params })
    console.info('updateOrderSetting data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getLogisticsIntegration = async () => {
  try {
    let res = await ApiRoot({ url: apis?.order_action }).orders().getLogisticsIntegration()
    console.info('getLogisticsIntegration data view', res)
    return normalizeLogisticsIntegration(res)
  } catch (e) {
    console.log(e)
    return null
  }
}

export const modifyLogisticsIntegration = async (params: any) => {
  try {
    let res = await ApiRoot({ url: apis?.order_action }).orders().modifyLogisticsIntegration({ body: params })
    console.info('modifyLogisticsIntegration data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getExpressCompanyList = async () => {
  try {
    let expressCompanyList = session.get('express-company-list')
    if (expressCompanyList === null) {
      let res = await ApiRoot({ url: apis?.orderList }).orders().getExpressCompany()
      console.info('get expressCompany data view', res)
      expressCompanyList = res || []
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
    console.info('shipped order view params', params)
    let res = await ApiRoot({ url: apis?.order_action }).orders().shippedOrder({ body: params })
    console.info('shipped order data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const completedOrder = async (params: any) => {
  try {
    console.info('completed order view params', params)
    let res = await ApiRoot({ url: apis?.order_action }).orders().completedOrder({ body: params })
    console.info('completed order data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const updateComment = async (params: any) => {
  try {
    console.info('update comment view params', params)
    let res = await ApiRoot({ url: apis?.order_action }).orders().updateComment({ body: params })
    console.info('completed order data view', res)
    return res
  } catch (e) {
    console.log(e)
    return false
  }
}

export const getInvoiceList = async (params: {
  offset?: number;
  limit?: number;
  withTotal?: boolean;
  sample?: {
    orderNum?: string;
    invoiceType?: string;
    invoiceTitle?: string;
    invoiceStatus?: string;
    addStartTime?: string;
    addEndTime?: string;
  }
}) => {
  try {
    const data = await ApiRoot({ url: apis?.orderList }).orders().invoiceList(params);
    return data ?? {};
  } catch (e) {
    console.log(e);
    return {};
  }
}
