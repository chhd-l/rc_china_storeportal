import { PHONEREGCONST } from "@/lib/constants";
import { orderDetailSource } from "@/views/orderDetail/modules/mockdata";
import Mock from "mockjs";

export const basicInfoSource = {
  id: "@id",
  image: "",
  name: "@cname",
  phone: PHONEREGCONST,
  loginTime: "@datetime",
};

export const petOwnerListSource = {
  "array|6": [basicInfoSource],
};

export const petDetailSource={
  id: "@id",
  image: "",
  name: "@cname",
  breed: "",
  'gender|1': ['FEMALE','MALE'],
  'type|1':['DOG','CAT'],
  'isSterilized|1': [true,false],
  age: 1,
  customerId: "@id"
}

export const petListSource={
  "array|2":[petDetailSource]
}

export const petOwnerDetailSource = {
  basicInformation: basicInfoSource,
  tagList: [
    {
      id: "@id",
      name: "Dog Club Member",
    },
  ],
  petList: Mock.mock(petListSource).array,
  tencentAccountList: [
    {
      unionId: "1111",
      openId: "111",
      userType: "Mini Program",
      followStatus: "Followed",
      followedTime: "@datetime",
      unfollowedTime: "",
    },
  ],
  "addressList|2": [
    {
      id: "@id",
      receiverName: "@cname",
      phone: PHONEREGCONST,
      province: "@province",
      city: "@city",
      region: "@county",
      detail: "@county(true)",
      postCode: "@zip",
      isDefault: 1,
    },
  ],
  couponCodeList: [
    {
      id: "@id",
      couponCode: "TEST9437",
      couponName: "Dog",
      couponType: "Pet",
      couponValue: 300,
      startTime: "@date",
      expirationTime: "@date",
      couponStatus: "Avaliable",
      comment: "",
    },
  ],
  "smartDeviceList|2": [
    {
      id: "@id",
      deviceName: "Smart test 11",
      deviceSku: "121212",
      status: "Locked",
      lockedTime: '@datetime("yyyy-MM-dd HH:mm")',
      subscriptionNumber: "S121212",
      subscriptionTime: '@datetime("yyyy-MM-dd HH:mm")',
    },
  ],
  "subscriptionList|2": [
    {
      customerImg: "",
      customerName: "@cname",
      subscriptionId: "@id",
      products: [
        {
          id: "@id",
          productImg: "",
          productName: "@title",
          size: "small",
          color: "red",
          quantity: 1,
        },
      ],
      subscriptionStatus: "completed",
      subscriptionType: "Autoship",
    },
  ],
  "orderList|2": [orderDetailSource("")],
};
