import logo from "../../../assets/images/logo.png"
const Header = () => {
  return (
    <header className="flex ml-1">
      <div className="flex flex-row">
        {/* <span className="pr-3">{logo}</span> */}
        <img src={logo} alt="" className=" w-28 h-full" />

      </div>
    </header>
  );
};
export default Header;
