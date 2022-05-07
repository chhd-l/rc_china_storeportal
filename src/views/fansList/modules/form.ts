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
        key: 1,
      },
      {
        label: "Male",
        key: 0,
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
    type: "dateTime",
  },
  // {
  //   label: "Is Member",
  //   name: "isMember",
  //   placeholder: "select",
  //   type: "select",
  //   selectList: [
  //     {
  //       label: "Yes",
  //       key: "Yes",
  //     },
  //     {
  //       label: "No",
  //       key: "No",
  //     },
  //   ],
  // },
];
