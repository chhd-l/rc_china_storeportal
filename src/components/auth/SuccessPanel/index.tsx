import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPanel = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white w-80 h-80 border px-6 py-20">
        <CheckCircleOutlined
          style={{ color: "rgba(239, 68, 68,1)", fontSize: "48px" }}
        />
        <p className="text-xl font-medium">Succeed!</p>
        <Button
          className="w-full"
          type="primary"
          danger
          onClick={(e) => {
            navigate("/login");
          }}
        >
          Back to Log In Page
        </Button>
      </div>
    </>
  );
};
export default SuccessPanel;
