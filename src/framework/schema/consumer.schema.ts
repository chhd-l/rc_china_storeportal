export interface Consumer {
  name: string;
  image: string;
  tencentAccountList: ConsumerAccount[];
  nickname: string; //昵称
  phone: string;
  level: string;
  points: number; //积分情况，小程序会显示
  key: string;
  version: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  lastLoginTime: string;
  tenant: []; //store 相关
  addresses: ConsumerAddress[];
  pets: ConsumerPet[];
  tags: Tag[];
  orders: any[];
  subscriptions: any[];
  coupons: CouponCode[];
  devices: SmartDevice[];
}

export interface ConsumerAccount {
  unionId: string;
  openId: string;
  userType: string;
  followStatus: string;
  followedTime: string;
  unfollowedTime: string;
  memberId: string;
}

export interface ConsumerAddress {
  id: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  detail: string;
  postcode: string;
  isDefault: number;
  country: string;
  region: string;
}

export interface ConsumerPet {
  image: string;
  name: string;
  breed: PetBreed;
  gender: string;
  type: string;
  isSterilized: boolean;
  birthday: string;
}

export interface Tag {
  name: string;
  isEnabled: boolean;
  count: number;
}

export interface PetBreed {
  species: string;
  name: string;
  code: string;
  image: string;
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
