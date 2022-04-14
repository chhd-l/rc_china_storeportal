import { PHONEREGCONST } from "@/lib/constants";
import Mock from "mockjs";

export const orderDetailSource = (orderState: string) => {
  return {
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
      orderState: function () {
        const index = Math.floor(Math.random() * 5);
        return orderState === ""
          ? ["UNPAID", "TOSHIP", "SHIPPED", "COMPLETED", "CANCELLATION"][index]
          : orderState;
      },
    },
    carrier: function () {
      return orderState === "SHIPPED"
        ? [
            {
              packId: Mock.Random.id(),
              company: "SF",
              tradeItem: [
                {
                  skuId: Mock.Random.id(),
                  pic: "https://d2cstgstorage.z13.web.core.windows.net/fr/fr-229732-master.jpg",
                  skuName: Mock.Random.title(),
                  num: 1,
                  price: 198,
                },
              ],
            },
          ]
        : [];
    },
    carrierType: function () {
      return orderState == "SHIPPED" || orderState == "COMPLETED" ? "SF" : "";
    },
    tradePrice: {
      goodsPrice: 198,
      discountsPrice: 8,
      deliveryPrice: 0,
      totalPrice: 190,
    },
    payInfo: function () {
      return orderState === "UNPAID" || orderState === "CANCELLATION"
        ? {}
        : {
            payTypeName: "Wechat Pay",
            appId: Mock.Random.id(),
            payTime: Mock.Random.datetime(),
            outTradeNo: Mock.Random.id(),
          };
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
};

export const orderListSource = (orderState: string) => {
  return {
    "array|6": [orderDetailSource(orderState)],
  };
};
