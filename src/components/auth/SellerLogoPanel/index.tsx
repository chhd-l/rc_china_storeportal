import React from "react";
import loginImage from "@/assets/images/img-login.png";

const SellerLogoPanel = () => {
  return (
    <>
      <div className="flex flex-col justify-start mr-24 pt-2">
        <p className="text-left mt-2 mb-1 text-red-500 text-xl font-medium">
          Seller Center
        </p>
        <p className="text-left">Efficient store management tools</p>
        <img src={loginImage} className="mt-2" alt="" />
      </div>
    </>
  );
};
export default SellerLogoPanel;
