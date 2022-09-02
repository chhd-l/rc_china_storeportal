import { FormItemProps } from "@/framework/types/common";
import { matchTypeList } from "@/views/autoReplyList/modules/constants";
import { replyTypeList } from "@/views/replyContents/modules/constants";
import intl from 'react-intl-universal';

export const ADD_AUTO_REPLY_FORM: FormItemProps[] = [
  {
    label: intl.get('wx.match_type'),
    name: "type",
    placeholder: intl.get('public.select'),
    type: "select",
    rules: [
      {
        required: true,
        message: intl.get('wx.please_select_account_type'),
      },
    ],
    selectList: matchTypeList,
  },
  {
    name: "keywords",
    label: intl.get('wx.keywords'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_keywords'),
      },
    ],
  },
  {
    name: "description",
    label: intl.get('wx.reply_desc'),
    placeholder: intl.get('public.select'),
    type: "search",
    rules: [
      {
        required: true,
        message: intl.get('wx.please_select_reply_content'),
      },
    ],
  },
];

export const MODAL_FORM_ITEM = [
  { label: intl.get('wx.content_desc'), name: "description" },
  {
    label: intl.get('wx.reply_type'),
    name: "type",
    searchList: replyTypeList,
  },
];
