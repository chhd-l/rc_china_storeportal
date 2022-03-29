import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SellerLogoPanel,
  SuccessPanel,
  CustomPanelTitle,
} from "@/components/registerAndResetPass";
import validForm from "@/lib/valid-form";
import { REGISTER_RULE } from "./module/registerRule";

const title = "Sign up";

interface KeyRules {
  [key: string]: string;
}

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("inputInfo");
  const [registerInfo, setRegisterInfo] = useState<KeyRules>({
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [errMsgObj, setErrMsgObj] = useState<KeyRules>({
    userName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [verifyCode, setVerifyCode] = useState("");
  const [errVerifyCode, setErrVerifyCode] = useState(false);
  const navigate = useNavigate();

  const updateRegisterInfo = (value: string, name: string) => {
    setRegisterInfo({ ...registerInfo, [name]: value });
    verifyForm(name, value);
  };

  // 表单验证
  const verifyForm = (name: string, value: any) => {
    const errMsg = validForm({
      RULE: REGISTER_RULE,
      data: { [name]: value },
    });
    setErrMsgObj({ ...errMsgObj, [name]: errMsg });
  };

  //获取验证码
  const getVerifyCode = () => {};

  const registerToNext = () => {
    try {
      getVerifyCode();
      setCurrentStep("inputVerifyCode");
    } catch (err) {}
  };

  const verifyCodeToConfirm = () => {
    try {
      setCurrentStep("success");
    } catch (err) {}
  };

  return (
    <div className="h-screen bg-gray1">
      <div className="flex flex-row  justify-center pt-20">
        <SellerLogoPanel />
        {currentStep === "inputInfo" ? (
          <div className="bg-white w-80 border p-6">
            <CustomPanelTitle
              backArrow={() => {
                navigate("/login");
              }}
              showBackArrow={true}
              title={title}
            />
            <div className="">
              {Object.keys(registerInfo).map((item: string) => (
                <>
                  <Input
                    value={registerInfo[item]}
                    size="large"
                    placeholder={
                      item === "userName"
                        ? "Enter user name"
                        : item === "phoneNumber"
                        ? "Enter phone number"
                        : item === "password"
                        ? "Enter password"
                        : "Confirm password"
                    }
                    onChange={(e) => updateRegisterInfo(e.target.value, item)}
                    style={{ marginBottom: "10px" }}
                  />
                  {errMsgObj[item] ? (
                    <p className="mb-2 text-left text-red-500">
                      {errMsgObj[item]}
                    </p>
                  ) : null}
                </>
              ))}
              <Button
                type="primary"
                loading={loading}
                danger
                disabled={
                  Object.values(registerInfo).includes("") ||
                  !Object.values(errMsgObj).every((item) => item === "")
                }
                onClick={() => registerToNext()}
                className="w-full"
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
        {currentStep === "inputVerifyCode" ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
                setCurrentStep("inputInfo");
              }}
              title={title}
            />
            <p className="mb-0">Your verification code is sent to</p>
            <p className="mb-0">(+86) {registerInfo.phoneNumber}</p>
            <div className="mt-8">
              <Input
                value={verifyCode}
                size="large"
                placeholder="Enter verification code"
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              {errVerifyCode ? (
                <p className="text-left mt-2">
                  Incorrect code! &nbsp;
                  <span
                    className="text-red-500"
                    onClick={() => getVerifyCode()}
                  >
                    Resend code
                  </span>
                </p>
              ) : (
                <p className="text-left mt-2">
                  Did not receive the code? &nbsp;
                  <span
                    className="text-red-500"
                    onClick={() => getVerifyCode()}
                  >
                    Resend
                  </span>
                </p>
              )}
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
        {currentStep === "success" ? <SuccessPanel /> : null}
      </div>
    </div>
  );
};
export default Register;
