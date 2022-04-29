import React, { useEffect, useState } from 'react'
import { Anchor } from 'antd'
import {
  BasicInfo,
  Tagging,
  Pets,
  TencentAccount,
  Orders,
  Subscriptions,
  Address,
  Coupons,
  SmartDevice,
} from './components'
import { useLocation } from 'react-router-dom'
import './index.less'
import { ContentContainer, InfoContainer } from '@/components/ui'
import { getOrderList } from '@/framework/api/get-order'

const { Link } = Anchor

const PetOwnerList = () => {
  const location = useLocation()
  const [petOwnerId, setPetOwnerId] = useState('')
  const [petOwnerDetail, setPetOwnerDetail] = useState({
    couponCodeList: [],
    smartDeviceList: [],
    subscriptionList: [],
    orderList: [],
  })
  const { couponCodeList, smartDeviceList, subscriptionList } = petOwnerDetail
  const [orderList,setOrderList]=useState<any[]>([])

  const getCustomerOrders=async()=>{
    const res=await getOrderList({
      isNeedTotal: true,
      storeId: '12345678',
      operator: 'zz',
      offset:0,
      limit:10,
      sample:{
        customerId:petOwnerId
      }
    })
    setOrderList(res.records)
    console.log(res);
  }

  useEffect(()=>{
    if(petOwnerId!==''){
      getCustomerOrders()
    }
  },[petOwnerId])

  useEffect(() => {
    const state: any = location.state
    setPetOwnerId(state.id)
  }, [])

  return (
    <ContentContainer>
      <div className="flex flex-row">
        <div className="w-5/6">
          {petOwnerId ? (
            <InfoContainer>
              <BasicInfo id="basic-information" />
              <Tagging id="tagging" customerId={petOwnerId} />
              <Pets id="pet-information" customerId={petOwnerId} />
              <TencentAccount id="tencent-account" customerId={petOwnerId} />
              <Orders id="order-information" orderList={orderList} />
              {/*<Subscriptions id="subscription-information" subscriptionList={subscriptionList} />*/}
              <Address id="my-address" customerId={petOwnerId} />
              {/*<Coupons id="coupon-information" couponCodeList={couponCodeList} />*/}
              {/*<SmartDevice id="smart-device" smartDeviceList={smartDeviceList} />*/}
            </InfoContainer>
          ) : null}
        </div>
        <div className="fixed rc-anchor" style={{
          right: '50px'
        }}>
          <Anchor affix={true} offsetTop={100} className="petowner-anchor-link">
            <Link href="#basic-information" title="Basic Information" />
            <Link href="#tagging" title="Tagging" />
            <Link href="#pet-information" title="Pet Information" />
            <Link href="#tencent-account" title="Tencent Account" />
            <Link href="#order-information" title="Order Information" />
            {/*<Link href="#subscription-information" title="Subscription Information" />*/}
            <Link href="#my-address" title="My Address" />
            {/*<Link href="#coupon-information" title="Coupon Information" />*/}
            {/*<Link href="#smart-device" title="Smart Device" />*/}
          </Anchor>
        </div>
      </div>
    </ContentContainer>
  )
}
export default PetOwnerList
