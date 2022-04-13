import { FormItemProps } from "@/framework/types/common";
import { replyTypeList } from "@/views/replyContents/modules/constants";

export const ADD_REPLY_CONTENT_FORM: FormItemProps[] = [
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

export const BASE_FORM: FormItemProps[] = [
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

export const TEXT_FORM: FormItemProps[] = [
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

export const VIDEO_FORM: FormItemProps[] = [
  {
    label: "Assets Title",
    name: "assetTitle",
  },
];
