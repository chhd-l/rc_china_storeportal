import { SearchFormItemProps, BaseListProps } from "@/framework/types/common";
import { statusList } from "@/views/accountList/modules/constants";
import { matchTypeList } from "./constants";
import intl from 'react-intl-universal';

export const getFormItems: (accountList: BaseListProps[]) => SearchFormItemProps[] = (accountList) => ([
  {
    label: intl.get('wx.wechat_account'),
    name: "name",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: accountList,
  },
  {
    label: intl.get('wx.match_type'),
    name: "type",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: matchTypeList,
  },
  {
    label: intl.get('wx.keywords'),
    name: "keywords",
    placeholder: intl.get('wx.keywords'),
  },
  {
    label: intl.get('public.status'),
    name: "status",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: statusList,
  },
]);
