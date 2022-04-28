import { lazy } from 'react' // 路由懒加载
const Layout = lazy(() => import('../components/common/Layout'))
const Home = lazy(() => import('../views/index'))
const Login = lazy(() => import('../views/login'))
const ProductList = lazy(() => import('../views/productList'))
const AddProduct = lazy(() => import('../views/productDetail'))
const ResetPassword = lazy(() => import('../views/resetPassword'))
const Register = lazy(() => import('../views/register'))
const PetOwnerList = lazy(() => import('@/views/petOwnerList'))
const PetOwnerDetail = lazy(() => import('@/views/petOwnerDetail'))
const PetDetail = lazy(() => import('@/views/petDetail'))
const OrderList = lazy(() => import('@/views/orderList'))
const OrderDetail = lazy(() => import('@/views/orderDetail'))
const CategoryList = lazy(() => import('@/views/categoryList'))
const CategoryDetail = lazy(() => import('@/views/categoryDetail'))
const ShippingSetting = lazy(() => import('@/views/shippingSetting'))
const OrderSetting = lazy(() => import('@/views/orderSetting'))
const AccountList = lazy(() => import('@/views/accountList'))
const AddAccount = lazy(() => import('@/views/addAccount'))
const FansList = lazy(() => import('@/views/fansList'))
const FansDetail = lazy(() => import('@/views/fansDetail'))
const AutoReplyList = lazy(() => import('@/views/autoReplyList'))
const AddAutoReply = lazy(() => import('@/views/addAutoReply'))
const ReplyContents = lazy(() => import('@/views/replyContents'))
const AddReplyContent = lazy(() => import('@/views/addReplyContent'))
const AssetList = lazy(() => import('@/views/assetList'))
const MpBannerList = lazy(() => import('@/views/mpBannerList'))
const MpQRList = lazy(() => import('@/views/mpQRList'))
const QrCodeManage = lazy(() => import('@/views/qrCodeManageList'))
const MenuManage = lazy(() => import('@/views/menuManageList'))
const TemplateMessage = lazy(() => import('@/views/templateMessageList'))
const MpBannerDetail = lazy(() => import('@/views/mpBannerDetail'))
const MpQRDetail = lazy(() => import('@/views/mpQRDetail'))
const QrCodeManageDetail = lazy(() => import('@/views/qrCodeManageDetail'))
const MenuManageDetail = lazy(() => import('@/views/menuManageDetail'))
const TemplateMessageDetail = lazy(() => import('@/views/templateMessageDetail'))

interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
  breadcrumbName?: string
}

let routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'product',
        breadcrumbName: 'product',
        children: [
          { path: 'product-list', index: true, element: <ProductList />, breadcrumbName: 'ProductList' },
          { path: ':id', element: <AddProduct />, breadcrumbName: 'AddProduct' },
        ],
      },
      {
        path: 'petOwner',
        breadcrumbName: 'petOwner',
        children: [
          { path: 'pet-owner-list', index: true, element: <PetOwnerList />, breadcrumbName: 'PetOwnerList' },
          { path: 'pet-owner-detail', element: <PetOwnerDetail />, breadcrumbName: 'PetOwnerDetail' },
          { path: 'pet-detail', element: <PetDetail />, breadcrumbName: 'petDetail' },
        ],
      },
      {
        path: 'category',
        breadcrumbName: 'category',
        children: [
          { path: 'category-list', index: true, element: <CategoryList />, breadcrumbName: 'CategoryList' },
          { path: 'category-detail/:id', element: <CategoryDetail />, breadcrumbName: 'CategoryDetail' },
        ],
      },
      {
        path: 'order',
        breadcrumbName: 'Order',
        children: [
          {
            path: 'order-list',
            index: true,
            element: <OrderList />,
            breadcrumbName: 'OrderList',
          },
          { path: 'order-detail', element: <OrderDetail />, breadcrumbName: 'OrderDetail' },
          { path: 'order-setting', element: <OrderSetting />, breadcrumbName: 'OrderSetting' },
        ],
      },
      {
        path: 'account',
        breadcrumbName: 'account',
        children: [
          { path: 'account-list', index: true, element: <AccountList />, breadcrumbName: 'AccountList' },
          { path: 'add-account', element: <AddAccount />, breadcrumbName: 'AddAccount' },
        ],
      },
      {
        path: 'fans',
        breadcrumbName: 'fans',
        children: [
          { path: 'fans-list', index: true, element: <FansList />, breadcrumbName: 'FansList' },
          { path: 'fans-detail', element: <FansDetail />, breadcrumbName: 'FansDetail' },
        ],
      },
      {
        path: 'reply',
        breadcrumbName: 'reply',
        children: [
          { path: 'add-auto-reply', index: true, element: <AddAutoReply />, breadcrumbName: 'addAutoReply' },
          { path: 'reply-contents', element: <ReplyContents />, breadcrumbName: 'ReplyContents' },
          { path: 'add-reply-content', element: <AddReplyContent />, breadcrumbName: 'AddReplyContent' },
        ],
      },
      {
        path: 'template',
        breadcrumbName: 'Template',
        children: [
          {
            path: 'template-message-list',
            index: true,
            element: <TemplateMessage />,
            breadcrumbName: 'TemplateMessagList',
          },
          {
            path: 'template-message/:id',
            element: <TemplateMessageDetail />,
            breadcrumbName: 'TemplateMessageDetail',
          },
        ],
      },
      {
        path: 'mpbanner',
        breadcrumbName: 'mpbanner',
        children: [
          { path: 'mpbanner-list', index: true, element: <MpBannerList />, breadcrumbName: 'MpbannerList' },
          { path: 'mpbanner-detail/:id', element: <MpBannerDetail />, breadcrumbName: 'MpBannerDetail' },
        ],
      },
      {
        path: 'mpqr',
        breadcrumbName: 'mpqr',
        children: [
          { path: 'mpqr-list', index: true, element: <MpQRList />, breadcrumbName: 'MpqrList' },
          { path: 'mpqr-detail/:id', element: <MpQRDetail />, breadcrumbName: 'MpQRDetail' },
        ],
      },
      {
        path: 'menuManagempqr',
        breadcrumbName: 'menuManagempqr',
        children: [
          { path: 'menu-manage-list', index: true, element: <MenuManage />, breadcrumbName: 'MenuManageList' },
          { path: 'menu-manage-detail/:id', element: <MenuManageDetail />, breadcrumbName: 'MenuManage' },
        ],
      },
      {
        path: 'QrcodeManage',
        breadcrumbName: 'QrcodeManage',
        children: [
          { path: 'qrcode-manage-list', index: true, element: <QrCodeManage />, breadcrumbName: 'QrcodeManageList' },
          { path: 'qrcode-manage-detail/:id', element: <QrCodeManageDetail />, breadcrumbName: 'QrCodeManageDetail' },
        ],
      },
      { path: '/shipment-list', element: <OrderList />, breadcrumbName: 'ShipmentList' },
      { path: '/shipping-setting', element: <ShippingSetting />, breadcrumbName: 'ShippingSetting' },
      { path: '/automatic-replies', element: <AutoReplyList />, breadcrumbName: 'AutomaticReplies' },
      { path: '/assets-management', element: <AssetList />, breadcrumbName: 'AssetsManagement' },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '*', element: <Home /> },
  { path: '/resetPassword', element: <ResetPassword /> },
  { path: '/register', element: <Register /> },
]

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes
