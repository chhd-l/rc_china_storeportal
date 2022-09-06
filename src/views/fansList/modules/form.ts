import { SearchFormItemProps } from "@/framework/types/common";
import intl from 'react-intl-universal';

export const formItems: SearchFormItemProps[] = [
  {
    label: intl.get("wx.wechat_name"),
    name: "name",
    placeholder: intl.get("public.input"),
  },
  {
    label: intl.get("wx.unionid"),
    name: "unionId",
    placeholder: intl.get("public.input"),
  },
  {
    label: intl.get("wx.is_member"),
    name: "isAppMember",
    placeholder: intl.get("public.select"),
    type: "select",
    selectList: [{
      label: intl.get("public.yes"),
      key: true
    }, {
      label: intl.get("public.no"),
      key: false
    }]
  },
  {
    label: intl.get("public.follow_time"),
    name: "followTime",
    placeholder: intl.get("public.select"),
    type: "dateTime",
  },
];
