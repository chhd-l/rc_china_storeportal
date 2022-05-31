import { Typography, Form, DatePicker, Button, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import OrderTable from '@/components/order/OrderTable'
import { OrderSearchParamsProps } from '@/framework/types/order'
import { PageParamsProps } from '@/framework/types/common'
import { handleQueryParams } from '../modules/handle-query-params'
import { getOrderList } from '@/framework/api/get-order'
import { initSearchParams } from '@/views/orderList/modules/constants'
import { initPageParams } from '@/lib/constants'

const Orders = ({ state }: { state: any }) => {
  const [orderList, setOrderList] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [pageParams, setPageParams] = useState(initPageParams)
  const [loading, setLoading] = useState(false)
  const { currentPage, pageSize } = pageParams
  const [searchParams, setSearchParams] = useState<OrderSearchParamsProps>(initSearchParams)
  const [pickValue, setPickValue] = useState<any>(undefined)

  const getOrderLists = async ({
    searchParams,
    pageParams,
  }: {
    searchParams: OrderSearchParamsProps
    pageParams: PageParamsProps
  }) => {
    setLoading(true)
    console.log('1111111', state)
    let params = handleQueryParams({ searchParams, pageParams, voucherId: state?.id })
    console.log('query orders view params', params)
    const res = await getOrderList(params)
    console.log('res', res)
    setOrderList(res.records)
    setTotal(res.total)
    setLoading(false)
  }

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
    getOrderLists({
      searchParams,
      pageParams: { currentPage: page, pageSize: pageSize },
    })
  }

  useEffect(() => {
    getOrderLists({ searchParams, pageParams })
  }, [searchParams, pageParams, state?.id])

  return (
    <div>
      <Typography.Title className="mb-md" level={4}>
        Orders
      </Typography.Title>
      <div className="flex items-center justify-end pb-4">
        <Form.Item label="Order Time Date" className="m-0 mr-3">
          <DatePicker.RangePicker
            value={pickValue}
            onChange={(date, dateString) => {
              setPickValue(date)
              setSearchParams({ ...searchParams, startTime: dateString[0], endTime: dateString[1] })
            }}
          />
        </Form.Item>
        <Button type="primary" onClick={() => {}}>
          Search
        </Button>
      </div>
      <OrderTable
        orderList={orderList}
        shipOrCompleteSuccess={() => getOrderLists({ searchParams, pageParams })}
        changeCarrier={() => {}}
        origin={'voucher'}
      />
      {total > 0 && (
        <div className="flex flex-row justify-end mt-4">
          <Pagination
            current={currentPage}
            total={total}
            pageSize={pageSize}
            onChange={changePage}
            showSizeChanger={true}
            className="rc-pagination"
          />
        </div>
      )}
    </div>
  )
}

export default Orders
