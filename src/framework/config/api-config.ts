type TApiConfig = {
  auth: string
  wx_account: string
  wx_fans: string
  wx_reply: string
  wx_qrcode: string
  wx_template: string
  sc_product: string
  product: string
  product_es_list: string
  product_search: string
}

interface IApiConfig {
  development: any
  production: any
  test?: TApiConfig
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/graphql",
    wx_reply: "https://fc-sc-wx-reply-dev-selercenter-ignpegacpj.cn-shanghai.fcapp.run/graphql",
    wx_qrcode: "https://fc-sc-wx-qrcode-dev-selercenter-mniqujdhge.cn-shanghai.fcapp.run/graphql",
    wx_template: "https://fc-sc-wtemplate-dev-selercenter-xdguwkwlif.cn-shanghai.fcapp.run/graphql",
    order: "https://fc-com-order-dev-common-matrcxbdtw.cn-shanghai.fcapp.run/graphql",
    address: "https://fc-com-address-dev-common-sifkzgpahy.cn-shanghai.fcapp.run/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    sc_product: "http://localhost:7000/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    product_es_list: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/graphql",
    product_search: "https://fc-sc-pt-search-dev-selercenter-gehwotganj.cn-shanghai.fcapp.run/graphql",
  },
  production: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/graphql",
    wx_reply: "https://fc-sc-wx-reply-dev-selercenter-ignpegacpj.cn-shanghai.fcapp.run/graphql",
    wx_qrcode: "https://fc-sc-wx-qrcode-dev-selercenter-mniqujdhge.cn-shanghai.fcapp.run/graphql",
    wx_template: "https://fc-sc-wtemplate-dev-selercenter-xdguwkwlif.cn-shanghai.fcapp.run/graphql",
    order: "https://fc-com-order-dev-common-matrcxbdtw.cn-shanghai.fcapp.run/graphql",
    address: "https://fc-com-address-dev-common-sifkzgpahy.cn-shanghai.fcapp.run/graphql",
    orderCreate: "https://fc-mp-or-create-dev-miniprogram-oldnuaupiz.cn-shanghai.fcapp.run/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    sc_product: "http://localhost:7000/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/graphql",
    product_es_list: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/graphql",
    product_search: "https://fc-sc-pt-search-dev-selercenter-gehwotganj.cn-shanghai.fcapp.run/graphql",
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
