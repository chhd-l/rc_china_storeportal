import { lazy } from "react"; // 路由懒加载
import type { RouteObject } from "react-router-dom";
const AppLayout = lazy(() => import("../layout/layout"));
const Home = lazy(() => import("../views/index"));
const Login = lazy(() => import("../views/login"));
const ProductList = lazy(() => import("../views/productList"));
const AddProduct = lazy(() => import("../views/product"));
const ResetPassword = lazy(() => import("../views/resetPassword"));
const Register = lazy(() => import("../views/register"));
const PetOwnerList = lazy(() => import("@/views/petOwnerList"));
const PetOwnerDetail = lazy(() => import("@/views/petOwnerDetail"));
const PetDetail = lazy(() => import("@/views/petDetail"));

// export type RouterType = {
//   path: string;
//   component: React.LazyExoticComponent<any>;
//   root?: string[];
//   children?:any;
//   notExect?: boolean;
//   redirectTo?: string;
// }[];

// const Routers: RouterType  = [
//   {
//     path: "/app",
//     component: AppLayout,
//     children:[
//       {
//         path: "/home",
//         component: Home,
//       }
//     ]
//   },
//   {
//     path: "/login",
//     component: Login,
//   }
// ];

let routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { index: true, element: <Home /> },
      {
        path: "home",
        element: <Home />,
        // children: [
        //   { index: true, element: <CoursesIndex /> },
        //   { path: "/courses/:id", element: <Course /> },
        // ],
      },
      { path: "/product-list", element: <ProductList /> },
      { path: "/product/:id", element: <AddProduct /> },
      { path: "/product/add", element: <AddProduct /> },
      // { path: "/product/category", element: <Catechoose /> },
      { path: "/pet-owner-list", element: <PetOwnerList /> },
      { path: "/pet-owner-detail", element: <PetOwnerDetail /> },
      { path: "/pet-detail", element: <PetDetail /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Home /> },
  { path: "/resetPassword", element: <ResetPassword /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <Home /> },
];

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes;
