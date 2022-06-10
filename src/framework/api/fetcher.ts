import ClientBuilder from '@rc-china-commerce/fetch/'
// import ClientBuilder from '@/rc-china-commerce/packages/fetch/lib/index'
import { message } from 'antd'
import history from '@/routers/history'
// import ClientBuilder from '@/rc-china-commerce/packages/fetch/dist/fetch/lib'

// const API_URL = 'https://ms.wamdy.com/faas/graphql'
// 生产
const API_URL = 'https://ms.wamdy.com/faas/graphql'
// const API_URL = 'https://msdev.d2cgo.com/faas/graphql'
// const API_URL = 'https://msstg.d2cgo.com/faas/graphql'

// 开发
// const API_URL = 'https://dtc-faas-dev-dtc-plaform-dev-yfetifgpvj.cn-shanghai.fcapp.run/graphql'

// const API_URL = `${process.env.REACT_APP_BASE_URL}/graphql`

export const UPLOAD_API_URL = 'https://ms.wamdy.com/faas/upload'

const ApiRoot = new ClientBuilder().config({
  url: API_URL,
  handleError: function (err: string, isNeedToLogin: boolean = false) {
    message.error({ className: 'rc-message', content: err === 'GqlAuthGuard' ? 'Login expired, please login again!' : err })
    if (isNeedToLogin) {
      history.push('/login')
    }
  }
})
export default ApiRoot
