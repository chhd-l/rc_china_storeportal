import React, { useState } from "react";
import { Input, Button, Checkbox, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { SellerLogoPanel } from "@/components/auth";
import { FormItemProps } from "@/framework/types/common";
import "./index.less";

const formItems: FormItemProps[] = [
  {
    name: "account",
    placeholder: "Account number",
    rules: [
      {
        required: true,
        message: "Please input your account number!",
      },
    ],
  },
  {
    name: "password",
    placeholder: "Password",
    rules: [
      {
        required: true,
        message: "Please input your password!",
      },
    ],
  },
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = (e: any) => {
    try {
      setLoading(true);
      navigate("/home");
    } catch (err) {
      setLoginError("error");
    }
  };

  return (
    <div className="h-screen bg-gray1">
      <div className="flex flex-row  justify-center pt-20">
        <SellerLogoPanel />
        <div className="bg-white w-80 border p-6">
          <p className="text-xl font-medium">Seller Center</p>
          <Form
            form={form}
            onFinish={(values) => {
              console.log("----form login-----", values);
              handleLogin(values);
            }}
            autoComplete="off"
          >
            {formItems.map((item: FormItemProps) => (
              <Form.Item name={item.name} rules={item.rules} key={item.name}>
                <Input placeholder={item.placeholder} />
              </Form.Item>
            ))}
            <Form.Item className="login-remember">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a
                className="primary-color font-medium text-12"
                href={"/resetPassword"}
              >
                Forget password?
              </a>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} className="login-btn">
              {loginError ? (
                <p className="p-2 primary-color text-12">{loginError}</p>
              ) : null}
              <Button
                className="w-full"
                type="primary"
                danger
                htmlType="submit"
                loading={loading}
              >
                Next
              </Button>
              <p className="text-12 mt-2 text-left">
                Don't have an account?{" "}
                <a
                  className="primary-color font-medium text-12"
                  href={"/register"}
                >
                  Register
                </a>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
