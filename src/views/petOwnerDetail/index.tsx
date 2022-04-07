import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { Anchor } from "antd";
import {
  BasicInfo,
  Tagging,
  PetInfo,
  TencentAccount,
  OrderInfo,
  SubscriptionInfo,
  MyAddress,
  CouponInfo,
  SmartDevice,
} from "./components";
import { dataSource } from "./modules/mockdata";
import { useLocation } from "react-router-dom";
import "./index.less";

const { Link } = Anchor;

const PetOwnerList = () => {
  const [petOwnerId, setPetOwnerId] = useState("");
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
  });
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    console.log("111", state.id);
    setPetOwnerId(state.id);
    console.log(petOwnerId);
    setPetOwnerDetail(Mock.mock(dataSource));
  }, []);

  return (
    <>
      <div className="bg-gray1 py-4 pl-4 flex flex-row">
        <div className="bg-white w-5/6 p-2 text-left">
          <BasicInfo
            id="basic-information"
            basicInformation={petOwnerDetail.basicInformation}
          />
          <Tagging id="tagging" tagList={petOwnerDetail.tagList} />
          <PetInfo id="pet-information" petList={petOwnerDetail.petList} />
          <TencentAccount
            id="tencent-account"
            tencentAccountList={petOwnerDetail.tencentAccountList}
          />
          <OrderInfo
            id="order-information"
            orderList={petOwnerDetail.orderList}
          />
          <SubscriptionInfo
            id="subscription-information"
            subscriptionList={petOwnerDetail.subscriptionList}
          />
          <MyAddress id="my-address" addressList={petOwnerDetail.addressList} />
          <CouponInfo
            id="coupon-information"
            couponCodeList={petOwnerDetail.couponCodeList}
          />
          <SmartDevice
            id="smart-device"
            smartDeviceList={petOwnerDetail.smartDeviceList}
          />
        </div>
        <div className="w-40 ml-10 fixed right-0.5">
          <Anchor affix={true} offsetTop={100} className="petowner-anchor-link">
            <Link href="#basic-information" title="Basic Information" />
            <Link href="#tagging" title="Tagging" />
            <Link href="#pet-information" title="Pet Information" />
            <Link href="#tencent-account" title="Tencent Account" />
            <Link href="#order-information" title="Order Information" />
            <Link
              href="#subscription-information"
              title="Subscription Information"
            />
            <Link href="#my-address" title="My Address" />
            <Link href="#coupon-information" title="Coupon Information" />
            <Link href="#smart-device" title="Smart Device" />
          </Anchor>
        </div>
      </div>
    </>
  );
};
export default PetOwnerList;
