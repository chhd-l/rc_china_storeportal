import { SearchFormItemProps } from "@/framework/types/common";

export const formItems: SearchFormItemProps[] = [
  {
    label: "Openid",
    name: "openId",
    placeholder: "Input",
  },
  {
    label: "Unionid",
    name: "unionId",
    placeholder: "Input",
  },
  {
    label: "Follow Time",
    name: "followTime",
    placeholder: "Follow Time",
    type: "dateTime",
  },
];
