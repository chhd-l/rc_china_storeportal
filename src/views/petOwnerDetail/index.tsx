import Mock from 'mockjs'
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
import { petOwnerDetailSource } from './modules/mockdata'
import { useLocation } from 'react-router-dom'
import './index.less'
import { ContentContainer, InfoContainer } from '@/components/ui'

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
  const { couponCodeList, smartDeviceList, subscriptionList, orderList } = petOwnerDetail

  useEffect(() => {
    const state: any = location.state
    // console.log('111', state.id)
    setPetOwnerId(state.id)
    // setPetOwnerDetail(Mock.mock(petOwnerDetailSource))
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
              <Subscriptions id="subscription-information" subscriptionList={subscriptionList} />
              <Address id="my-address" customerId={petOwnerId} />
              <Coupons id="coupon-information" couponCodeList={couponCodeList} />
              <SmartDevice id="smart-device" smartDeviceList={smartDeviceList} />
            </InfoContainer>
          ) : null}
        </div>
        <div className="fixed right-0 rc-anchor">
          <Anchor affix={true} offsetTop={120} className="petowner-anchor-link">
            <Link href="#basic-information" title="Basic Information" />
            <Link href="#tagging" title="Tagging" />
            <Link href="#pet-information" title="Pet Information" />
            <Link href="#tencent-account" title="Tencent Account" />
            <Link href="#order-information" title="Order Information" />
            <Link href="#subscription-information" title="Subscription Information" />
            <Link href="#my-address" title="My Address" />
            <Link href="#coupon-information" title="Coupon Information" />
            <Link href="#smart-device" title="Smart Device" />
          </Anchor>
        </div>
      </div>
    </ContentContainer>
  )
}
export default PetOwnerList
