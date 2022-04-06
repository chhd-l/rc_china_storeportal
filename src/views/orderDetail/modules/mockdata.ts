import { PHONEREGCONST } from "@/lib/constants";
export const dataSource = {
  id: "@id",
  customerImg: "",
  customerName: "@cname",
  subscriptionId: "@id",
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
      pic: "",
      skuName: "@title",
      size: "small",
      color: "red",
      num: 1,
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
    totalPrice: 34.6,
  },
  payInfo: {
    payTypeName: "Wechat Pay",
  },
};
