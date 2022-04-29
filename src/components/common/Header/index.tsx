import { User } from "@/framework/types/common";
import { useEffect } from "react";
import logo from "../../../assets/images/logo.png"
import RouteBreadcrumb from '../Layout/RouteBreadcrumb'
const Header = ({userInfo}: {userInfo: User | null}) => {
  return (
    <header style={{ height: "51px", verticalAlign: 'center',zIndex:"99" }} className="flex bg-white shadow-md w-full items-cente fixed overflow-hidden">
      <div className="flex flex-row h-1/2 m-auto mr-0 ml-5 flex-none w-50">
        {/* <span className="pr-3">{logo}</span> */}
        <img src={logo} alt="" className=" w-28 h-full" />
      </div>
      <div className="grow">
        <RouteBreadcrumb />
      </div>
      <div className="h-full flex-none" style={{ lineHeight: "51px", width: "150px" }}>
        <span className="iconfont icon-user align-middle" style={{ fontSize: "28px" }}></span>
        <span className="align-middle ml-2">{userInfo?.username}</span>
      </div>
    </header>
  );
};
export default Header;
