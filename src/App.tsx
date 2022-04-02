import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Router from "./routers";
import { Spin } from "antd";
import './App.css'
import '@/assets/css/global.css'

function App() {
  let Routers = useRoutes(Router);
  return (
    <div className="App">
      <Suspense fallback={<Spin />}>
        {Routers}
      </Suspense>
    </div>
  );
}

export default App
