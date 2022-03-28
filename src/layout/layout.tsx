import { Outlet } from "react-router-dom";
import Menus from "../components/Menu/index";
import Header from '../components/Header/index'
const AppLayout = () => {
  return (
   <>
    <Header/>
    <section className="flex">
      <Menus />
      <main className="flex-1">
        <Outlet />
      </main>
    </section>
    </>
  );
};
export default AppLayout;
