import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Router from "./routers";
import { Spin } from "antd";
import './App.css'
import '@/assets/css/global.less'
import '@/assets/css/iconfont/iconfont.css'

function App() {
  let Routers = useRoutes(Router);
  return (
    <div className="App text-center">
      <Suspense fallback={<Spin className="magin-auto"/>}>
       <div className="text-left">{Routers}</div>
      </Suspense>
    </div>
  );
}

export default App;
