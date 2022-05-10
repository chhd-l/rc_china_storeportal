import { Outlet } from 'react-router-dom'
import Menus from '../Menus'
import { useLocation, useNavigate } from 'react-router-dom'
import TopHeader from '../Header'
import { Layout } from 'antd'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
import { useEffect, useState } from 'react'

const { Content, Sider } = Layout

const AppLayout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const [userInfo] = useAtom(userAtom)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('rc-userInfo') || !localStorage.getItem("rc-token")) {
      localStorage.removeItem('rc-userInfo')
      localStorage.removeItem("rc-token")
      navigate('/login')
    }
    if (pathname.split('/').some(path => path === 'product') && pathname !== '/product/product-list' && pathname !== '/product') {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }, [pathname])

  return (
    <Layout>
      <TopHeader userInfo={userInfo} />
      <Layout>
        {
          isOpen ? (
            <Sider
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
            </Sider>
          ) : null
        }
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
        <Layout style={{ marginLeft: isOpen ? 200 : 0 }} >
          <Content
            className='site-layout-background'
            style={{
              margin: isOpen ? '59px 2% 0' : '59px 10% 0',
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
