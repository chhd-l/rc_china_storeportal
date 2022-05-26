import { MailOutlined, ShoppingOutlined, WechatOutlined } from '@ant-design/icons'
// 引入icon样式文件
// import "../assets/css/iconfont/iconfont"

export const menus = [
  {
    name: 'Shipment',
    value: 'shipment',
    url: '',
    key: 'shipment',
    icon: <span className='icon iconfont  icon-a-bianzu10' />,
    children: [
      {
        name: 'My Shipment',
        value: 'my_shipment',
        url: '/shipment-list',
        key: 'my_shipment',
      },
      {
        name: 'Shipping Setting',
        value: 'shipping_setting',
        url: '/shipping-setting',
        key: 'shipping_setting',
      },
    ],
  },
  {
    name: 'Order',
    value: 'order',
    url: '',
    key: 'order',
    icon: <span className='icon iconfont icon-a-bianzu11' />,
    children: [
      {
        name: 'My Orders',
        value: 'my_orders',
        url: '/order/order-list',
        // url: "/",
        key: 'my_orders',
      },
      {
        name: 'Order Setting',
        value: 'order_setting',
        url: '/order/order-setting',
        key: 'order_setting',
      },
    ],
  },
  {
    name: 'Subscription',
    value: 'subscription',
    url: '',
    key: 'subscription',
    icon: <span className='icon iconfont icon-a-bianzu11-1' />,
    children: [
      {
        name: 'My subscriptions',
        value: 'my_subscriptions',
        url: '/subscription/subscription-list',
        key: 'my_subscriptions',
      }
    ]
  },
  {
    name: 'Product',
    value: 'product',
    url: '',
    key: 'product',
    icon: <span className='icon iconfont icon-a-bianzu12' />,
    children: [
      {
        name: 'My Products',
        value: 'my_products',
        url: '/product/product-list',
        key: 'my_products',
      },
      {
        name: 'Add New Product',
        value: 'add_new_product',
        url: '/product/product-add',
        key: 'add_new_product',
      },
    ],
  },
  {
    name: 'Pet Owner',
    value: 'petOwner',
    url: '',
    key: 'petOwner',
    icon: <span className='icon iconfont icon-a-bianzu12-1' />,
    children: [
      {
        name: 'My Pet Owner',
        value: 'my_pet_owner',
        url: '/petOwner/pet-owner-list',
        key: 'my_pet_owner',
      },
      {
        name: 'Tagging Setting',
        value: 'tagging_setting',
        url: '/petOwner/tag-list',
        key: 'tagging_setting',
      },
    ],
  },
  {
    name: 'Marketing Center',
    value: 'marketing_centres',
    url: '',
    key: 'marketing_centers',
    icon: <span className='icon iconfont icon-a-bianzu13' />,
    children: [
      {
        name: 'Marketing Center',
        value: 'MarketingCenters',
        url: '/marketingCenter/marketingCenter-list',
        key: 'MarketingCenters',
      },
    ],
  },
  {
    name: 'Shop',
    value: 'shop',
    url: '',
    key: 'shop',
    icon: <span className='icon iconfont icon-a-bianzu18' />,
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
      },
    ],
  },
  {
    name: 'Wechat Management',
    value: 'wechat_management',
    url: '',
    key: 'wechat_management',
    icon: <span className='icon iconfont icon-a-WechatSetting' />,
    children: [
      {
        name: 'Account Management',
        value: 'account_management',
        url: '/account/account-list',
        key: 'account_management',
      },
      {
        name: 'Fans Management',
        value: 'fans_management',
        url: '/fans/fans-list',
        key: 'fans_management',
      },
      {
        name: 'Automatic Replies',
        value: 'automatic_replies',
        url: '/auto-reply/auto-reply-list',
        key: 'automatic_replies',
      },
      {
        name: 'Reply Content',
        value: 'response_content',
        url: '/reply/reply-contents',
        key: 'response_content',
      },
      {
        name: 'Assets Management',
        value: 'assets_management',
        url: '/assets-management',
        key: 'assets_management',
      },
      {
        name: 'Menu Management',
        value: 'menu_management',
        url: '/menuManagempqr/menu-manage-list',
        key: 'menu_management',
      },
      {
        name: 'QR Code Management',
        value: 'qr_code_management',
        url: '/QrcodeManage/qrcode-manage-list',
        key: 'qr_code_management',
      },
      {
        name: 'Template Message',
        value: 'template_message',
        url: '/template/template-message-list',
        key: 'template_message',
      },
      {
        name: 'Mini Program QR Code',
        value: 'mini_program_qr_code',
        url: '/mpqr/mpqr-list',
        key: 'mini_program_qr_code',
      },
      // {
      //   name: 'Mini Program Banner',
      //   value: 'mini_program_banner',
      //   url: '/mpbanner/mpbanner-list',
      //   key: 'mini_program_banner',
      // },
    ],
  },
]

export const initActive = (pathname: string) => {
  let selectedKeys: string[] = []
  menus.forEach(menu => {
    menu.children.forEach(subMenu => {
      if (subMenu.url === pathname) {
        selectedKeys = [menu.key, subMenu.key]
      }
    })
  })
  return selectedKeys
}
