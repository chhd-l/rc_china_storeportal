import { FormItemProps } from "@/framework/types/common";
import { matchTypeList } from "@/views/autoReplyList/modules/constants";
import { replyTypeList } from "@/views/replyContents/modules/constants";

export const ADD_AUTO_REPLY_FORM: FormItemProps[] = [
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
    placeholder: "Select",
    type: "search",
    rules: [
      {
        required: true,
        message: "Please select Reply Content!",
      },
    ],
  },
];

export const MODAL_FORM_ITEM = [
  { label: "Content description", name: "description" },
  {
    label: "Reply Type",
    name: "type",
    searchList: replyTypeList,
  },
];
