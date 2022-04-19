import ClientBuilder from '@/rc-china-commerce/packages/fetch/lib'

const ApiRoot = new ClientBuilder().config({
  url: 'http://localhost:9000/graphql',
})
export default ApiRoot
