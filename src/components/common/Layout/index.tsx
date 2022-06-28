import { Outlet } from 'react-router-dom'
import Menus from '../Menus'
import { useLocation } from 'react-router-dom'
import TopHeader from '../Header'
import { Layout } from 'antd'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
import { useEffect, useState } from 'react'
import './index.less'

const { Content, Sider } = Layout

const AppLayout = () => {
  const { pathname } = useLocation()
  const [userInfo] = useAtom(userAtom)
  const [isOpen, setIsOpen] = useState(true)
  const [dashboard, setDashboard] = useState(false)

  useEffect(() => {
    if (pathname === '/dashboard') {
      setDashboard(true)
    } else {
      setDashboard(false)
    }
    if (
      (pathname.split('/').some((path) => path === 'product') &&
        pathname !== '/product/product-list' &&
        pathname !== '/product'&&pathname !== '/product/product-search') ||
      pathname === '/assets/add-graphic' ||
      (pathname.split('/').some((path) => path === 'category') &&
        pathname !== '/category/category-list' &&
        pathname !== '/category' &&
        pathname !== '/category/customer-service') ||
      (pathname.split('/').some((path) => path === 'marketingCenter') &&
        pathname !== '/marketingCenter/marketingCenter-list' &&
        pathname !== '/marketingCenter' &&
        pathname !== '/marketingCenter/intelligentRecommendation' &&
        pathname !== '/marketingCenter/intelligentRecommendation/intelligentRecommendation-list')
    ) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [pathname])

  return (
    <Layout>
      <TopHeader userInfo={userInfo} />
      <Layout>
        {isOpen ? (
          <Sider
            theme="light"
            style={{
              overflow: 'auto',
              height: 'calc(100vh - 55px)',
              paddingBottom: 20,
              position: 'fixed',
              left: 0,
              top: 55,
              bottom: 0,
            }}
          >
            <Menus />
          </Sider>
        ) : null}
        {/* <Sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 55,
            bottom: 0,
          }}
        >
          <Menus />
        </Sider> */}
        <Layout style={{ marginLeft: isOpen ? 200 : 0 }}>
          <Content
            className={`site-layout-background ${dashboard ? 'dashboard_01_bg' : ''}`}
            style={{
              margin: isOpen ? '59px 2% 0' : dashboard ? '59px 0 0' : '59px 10% 0',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default AppLayout
