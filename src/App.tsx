import React from 'react';
import logo from './logo.svg';
import { Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate, useRoutes } from "react-router-dom";
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
