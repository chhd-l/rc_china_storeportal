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
import { ContentContainer, DivideArea, InfoContainer } from '@/components/ui'

const { Link } = Anchor

const PetOwnerList = () => {
  const location = useLocation()
  const [petOwnerId, setPetOwnerId] = useState('')

  useEffect(() => {
    const state: any = location.state
    setPetOwnerId(state.id)
  }, [])

  return (
    <ContentContainer>
      <div className="flex flex-row">
        <div className="w-5/6">
          {petOwnerId ? (
            <>
              <InfoContainer>
                <BasicInfo id="basic-information" />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
              <Tagging id="tagging" customerId={petOwnerId} />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
              <Pets id="pet-information" customerId={petOwnerId} />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
              <TencentAccount id="tencent-account" customerId={petOwnerId} />
              </InfoContainer>
              <DivideArea />
              <InfoContainer>
              <Orders id="order-information" customerId={petOwnerId} />
              </InfoContainer>
              <DivideArea />
              {/*<InfoContainer>*/}
              {/*<Subscriptions id="subscription-information" subscriptionList={subscriptionList} />*/}
              {/*</InfoContainer>*/}
              {/*<DivideArea />*/}
              <InfoContainer>
              <Address id="my-address" customerId={petOwnerId} />
              </InfoContainer>
              <DivideArea />
              {/*<InfoContainer>*/}
              {/*<Coupons id="coupon-information" couponCodeList={couponCodeList} />*/}
              {/*</InfoContainer>*/}
              {/*<DivideArea />*/}
              {/*<InfoContainer>*/}
              {/*<SmartDevice id="smart-device" smartDeviceList={smartDeviceList} />*/}
              {/*</InfoContainer>*/}
              {/*<DivideArea />*/}
            </>
          ) : null}
        </div>
        <div
          className="fixed rc-anchor"
          style={{
            right: '50px',
          }}
        >
          <Anchor affix={true} offsetTop={150} className="petowner-anchor-link">
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
