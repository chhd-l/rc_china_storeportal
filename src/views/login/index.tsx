import React, { useState } from "react";
import { Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { SellerLogoPanel } from "@/components/registerAndResetPass";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isRemPass, setIsRemPass] = useState(false); //是否记住密码
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

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
          <Input
            value={account}
            size="large"
            placeholder="Account number"
            onChange={(e) => setAccount(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Input
            value={password}
            size="large"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError ? (
            <p className="my-0 text-left text-red-500">{loginError}</p>
          ) : null}
          <div className="flex flex-row justify-between items-center mt-2 mb-2">
            <Checkbox
              onChange={() => setIsRemPass(!isRemPass)}
              style={{ fontSize: "12px" }}
            >
              Remember password
            </Checkbox>
            <a
              className="text-red-500 font-medium text-12"
              href={"/resetPassword"}
            >
              Forget password?
            </a>
          </div>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            danger
            className="w-full bg-red-500 mb-2"
            disabled={account === "" || password === ""}
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
          <p className="text-12">
            Don't have an account?{" "}
            <a className="text-red-500 font-medium text-12" href={"/register"}>
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
