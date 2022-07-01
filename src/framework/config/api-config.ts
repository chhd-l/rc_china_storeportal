type TApiConfig = {
  auth: string;
  wx_account: string;
  wx_fans: string;
  wx_reply: string;
  wx_qrcode: string;
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
    wx_reply: "https://fc-sc-wx-reply-dev-selercenter-ignpegacpj.cn-shanghai.fcapp.run/graphql",
    wx_qrcode: "https://fc-sc-wx-qrcode-dev-selercenter-mniqujdhge.cn-shanghai.fcapp.run/graphql",
  },
  production: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/graphql",
    wx_reply: "https://fc-sc-wx-reply-dev-selercenter-ignpegacpj.cn-shanghai.fcapp.run/graphql",
    wx_qrcode: "https://fc-sc-wx-qrcode-dev-selercenter-mniqujdhge.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"];
