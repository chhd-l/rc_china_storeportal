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

const passwordFormItems: FormItemProps[] = [
  {
    name: "password",
    placeholder: "Enter new password",
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
    ],
  },
  {
    name: "confirmPassword",
    placeholder: "Enter password again",
    rules: [
      {
        required: true,
        message: "Please input your password again!",
      },
    ],
  },
];

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [errText, setErrText] = useState("");
  const [currentStep, setCurrentStep] = useState("inputPhone");
  const [verifyCode, setVerifyCode] = useState("");

  const navigate = useNavigate();
  const [phoneForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const getVerifyCode = () => {};

  const phoneToNext = () => {
    try {
      getVerifyCode();
      setCurrentStep("inputVerifyCode");
    } catch (err) {}
  };

  const verifyCodeToNext = () => {
    try {
      setCurrentStep("inputNewPassword");
    } catch (err) {}
  };

  const newPasswordToNext = () => {
    try {
      setCurrentStep("success");
    } catch (err) {}
  };

  return (
    <div className="h-screen bg-gray1">
      <div className="flex flex-row  justify-center pt-20">
        {currentStep === "inputPhone" ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle />
            <div className="mt-10">
              <Form
                form={phoneForm}
                onFinish={(values) => {
                  console.log("----form login-----", values);
                  setPhone(values.phone);
                  phoneToNext();
                }}
                autoComplete="off"
              >
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Phone number is required.",
                    },
                    {
                      pattern: PHONEREGCONST,
                      message: "Enter a valid Phone. example: 13101227768",
                    },
                  ]}
                >
                  <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24 }} className="login-btn">
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
        {currentStep === "inputVerifyCode" ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
                setErrText("");
                setCurrentStep("inputPhone");
              }}
            />
            <p className="mb-0">Your verification code is sent to</p>
            <p className="mb-0">(+86) {phone}</p>
            <div className="mt-8">
              <Input
                value={verifyCode}
                size="large"
                placeholder="Enter verification code"
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              {errText ? (
                <p className="my-0 text-left text-red-500">{errText}</p>
              ) : null}
              <p className="text-left mt-2">
                Did not receive the code? &nbsp;
                <span className="text-red-500" onClick={() => getVerifyCode()}>
                  Resend
                </span>
              </p>
              <ResetBtnGroup
                back={() => {
                  setErrText("");
                  setCurrentStep("inputPhone");
                }}
                next={() => verifyCodeToNext()}
                loading={loading}
                disabled={verifyCode === ""}
              />
            </div>
          </div>
        ) : null}
        {currentStep === "inputNewPassword" ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
                setErrText("");
                setCurrentStep("inputVerifyCode");
              }}
            />
            <p className="mb-0">Your verification code is sent to</p>
            <p className="mb-0">(+86) {phone}</p>
            <div className="mt-6">
              <Form
                form={passwordForm}
                onFinish={(values) => {
                  console.log("----form reset password-----", values);
                  newPasswordToNext();
                }}
                autoComplete="off"
              >
                {passwordFormItems.map((item: FormItemProps) => (
                  <Form.Item name={item.name} rules={item.rules}>
                    <Input placeholder={item.placeholder} />
                  </Form.Item>
                ))}
                <Form.Item wrapperCol={{ span: 24 }} className="login-btn">
                  {errText ? (
                    <p className="my-0 text-left text-red-500">{errText}</p>
                  ) : null}
                  <ResetBtnGroup
                    back={() => {
                      setErrText("");
                      setCurrentStep("inputVerifyCode");
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
        {currentStep === "success" ? <SuccessPanel /> : null}
      </div>
    </div>
  );
};
export default ResetPassword;
