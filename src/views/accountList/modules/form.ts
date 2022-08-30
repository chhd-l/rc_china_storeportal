import { SearchFormItemProps } from "@/framework/types/common";
import { officialTypeList, statusList } from "./constants";
import intl from 'react-intl-universal';

export const formItems: SearchFormItemProps[] = [
  {
    label: intl.get('wx.account_name'),
    name: "name",
    placeholder: intl.get('public.input'),
  },
  {
    label: intl.get('wx.official_account_type'),
    name: "officialAccountType",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: officialTypeList,
  },
  {
    label: intl.get('public.status'),
    name: "status",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: statusList,
  },
];
