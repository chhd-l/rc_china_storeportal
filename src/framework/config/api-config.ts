type TApiConfig = {
  auth: string;
  wx_account: string;
  wx_fans: string;
}

interface IApiConfig {
  development: TApiConfig;
  production: TApiConfig;
  test?: TApiConfig;
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/graphql",
  },
  production: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"];
