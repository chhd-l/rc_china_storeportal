import { Tabs, Pagination, ConfigProvider } from 'antd'
import React, { useEffect, useState } from 'react'
import OrderTable from '@/components/order/OrderTable'
import { Order, OrderStatus, OrderSearchParamsProps } from '@/framework/types/order'
import { tabList, initSearchParams } from './modules/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import Search from './components/Search'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { getOrderList } from '@/framework/api/get-order'
import { handleQueryParams } from './modules/handle-query-params'
import { PageParamsProps } from '@/framework/types/common'
import { initPageParams } from '@/lib/constants'
import zhCN from 'antd/lib/locale/zh_CN'
import './index.less'

const PetOwnerList = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [activeKey, setActiveKey] = useState('')
  const [searchParams, setSearchParams] = useState<OrderSearchParamsProps>(initSearchParams)
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [carrier] = useState('')
  const location = useLocation()
  const navigator = useNavigate()

  const getOrderLists = async ({
    searchParams,
    pageParams,
    orderState,
    company,
  }: {
    searchParams: OrderSearchParamsProps
    pageParams: PageParamsProps
    orderState: string
    company: string
  }) => {
    let params = handleQueryParams({ searchParams, pageParams, orderState, shoppingCompany: company })
    console.log('query orders view params', params)
    const res = await getOrderList(params)
    console.log('res', res)
    setOrderList(res.records)
    setTotal(res.total)
  }

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
    getOrderLists({
      searchParams,
      pageParams: { currentPage: page, pageSize: pageSize },
      orderState: activeKey,
      company: carrier,
    })
  }

  useEffect(() => {
    console.log(location)
    const state: any = location.state
    if (location.pathname === '/shipment-list'||location.pathname === '/') {
      setActiveKey(OrderStatus.Toship)
      getOrderLists({ searchParams, pageParams, orderState: OrderStatus.Toship, company: carrier })
    } else {
      setActiveKey(state?.key || '')
      getOrderLists({ searchParams, pageParams, orderState: state?.key || '', company: carrier })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const changeTab = (key: any) => {
    if (key === OrderStatus.Toship && location.pathname !== '/shipment-list') {
      navigator('/shipment-list')
    }
    if (key !== OrderStatus.Toship && location.pathname === '/shipment-list') {
      navigator('/order/order-list', {
        state: { key: key },
      })
    }
    setActiveKey(key)
    // setPageParams(initPageParams)
    getOrderLists({
      searchParams,
      pageParams,
      orderState: key,
      company: carrier,
    })
  }

  return (
    <ContentContainer>
      <SearchContainer className="order-search-top">
        <Tabs activeKey={activeKey} onChange={changeTab}>
          {tabList.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        <Search
          query={(data: OrderSearchParamsProps) => {
            setSearchParams(data)
            setPageParams(initPageParams)
            getOrderLists({
              searchParams: data,
              pageParams,
              orderState: activeKey,
              company: carrier,
            })
          }}
        />
      </SearchContainer>
      <TableContainer className="py-0 pb-5">
        <div className="text-left text-xl font-bold">{total} Orders</div>
        <div className="mt-4  text-left">
          <OrderTable orderList={orderList} />
        </div>
        <div className="flex flex-row justify-end mt-4">
          <ConfigProvider locale={zhCN}>
            <Pagination current={currentPage} total={total} pageSize={pageSize} onChange={changePage} />
          </ConfigProvider>
        </div>
      </TableContainer>
    </ContentContainer>
  )
}
export default PetOwnerList
