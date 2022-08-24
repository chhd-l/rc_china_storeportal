import { Suspense, useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import Router from './routers/index'
import './App.less'
import '@/assets/css/global.less'
import '@/assets/css/iconfont/iconfont.css'
import Loading from '@/assets/images/loading1.gif'
import intl from 'react-intl-universal'
import { ConfigProvider } from 'antd'
import { useAtom } from 'jotai'
import { userAtom } from './store/user.store'
import { langAtom } from './store/lang.store'
import locals, { TLangKey } from './locale'

import en_US from "antd/lib/locale/en_US"
ConfigProvider.config({
    theme: { primaryColor: '#ee4d2d', },
});

function App () {
  let Routers = useRoutes(Router)
  const navigate = useNavigate()
  const location = useLocation()
  const [userInfo] = useAtom(userAtom)
  const [lang] = useAtom(langAtom)

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_BESE_URL, 'console.log(process.env.REACT_APP_BASE_URL)')
  //   if (location.pathname === '/') {
  //     if (userInfo?.id) {
  //       navigate('/shipment-list')
  //     } else {
  //       navigate('/login')
  //     }
  //   }
  // }, [location.pathname])

  useEffect(() => {
    if (!localStorage.getItem('rc_access_token') && !['/login', '/register'].includes(location.pathname)) {
      localStorage.setItem('rc_access_token', '')
      localStorage.removeItem('rc-userInfo')
      localStorage.removeItem('rc-token')
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    intl.init({
      currentLocale: lang,
      locales: locals.loca,
      fallbackLocale: 'en_US',
    })
  }, [lang])

  return (
    <div className='App text-center'>
      <ConfigProvider locale={locals['antd'][lang]}>
        <Suspense
          fallback={
            <div className='w-full h-screen flex justify-center items-center'>
              <img className='mb-15' alt='' style={{ width: '13rem' }} src={Loading} />
            </div>
          }
        >
          <div className='text-left'>{Routers}</div>
        </Suspense>
      </ConfigProvider>
    </div>
  )
}

export default App
