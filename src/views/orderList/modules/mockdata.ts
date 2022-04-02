export const dataSource = {
  "array|6": [
    {
      id: "@id",
      customerImg: "",
      customerName: "@cname",
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
    },
  ],
};
