import { Suspense, useEffect } from 'react'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import Router from './routers/index'
import './App.css'
import '@/assets/css/global.less'
import '@/assets/css/iconfont/iconfont.css'
import Loading from '@/assets/images/loading.gif'

function App () {
  let Routers = useRoutes(Router)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(location.pathname==='/'){
      navigate('/shipment-list')
    }
  }, [location.pathname])

  return (
    <div className='App text-center'>
      <Suspense
        fallback={
          <div className='w-full h-screen flex justify-center items-center'>
            <img className='mb-15' style={{width: "13rem"}} src={Loading}/>
          </div>
        }>
        <div className="text-left">{Routers}</div>
      </Suspense>
    </div>
  )
}

export default App
