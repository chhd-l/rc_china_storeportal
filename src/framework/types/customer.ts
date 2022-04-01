import { Order } from "./order";

export interface PetOwner {
  basicInformation: Customer;
  tagList: Tag[];
  petList: Pet[];
  tencentAccountList: TencentAccount[];
  addressList: Address[];
  couponCodeList: CouponCode[];
  smartDeviceList: SmartDevice[];
  subscriptionList: [];
  orderList: Order[];
}

export interface Customer {
  id: string;
  image: string;
  name: string;
  phone: string;
  loginTime: string;
  nickname?: string; //昵称
  level?: string; //?
  points?: number; //积分情况，小程序会显示
  tenant?: []; //store 相关
}

export interface Tag {
  id?: string;
  name: string;
  isEnabled?: boolean;
  count?: number;
}

export interface Pet {
  id: string;
  img: string;
  name: string;
  age?: number; //后端传的是birthday,需要计算出age
  breed: PetBreed | string;//先兼容目前的页面数据不会报错
  gender?: string;
  type: string;
  isSterilized?: boolean;
  birthday?: string;
}

export interface PetBreed {
  species?: string;
  name: string;
  code?: string;
  image?: string;
}

export interface TencentAccount {
  unionId: string;
  openId: string;
  userType: string;
  followStatus: string;
  followedTime: string;
  unfollowedTime: string;
  memberId?: string;
}

export interface Address {
  id: string;
  receiverName: string;
  phone: string;
  province: string;
  city: string;
  region: string;
  detail: string;
  postCode: string;
  isDefault: number;
  country?: string;
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
