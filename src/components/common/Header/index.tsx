import logo from "../../../assets/images/logo.png"
import RouteBreadcrumb from '../Layout/RouteBreadcrumb'
const Header = () => {
  return (
    <header style={{ height: "51px", verticalAlign: 'center' }} className="flex shadow-md w-full items-cente fixed overflow-hidden">
      <div className="flex flex-row h-1/2 m-auto mr-0 ml-5">
        {/* <span className="pr-3">{logo}</span> */}
        <img src={logo} alt="" className=" w-28 h-full" />
      </div>
      <RouteBreadcrumb />
    </header>
  );
};
export default Header;
