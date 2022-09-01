// 引入icon样式文件
// import "../assets/css/iconfont/iconfont"

export const menus = [
  {
    name: 'Shipment',
    value: 'shipment',
    url: '',
    key: 'shipment',
    icon: <span className="icon iconfont  icon-a-bianzu10" />,
    langKey: 'menu.shipment',
    children: [
      {
        name: 'My Shipment',
        value: 'my_shipment',
        url: '/shipment-list',
        key: 'my_shipment',
        langKey: 'menu.my_shipment',
      },
      {
        name: 'Shipping Setting',
        value: 'shipping_setting',
        url: '/shipping-setting',
        key: 'shipping_setting',
        langKey: 'menu.shipping_setting',
      },
    ],
  },
  {
    name: 'Order',
    value: 'order',
    url: '',
    key: 'order',
    icon: <span className="icon iconfont icon-a-bianzu11" />,
    langKey: 'menu.order',
    children: [
      {
        name: 'My Orders',
        value: 'my_orders',
        url: '/order',
        // url: "/",
        key: 'my_orders',
        langKey: 'menu.my_orders',
      },
      {
        name: 'Order Setting',
        value: 'order_setting',
        url: '/order-setting',
        key: 'order_setting',
        langKey: 'menu.order_setting',
      },
    ],
  },
  {
    name: 'Subscription',
    value: 'subscription',
    url: '',
    key: 'subscription',
    icon: <span className="icon iconfont icon-a-bianzu11-1" />,
    langKey: 'menu.subscription',
    children: [
      {
        name: 'My Subscriptions',
        value: 'my_subscriptions',
        url: '/subscription',
        key: 'my_subscriptions',
        langKey: 'menu.my_subscriptions',
      },
    ],
  },
  {
    name: 'Product',
    value: 'product',
    url: '',
    key: 'product',
    icon: <span className="icon iconfont icon-a-bianzu12" />,
    langKey: 'menu.product',
    children: [
      {
        name: 'My Products',
        value: 'my_products',
        url: '/product/product-list',
        key: 'my_products',
        langKey: 'menu.my_products',
      },
      {
        name: 'Add New Product',
        value: 'add_new_product',
        url: '/product/product-add',
        key: 'add_new_product',
        langKey: 'menu.add_new_product',
      },
      {
        name: 'Search',
        value: 'product_search',
        url: '/product-search',
        key: 'product_search',
        langKey: 'menu.search',
      },
    ],
  },
  {
    name: 'Pet Owner',
    value: 'petOwner',
    url: '',
    key: 'petOwner',
    icon: <span className="icon iconfont icon-a-bianzu12-1" />,
    langKey: 'menu.pet_owner',
    children: [
      {
        name: 'My Pet Owner',
        value: 'my_pet_owner',
        url: '/petOwner',
        key: 'my_pet_owner',
        langKey: 'menu.my_pet_owner',
      },
      {
        name: 'Tagging Setting',
        value: 'tagging_setting',
        url: '/tags/tag-list',
        key: 'tagging_setting',
        langKey: 'menu.tagging_setting',
      },
    ],
  },
  {
    name: 'Marketing Automation',
    value: 'marketing_centres',
    url: '',
    key: 'marketing_centers',
    icon: <span className="icon iconfont icon-a-bianzu13" />,
    langKey: 'menu.marketing_center',
    children: [
      {
        name: 'Marketing Center',
        value: 'MarketingCenters',
        url: '/marketingCenter/marketingCenter-list',
        key: 'MarketingCenters',
        langKey: 'menu.marketing_center',
      },
      {
        name: 'Intelligent Recommendation',
        value: 'IntelligentRecommendation',
        url: '/intelligentRecommendation-list',
        key: 'IntelligentRecommendation',
        langKey: 'menu.intelligent_recommendation',
      },
    ],
  },
  {
    name: 'AIReco',
    value: 'aireco',
    url: '/aireco',
    key: 'aireco',
    icon: <span className="icon iconfont text-xl icon-a-bianzu13" />,
    langKey: 'menu.aireco',
    children: [],
  },
  {
    name: 'Finance',
    value: 'finance',
    url: '',
    key: 'finance',
    icon: <span className="icon iconfont icon-a-bianzu14" />,
    langKey: 'menu.finance',
    children: [
      {
        name: 'Payment Settings',
        value: 'payment_settings',
        url: '/payment/setting-list',
        key: 'payment_settings',
        langKey: 'menu.payment_settings',
      },
      {
        name: 'Invoice List',
        value: 'invoice_list',
        url: '/invoice-list',
        key: 'invoice_list',
        langKey: 'menu.invoice_list',
      },
    ],
  },
  {
    name: 'Shop',
    value: 'shop',
    url: '',
    key: 'shop',
    icon: <span className="icon iconfont icon-a-bianzu18" />,
    langKey: 'menu.shop',
    children: [
      // {
      //   name: 'Shop Rating',
      //   value: 'shop_rating',
      //   url: '/category/shop-rating',
      //   key: 'shop_rating',
      // },
      {
        name: 'Shop Categories',
        value: 'shop_categories',
        url: '/category/category-list',
        key: 'shop_categories',
        langKey: 'menu.shop_categories',
      },
      {
        name: 'Customer Service',
        value: 'customer_service',
        url: '/customer-service',
        key: 'customer_service',
        langKey: 'menu.customer_service',
      },
    ],
  },
  {
    name: 'Channel Management',
    value: 'wechat_management',
    url: '',
    key: 'wechat_management',
    icon: <span className="icon iconfont icon-a-WechatSetting" />,
    langKey: 'menu.social_media',
    children: [
      {
        name: 'Account Management',
        value: 'account_management',
        url: '/account/account-list',
        key: 'account_management',
        langKey: 'menu.account_management',
      },
      {
        name: 'Fans Management',
        value: 'fans_management',
        url: '/fans/fans-list',
        key: 'fans_management',
        langKey: 'menu.fans_management',
      },
      {
        name: 'Automatic Replies',
        value: 'automatic_replies',
        url: '/auto-reply/auto-reply-list',
        key: 'automatic_replies',
        langKey: 'menu.automatic_replies',
      },
      {
        name: 'Reply Content',
        value: 'response_content',
        url: '/reply/reply-contents',
        key: 'response_content',
        langKey: 'menu.reply_content',
      },
      {
        name: 'Assets Management',
        value: 'assets_management',
        url: '/assets/assets-management',
        key: 'assets_management',
        langKey: 'menu.assets_management',
      },
      {
        name: 'Menu Management',
        value: 'menu_management',
        url: '/menuManagempqr/menu-manage-list',
        key: 'menu_management',
        langKey: 'menu.menu_management',
      },
      {
        name: 'QR Code Management',
        value: 'qr_code_management',
        url: '/QrcodeManage/qrcode-manage-list',
        key: 'qr_code_management',
        langKey: 'menu.qr_code_management',
      },
      {
        name: 'Template Message',
        value: 'template_message',
        url: '/template/template-message-list',
        key: 'template_message',
        langKey: 'menu.template_message',
      },
      {
        name: 'Mini Program QR Code',
        value: 'mini_program_qr_code',
        url: '/mpqr/mpqr-list',
        key: 'mini_program_qr_code',
        langKey: 'menu.mini_program_qr_code',
      },
      {
        name: 'Mini Program Banner',
        value: 'mini_program_banner',
        url: '/mpbanner/mpbanner-list',
        key: 'mini_program_banner',
        langKey: 'menu.mini_program_banner',
      },
    ],
  },
]

export const initActive = (pathname: string) => {
  let selectedKeys: string[] = []
  menus.forEach((menu) => {
    menu.children.forEach((subMenu) => {
      if (subMenu.url === pathname) {
        selectedKeys = [menu.key, subMenu.key]
      }
    })
  })
  return selectedKeys
}
