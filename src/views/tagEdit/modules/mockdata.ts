export const dataSource = {
  cateInfos: {
    displayName: "@name",
    "type|0-1": 1,
    createdUser: "@name",
    "productNum|-100-1000": 1,
    "id|1-1000": 1,
    isDisplay: "@boolean",
    "rules|2-4": [{ name: "@name", "value|100-1000": "123" }],
    "test|": "@range",
    "productList|11": [
      {
        productName: "@cname",
        "marketingPrice|12-800": 12,
        "stock|1-100": 1,
      },
    ],
  },
};
export const productLists = {
  "list|2-4": [
    {
      img: "@image('200x200')",
      "id|1-200": "2",
      name: "@name",
    },
  ],
};

export const mockOption = {
  "options|6": [
    {
      name: "@name",
      value: "@name",
    },
  ],
};

export const manualTable = {
  "table|6": [
    {
      name: "@name",
      brand: "@name",
      "lowestPrice|1-200": 1,
      "highestPrice|300-3500": 1,
      "stock|1-100": 1,
    },
  ],
};
