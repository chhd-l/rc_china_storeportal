import { FormItemProps } from "@/framework/types/common";
import { replyTypeList } from "@/views/replyContents/modules/constants";
import intl from 'react-intl-universal'

export const ADD_REPLY_CONTENT_FORM: FormItemProps[] = [
  {
    label: intl.get('reply.Reply Type'),
    name: "type",
    placeholder: intl.get('public.select'),
    type: "select",
    rules: [
      {
        required: true,
        message: intl.get('reply.Please select reply type!'),
      },
    ],
    selectList: replyTypeList,
  },
  {
    label: intl.get('reply.Content Description'),
    name: "description",
    placeholder: intl.get('public.input'),
    rules: [
      {
        required: true,
        message: intl.get('reply.Please input description!'),
      },
    ],
  },
];

export const BASE_FORM: FormItemProps[] = [
  {
    label: intl.get('reply.Asset'),
    name: "assetId",
    placeholder: intl.get('public.select'),
    type: "search",
    rules: [
      {
        required: true,
        message: intl.get('reply.Please select Asset!'),
      },
    ],
  },
];

export const TEXT_FORM: FormItemProps[] = [
  {
    label: intl.get('reply.Message content'),
    name: "message",
    placeholder: intl.get('public.input'),
    type: "textarea",
    rules: [
      {
        required: true,
        message: intl.get('reply.Please input message content!'),
      },
    ],
  },
];

export const VIDEO_FORM: FormItemProps[] = [
  {
    label: intl.get('reply.Assets Title'),
    name: "assetTitle",
  },
];
