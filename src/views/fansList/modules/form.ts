import { SearchFormItemProps } from "@/framework/types/common";

export const formItems: SearchFormItemProps[] = [
  {
    label: "Wechat Name",
    name: "nickname",
    placeholder: "Input",
  },
  {
    label: "Unionid",
    name: "unionId",
    placeholder: "Input",
  },
  {
    label: "Is Member",
    name: "isAppMember",
    placeholder: "Select",
    type:"select",
    selectList:[{
      label:'Yes',
      key:true
    },{
      label:'No',
      key:false
    }]
  },
  {
    label: "Follow Time",
    name: "followTime",
    placeholder: "Follow Time",
    type: "dateTime",
  },
];
