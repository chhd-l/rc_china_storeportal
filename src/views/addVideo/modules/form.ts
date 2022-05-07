import { FormItemProps } from "@/framework/types/common";

export const ADD_VIDEO_FORM: FormItemProps[] = [
  {
    label: "File",
    name: "url",
    placeholder: "Select the file",
    type:'upload',
    rules: [
      {
        required: true,
        message: "Please select account type!",
      },
    ],
  },
  {
    name: "title",
    label: "Title",
    placeholder: "",
    rules: [
      {
        required: true,
        message: "Please input title!",
      },
    ],
  },
  {
    name: "description",
    label: "Description",
    placeholder: "",
    rules: [
      {
        required: true,
        message: "Please input description!",
      },
    ],
  },
];

