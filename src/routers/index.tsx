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
const CategoryManualDetail = lazy(() => import('@/views/categoryManualDetail'))
const CategoryListSort = lazy(() => import('@/views/categoryListSort'))
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
const TagList = lazy(() => import('@/views/tagList'))
const EditTag = lazy(() => import('@/views/editTag'))
const AddVideo = lazy(() => import('@/views/addVideo'))
const MarketingCentreList = lazy(() => import('@/views/MarketingCentreList'))
const Vouchers = lazy(() => import('@/views/Vouchers'))
const CreateNewVoucher = lazy(() => import('@/views/CreateNewVoucher'))
const SubscriptionList = lazy(() => import('@/views/subscriptionList'))
const SubscriptionDetail = lazy(() => import('@/views/subscriptionDetail'))

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
        breadcrumbName: 'My Products',
        children: [
          { index: true, element: <ProductList /> },
          { path: 'product-list', element: <ProductList /> },
          { path: 'product-detail', element: <AddProduct />, breadcrumbName: 'Product Detail' },
          { path: 'product-add', element: <AddProduct />, breadcrumbName: 'AddProduct' },
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
          { path: 'tag-list', index: true, element: <TagList />, breadcrumbName: 'My Tag' },
          { path: 'edit-tag', element: <EditTag />, breadcrumbName: 'Tagging Details' },
        ],
      },
      {
        path: 'category',
        breadcrumbName: 'My Category',
        children: [
          { index: true, element: <CategoryList />,},
          { path: 'category-list', element: <CategoryList />,},
          { path: 'category-detail/:id', element: <CategoryDetail />, breadcrumbName: 'Category Detail' },
          { path: 'category-manual-detail/:id', element: <CategoryManualDetail />, breadcrumbName: 'Category Detail' },
          { path: 'category-list-sort', element: <CategoryListSort />, breadcrumbName: 'Category Detail' },
        ],
      },
      {
        path: 'order',
        breadcrumbName: 'My Orders',
        children: [
          { index: true, element: <OrderList />},
          { path: 'order-list', element: <OrderList />},
          { path: 'order-detail', element: <OrderDetail />, breadcrumbName: 'Order Detail' },
          { path: 'order-setting', element: <OrderSetting />, breadcrumbName: 'Order Setting' },
        ],
      },
      {
        path: 'marketingCentre',
        breadcrumbName: 'Marketing Centres',
        children: [
          { index: true, element: <MarketingCentreList />},
          { path: 'marketingCentre-list', element: <MarketingCentreList />},
          { 
            path: 'vouchers',
            breadcrumbName: 'Vouchers',
            children: [
              { index: true, element: <Vouchers />, },
              { path: 'CreateNewVoucher', element: <CreateNewVoucher />, breadcrumbName: 'CreateNewVoucher'},
            ]
          },
        ]
      },
      {
        path: 'subscription',
        breadcrumbName: 'My subscriptions',
        children: [
          { index: true, element: <SubscriptionList /> },
          { path: 'subscription-list', element: <SubscriptionList /> },
          { path: 'subscription-detail/:id', element: <SubscriptionDetail />, breadcrumbName: 'Subscription Detail' },
        ],
      },
      {
        path: 'account',
        breadcrumbName: 'Account Management',
        children: [
          { index: true, element: <AccountList />},
          { path: 'account-list', element: <AccountList />},
          { path: 'add-account', element: <AddAccount />, breadcrumbName: 'Add Account' },
          { path: 'account-details', element: <AddAccount />, breadcrumbName: 'Account Details' },
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
        breadcrumbName: 'Reply Contents',
        children: [
          { index: true, element: <ReplyContents /> },
          { path: 'add-auto-reply', element: <AddAutoReply />, breadcrumbName: 'Add AutoReply' },
          { path: 'reply-contents', element: <ReplyContents /> },
          { path: 'add-reply-content', element: <AddReplyContent />, breadcrumbName: 'Add Reply Content' },
        ],
      },
      {
        path: 'template',
        breadcrumbName: 'Template Messag',
        children: [
          {
            index: true,
            element: <TemplateMessage />,
          },
          {
            path: 'template-message-list',
            element: <TemplateMessage />,
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
          { path: 'mpbanner-detail/:id', element: <MpBannerDetail />, breadcrumbName: 'MpBanner Detail' },
        ],
      },
      {
        path: 'mpqr',
        breadcrumbName: 'Mini Program QR Code',
        children: [
          { index: true, element: <MpQRList /> },
          { path: 'mpqr-list', element: <MpQRList /> },
          { path: 'mpqr-detail', element: <MpQRDetail />, breadcrumbName: 'MpQR Detail' },
          { path: 'mpqr-add', element: <MpQRDetail />, breadcrumbName: 'Add New MpQR' },
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
          { path: 'qrcode-manage-add', element: <QrCodeManageDetail />, breadcrumbName: 'Add New QrCodeManage' },
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
