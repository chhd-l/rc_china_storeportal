import { FormItemProps, BaseListProps } from "@/framework/types/common";
import { matchTypeList } from "@/views/autoReplyList/modules/constants";

interface AccountFormItemProps extends FormItemProps {
  type?: string;
  label?: string;
  selectList?: BaseListProps[];
}

export const ADD_AUTOREPLY_FORM: AccountFormItemProps[] = [
  {
    label: "Match Type",
    name: "type",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select account type!",
      },
    ],
    selectList: matchTypeList,
  },
  {
    name: "keywords",
    label: "Keywords",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input keywords!",
      },
    ],
  },
  {
    name: "description",
    label: "Reply Description",
    placeholder: "Input",
    type: "search",
    rules: [
      {
        required: true,
        message: "Please input Reply Description!",
      },
    ],
  },
];
