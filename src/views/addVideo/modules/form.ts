import { FormItemProps } from "@/framework/types/common";
import intl from 'react-intl-universal';

export const ADD_VIDEO_FORM: FormItemProps[] = [
  {
    label: intl.get('wx.file'),
    name: "url",
    placeholder: intl.get('wx.select_file'),
    type: 'upload',
    rules: [
      {
        required: true,
        message: intl.get('wx.pls_upload_file'),
      },
    ],
  },
  {
    name: "title",
    label: intl.get('wx.title'),
    placeholder: "",
    rules: [
      {
        required: true,
        message: intl.get('wx.pls_input_title'),
      },
    ],
  },
  {
    name: "description",
    label: intl.get('wx.description'),
    placeholder: "",
    rules: [
      {
        required: true,
        message: intl.get('wx.pls_input_desc'),
      },
    ],
  },
];

