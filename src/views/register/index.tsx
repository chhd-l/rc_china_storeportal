import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SellerLogoPanel,
  SuccessPanel,
  CustomPanelTitle,
} from "@/components/auth";
import { REGISTER_FORM } from "./modules/register-form";
import { FormItemProps } from "@/framework/types/common";

const title = "Sign up";
const formItems: FormItemProps[] = REGISTER_FORM;

enum REGISTERSTEPENUM {
  REGISTERINFOR = "registerInfo",
  VERIFYCODE = "verifyCode",
  SUCCESS = "success",
}

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(
    REGISTERSTEPENUM["REGISTERINFOR"]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [errVerifyCode, setErrVerifyCode] = useState(false);
  const [getVerifyCodeErr, setGetVerifyCodeErr] = useState("");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  //获取验证码
  const getVerifyCode = () => {};

  const registerToNext = () => {
    try {
      setLoading(true);
      getVerifyCode();
      setCurrentStep(REGISTERSTEPENUM["VERIFYCODE"]);
      setGetVerifyCodeErr("");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const verifyCodeToConfirm = () => {
    try {
      setCurrentStep(REGISTERSTEPENUM["SUCCESS"]);
    } catch (err) {
      setErrVerifyCode(true);
    }
  };

  return (
    <div className="h-screen bg-gray1">
      <div className="flex flex-row  justify-center pt-20">
        <SellerLogoPanel />
        {currentStep === REGISTERSTEPENUM["REGISTERINFOR"] ? (
          <div className="bg-white w-80 border p-6">
            <CustomPanelTitle
              backArrow={() => {
                navigate("/login");
              }}
              showBackArrow={true}
              title={title}
            />
            <Form
              form={form}
              wrapperCol={{ span: 24 }}
              onFinish={(values) => {
                console.log("----form1-----", values);
                setPhoneNumber(values.phone);
                registerToNext();
              }}
              autoComplete="off"
            >
              {formItems.map((item: FormItemProps) => (
                <Form.Item
                  colon={false}
                  name={item.name}
                  rules={item.rules}
                  key={item.name}
                >
                  <Input placeholder={item.placeholder} />
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  className="w-full"
                  type="primary"
                  danger
                  htmlType="submit"
                >
                  Next
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : null}
        {currentStep === REGISTERSTEPENUM["VERIFYCODE"] ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
                setCurrentStep(REGISTERSTEPENUM["REGISTERINFOR"]);
              }}
              title={title}
            />
            <p className="mb-0">Your verification code is sent to</p>
            <p className="mb-0">(+86) {phoneNumber}</p>
            <div className="mt-8">
              <Input
                value={verifyCode}
                size="large"
                placeholder="Enter verification code"
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              <p className="text-left mt-2">
                {errVerifyCode
                  ? "Incorrect code!"
                  : "Did not receive the code?"}
                &nbsp;
                <span className="text-red-500" onClick={() => getVerifyCode()}>
                  {errVerifyCode ? "Resend code" : "Resend"}
                </span>
              </p>
              {getVerifyCodeErr ? (
                <p className="mb-2 text-left text-red-500">
                  {getVerifyCodeErr}
                </p>
              ) : null}
              <Button
                type="primary"
                loading={loading}
                danger
                disabled={verifyCode === ""}
                onClick={() => verifyCodeToConfirm()}
                className="w-full"
              >
                Confirm
              </Button>
            </div>
          </div>
        ) : null}
        {currentStep === REGISTERSTEPENUM["SUCCESS"] ? <SuccessPanel /> : null}
      </div>
    </div>
  );
};
export default Register;
