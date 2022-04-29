import { User } from "@/framework/types/common";
import logo from "../../../assets/images/logo.png"
import RouteBreadcrumb from '../Layout/RouteBreadcrumb'
const Header = ({userInfo}: {userInfo: User | null}) => {
  return (
    <header style={{ height: "51px", verticalAlign: 'center',zIndex:"99" }} className="flex bg-white shadow-md w-full items-cente fixed overflow-hidden">
      <div className="flex flex-row h-1/2 m-auto mr-0 ml-5 w-28">
        {/* <span className="pr-3">{logo}</span> */}
        <img src={logo} alt="" className=" w-28 h-4/5 m-auto" />
      </div>
      <RouteBreadcrumb />
      {/* <div>{userInfo?.username}</div> */}
    </header>
  );
};
export default Header;
