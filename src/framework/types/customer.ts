import { Order } from "./order";

export interface PetOwner {
  basicInformation: BasicInfor;
  tagList: Tag[];
  petList: Pet[];
  tencentAccountList: TencentAccount[];
  addressList: Address[];
  couponCodeList: CouponCode[];
  smartDeviceList: SmartDevice[];
  subscriptionList: [];
  orderList: Order[];
}

export interface BasicInfor {
  id: string;
  profileImg: string;
  name: string;
  phone: string;
  loginTime: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Pet {
  id: string;
  img: string;
  name: string;
  age: number;
  breed: string;
}

export interface TencentAccount {
  unionId: string;
  openId: string;
  userType: string;
  followStatus: string;
  followedTime: string;
  unfollowedTime: string;
}

export interface Address {
  id: string;
  receiverName: string;
  phoneNumber: string;
  province: string;
  city: string;
  district: string;
  address: string;
  postalCode: string;
  isDefault: number;
}

export interface CouponCode {
  id: string;
  couponCode: string;
  couponName: string;
  couponType: string;
  couponValue: number;
  startTime: string;
  expirationTime: string;
  couponStatus: string;
  comment: string;
}

export interface SmartDevice {
  id: string;
  deviceName: string;
  deviceSku: string;
  status: string;
  lockedTime: string;
  subscriptionNumber: string;
  subscriptionTime: string;
}
