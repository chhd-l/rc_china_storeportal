import { Outlet } from "react-router-dom";
import Menus from "../Menus";
import TopHeader from "../Header";
import { Layout } from "antd";
import { important } from "tailwind.config";
const { Header, Content, Sider } = Layout;
const AppLayout = () => {
  return (
    <Layout>
      <TopHeader />
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
