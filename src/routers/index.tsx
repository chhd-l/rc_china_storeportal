import { lazy } from "react"; // 路由懒加载
import type { RouteObject } from "react-router-dom";
import {useRoutes} from 'react-router-dom'
const AppLayout = lazy(() => import("../layout/applayout"));
const Home = lazy(() => import("../views/index"));
const Login = lazy(() => import("../views/login"));

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
    path: "/app",
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
    ],
    
  },
  { path: "/login", element: <Login /> },
    { path: "*", element: <Home /> },
];

// The useRoutes() hook allows you to define your routes as JavaScript objects
// instead of <Routes> and <Route> elements. This is really just a style
// preference for those who prefer to not use JSX for their routes config.

export default routes;
