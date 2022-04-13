import { PHONEREGCONST } from "@/lib/constants";

export const orderDetailSource = {
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
  carrier: [
    {
      packId: "@id",
      company: "SF",
      tradeItem: [
        {
          skuId: "@id",
          pic: "https://d2cstgstorage.z13.web.core.windows.net/fr/fr-229732-master.jpg",
          skuName: "@title",
          num: 1,
          price: 198,
        },
      ],
    },
  ],
  carrierType: "111",
  tradePrice: {
    goodsPrice: 198,
    discountsPrice: 8,
    deliveryPrice: 0,
    totalPrice: 190,
  },
  payInfo: {
    payTypeName: "Wechat Pay",
    appId: "@id",
    payTime: "@datetime",
    outTradeNo: "@id",
  },
  logs: [
    {
      createdAt: "@datetime",
      createdBy: "@cname",
      status: "New Order",
      id: "@id",
    },
  ],
  comments: [
    {
      createdAt: "@datetime",
      createdBy: "@cname",
      content: "Need delivered...",
      id: "@id",
    },
  ],
};

export const orderListSource = {
  "array|6": [orderDetailSource],
};
