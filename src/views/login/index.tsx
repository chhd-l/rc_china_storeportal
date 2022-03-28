import React, { useState } from "react";
import loginImage from "../../assets/images/img-login.png";
import { Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

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
    <div
      className="h-screen"
      style={{ backgroundColor: "rgba(248,248,248,1)" }}
    >
      <div className="flex flex-row  justify-center pt-20">
        <div className="flex flex-col justify-start mr-24 pt-2">
          <p className="text-left mt-2 mb-1 text-red-500 text-xl font-medium">
            Seller Center
          </p>
          <p className="text-left">Efficient store management tools</p>
          <img src={loginImage} className="mt-2" />
        </div>
        <div className="bg-white w-80 border p-6">
          <p className="text-xl font-medium">Login seller Center</p>
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
          <div className="flex flex-row justify-between items-center mt-2 mb-10">
            <Checkbox
              onChange={() => setIsRemPass(!isRemPass)}
              style={{ fontSize: "12px" }}
            >
              Remember password
            </Checkbox>
            <a style={{ fontSize: "12px" }} href={"/resetPassword"}>
              Forget password?
            </a>
          </div>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            danger
            className="w-full bg-red-500"
            disabled={account === "" || password === ""}
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
