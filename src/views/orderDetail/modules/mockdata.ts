import { PHONEREGCONST } from "@/lib/constants";
export const orderDataSource = {
  id: "@id",
  subscriptionId: "@id",
  buyer: {
    id: "@id",
    image: "",
    name: "@cname",
    phone: PHONEREGCONST,
  },
  shippingAddress: {
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
  "tradeItem|1-2": [
    {
      skuId: "@id",
      pic: "https://d2cstgstorage.z13.web.core.windows.net/fr/fr-229732-master.jpg",
      skuName: "@title",
      size: "small",
      color: "red",
      num: 1,
      price: 198,
    },
  ],
  tradeState: {
    "orderState|1": [
      "unpaid",
      "toShip",
      "shipped",
      "completed",
      "cancellation",
    ],
  },
  carrierType: "111",
  tradePrice: {
    goodsPrice: 198,
    discountsPrice: 8,
    deliveryPrice: 0,
    totalPrice: 190,
  },
  payInfo: {
    payTypeName: "Wechat Pay",
  },
};
