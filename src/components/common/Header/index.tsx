import { User } from "@/framework/types/common";
import logo from "../../../assets/images/logo.png"
import RouteBreadcrumb from '../Layout/RouteBreadcrumb'
import userIcon from '@/assets/images/userIcon.svg'
import { Dropdown, Menu } from "antd";
import { useNavigate } from "react-router";
import "./index.less"

import storeImg from '@/assets/images/store.png';

const MenuComp = (navigate: Function) => {
  
  return (
    <Menu>
    {/* <Menu.Item key={"Manage Account"}>
      Manage Account
    </Menu.Item> */}
      <Menu.Item key={"Logout"} onClick={() => {
        localStorage.setItem('rc_access_token', '')
        localStorage.removeItem('rc-userInfo')
        localStorage.removeItem("rc-token")
      navigate('/login')
    }}>
      Logout
    </Menu.Item>
  </Menu>
  )
}


const Header = ({ userInfo }: { userInfo: User | null }) => {
  const navigate = useNavigate();
  return (
    <header style={{ height: "51px", verticalAlign: 'center',zIndex:"99" }} className="flex bg-white w-full items-cente fixed overflow-hidden boxShodow">
      <div className="flex flex-row h-1/2 m-auto mr-0 ml-5 flex-none w-28">
        <img src={logo} alt="" className=" w-28 h-4/5 m-auto cursor-pointer" onClick={() => {
          navigate('/dashboard')
        }} />
      </div>
      <div className="grow">
        <RouteBreadcrumb />
      </div>
      <div style={{marginRight: 40}} className="flex items-center cursor-pointer" onClick={() => navigate('/login/store')}>
        <span className="mr-2">{localStorage.getItem('rc_sc_login_brand')} - {localStorage.getItem('rc_sc_login_store')}</span>
        <img src={storeImg} width="16" height="16" alt="store" />
      </div>
      <div className="h-full flex-none" style={{ lineHeight: "51px", width: "150px" }}>
        <Dropdown overlay={MenuComp(navigate)} placement="bottom" arrow>
          <span className="h-full inline-block cursor-pointer">
            <img alt="" className="inline-block align-middle" src={userIcon}/>
            <span className="align-middle ml-2">{userInfo?.username}</span>
          </span>
        </Dropdown>
      </div>
    </header>
  );
};
export default Header;
