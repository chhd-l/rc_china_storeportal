type TApiConfig = {
  auth: string
  wx_account: string
  wx_fans: string
  wx_reply: string
  wx_qrcode: string
  wx_template: string
  wx_menu: string
  wx_banner: string
  wx_assets: string
  sc_product: string
  product: string
  product_es_list: string
  product_search: string
  tag: string
  common_pet: string
}

interface IApiConfig {
  development: any
  production: any
  test?: TApiConfig
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/fc-sc-auth/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/fc-sc-wx-account/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/fc-sc-wx-fans/graphql",
    wx_reply: "https://fc-sc-wx-reply-dev-selercenter-ignpegacpj.cn-shanghai.fcapp.run/fc-sc-wx-reply/graphql",
    wx_qrcode: "https://fc-sc-wx-qrcode-dev-selercenter-mniqujdhge.cn-shanghai.fcapp.run/fc-sc-wx-qrcode/graphql",
    wx_template: "https://fc-sc-wtemplate-dev-selercenter-xdguwkwlif.cn-shanghai.fcapp.run/fc-sc-wx-template/graphql",
    wx_menu: "https://fc-sc-wx-menu-dev-selercenter-pqewrpffbx.cn-shanghai.fcapp.run/fc-sc-wx-menu/graphql",
    wx_banner: "https://fc-sc-wx-banner-dev-selercenter-zajrrjdhgn.cn-shanghai.fcapp.run/fc-sc-wx-banner/graphql",
    wx_assets: "https://fc-sc-wx-assets-dev-selercenter-ndoaqjdhgo.cn-shanghai.fcapp.run/fc-sc-wx-assets/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    order_action: 'https://fc-sc-or-action-dev-selercenter-juostbwarp.cn-shanghai.fcapp.run/graphql',
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    sc_product: "https://fc-sc-product-dev-selercenter-gabxrpcpbl.cn-shanghai.fcapp.run/fc-sc-product/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/fc-com-product/graphql",
    product_es_list: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/fc-com-product-es-list/graphql",
    product_search: "https://fc-sc-pt-search-dev-selercenter-gehwotganj.cn-shanghai.fcapp.run/fc-sc-product-search/graphql",
    sc_subscription: "https://fc-sc-scription-dev-selercenter-sjgltddaxz.cn-shanghai.fcapp.run/fc-sc-subscription/graphql",
    com_subscription: "https://fc-com-cription-dev-common-ogvrfcxebk.cn-shanghai.fcapp.run/fc-com-subscription/graphql",
    tag: "https://fc-sc-tag-dev-selercenter-dddvbzlymt.cn-shanghai.fcapp.run/graphql",
    shop_category: 'https://fc-sc-scategory-dev-selercenter-hvtejlkgbh.cn-shanghai.fcapp.run/fc-sc-shop-category/graphql',
    common_pet: "https://fc-com-pet-dev-common-oecjgzxfmp.cn-shanghai.fcapp.run/fc-com-pet/graphql",
    address_list: "https://fc-com-ess-list-dev-common-quileiwebv.cn-shanghai.fcapp.run/graphql",
    consumer: 'https://fc-sc-consumer-dev-selercenter-ybuuesxcai.cn-shanghai.fcapp.run/graphql',
    storeSetting: 'https://fc-com-setting-dev-common-dmgwlxbcvr.cn-shanghai.fcapp.run/graphql',
    liveStreaming: 'https://fc-com-treaming-dev-common-unckjafhvm.cn-shanghai.fcapp.run/graphql'
  },
  production: {
    auth: "https://fc-sc-auth-dev-selercenter-umayykwqea.cn-shanghai.fcapp.run/fc-sc-auth/graphql",
    wx_account: "https://fc-sc-w-account-dev-selercenter-yyavxcmeij.cn-shanghai.fcapp.run/fc-sc-wx-account/graphql",
    wx_fans: "https://fc-sc-wx-fans-dev-selercenter-eueyrpffbx.cn-shanghai.fcapp.run/fc-sc-wx-fans/graphql",
    wx_reply: "https://fc-sc-wx-reply-dev-selercenter-ignpegacpj.cn-shanghai.fcapp.run/fc-sc-wx-reply/graphql",
    wx_qrcode: "https://fc-sc-wx-qrcode-dev-selercenter-mniqujdhge.cn-shanghai.fcapp.run/fc-sc-wx-qrcode/graphql",
    wx_template: "https://fc-sc-wtemplate-dev-selercenter-xdguwkwlif.cn-shanghai.fcapp.run/fc-sc-wx-template/graphql",
    wx_menu: "https://fc-sc-wx-menu-dev-selercenter-pqewrpffbx.cn-shanghai.fcapp.run/fc-sc-wx-menu/graphql",
    wx_banner: "https://fc-sc-wx-banner-dev-selercenter-zajrrjdhgn.cn-shanghai.fcapp.run/fc-sc-wx-banner/graphql",
    wx_assets: "https://fc-sc-wx-assets-dev-selercenter-ndoaqjdhgo.cn-shanghai.fcapp.run/fc-sc-wx-assets/graphql",
    orderList: "https://fc-com-der-list-dev-common-vbypvtabkd.cn-shanghai.fcapp.run/graphql",
    orderDetail: "https://fc-com-r-detail-dev-common-osunrnujbz.cn-shanghai.fcapp.run/graphql",
    order_action: 'https://fc-sc-or-action-dev-selercenter-juostbwarp.cn-shanghai.fcapp.run/graphql',
    voucher: "https://fc-com-voucher-dev-common-sfkvithbhy.cn-shanghai.fcapp.run/graphql",
    payment: "https://fc-com-payment-dev-common-szirsgqhhy.cn-shanghai.fcapp.run/graphql",
    sc_product: "https://fc-sc-product-dev-selercenter-gabxrpcpbl.cn-shanghai.fcapp.run/fc-sc-product/graphql",
    product: "https://fc-com-product-dev-common-szrflwfhhy.cn-shanghai.fcapp.run/fc-com-product/graphql",
    product_es_list: "https://fc-com-es-list-dev-common-hdggvbqeut.cn-shanghai.fcapp.run/fc-com-product-es-list/graphql",
    product_search: "https://fc-sc-pt-search-dev-selercenter-gehwotganj.cn-shanghai.fcapp.run/fc-sc-product-search/graphql",
    sc_subscription: "https://fc-sc-scription-dev-selercenter-sjgltddaxz.cn-shanghai.fcapp.run/fc-sc-subscription/graphql",
    com_subscription: "https://fc-com-cription-dev-common-ogvrfcxebk.cn-shanghai.fcapp.run/fc-com-subscription/graphql",
    tag: "https://fc-sc-tag-dev-selercenter-dddvbzlymt.cn-shanghai.fcapp.run/graphql",
    shop_category: 'https://fc-sc-scategory-dev-selercenter-hvtejlkgbh.cn-shanghai.fcapp.run/graphql',
    common_pet: "https://fc-com-pet-dev-common-oecjgzxfmp.cn-shanghai.fcapp.run/fc-com-pet/graphql",
    address_list: "https://fc-com-ess-list-dev-common-quileiwebv.cn-shanghai.fcapp.run/graphql",
    consumer: 'https://fc-sc-consumer-dev-selercenter-ybuuesxcai.cn-shanghai.fcapp.run/graphql',
    storeSetting: 'https://fc-com-setting-dev-common-dmgwlxbcvr.cn-shanghai.fcapp.run/graphql',
    liveStreaming: 'https://fc-com-treaming-dev-common-unckjafhvm.cn-shanghai.fcapp.run/graphql'
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
