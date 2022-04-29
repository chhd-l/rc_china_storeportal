import { PHONEREGCONST } from "@/lib/constants";
import { FormItemProps } from "@/framework/types/common";

export const REGISTER_FORM: FormItemProps[] = [
  {
    name: "username",
    placeholder: "Enter user name",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please input your username!",
      },
    ],
  },
  {
    name: "phone",
    placeholder: "Enter phone number",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please input your phone number!",
      },
      {
        pattern: PHONEREGCONST,
        message: "Enter a valid Phone. example: 13101227768",
      },
    ],
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter password",
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
    ],
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
    ],
  },
];
