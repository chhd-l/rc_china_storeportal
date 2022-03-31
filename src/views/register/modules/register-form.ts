import { PHONEREGCONST } from "@/lib/constants";
import { FormItemProps } from "@/framework/types/common";

export const REGISTER_FORM: FormItemProps[] = [
  {
    name: "username",
    placeholder: "Enter user name",
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
    placeholder: "Confirm password",
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
    ],
  },
];
