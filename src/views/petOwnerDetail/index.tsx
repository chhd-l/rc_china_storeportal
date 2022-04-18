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
  const [petOwnerId, setPetOwnerId] = useState('')
  const [petOwnerDetail, setPetOwnerDetail] = useState({
    basicInformation: {},
    tagList: [],
    petList: [],
    tencentAccountList: [],
    addressList: [],
    couponCodeList: [],
    smartDeviceList: [],
    subscriptionList: [],
    orderList: [],
  })
  const {
    basicInformation,
    tagList,
    petList,
    tencentAccountList,
    addressList,
    couponCodeList,
    smartDeviceList,
    subscriptionList,
    orderList,
  } = petOwnerDetail
  const location = useLocation()

  useEffect(() => {
    const state: any = location.state
    console.log('111', state.id)
    setPetOwnerId(state.id)
    setPetOwnerDetail(Mock.mock(petOwnerDetailSource))
  }, [])

  return (
    <ContentContainer>
      <div className="flex flex-row">
        <div className="w-5/6">
          <InfoContainer>
            <BasicInfo id="basic-information" basicInformation={basicInformation} />
            <Tagging id="tagging" tagList={tagList} />
            <Pets id="pet-information" customerId={petOwnerId} />
            <TencentAccount id="tencent-account" tencentAccountList={tencentAccountList} />
            <Orders id="order-information" orderList={orderList} />
            <Subscriptions id="subscription-information" subscriptionList={subscriptionList} />
            <Address id="my-address" />
            <Coupons id="coupon-information" couponCodeList={couponCodeList} />
            <SmartDevice id="smart-device" smartDeviceList={smartDeviceList} />
          </InfoContainer>
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
