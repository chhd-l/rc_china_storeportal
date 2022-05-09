import React from "react";
import {
    createFromIconfontCN,
  } from "@ant-design/icons";

const Iconfont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3298206_90dnu4xa0a.js',
  });

 const IconFont = ({ type= '' }) => <Iconfont type={type} />

export default IconFont