import { lazy } from "react"; // 路由懒加载
import type { RouteObject } from "react-router-dom";
const Layout = lazy(() => import("../components/common/Layout"));
const Home = lazy(() => import("../views/index"));
const Login = lazy(() => import("../views/login"));
const ProductList = lazy(() => import("../views/productList"));
const AddProduct = lazy(() => import("../views/productDetail"));
const ResetPassword = lazy(() => import("../views/resetPassword"));
const Register = lazy(() => import("../views/register"));
const PetOwnerList = lazy(() => import("@/views/petOwnerList"));
const PetOwnerDetail = lazy(() => import("@/views/petOwnerDetail"));
const PetDetail = lazy(() => import("@/views/petDetail"));
const OrderList = lazy(() => import("@/views/orderList"));
const OrderDetail = lazy(() => import("@/views/orderDetail"));
const CategoryList = lazy(() => import("@/views/categoryList"));
const CategoryDetail = lazy(() => import("@/views/categoryDetail"));
const ShippingSetting = lazy(() => import("@/views/shippingSetting"));
const OrderSetting = lazy(() => import("@/views/orderSetting"));
const AccountList = lazy(() => import("@/views/accountList"));
const AddAccount = lazy(() => import("@/views/addAccount"));
const FansList = lazy(() => import("@/views/fansList"));
const FansDetail = lazy(() => import("@/views/fansDetail"));
const AutoReplyList = lazy(() => import("@/views/autoReplyList"));
const AddAutoReply = lazy(() => import("@/views/addAutoReply"));
const ReplyContents = lazy(() => import("@/views/replyContents"));
const AddReplyContent = lazy(() => import("@/views/addReplyContent"));
const AssetList = lazy(() => import("@/views/assetList"));

let routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      { path: "/product-list", element: <ProductList /> },
      { path: "/product/:id", element: <AddProduct /> },
      { path: "/pet-owner-list", element: <PetOwnerList /> },
      { path: "/pet-owner-detail", element: <PetOwnerDetail /> },
      { path: "/pet-detail", element: <PetDetail /> },
      { path: "/category-list", element: <CategoryList /> },
      { path: "/category/:id", element: <CategoryDetail /> },
      { path: "/order-list", element: <OrderList /> },
      { path: "/shipment-list", element: <OrderList /> },
      { path: "/order-detail", element: <OrderDetail /> },
      { path: "/shipping-setting", element: <ShippingSetting /> },
      { path: "/order-setting", element: <OrderSetting /> },
      { path: "/account-list", element: <AccountList /> },
      { path: "/add-account", element: <AddAccount /> },
      { path: "/fans-list", element: <FansList /> },
      { path: "/fans-detail", element: <FansDetail /> },
      { path: "/automatic-replies", element: <AutoReplyList /> },
      { path: "/add-auto-reply", element: <AddAutoReply /> },
      { path: "/reply-contents", element: <ReplyContents /> },
      { path: "/add-reply-content", element: <AddReplyContent /> },
      { path: "/assets-management", element: <AssetList /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Home /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
];

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes;
