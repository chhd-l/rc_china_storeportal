// import ClientBuilder from '@rc-china-commerce/fetch/'
import ClientBuilder from '@/rc-china-commerce/packages/fetch/lib/index'
// import ClientBuilder from '@/rc-china-commerce/packages/fetch/dist/fetch/lib'

// const API_URL = 'http://localhost:9000/graphql'
const API_URL = 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/graphql'
// const API_URL = `${process.env.REACT_APP_BASE_URL}/graphql`

const ApiRoot = new ClientBuilder().config({ url: API_URL })
export default ApiRoot
