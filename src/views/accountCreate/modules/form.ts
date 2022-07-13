import { FormItemProps } from '@/framework/types/common'
import { accountTypeList, manageModeList } from './constants'
import { officialTypeList } from '@/views/accountList/modules/constants'

export const ACCOUNT_FORM: FormItemProps[] = [
  {
    label: "Account Principal",
    name: "principal",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Account Principal!",
      },
    ],
  },
  {
    label: "Account Type",
    name: "type",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select account type!",
      },
    ],
    selectList: accountTypeList,
  },
  {
    name: "originalId",
    label: "Original ID",
    placeholder: "Input",
    rules: [
      {
        // required: true,
        message: "Please input Original ID!",
      },
    ],
  },
  {
    name: "name",
    label: "Account Name",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Account Name!",
      },
    ],
  },
  {
    name: "appId",
    label: "AppId",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input AppId!",
      },
    ],
  },
  {
    name: "merchantId",
    label: "Merchant ID",
    placeholder: "Input",
  },
  {
    name: "appSecret",
    label: "AppSecret",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input AppSecret!",
      },
    ],
  },
  {
    name: "merchantKey",
    label: "Merchant Key",
    placeholder: "Input",
  },
  {
    name: "managementMode",
    label: "Management Mode",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select Management Mode!",
      },
    ],
    selectList: manageModeList,
  },
  {
    name: "pushServerURL",
    label: "Push Server",
    placeholder: "Input",
  },
  {
    name: "officialAccountType",
    label: "Official Account Type",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select Official Account Type!",
      },
    ],
    selectList: officialTypeList,
  },
  {
    name: "messageEncryption",
    label: "Message Encryption Url",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Message Encryption Url!",
      },
    ],
  },
  {
    name: "token",
    label: "Token",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Token!",
      },
    ],
  },
  {
    name: "certificatePath",
    label: "Certificate Path",
    placeholder: "Click to select",
    type: "upload",
  },
  {
    name: "qrCodePath",
    label: "QR Code Path",
    placeholder: "Click to select",
    type: "upload",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Input",
  },
];

export const ACCOUNT_FORM_TWO: FormItemProps[] = [
  {
    label: "Account Principal",
    name: "principal",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Account Principal!",
      },
    ],
  },
  {
    label: "Account Type",
    name: "type",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select account type!",
      },
    ],
    selectList: accountTypeList,
  },
  {
    label: "Associated Account",
    name: "associatedWxAccountId",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select Associated Account!",
      },
    ],
    selectList: [],
  },
  {
    name: "originalId",
    label: "Original ID",
    placeholder: "Input",
    rules: [
      {
        // required: true,
        message: "Please input Original ID!",
      },
    ],
  },
  {
    name: "name",
    label: "Account Name",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Account Name!",
      },
    ],
  },
  {
    name: "appId",
    label: "AppId",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input AppId!",
      },
    ],
  },
  {
    name: "merchantId",
    label: "Merchant ID",
    placeholder: "Input",
  },
  {
    name: "appSecret",
    label: "AppSecret",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input AppSecret!",
      },
    ],
  },
  {
    name: "merchantKey",
    label: "Merchant Key",
    placeholder: "Input",
  },
  {
    name: "certificatePath",
    label: "Certificate Path",
    placeholder: "Click to select",
    type: "upload",
  },
];
