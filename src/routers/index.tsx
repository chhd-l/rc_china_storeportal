import { lazy } from 'react' // 路由懒加载
const Layout = lazy(() => import('../components/common/Layout'))
const Home = lazy(() => import('../views/index'))
const Login = lazy(() => import('../views/login'))
const LoginStore = lazy(() => import('../views/loginStore'))
const LoginBrand = lazy(() => import('../views/loginBrand'))
const ProductList = lazy(() => import('../views/productList'))
const AddProduct = lazy(() => import('../views/productDetail'))
const ProductSearch = lazy(() => import('../views/productSearch'))
const ResetPassword = lazy(() => import('../views/resetPassword'))
const Register = lazy(() => import('../views/register'))
const PetOwnerList = lazy(() => import('@/views/petOwnerList'))
const PetOwnerDetail = lazy(() => import('@/views/petOwnerDetail'))
const PetDetail = lazy(() => import('@/views/petDetail'))
const OrderList = lazy(() => import('@/views/orderList'))
const OrderDetail = lazy(() => import('@/views/orderDetail'))
const Payment = lazy(() => import('@/views/payment'))
const CategoryList = lazy(() => import('@/views/categoryList'))
const CategoryDetail = lazy(() => import('@/views/categoryDetail'))
const CategoryManualDetail = lazy(() => import('@/views/categoryManualDetail'))
const CategoryListSort = lazy(() => import('@/views/categoryListSort'))
const ShippingSetting = lazy(() => import('@/views/shippingSetting'))
const OrderSetting = lazy(() => import('@/views/orderSetting'))
const AccountList = lazy(() => import('@/views/accountList'))
const AddAccount = lazy(() => import('@/views/accountCreate'))
const FansList = lazy(() => import('@/views/fansList'))
const FansDetail = lazy(() => import('@/views/fansDetail'))
const AutoReplyList = lazy(() => import('@/views/autoReplyList'))
const AddAutoReply = lazy(() => import('@/views/addAutoReply'))
const ReplyContents = lazy(() => import('@/views/replyContents'))
const AddReplyContent = lazy(() => import('@/views/replyContentCreate'))
const AssetList = lazy(() => import('@/views/assetList'))
const MpBannerList = lazy(() => import('@/views/mpBannerList'))
const MpQRList = lazy(() => import('@/views/mpQRList'))
const QrCodeManage = lazy(() => import('@/views/qrCodeManageList'))
const MenuManage = lazy(() => import('@/views/menuManageList'))
const WxTemplateMessage = lazy(() => import('@/views/templateMessageList'))
const MpBannerDetail = lazy(() => import('@/views/mpBannerDetail'))
const MpBannerAdd = lazy(() => import('@/views/mpBannerAdd'))
const MpQRDetail = lazy(() => import('@/views/mpQRDetail'))
const QrCodeManageDetail = lazy(() => import('@/views/qrCodeManageDetail'))
const MenuManageDetail = lazy(() => import('@/views/menuManageDetail'))
const TemplateMessageDetail = lazy(() => import('@/views/templateMessageDetail'))
const TagList = lazy(() => import('@/views/tagList'))
const EditTags = lazy(() => import('@/views/tagEdit'))
const AddVideo = lazy(() => import('@/views/addVideo'))
const MarketingCentreList = lazy(() => import('@/views/marketingCenter'))
const Vouchers = lazy(() => import('@/views/voucherList'))
const CreateNewVoucher = lazy(() => import('@/views/voucherCreate'))
const SubscriptionList = lazy(() => import('@/views/subscriptionList'))
const SubscriptionDetail = lazy(() => import('@/views/subscriptionDetail'))
const OrderswithVoucher = lazy(() => import('@/views/voucherOrders'))
const ComingSoon = lazy(() => import('@/views/comingSoon'))
const LiveStreamingList = lazy(() => import('@/views/liveStreamingList'))
const IntelligentRecommendation = lazy(() => import('@/views/intelligentRecommendation'))
const AddGraphic = lazy(() => import('@/views/addGraphic'))
const Dashboard = lazy(() => import('@/views/dashboard'))
const CustomerService = lazy(() => import('@/views/customerService'))

interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  breadcrumbName?: string
  Navigate?: string
}

let routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <OrderList /> },
      { path: 'home', element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      // { index: true , element:<Routes><Route  element={<Navigate to={'/Home'} />} /></Routes> },
      { path: 'shipment-list', element: <OrderList />, breadcrumbName: 'My Shipment' },
      { path: 'shipping-setting', element: <ShippingSetting />, breadcrumbName: 'Shipping Setting' },
      {
        path: 'assets',
        breadcrumbName: 'Assets Management',
        children: [
          { index: true, element: <AssetList /> },
          { path: 'assets-management', element: <AssetList /> },
          { path: 'add-video', element: <AddVideo />, breadcrumbName: 'Add Video' },
          { path: 'add-graphic', element: <AddGraphic />, breadcrumbName: 'Add Graphic message' },
        ],
      },
      {
        path: 'product',
        breadcrumbName: 'My Products',
        children: [
          { index: true, element: <ProductList /> },
          { path: 'product-list', element: <ProductList /> },
          { path: 'product-detail', element: <AddProduct />, breadcrumbName: 'Product Detail' },
          { path: 'product-add', element: <AddProduct />, breadcrumbName: 'AddProduct' },
          { path: 'product-search', element: <ProductSearch />, breadcrumbName: 'ProductSearch' },
          
        ],
      },
      {
        path: 'petOwner',
        breadcrumbName: 'My Pet Owner',
        children: [
          { index: true, element: <PetOwnerList />},
          { path: 'pet-owner-list', element: <PetOwnerList />},
          { path: 'pet-owner-detail', element: <PetOwnerDetail />, breadcrumbName: 'Pet Owner Detail' },
          { path: 'pet-detail', element: <PetDetail />, breadcrumbName: 'Pet Detail' },
        ],
      },
      {
        path: 'tag',
        breadcrumbName: 'My Pet Owner',
        children: [
          { index: true, element: <TagList />},
          { path: 'tag-list', index: true, element: <TagList />, breadcrumbName: 'Tagging Setting' },
          { path: 'edit-tags', element: <EditTags />, breadcrumbName: 'Tagging Details' },
        ],
      },
      {
        path: 'payment',
        breadcrumbName: 'Payment Settings',
        children: [
          { index: true, element: <Payment />,},
          { path: 'setting-list', element: <Payment />,},
        ],
      },
      {
        path: 'category',
        breadcrumbName: 'Shop Category',
        children: [
          { index: true, element: <CategoryList />,},
          { path: 'category-list', element: <CategoryList />,},
          { path: 'category-detail', element: <CategoryDetail />, breadcrumbName: 'Category Detail' },
          { path: 'category-manual-detail', element: <CategoryManualDetail />, breadcrumbName: 'Category Detail' },
          { path: 'category-list-sort', element: <CategoryListSort />, breadcrumbName: 'Category Detail' },
          { path: 'customer-service', element: <CustomerService />, breadcrumbName: 'Customer Service' },
        ],
      },
      {
        path: 'order',
        breadcrumbName: 'My Orders',
        children: [
          { index: true, element: <OrderList />},
          { path: 'order-list', element: <OrderList />},
          { path: 'order-detail', element: <OrderDetail />, breadcrumbName: 'Order Detail' },
        ],
      },
      { path: 'order-setting', element: <OrderSetting />, breadcrumbName: 'Order Setting' },
      {
        path: 'marketingCenter',
        breadcrumbName: 'Marketing Center',
        children: [
          { index: true, element: <MarketingCentreList />},
          { path: 'marketingCenter-list', element: <MarketingCentreList />},
          { 
            path: 'vouchers',
            breadcrumbName: 'Vouchers',
            children: [
              { index: true, element: <Vouchers />, },
              { path: 'createNewVoucher', element: <CreateNewVoucher />, breadcrumbName: 'Create New Voucher'},
              { path: 'voucherDetails', element: <CreateNewVoucher />, breadcrumbName: 'voucher Details'},
              { path: 'orderswithVoucher', element: <OrderswithVoucher />, breadcrumbName: 'Orders with Voucher'},
            ]
          },
          {
            path: 'promotions',
            breadcrumbName: 'Discount Promotions',
            children: [
              { index: true, element: <ComingSoon />, },
            ]
          },
          {
            path: 'liveStreaming',
            breadcrumbName: 'Live Streaming',
            children: [
              { index: true, element: <LiveStreamingList />, },
            ]
          },
          {
            path: 'intelligentRecommendation',
            breadcrumbName: 'Intelligent Recommendation',
            children: [
              { index: true, element: <IntelligentRecommendation /> },
              { path: 'intelligentRecommendation-list', element: <IntelligentRecommendation /> },
            ],
          },
          {
            path: 'comingSoon',
            element: <ComingSoon />,
          },
        ]
      },
      {
        path: 'subscription',
        breadcrumbName: 'My Subscriptions',
        children: [
          { index: true, element: <SubscriptionList /> },
          { path: 'subscription-list', element: <SubscriptionList /> },
          { path: 'subscription-detail', element: <SubscriptionDetail />, breadcrumbName: 'Subscription Detail' },
        ],
      },
      {
        path: 'account',
        breadcrumbName: 'Account Management',
        children: [
          { index: true, element: <AccountList />},
          { path: 'account-list', element: <AccountList />},
          { path: 'add-account', element: <AddAccount />, breadcrumbName: 'Add Account' },
          { path: 'account-details', element: <AddAccount />, breadcrumbName: 'Edit Account' },
        ],
      },
      {
        path: 'fans',
        breadcrumbName: 'Fans Management',
        children: [
          { index: true, element: <FansList /> },
          { path: 'fans-list', element: <FansList /> },
          { path: 'fans-detail', element: <FansDetail />, breadcrumbName: 'Fans Detail' },
        ],
      },
      {
        path: 'reply',
        breadcrumbName: 'Reply Content',
        children: [
          { index: true, element: <ReplyContents /> },
          { path: 'reply-contents', element: <ReplyContents /> },
          { path: 'add-reply-content', element: <AddReplyContent />, breadcrumbName: 'Add New Reply Content' },
          { path: 'edit-reply-content', element: <AddReplyContent />, breadcrumbName: 'Edit Reply Content' }
        ],
      },
      {
        path: 'auto-reply',
        breadcrumbName: 'Automatic Replies',
        children: [
          { index: true, element: <AutoReplyList /> },
          { path: 'auto-reply-list', element: <AutoReplyList /> },
          { path: 'add-auto-reply', element: <AddAutoReply />, breadcrumbName: 'Add New Automatic Reply' },
          { path: 'edit-auto-reply', element: <AddAutoReply />, breadcrumbName: 'Edit Automatic Reply' },
        ],
      },
      {
        path: 'template',
        breadcrumbName: 'Template Message',
        children: [
          {
            index: true,
            element: <WxTemplateMessage />,
          },
          {
            path: 'template-message-list',
            element: <WxTemplateMessage />,
          },
          {
            path: 'template-message/:id',
            element: <TemplateMessageDetail />,
            breadcrumbName: 'Template Message Detail',
          },
        ],
      },
      {
        path: 'mpbanner',
        breadcrumbName: 'Mini Program Banner',
        children: [
          { index: true, element: <MpBannerList /> },
          { path: 'mpbanner-list', element: <MpBannerList /> },
          { path: 'mpbanner-detail', element: <MpBannerDetail />, breadcrumbName: 'MP Banner Detail' },
          { path: 'mpbanner-add', element: <MpBannerAdd />, breadcrumbName: 'MP Banner Add' },
        ],
      },
      {
        path: 'mpqr',
        breadcrumbName: 'Mini Program QR Code',
        children: [
          { index: true, element: <MpQRList /> },
          { path: 'mpqr-list', element: <MpQRList /> },
          { path: 'mpqr-detail', element: <MpQRDetail />, breadcrumbName: 'MP QR Code Detail' },
          { path: 'mpqr-add', element: <MpQRDetail />, breadcrumbName: 'Add MP QR Code' },
        ],
      },
      {
        path: 'menuManagempqr',
        breadcrumbName: 'Menu Management',
        children: [
          { index: true, element: <MenuManage />},
          { path: 'menu-manage-list', element: <MenuManage />},
          { path: 'menu-manage-detail/:id', element: <MenuManageDetail pageType="edit" />, breadcrumbName: 'MenuManage Detail' },
          { path: 'menu-manage-add', element: <MenuManageDetail pageType="add" />, breadcrumbName: 'MenuManage Add' },
        ],
      },
      {
        path: 'QrcodeManage',
        breadcrumbName: 'QR Code Management',
        children: [
          { index: true, element: <QrCodeManage />},
          { path: 'qrcode-manage-list', element: <QrCodeManage />},
          { path: 'qrcode-manage-add', element: <QrCodeManageDetail />, breadcrumbName: 'Add New QR Code' },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/login/store", element: <LoginStore /> },
  { path: "/login/barnd", element: <LoginBrand /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Home /> },
]

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes
