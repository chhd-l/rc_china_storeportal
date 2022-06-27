import React, { useEffect, useState } from "react";
import { Input, Button, Checkbox, Form, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { SellerLogoPanel } from "@/components/auth";
import { FormItemProps } from "@/framework/types/common";
import "./index.less";
import { login } from "@/framework/api/login-user";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user.store";
import { getCookie, setCookie } from "@/utils/utils";
import LogRocket from 'logrocket';

import { userFindBrandIds } from '@/framework/api/banner'
// import axios from "axios";

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
  const [isRemember, setIsRemember] = useState(false)
  const [,setUserInfo] = useAtom(userAtom)
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = (e: any) => {
    try {
      navigate("/dashboard");
    } catch (err) {
      setLoginError("error");
    }
  };

  useEffect(() => {
    let rememberUsername = getCookie('username')
    let rememberPassword = getCookie('password')
    let isRemember = getCookie('isRemember')
    
    if (isRemember && rememberUsername && rememberPassword) {
      console.log('console.log(isRemember)',isRemember)
      form.setFields([{ name: 'account', value: rememberUsername }, { name: 'password', value: rememberPassword }, {name:'remember', value: isRemember === '1'}])  
      setIsRemember(isRemember === '1')
    }
  }, [])

  useEffect(() => {
    console.log('isRemember', isRemember)
  }, [isRemember])
  return (
    <div className="h-screen bg-gray1 flex justify-center items-center login-content">
      <div className="flex flex-row  justify-center ">
        <SellerLogoPanel />
        <div className="bg-white border p-6 content ml-24">
          <p className="text-2xl font-medium text-center">Seller Center</p>
          <Form
            form={form}
            onFinish={(values) => {
              setLoading(true);
              login({ username: values.account, password: values.password }).then(res => {
                if (res) {
                  console.log(res, 're')
                  setUserInfo(res.userInfo)
                  localStorage.setItem("rc-userInfo", JSON.stringify(res.userInfo))
                  localStorage.setItem("rc-token", JSON.stringify(res.access_token))
                  if (process.env.NODE_ENV === "production") {
                    LogRocket.identify(res.userInfo.id, {
                      name: res.userInfo.name
                    });
                  }
                  if (isRemember) {
                    setCookie('username', values.account, 30)
                    setCookie('password', values.password, 30)
                    setCookie('isRemember', '1', 30)
                  } else {
                    setCookie('username', '', 30)
                    setCookie('password', '', 30)
                    setCookie('isRemember', '0', 30)
                  }
                  handleLogin(values)
                } else {
                  message.error({ className: "rc-message", content: 'Username or password is wrong!' })
                }
                setLoading(false);
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
                <Checkbox onChange={(e) => {
                  setIsRemember(e.target.checked)
                  console.log('isRemember', e.target.checked)
                }}>Remember me</Checkbox>
              </Form.Item>
              <Link
                className="primary-color font-medium text-12"
                to="/resetPassword"
              >
                Forget password?
              </Link>
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
                Log  In
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
