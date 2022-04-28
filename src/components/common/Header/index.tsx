import logo from "../../../assets/images/logo.png"
const Header = () => {
  return (
    <header className="flex bg-white p-0 fixed w-full justify-between pl-6 pr-6 h-14 items-center border-b border-gray-200 border-solid shadow-md z-10">
      <div className="flex flex-row">
        {/* <span className="pr-3">{logo}</span> */}
        <img src={logo} alt="" className=" w-28 h-5" />
        <span className="ml-6">Seller Center</span>
      </div>
      <div>User</div>
    </header>
  );
};
export default Header;
