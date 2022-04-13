import { FormItemProps, BaseListProps } from "@/framework/types/common";
import { replyTypeList } from "@/views/replyContents/modules/constants";

interface AccountFormItemProps extends FormItemProps {
  type?: string;
  label?: string;
  selectList?: BaseListProps[];
}

export const ADD_REPLY_CONTENT_FORM: AccountFormItemProps[] = [
  {
    label: "Reply Type",
    name: "type",
    placeholder: "Select",
    type: "select",
    rules: [
      {
        required: true,
        message: "Please select reply type!",
      },
    ],
    selectList: replyTypeList,
  },
  {
    label: "Content Description",
    name: "description",
    placeholder: "Input",
    rules: [
      {
        required: true,
        message: "Please input keywords!",
      },
    ],
  },
];

export const BASE_FORM: AccountFormItemProps[] = [
  {
    label: "Assets ID",
    name: "assetId",
    placeholder: "Input",
    type: "search",
    rules: [
      {
        required: true,
        message: "Please input Assets ID!",
      },
    ],
  },
];

export const TEXT_FORM: AccountFormItemProps[] = [
  {
    label: "Message content",
    name: "message",
    placeholder: "Input",
    type: "textarea",
    rules: [
      {
        required: true,
        message: "Please input message content!",
      },
    ],
  },
];

export const VIDEO_FORM: AccountFormItemProps[] = [
  {
    label: "Assets Title",
    name: "assetTitle",
  },
];
