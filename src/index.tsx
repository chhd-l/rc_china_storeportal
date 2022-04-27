import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'antd/dist/antd.min.css'
import { BrowserRouter } from "react-router-dom"
import { ConfigProvider } from 'antd'; 
import en_US from "antd/lib/locale/en_US"
ConfigProvider.config({
    theme: { primaryColor: '#E2001A', },
});
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={en_US} >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
