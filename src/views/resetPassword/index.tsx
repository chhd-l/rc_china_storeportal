import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SuccessPanel,
  CustomPanelTitle,
} from "@/components/registerAndResetPass";

//自定义reset password page的 button
const ResetBtnGroup = ({ back, loading, disabled, next }: any) => {
  return (
    <div className="flex flex-row justify-between my-10">
      <Button
        className="w-5/12"
        danger
        onClick={() => {
          back && back();
        }}
      >
        Back
      </Button>
      <Button
        className="w-5/12"
        type="primary"
        loading={loading}
        danger
        disabled={disabled}
        onClick={(e) => {
          next && next();
        }}
      >
        Next
      </Button>
    </div>
  );
};

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentStep, setCurrentStep] = useState("inputPhone");
  const [verifyCode, setVerifyCode] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

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
    <div
      className="h-screen"
      style={{ backgroundColor: "rgba(248,248,248,1)" }}
    >
      <div className="flex flex-row  justify-center pt-20">
        {currentStep === "inputPhone" ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle />
            <div className="mt-10">
              <Input
                value={phone}
                size="large"
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <ResetBtnGroup
                back={() => {
                  navigate("/login");
                }}
                next={() => phoneToNext()}
                loading={loading}
                disabled={phone === ""}
              />
            </div>
          </div>
        ) : null}
        {currentStep === "inputVerifyCode" ? (
          <div className="bg-white w-80 h-80 border p-6">
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
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
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <p className="text-left mt-2">
                Did not receive the code? &nbsp;
                <span className="text-red-500" onClick={() => getVerifyCode()}>
                  Resend
                </span>
              </p>
              <ResetBtnGroup
                back={() => {
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
                setCurrentStep("inputVerifyCode");
              }}
            />
            <p className="mb-0">Your verification code is sent to</p>
            <p className="mb-0">(+86) {phone}</p>
            <div className="mt-6">
              <Input
                value={oldPassword}
                size="large"
                placeholder="Enter new password"
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <Input
                value={newPassword}
                size="large"
                placeholder="Enter password again"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <ResetBtnGroup
                back={() => {
                  setCurrentStep("inputVerifyCode");
                }}
                next={() => newPasswordToNext()}
                loading={loading}
                disabled={oldPassword === "" || newPassword === ""}
              />
            </div>
          </div>
        ) : null}
        {currentStep === "success" ? <SuccessPanel /> : null}
      </div>
    </div>
  );
};
export default ResetPassword;
