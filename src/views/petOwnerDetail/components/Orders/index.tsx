import { DatePicker, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import OrderTable from '@/components/order/OrderTable'
import { getOrderList } from '@/framework/api/get-order'
import { PageParamsProps } from '@/framework/types/common'
import { initPageParams } from '@/lib/constants'
import { handleQueryParams } from '@/views/orderList/modules/handle-query-params'
import { OrderSearchParamsProps } from '@/framework/types/order'
import { initSearchParams } from '@/views/orderList/modules/constants'

interface OrderInfoProps {
  id: string
  customerId: string
}

const OrderInformation = ({ id, customerId }: OrderInfoProps) => {
  const [orderList, setOrderList] = useState<any[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>({
    currentPage: 1,
    pageSize: 3
  })
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [searchParams, setSearchParams] = useState<OrderSearchParamsProps>(initSearchParams)

  const getCustomerOrders = async ({
    searchParams,
    pageParams,
  }: {
    searchParams: OrderSearchParamsProps
    pageParams: PageParamsProps
  }) => {
    let params = handleQueryParams({ searchParams, pageParams, orderState: '', shoppingCompany: '' })
    console.log('query orders view params', params)
    const res = await getOrderList({ ...params, sample: { ...params.sample, customerId } })
    console.log('res', res)
    setOrderList(res.records)
    setTotal(res.total)
  }

  const changePage = async (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize })
    await getCustomerOrders({
      searchParams,
      pageParams: { currentPage: page, pageSize },
    })
  }

  useEffect(() => {
    if (customerId !== '') {
      getCustomerOrders({ searchParams, pageParams })
    }
  }, [customerId])
  return (
    <div id={id}>
      <div className="text-xl font-medium">Order Information</div>
      <div className="flex flex-row items-center justify-end mb-4">
        <div className="w-auto mr-3">Order Creation Date</div>
        <DatePicker.RangePicker
          style={{ width: '300px' }}
          onChange={(date, dateString) => {
            console.log(date, dateString)
            getCustomerOrders({
              searchParams: { ...searchParams, startTime: dateString[0], endTime: dateString[1] },
              pageParams,
            })
          }}
        />
      </div>
      <OrderTable orderList={orderList} />
      <div className="flex flex-row justify-end mt-4">
        <Pagination
          current={currentPage}
          total={total}
          pageSize={pageSize}
          onChange={changePage}
          showSizeChanger={false}
          className="rc-pagination"
        />
      </div>
    </div>
  )
}
export default OrderInformation
