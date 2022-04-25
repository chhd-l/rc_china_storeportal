import { Tabs, Pagination,ConfigProvider  } from 'antd'
import Mock from 'mockjs'
import React, { useEffect, useState } from 'react'
import OrderTable from '@/components/order/OrderTable'
import { Order } from '@/framework/types/order'
import { orderListSource } from '@/views/orderDetail/modules/mockdata'
import { tabList } from './modules/constants'
import { useLocation } from 'react-router-dom'
import Search from './components/Search'
import { OrderStatus } from '@/framework/types/order'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { getOrderList } from '@/framework/api/get-order'
import zhCN from 'antd/lib/locale/zh_CN';

const PetOwnerList = () => {
  const [orderList, setOrderList] = useState<Order[]>([])
  const [activeKey, setActiveKey] = useState('')
  const [orderTotal, setOrderTotal] = useState(0)
  const location = useLocation()

  useEffect(() => {
    console.log(location)
    if (location.pathname === '/shipment-list') {
      setActiveKey(OrderStatus.Toship)
    } else {
      setActiveKey('')
    }
  }, [location.pathname])

  useEffect(() => {
    getOrderLists()
  }, [activeKey])
  const getOrderLists = async () => {
    let data = await getOrderList()
    console.log("data",data)
    setOrderList(data)
    setOrderTotal(data.length)
  }

  return (
    <ContentContainer>
      <SearchContainer>
        <Tabs
          activeKey={activeKey}
          onChange={key => {
            setActiveKey(key)
          }}
        >
          {tabList.map(item => (
            <Tabs.TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        <Search query={getOrderList} />
      </SearchContainer>
      <TableContainer className='py-0 pb-7'>
        <div className='text-left text-xl font-bold'>{orderTotal} Orders</div>
        <div className='mt-4  text-left'>
          <OrderTable orderList={orderList} />
        </div>
        <div className='text-right pt-4'>
          <ConfigProvider locale={zhCN}>
          <Pagination defaultCurrent={1} total={orderList.length} showSizeChanger={true} />
          </ConfigProvider>
        </div>
      </TableContainer>
    </ContentContainer>
  )
}
export default PetOwnerList
