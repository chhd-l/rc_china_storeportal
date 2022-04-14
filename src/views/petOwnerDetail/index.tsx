import Mock from "mockjs";
import React, { useEffect, useState } from "react";
import { Anchor } from "antd";
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
} from "./components";
import { petOwnerDetailSource } from "./modules/mockdata";
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
  } = petOwnerDetail;
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    console.log("111", state.id);
    setPetOwnerId(state.id);
    console.log(petOwnerId);
    setPetOwnerDetail(Mock.mock(petOwnerDetailSource));
  }, []);

  return (
    <>
      <div className="bg-gray1 p-4 flex flex-row">
        <div className="bg-white w-5/6 p-4 text-left">
          <BasicInfo
            id="basic-information"
            basicInformation={basicInformation}
          />
          <Tagging id="tagging" tagList={tagList} />
          <Pets id="pet-information" petList={petList} />
          <TencentAccount
            id="tencent-account"
            tencentAccountList={tencentAccountList}
          />
          <Orders id="order-information" orderList={orderList} />
          <Subscriptions
            id="subscription-information"
            subscriptionList={subscriptionList}
          />
          <Address id="my-address" addressList={addressList} />
          <Coupons id="coupon-information" couponCodeList={couponCodeList} />
          <SmartDevice id="smart-device" smartDeviceList={smartDeviceList} />
        </div>
        <div className="w-42 ml-4 fixed right-6 rc-anchor">
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
