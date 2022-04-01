import { PHONEREGCONST } from "@/lib/constants";
import Mock from "mockjs";

export const dataSource = {
  "array|6": [
    {
      id: "@id",
      profileImg: Mock.Random.image(),
      name: "@cname",
      phone: PHONEREGCONST,
      loginTime:'@datetime'
    },
  ],
};
