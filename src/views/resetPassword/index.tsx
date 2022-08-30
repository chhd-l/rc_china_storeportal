import React, { useState } from "react";
import { Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SuccessPanel,
  CustomPanelTitle,
  ResetBtnGroup,
} from "@/components/auth";
import { PHONEREGCONST } from "@/lib/constants";
import { FormItemProps } from "@/framework/types/common";
import { sendResetPasswordMessage, resetPassword, checkUserExist } from '@/framework/api/login-user';
import intl from 'react-intl-universal';

const passwordFormItems: FormItemProps[] = [
  {
    name: 'code',
    type: "text",
    placeholder: intl.get('login.enter_verify_code'),
    rules: [
      {
        required: true,
        message: intl.get('login.please_enter_code'),
      }
    ],
  },
  {
    name: "password",
    type: "password",
    placeholder: intl.get('login.enter_new_password'),
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

enum RESETPASSWORDENUM {
  PHONE = "phone",
  PASSWORD = "password",
  SUCCESS = "success",
}

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [errText, setErrText] = useState("");
  const [currentStep, setCurrentStep] = useState(RESETPASSWORDENUM["PHONE"]);

  const navigate = useNavigate();
  const [phoneForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const checkPhoneIsExist = async (phone: string) => {
    setLoading(true);
    const result = await checkUserExist(phone);
    if (!result) {
      setErrText(intl.get('login.phone_not_registed'));
      setLoading(false);
    }
    return result;
  }

  const phoneToNext = async (phone: string) => {
    try {
      setLoading(true);
      const result = await sendResetPasswordMessage(phone);
      if (result) {
        passwordForm.resetFields();
        setErrText("");
        setCurrentStep(RESETPASSWORDENUM["PASSWORD"]);
      } else {
        setErrText(intl.get('login.code_send_failed'));
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const newPasswordToNext = async (values: any) => {
    try {
      setLoading(true);
      const result = await resetPassword({ phone: phone, code: values.code, newPassword: values.password });
      if (result) {
        setCurrentStep(RESETPASSWORDENUM["SUCCESS"]);
      } else {
        setErrText(intl.get('login.incorrect_code'));
      }
      
    } catch (err) {

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray1 flex justify-center items-center">
      <div className="flex flex-row  justify-center">
        {currentStep === RESETPASSWORDENUM["PHONE"] ? (
          <div className="bg-white w-80 border p-6">
            <CustomPanelTitle />
            <div className="mt-10">
              <Form
                form={phoneForm}
                onFinish={async (values) => {
                  console.log("----form login-----", values);
                  setPhone(values.phone);
                  if (await checkPhoneIsExist(values.phone)) {
                    phoneToNext(values.phone);
                  }
                }}
                autoComplete="off"
              >
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: intl.get('login.please_input_phone'),
                    },
                    {
                      pattern: PHONEREGCONST,
                      message: intl.get('login.enter_valid_phone'),
                    },
                  ]}
                >
                  <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }} className="login-btn">
                  {errText ? (
                    <p className="my-0 text-left primary-color">{errText}</p>
                  ) : null}
                  <ResetBtnGroup
                    back={() => {
                      navigate("/login");
                    }}
                    loading={loading}
                    disabled={false}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        ) : null}
        {currentStep === RESETPASSWORDENUM["PASSWORD"] ? (
          <div className="bg-white w-80 border p-6">
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
                setErrText("");
                setCurrentStep(RESETPASSWORDENUM["PHONE"]);
              }}
            />
            <p className="mb-0">{intl.get('login.verify_sent_to')}</p>
            <p className="mb-0">(+86) {phone}</p>
            <div className="mt-6">
              <Form
                form={passwordForm}
                onFinish={(values) => {
                  console.log("----form reset password-----", values);
                  newPasswordToNext(values);
                }}
                autoComplete="off"
              >
                {passwordFormItems.map((item: FormItemProps) => (
                  <Form.Item
                    name={item.name}
                    rules={item.rules}
                    key={item.name}
                    dependencies={item.dependencies ?? []}
                  >
                    <Input type={item.type ?? "text"} placeholder={item.placeholder} onChange={() => setErrText("")} />
                  </Form.Item>
                ))}
                <Form.Item wrapperCol={{ span: 24 }} className="login-btn">
                  {errText ? (
                    <p className="my-0 text-left primary-color">{errText}</p>
                  ) : null}
                  <p className="text-left mt-2">
                    {intl.get('login.did_your_receive')} &nbsp;
                    <span className="primary-color cursor-pointer" onClick={() => phoneToNext(phone)}>
                      {intl.get('login.resend')}
                    </span>
                  </p>
                  <ResetBtnGroup
                    back={() => {
                      setErrText("");
                      passwordForm.resetFields();
                      setCurrentStep(RESETPASSWORDENUM["PHONE"]);
                    }}
                    loading={loading}
                    disabled={false}
                    classes={"my-0"}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        ) : null}
        {currentStep === RESETPASSWORDENUM["SUCCESS"] ? <SuccessPanel /> : null}
      </div>
    </div>
  );
};
export default ResetPassword;
