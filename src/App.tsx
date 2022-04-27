import { Suspense, useEffect } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import Router from './routers'
import { Spin } from 'antd'
import './App.css'
import '@/assets/css/global.less'
import '@/assets/css/iconfont/iconfont.css'
import ApiRoot from './framework/api/fetcher'

function App () {
  let Routers = useRoutes(Router)
  const navigate = useNavigate()
  useEffect(() => {
    // navigate('/order-list')
    // ApiRoot.addresses().createAddress({
    //   body: {
    //     customerId: 'e5edfa8c-ff05-cee0-45af-5c9e69d1b162',
    //     receiverName: 'Zuoqin',
    //     phone: '13101227768',
    //     country: '中国',
    //     province: '重庆',
    //     city: '重庆',
    //     region: '渝中区',
    //     detail: '华盛路1号8号楼德勤大楼',
    //     postcode: '4000000',
    //     isDefault: true,
    //     storeId: '12345678',
    //     operator: 'zuoqin',
    //   },
    // })
  }, [])

  return (
    <div className='App text-center'>
      <Suspense fallback={<Spin className='magin-auto' />}><div className="text-left">{Routers}</div></Suspense>
    </div>
  )
}

export default App
