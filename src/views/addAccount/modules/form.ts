import { FormItemProps, BaseListProps } from "@/framework/types/common";
import { accountTypeList, manageModeList } from "./constants";
import { officialTypeList } from "@/views/accountList/modules/constants";

interface AccountFormItemProps extends FormItemProps {
  type?: string;
  label?: string;
  selectList?: BaseListProps[];
}

export const ACCOUNT_FORM: AccountFormItemProps[] = [
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
        required: true,
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
    name: "manageMode",
    label: "Management Mode",
    placeholder: "select",
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
    name: "pushServer",
    label: "Push Server",
    placeholder: "Input",
  },
  {
    name: "officialType",
    label: "Official Account Type",
    placeholder: "select",
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
    name: "magEncrypt",
    label: "Message Encryption",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input Message Encryption!",
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
    name: "pertifyPath",
    label: "Pertificate Path",
    placeholder: "Input",
    type: "upload",
  },
  {
    name: "qrCodePath",
    label: "QR Code Path",
    placeholder: "Input",
    type: "upload",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Input",
  },
];
