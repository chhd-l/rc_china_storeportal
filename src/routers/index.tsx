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
const AccountDetails = lazy(() => import('@/views/accountDetails'))
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
const TagList = lazy(() => import('@/views/tagList'))
const EditTag = lazy(() => import('@/views/editTag'))
const AddVideo = lazy(() => import('@/views/addVideo'))

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
      // { index: true , element:<Routes><Route  element={<Navigate to={'/Home'} />} /></Routes> },
      { path: 'shipment-list', element: <OrderList />, breadcrumbName: 'My Shipment' },
      { path: 'shipping-setting', element: <ShippingSetting />, breadcrumbName: 'Shipping Setting' },
      { path: 'automatic-replies', element: <AutoReplyList />, breadcrumbName: 'Automatic Replies' },
      { path: 'assets-management', element: <AssetList />, breadcrumbName: 'Assets Management' },
      { path: 'add-video', element: <AddVideo />, breadcrumbName: 'Add Video' },
      {
        path: 'product',
        breadcrumbName: 'Product',
        children: [
          { path: 'product-list', index: true, element: <ProductList />, breadcrumbName: 'My Products' },
          { path: ':id', element: <AddProduct /> },
        ],
      },
      {
        path: 'petOwner',
        breadcrumbName: 'PetOwner',
        children: [
          { path: 'pet-owner-list', index: true, element: <PetOwnerList />, breadcrumbName: 'My Pet Owner' },
          { path: 'pet-owner-detail', element: <PetOwnerDetail />, breadcrumbName: 'Pet Owner Detail' },
          { path: 'pet-detail', element: <PetDetail />, breadcrumbName: 'Pet Detail' },
          { path: 'tag-list', index: true, element: <TagList />, breadcrumbName: 'My Tag' },
          { path: 'edit-tag', element: <EditTag />, breadcrumbName: 'Tagging Details' },
        ],
      },
      {
        path: 'category',
        breadcrumbName: 'Category',
        children: [
          { path: 'category-list', index: true, element: <CategoryList />, breadcrumbName: 'My Category' },
          { path: 'category-detail/:id', element: <CategoryDetail />, breadcrumbName: 'Category Detail' },
        ],
      },
      {
        path: 'order',
        breadcrumbName: 'Order',
        children: [
          { path: 'order-list', index: true, element: <OrderList />, breadcrumbName: 'My Orders' },
          { path: 'order-detail', element: <OrderDetail />, breadcrumbName: 'Order Detail' },
          { path: 'order-setting', element: <OrderSetting />, breadcrumbName: 'Order Setting' },
        ],
      },
      {
        path: 'account',
        breadcrumbName: 'Account',
        children: [
          { path: 'account-list', index: true, element: <AccountList />, breadcrumbName: 'Account Management' },
          { path: 'add-account', element: <AddAccount />, breadcrumbName: 'Add Account' },
          { path: 'account-details', element: <AccountDetails />, breadcrumbName: 'Account Details' },
        ],
      },
      {
        path: 'fans',
        breadcrumbName: 'Fans',
        children: [
          { path: 'fans-list', index: true, element: <FansList />, breadcrumbName: 'Fans Management' },
          { path: 'fans-detail', element: <FansDetail />, breadcrumbName: 'Fans Detail' },
        ],
      },
      {
        path: 'reply',
        breadcrumbName: 'Reply',
        children: [
          { path: 'add-auto-reply', index: true, element: <AddAutoReply />, breadcrumbName: 'Add AutoReply' },
          { path: 'reply-contents', element: <ReplyContents />, breadcrumbName: 'Reply Contents' },
          { path: 'add-reply-content', element: <AddReplyContent />, breadcrumbName: 'Add Reply Content' },
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
            breadcrumbName: 'Template Messag',
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
        breadcrumbName: 'Mpbanner',
        children: [
          { path: 'mpbanner-list', index: true, element: <MpBannerList />, breadcrumbName: 'Mini Program Banner' },
          { path: 'mpbanner-detail/:id', element: <MpBannerDetail />, breadcrumbName: 'MpBanner Detail' },
        ],
      },
      {
        path: 'mpqr',
        breadcrumbName: 'Mpqr',
        children: [
          { path: 'mpqr-list', index: true, element: <MpQRList />, breadcrumbName: 'Mini Program QR Code' },
          { path: 'mpqr-detail/:id', element: <MpQRDetail />, breadcrumbName: 'MpQR Detail' },
        ],
      },
      {
        path: 'menuManagempqr',
        breadcrumbName: 'MenuManagempqr',
        children: [
          { path: 'menu-manage-list', index: true, element: <MenuManage />, breadcrumbName: 'Menu Management' },
          { path: 'menu-manage-detail/:id', element: <MenuManageDetail />, breadcrumbName: 'MenuManage Detail' },
        ],
      },
      {
        path: 'QrcodeManage',
        breadcrumbName: 'QrcodeManage',
        children: [
          { path: 'qrcode-manage-list', index: true, element: <QrCodeManage />, breadcrumbName: 'QR Code Management' },
          { path: 'qrcode-manage-detail/:id', element: <QrCodeManageDetail />, breadcrumbName: 'QrCodeManage Detail' },
        ],
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Home /> },
]

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes
