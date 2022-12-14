import React from "react";
import loginImage from "@/assets/images/img-login.png";
import "./index.less"

const SellerLogoPanel = () => {
  return (
    <>
      <div className="flex flex-col justify-start mr-24 pt-2 login">
        <p className="text-left mt-2 mb-1 primary-color text-xl font-black">
          DTC Center
        </p>
        <p className="text-left">Efficient store management tools</p>
        <img src={loginImage} className="mt-2 login-img" alt="" />
      </div>
    </>
  );
};
export default SellerLogoPanel;
