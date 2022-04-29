import { Outlet } from "react-router-dom";
import Menus from "../Menus";
import TopHeader from "../Header";
import { Layout } from "antd";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user.store";

const { Content, Sider } = Layout;

const AppLayout = () => {
  const [userInfo] = useAtom(userAtom)

  return (
    <Layout >
      <TopHeader userInfo={userInfo}/>
      <Layout>
      <Sider  theme="light" style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 55,
        bottom: 0,
      }}>
        <Menus />
      </Sider>
      <Layout style={{ marginLeft: 200 }} >
        
        <Content
          className="site-layout-background"
          style={{
            // padding: 24,
            margin: '59px 24px 0 24px',
            // minHeight: 600,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    </Layout>
  );
};
export default AppLayout;
