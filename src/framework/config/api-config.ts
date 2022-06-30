type TApiConfig = {
  auth: string;
}

interface IApiConfig {
  development: any;
  production: any;
  test?: TApiConfig;
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
    order: "http://localhost:7000/graphql",
    address: "http://localhost:9000/graphql",
    productSkuDetail:"http://localhost:7000/graphql",
    orderCreate:"http://localhost:7000/graphql",
    orderList:"http://localhost:7000/graphql",
    orderDetail:"http://localhost:7000/graphql",
    voucher:"http://localhost:7000/graphql",
  },
  production: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV];
