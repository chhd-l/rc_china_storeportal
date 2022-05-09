import React, { useState } from "react";
import { Input, Button, Checkbox, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { SellerLogoPanel } from "@/components/auth";
import { FormItemProps } from "@/framework/types/common";
import "./index.less";
import { login } from "@/framework/api/login-user";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user.store";
import axios from "axios";

const formItems: FormItemProps[] = [
  {
    name: "account",
    placeholder: "Account number",
    type: "text",
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
    type: "password",
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
  const [,setUserInfo] = useAtom(userAtom)
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = (e: any) => {
    try {
      setLoading(true);
      navigate("/shipment-list");
    } catch (err) {
      setLoginError("error");
    }
  };

  return (
    <div className="h-screen bg-gray1 flex justify-center items-center">
      <div className="flex flex-row  justify-center">
        <SellerLogoPanel />
        <div className="bg-white w-80 border p-6">
          <p className="text-2xl font-medium text-center">Seller Center</p>
          <Form
            form={form}
            onFinish={(values) => {
              console.log("----form login-----", values);
              login({ username: values.account, password: values.password }).then(res => {
                if (res) {
                  console.log(res, 're')
                  setUserInfo(res.userInfo)
                  localStorage.setItem("rc-userInfo", JSON.stringify(res.userInfo))
                  localStorage.setItem("rc-token", JSON.stringify(res.access_token))
                  handleLogin(values)
                } else {
                  message.error('Login failed！')
                }
              })
            }}
            autoComplete="off"
          >
            {formItems.map((item: FormItemProps) => (
              <Form.Item name={item.name} rules={item.rules} key={item.name}>
                <Input placeholder={item.placeholder} type={item.type}/>
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
                Login
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
