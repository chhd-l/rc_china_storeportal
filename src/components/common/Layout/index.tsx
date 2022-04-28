import { Outlet } from "react-router-dom";
import Menus from "../Menus";
import TopHeader from "../Header";
import { Layout } from "antd";
import RouteBreadcrumb from './RouteBreadcrumb'

const { Header, Content, Sider } = Layout;
const AppLayout = () => {

  return (
    <Layout>
      <Header className="bg-white p-0 fixed w-full flex items-center" style={{ zIndex: 1 }}>
        {/* <TopHeader /> */}
        <RouteBreadcrumb />
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Layout style={{width:"16%",height: "calc(100vh - 64)",top: "58px",background:"#fff"}} className="overflow-auto fixed left-0 bottom-0">
        <Sider
          width={"100%"}
          theme="light"
          style={{background:"#fff"}}
          // className="overflow-auto fixed left-0 bottom-0"
          // style={{
          //   height: "calc(100vh - 64)",
          //   top: "58px",
          // }}
        >
          <Menus />
        </Sider>
        </Layout>
        <Layout style={{width:"84%",marginLeft:"auto"}}>
          <Content >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
