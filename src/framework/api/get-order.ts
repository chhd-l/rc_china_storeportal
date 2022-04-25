// import { ApiRoot } from './../../api/request'
// import { mockOrderList } from "../mock/orderlist"
import { normaliseOrder } from '../normalize/order'
import { Order } from '../types/order'
import ApiRoot, { isMock } from './fetcher'
import { orderDetailSource, orderListSource } from "@/views/orderDetail/modules/mockdata"
import Mock from 'mockjs'

export const getOrderList = async (): Promise<Order[]> => {
  const isMock = true
  try {
    if (isMock) {
      console.log('1111111')
      return Mock.mock(orderListSource('UNPAID')).array
    } else {
      let { orders } = await ApiRoot.orders().getOrders({ storeId: '12345678' })
      console.info('list', orders)
      let list = orders.map((order: any) => normaliseOrder(order))
      return list
    }
  } catch (e) {
    console.log(e)
    return []
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