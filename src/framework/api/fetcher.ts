import ClientBuilder from '@rc-china-commerce/fetch/'
// import ClientBuilder from '@/rc-china-commerce/packages/fetch/lib/index'
import { message } from 'antd'
// import ClientBuilder from '@/rc-china-commerce/packages/fetch/dist/fetch/lib'

// const API_URL = 'http://localhost:9000/graphql'
// 生产
// const API_URL = 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/graphql'

// 开发
const API_URL = 'https://dtc-faas-dev-dtc-plaform-dev-yfetifgpvj.cn-shanghai.fcapp.run/graphql'

// const API_URL = `${process.env.REACT_APP_BASE_URL}/graphql`

const ApiRoot = new ClientBuilder().config({
  url: API_URL,
  handleError: function (err: string) {
    message.error({ className: 'rc-message', content: err })
  }
})
export default ApiRoot
