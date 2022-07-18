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
  orderList: string
  orderDetail: string
  order_action: string
  voucher: string
  payment: string
  sc_product: string
  product: string
  product_es_list: string
  product_search: string
  sc_subscription: string
  com_subscription: string
  shop_category: string
  common_pet: string
  tag: string
  address_list: string
  consumer: string
  storeSetting: string
  liveStreaming: string
}

interface IApiConfig {
  development: any
  production: any
  test?: TApiConfig
}

const API_CONFIG: IApiConfig = {
  development: {
    auth: "https://fcdev.fivefen.com/fc-sc-auth/graphql",
    wx_account: "https://fcdev.fivefen.com/fc-sc-wx-account/graphql",
    wx_fans: "https://fcdev.fivefen.com/fc-sc-wx-fans/graphql",
    wx_reply: "https://fcdev.fivefen.com/fc-sc-wx-reply/graphql",
    wx_qrcode: "https://fcdev.fivefen.com/fc-sc-wx-qrcode/graphql",
    wx_template: "https://fcdev.fivefen.com/fc-sc-wx-template/graphql",
    wx_menu: "https://fcdev.fivefen.com/fc-sc-wx-menu/graphql",
    wx_banner: "https://fcdev.fivefen.com/fc-sc-wx-banner/graphql",
    wx_assets: "https://fcdev.fivefen.com/fc-sc-wx-assets/graphql",
    orderList: "https://fcdev.fivefen.com/fc-com-order-list/graphql",
    orderDetail: "https://fcdev.fivefen.com/fc-com-order-detail/graphql",
    order_action: 'https://fcdev.fivefen.com/fc-sc-order-action/graphql',
    voucher: "https://fcdev.fivefen.com/fc-com-voucher/graphql",
    payment: "https://fcdev.fivefen.com/fc-com-payment/graphql",
    sc_product: "https://fcdev.fivefen.com/fc-sc-product/graphql",
    product: "https://fcdev.fivefen.com/fc-com-product/graphql",
    product_es_list: "https://fcdev.fivefen.com/fc-com-product-es-list/graphql",
    product_search: "https://fcdev.fivefen.com/fc-sc-product-search/graphql",
    sc_subscription: "https://fcdev.fivefen.com/fc-sc-subscription/graphql",
    com_subscription: "https://fcdev.fivefen.com/fc-com-subscription/graphql",
    shop_category: 'https://fcdev.fivefen.com/fc-sc-shop-category/graphql',
    common_pet: "https://fcdev.fivefen.com/fc-com-pet/graphql",
    tag: "https://fcdev.fivefen.com/fc-sc-tag/graphql",
    address_list: "https://fcdev.fivefen.com/fc-com-address-list/graphql",
    consumer: 'https://fcdev.fivefen.com/fc-sc-consumer/graphql',
    storeSetting: 'https://fcdev.fivefen.com/fc-com-store-setting/graphql',
    liveStreaming: 'https://fcdev.fivefen.com/fc-com-live-streaming/graphql'
  },
  production: {
    auth: "https://fcstg.fivefen.com/fc-sc-auth/graphql",
    wx_account: "https://fcstg.fivefen.com/fc-sc-wx-account/graphql",
    wx_fans: "https://fcstg.fivefen.com/fc-sc-wx-fans/graphql",
    wx_reply: "https://fcstg.fivefen.com/fc-sc-wx-reply/graphql",
    wx_qrcode: "https://fcstg.fivefen.com/fc-sc-wx-qrcode/graphql",
    wx_template: "https://fcstg.fivefen.com/fc-sc-wx-template/graphql",
    wx_menu: "https://fcstg.fivefen.com/fc-sc-wx-menu/graphql",
    wx_banner: "https://fcstg.fivefen.com/fc-sc-wx-banner/graphql",
    wx_assets: "https://fcstg.fivefen.com/fc-sc-wx-assets/graphql",
    orderList: "https://fcstg.fivefen.com/fc-com-order-list/graphql",
    orderDetail: "https://fcstg.fivefen.com/fc-com-order-detail/graphql",
    order_action: 'https://fcstg.fivefen.com/fc-sc-order-action/graphql',
    voucher: "https://fcstg.fivefen.com/fc-com-voucher/graphql",
    payment: "https://fcstg.fivefen.com/fc-com-payment/graphql",
    sc_product: "https://fcstg.fivefen.com/fc-sc-product/graphql",
    product: "https://fcstg.fivefen.com/fc-com-product/graphql",
    product_es_list: "https://fcstg.fivefen.com/fc-com-product-es-list/graphql",
    product_search: "https://fcstg.fivefen.com/fc-sc-product-search/graphql",
    sc_subscription: "https://fcstg.fivefen.com/fc-sc-subscription/graphql",
    com_subscription: "https://fcstg.fivefen.com/fc-com-subscription/graphql",
    shop_category: 'https://fcstg.fivefen.com/fc-sc-shop-category/graphql',
    common_pet: "https://fcstg.fivefen.com/fc-com-pet/graphql",
    tag: "https://fcstg.fivefen.com/fc-sc-tag/graphql",
    address_list: "https://fcstg.fivefen.com/fc-com-address-list/graphql",
    consumer: 'https://fcstg.fivefen.com/fc-sc-consumer/graphql',
    storeSetting: 'https://fcstg.fivefen.com/fc-com-store-setting/graphql',
    liveStreaming: 'https://fcstg.fivefen.com/fc-com-live-streaming/graphql'
  },
  test: {
    auth: "https://fcdev.fivefen.com/fc-sc-auth/graphql",
    wx_account: "https://fcdev.fivefen.com/fc-sc-wx-account/graphql",
    wx_fans: "https://fcdev.fivefen.com/fc-sc-wx-fans/graphql",
    wx_reply: "https://fcdev.fivefen.com/fc-sc-wx-reply/graphql",
    wx_qrcode: "https://fcdev.fivefen.com/fc-sc-wx-qrcode/graphql",
    wx_template: "https://fcdev.fivefen.com/fc-sc-wx-template/graphql",
    wx_menu: "https://fcdev.fivefen.com/fc-sc-wx-menu/graphql",
    wx_banner: "https://fcdev.fivefen.com/fc-sc-wx-banner/graphql",
    wx_assets: "https://fcdev.fivefen.com/fc-sc-wx-assets/graphql",
    orderList: "https://fcdev.fivefen.com/fc-com-order-list/graphql",
    orderDetail: "https://fcdev.fivefen.com/fc-com-order-detail/graphql",
    order_action: 'https://fcdev.fivefen.com/fc-sc-order-action/graphql',
    voucher: "https://fcdev.fivefen.com/fc-com-voucher/graphql",
    payment: "https://fcdev.fivefen.com/fc-com-payment/graphql",
    sc_product: "https://fcdev.fivefen.com/fc-sc-product/graphql",
    product: "https://fcdev.fivefen.com/fc-com-product/graphql",
    product_es_list: "https://fcdev.fivefen.com/fc-com-product-es-list/graphql",
    product_search: "https://fcdev.fivefen.com/fc-sc-product-search/graphql",
    sc_subscription: "https://fcdev.fivefen.com/fc-sc-subscription/graphql",
    com_subscription: "https://fcdev.fivefen.com/fc-com-subscription/graphql",
    shop_category: 'https://fcdev.fivefen.com/fc-sc-shop-category/graphql',
    common_pet: "https://fcdev.fivefen.com/fc-com-pet/graphql",
    tag: "https://fcdev.fivefen.com/fc-sc-tag/graphql",
    address_list: "https://fcdev.fivefen.com/fc-com-address-list/graphql",
    consumer: 'https://fcdev.fivefen.com/fc-sc-consumer/graphql',
    storeSetting: 'https://fcdev.fivefen.com/fc-com-store-setting/graphql',
    liveStreaming: 'https://fcdev.fivefen.com/fc-com-live-streaming/graphql'
  }
}

export default API_CONFIG[process.env.NODE_ENV || "production"]
