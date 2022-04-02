import Mock from "mockjs";
import { number } from "yargs";

let arr = ["a", "b", "c", "d", "e"];
export const dataSource = {
  cateInfos: {
    displayName: "@name",
    "type|0-1": 1,
    createdUser: "@name",
    "productNum|-100-1000": 1,
    "id|1-1000": 1,
    isDispaly: "@boolean",
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
