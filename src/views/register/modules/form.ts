import { PHONEREGCONST } from "@/lib/constants";
import { FormItemProps } from "@/framework/types/common";
import intl from "react-intl-universal";

export const REGISTER_FORM: FormItemProps[] = [
  {
    name: "username",
    placeholder: intl.get('login.enter_user_name'),
    type: "text",
    rules: [
      {
        required: true,
        message: intl.get('login.please_input_username'),
      },
    ],
  },
  {
    name: "phone",
    placeholder: intl.get('login.enter_phone_number'),
    type: "text",
    rules: [
      {
        required: true,
        message: intl.get('login.please_input_phone'),
      },
      {
        pattern: PHONEREGCONST,
        message: intl.get('login.enter_valid_phone'),
      },
    ],
  },
  {
    name: "password",
    type: "password",
    placeholder: intl.get('login.enter_password'),
    rules: [
      {
        required: true,
        message: intl.get('login.please_input_password'),
      },
    ],
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: intl.get('login.confirm_password'),
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: intl.get('login.please_confirm_password'),
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(intl.get('login.password_should_match')));
        },
      }),
    ],
  },
];
