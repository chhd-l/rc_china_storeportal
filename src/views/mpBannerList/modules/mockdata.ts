import { Random } from "mockjs";

export const mockList = {
  "list|9": [
    {
      officialAccount: "@name",
      name: "@name",
      img: Random.image("200x100"),
      clickType: "@cname",
      path: "@url",
      default: "@boolean",
      "sort|1-10": 1,
      id: "@id",
      status: "@boolean",
    },
  ],
};
export const mockClickType = {
  "list|9": [{ value: "@name", label: "@name" }],
};
