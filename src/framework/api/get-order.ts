// import { ApiRoot } from './../../api/request'
// import { mockOrderList } from "../mock/orderlist"
import { normaliseOrder } from '../normalize/order'
import { Order } from '../types/order'
import ApiRoot from './fetcher'
export const getOrderList = async (): Promise<Order[]> => {

  try {
    let { orders } = await ApiRoot.orders().getOrders({ storeId: '12345678' })
    console.info('list', orders)
    let list = orders.map((order: any) => normaliseOrder(order))
    return list

  } catch (e) {
    console.log(e)
    return []
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