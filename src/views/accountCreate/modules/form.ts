import { FormItemProps } from '@/framework/types/common'
import { accountTypeList, manageModeList } from './constants'
import { officialTypeList } from '@/views/accountList/modules/constants'
import intl from 'react-intl-universal'

export const ACCOUNT_FORM: FormItemProps[] = [
  {
    label: intl.get('wx.account_principal'),
    name: "principal",
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_account_principal'),
      },
    ],
  },
  {
    label: intl.get('wx.account_type'),
    name: "type",
    placeholder: intl.get('public.select'),
    type: "select",
    rules: [
      {
        required: true,
        message: intl.get('wx.please_select_account_type'),
      },
    ],
    selectList: accountTypeList,
  },
  {
    name: "originalId",
    label: intl.get('wx.original_id'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        // required: true,
        message: intl.get('wx.please_input_original_id'),
      },
    ],
  },
  {
    name: "name",
    label: intl.get('wx.account_name'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_account_name'),
      },
    ],
  },
  {
    name: "appId",
    label: intl.get('wx.app_id'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('please_input_appid'),
      },
    ],
  },
  {
    name: "merchantId",
    label: intl.get('wx.merchat_id'),
    placeholder: intl.get('public.input'),
  },
  {
    name: "appSecret",
    label: intl.get('wx.app_secret'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_app_secret'),
      },
    ],
  },
  {
    name: "merchantKey",
    label: intl.get('wx.merchant_key'),
    placeholder: intl.get('public.input'),
  },
  {
    name: "managementMode",
    label: intl.get('wx.management_mode'),
    placeholder: intl.get('public.select'),
    type: "select",
    rules: [
      {
        required: true,
        message: intl.get('wx.please_select_mode'),
      },
    ],
    selectList: manageModeList,
  },
  {
    name: "pushServerURL",
    label: intl.get('wx.push_server'),
    placeholder: intl.get('public.input'),
  },
  {
    name: "officialAccountType",
    label: intl.get('wx.official_account_type'),
    placeholder: intl.get('public.select'),
    type: "select",
    rules: [
      {
        required: true,
        message: intl.get('wx.please_select_official_account_type'),
      },
    ],
    selectList: officialTypeList,
  },
  {
    name: "messageEncryption",
    label: intl.get('wx.message_url'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_message_url'),
      },
    ],
  },
  {
    name: "token",
    label: intl.get('wx.token'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_token'),
      },
    ],
  },
  {
    name: "certificatePath",
    label: intl.get('wx.certificate_path'),
    placeholder: intl.get('wx.click_to_select'),
    type: "upload",
  },
  {
    name: "qrCodePath",
    label: intl.get('wx.qr_code_path'),
    placeholder: intl.get('wx.click_to_select'),
    type: "upload",
  },
  {
    name: "description",
    label: intl.get('wx.description'),
    type: "textarea",
    placeholder: intl.get('public.input'),
  },
];

export const ACCOUNT_FORM_TWO: FormItemProps[] = [
  {
    label: intl.get('wx.account_principal'),
    name: "principal",
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_account_principal'),
      },
    ],
  },
  {
    label: intl.get('wx.account_type'),
    name: "type",
    placeholder: intl.get('public.select'),
    type: "select",
    rules: [
      {
        required: true,
        message: intl.get('wx.please_select_account_type'),
      },
    ],
    selectList: accountTypeList,
  },
  {
    label: intl.get('wx.asso_account'),
    name: "associatedWxAccountId",
    placeholder: intl.get('public.select'),
    type: "select",
    selectList: [],
  },
  {
    name: "originalId",
    label: intl.get('wx.original_id'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        // required: true,
        message: intl.get('wx.please_input_original_id'),
      },
    ],
  },
  {
    name: "name",
    label: intl.get('wx.account_name'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_account_name'),
      },
    ],
  },
  {
    name: "appId",
    label: intl.get('wx.app_id'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_appid'),
      },
    ],
  },
  {
    name: "merchantId",
    label: intl.get('wx.merchat_id'),
    placeholder: intl.get('public.input'),
  },
  {
    name: "appSecret",
    label: intl.get('wx.app_secret'),
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('wx.please_input_app_secret'),
      },
    ],
  },
  {
    name: "merchantKey",
    label: intl.get('wx.merchant_key'),
    placeholder: intl.get('public.input'),
  },
  {
    name: "certificatePath",
    label: intl.get('wx.certificate_path'),
    placeholder: intl.get('wx.click_to_select'),
    type: "upload",
  },
];
