import { Outlet } from "react-router-dom";
import Menus from "../Menus";
import TopHeader from "../Header";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
const AppLayout = () => {
  return (
    <Layout>
      <TopHeader />
      <Layout style={{ marginTop: 64 }}>
        <Sider
          width={"16%"}
          theme="light"
          className="overflow-auto fixed left-0 bottom-0"
          style={{
            height: "calc(100vh - 64)",
            top: "58px",
          }}
        >
          <Menus />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AppLayout;
