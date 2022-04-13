import { SearchFormItemProps } from "@/framework/types/common";

export const formItems: SearchFormItemProps[] = [
  {
    label: "Nickname",
    name: "name",
    placeholder: "Input",
  },
  {
    label: "Sex",
    name: "sex",
    placeholder: "select",
    type: "select",
    selectList: [
      {
        label: "Female",
        key: "Female",
      },
      {
        label: "Male",
        key: "Male",
      },
    ],
  },
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
  },
  {
    label: "Is Member",
    name: "isMember",
    placeholder: "select",
    type: "select",
    selectList: [
      {
        label: "Y",
        key: "Y",
      },
      {
        label: "N",
        key: "N",
      },
    ],
  },
];
