import { Suspense, useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import Router from './routers/index'
import './App.css'
import '@/assets/css/global.less'
import '@/assets/css/iconfont/iconfont.css'
import Loading from '@/assets/images/loading.gif'
import { useAtom } from 'jotai'
import { userAtom } from './store/user.store'

function App () {
  let Routers = useRoutes(Router)
  const navigate = useNavigate()
  const location = useLocation()
  const [userInfo] = useAtom(userAtom)

  useEffect(() => {
    console.log(process.env.REACT_APP_BESE_URL, 'console.log(process.env.REACT_APP_BASE_URL)')
    if (location.pathname === '/') {
      if (userInfo?.id) {
        navigate('/shipment-list')  
      } else {
        navigate('/login')
      }
    }
  }, [location.pathname])

  return (
    <div className='App text-center'>
      <Suspense
        fallback={
          <div className='w-full h-screen flex justify-center items-center'>
            <img className='mb-15' style={{ width: '13rem' }} src={Loading} />
          </div>
        }
      >
        <div className='text-left'>{Routers}</div>
      </Suspense>
    </div>
  )
}

export default App
