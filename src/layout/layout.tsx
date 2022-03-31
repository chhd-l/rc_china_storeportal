import { Outlet } from "react-router-dom";
import Menus from "../components/Menu/index";
import TopHeader from '../components/Header/index'
import { Layout } from 'antd'
const { Header, Content, Sider } = Layout;
const AppLayout = () => {
  return (
    <Layout>
      <Header className="bg-white p-0 fixed w-full"  style={{  zIndex: 1 }}>
        <TopHeader />
      </Header>
      <Layout style={{ marginTop: 64 }}>
      <Sider
      theme="light"
      className="overflow-auto fixed left-0 bottom-0"
      style={{
        height: 'calc(100vh - 64)',
        top: '64px',
      }}>
        <Menus />

      </Sider>
      {/* <section className="flex">
      <main className="flex-1">
      </main>
    </section> */}
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
