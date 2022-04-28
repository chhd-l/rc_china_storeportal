import { lazy } from "react" // 路由懒加载
const Layout = lazy(() => import("../components/common/Layout"))
const Home = lazy(() => import("../views/index"))
const Login = lazy(() => import("../views/login"))
const ProductList = lazy(() => import("../views/productList"))
const AddProduct = lazy(() => import("../views/productDetail"))
const ResetPassword = lazy(() => import("../views/resetPassword"))
const Register = lazy(() => import("../views/register"))
const PetOwnerList = lazy(() => import("@/views/petOwnerList"))
const PetOwnerDetail = lazy(() => import("@/views/petOwnerDetail"))
const PetDetail = lazy(() => import("@/views/petDetail"))
const OrderList = lazy(() => import("@/views/orderList"))
const OrderDetail = lazy(() => import("@/views/orderDetail"))
const CategoryList = lazy(() => import("@/views/categoryList"))
const CategoryDetail = lazy(() => import("@/views/categoryDetail"))
const ShippingSetting = lazy(() => import("@/views/shippingSetting"))
const OrderSetting = lazy(() => import("@/views/orderSetting"))
const AccountList = lazy(() => import("@/views/accountList"))
const AddAccount = lazy(() => import("@/views/addAccount"))
const FansList = lazy(() => import("@/views/fansList"))
const FansDetail = lazy(() => import("@/views/fansDetail"))
const AutoReplyList = lazy(() => import("@/views/autoReplyList"))
const AddAutoReply = lazy(() => import("@/views/addAutoReply"))
const ReplyContents = lazy(() => import("@/views/replyContents"))
const AddReplyContent = lazy(() => import("@/views/addReplyContent"))
const AssetList = lazy(() => import("@/views/assetList"))
const MpBannerList = lazy(() => import("@/views/mpBannerList"))
const MpQRList = lazy(() => import("@/views/mpQRList"))
const QrCodeManage = lazy(() => import("@/views/qrCodeManageList"))
const MenuManage = lazy(() => import("@/views/menuManageList"))
const TemplateMessage = lazy(() => import("@/views/templateMessageList"))
const MpBannerDetail = lazy(() => import("@/views/mpBannerDetail"))
const MpQRDetail = lazy(() => import("@/views/mpQRDetail"))
const QrCodeManageDetail = lazy(() => import("@/views/qrCodeManageDetail"))
const MenuManageDetail = lazy(() => import("@/views/menuManageDetail"))
const TemplateMessageDetail = lazy(
  () => import("@/views/templateMessageDetail")
)

interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  breadcrumbName?: string;
}

let routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      { path: "/product-list", element: <ProductList />, breadcrumbName: 'ProductList' },
      { path: "/product/:id", element: <AddProduct />, breadcrumbName: 'Product' },
      { path: "/pet-owner-list", element: <PetOwnerList />, breadcrumbName: 'PetOwnerList' },
      { path: "/pet-owner-detail", element: <PetOwnerDetail />, breadcrumbName: 'PetOwnerDetail' },
      { path: "/pet-detail", element: <PetDetail />, breadcrumbName: 'petDetail' },
      { path: "/category-list", element: <CategoryList />, breadcrumbName: 'CategoryList' },
      { path: "/category/:id", element: <CategoryDetail />, breadcrumbName: 'Category' },
      { path: "/order-list", element: <OrderList />, breadcrumbName: 'OrderList' },
      { path: "/shipment-list", element: <OrderList />, breadcrumbName: 'ShipmentList' },
      { path: "/order-detail", element: <OrderDetail />, breadcrumbName: 'OrderDetail' },
      { path: "/shipping-setting", element: <ShippingSetting />, breadcrumbName: 'ShippingSetting' },
      { path: "/order-setting", element: <OrderSetting />, breadcrumbName: 'OrderSetting' },
      { path: "/account-list", element: <AccountList />, breadcrumbName: 'AccountList' },
      { path: "/add-account", element: <AddAccount />, breadcrumbName: 'AddAccount' },
      { path: "/fans-list", element: <FansList />, breadcrumbName: 'FansList' },
      { path: "/fans-detail", element: <FansDetail />, breadcrumbName: 'FansDetail' },
      { path: "/automatic-replies", element: <AutoReplyList />, breadcrumbName: 'AutomaticReplies' },
      { path: "/add-auto-reply", element: <AddAutoReply />, breadcrumbName: 'addAutoReply' },
      { path: "/reply-contents", element: <ReplyContents />, breadcrumbName: 'ReplyContents' },
      { path: "/add-reply-content", element: <AddReplyContent />, breadcrumbName: 'AddReplyContent' },
      { path: "/assets-management", element: <AssetList />, breadcrumbName: 'AssetsManagement' },
      { path: "/mpbanner-list", element: <MpBannerList />, breadcrumbName: 'MpbannerList' },
      { path: "/mpqr-list", element: <MpQRList />, breadcrumbName: 'MpqrList' },
      { path: "/menu-manage-list", element: <MenuManage />, breadcrumbName: 'MenuManageList' },
      { path: "/qrcode-manage-list", element: <QrCodeManage />, breadcrumbName: 'QrcodeManageList' },
      { path: "/template-message-list", element: <TemplateMessage />, breadcrumbName: 'TemplateMessagList' },
      { path: "/mpbanner/:id", element: <MpBannerDetail />, breadcrumbName: 'Mpbanner' },
      { path: "/mpqr/:id", element: <MpQRDetail />, breadcrumbName: 'Mpqr' },
      { path: "/menu-manage/:id", element: <MenuManageDetail />, breadcrumbName: 'MenuManage' },
      { path: "/qrcode-manage/:id", element: <QrCodeManageDetail />, breadcrumbName: 'QrcodeManage' },
      { path: "/template-message/:id", element: <TemplateMessageDetail />, breadcrumbName: 'TemplateMessage' },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Home /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
]

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes
