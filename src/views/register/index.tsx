import React, { useState } from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  SellerLogoPanel,
  SuccessPanel,
  CustomPanelTitle,
} from "../../components/registerAndResetPass";

const title = "Sign up";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("inputInfo");
  const [loginError, setLoginError] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
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
  };

  const getVerifyCode = () => {};

  const registerToNext = () => {
    try {
      getVerifyCode();
      setCurrentStep("inputVerifyCode");
    } catch (err) {}
  };

  const verifyCodeToRegister = () => {
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
              <Input
                value={registerInfo["userName"]}
                size="large"
                placeholder="Enter user name"
                onChange={(e) => updateRegisterInfo(e.target.value, "userName")}
                style={{ marginBottom: "10px" }}
              />
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <Input
                value={registerInfo.phoneNumber}
                size="large"
                placeholder="Enter phone number"
                onChange={(e) =>
                  updateRegisterInfo(e.target.value, "phoneNumber")
                }
                style={{ marginBottom: "10px" }}
              />
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <Input
                value={registerInfo.password}
                size="large"
                placeholder="Enter password"
                onChange={(e) => updateRegisterInfo(e.target.value, "password")}
                style={{ marginBottom: "10px" }}
              />
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <Input
                value={registerInfo.confirmPassword}
                size="large"
                placeholder="Confirm password"
                onChange={(e) =>
                  updateRegisterInfo(e.target.value, "confirmPassword")
                }
                style={{ marginBottom: "10px" }}
              />
              {loginError ? (
                <p className="my-0 text-left text-red-500">{loginError}</p>
              ) : null}
              <Button
                type="primary"
                loading={loading}
                danger
                disabled={
                  registerInfo.userName === "" ||
                  registerInfo.phoneNumber === "" ||
                  registerInfo.password === "" ||
                  registerInfo.confirmPassword === ""
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
              ) : null}
              <p className="text-left mt-2">
                Did not receive the code? &nbsp;
                <span className="text-red-500" onClick={() => getVerifyCode()}>
                  Resend
                </span>
              </p>
              <Button
                type="primary"
                loading={loading}
                danger
                disabled={verifyCode === ""}
                onClick={() => verifyCodeToRegister()}
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
