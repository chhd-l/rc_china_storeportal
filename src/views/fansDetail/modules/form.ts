import { SearchFormItemProps } from "@/framework/types/common";
import intl from 'react-intl-universal';

export const fansDetailForm: SearchFormItemProps[] = [
  {
    label: intl.get('wx.wechat_account'),
    name: "accountPrincipal",
  },
  {
    label: intl.get('wx.wechat_name'),
    name: "nickname",
  },
  {
    label: intl.get('wx.unionid'),
    name: "unionId",
  },
  {
    label: intl.get('wx.openid'),
    name: "openId",
  },
  {
    label: intl.get('wx.follow_time'),
    name: "subscribeTime",
  },
  {
    label: intl.get('wx.comment'),
    name: "remark",
  },
  {
    label: intl.get('wx.channel_qr'),
    name: "qrSceneStr",
  },
];
