import React from "react";
import {
    createFromIconfontCN,
  } from "@ant-design/icons";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";

const Iconfont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3298206_90dnu4xa0a.js',
  });

 const IconFont: React.FC<IconFontProps<string>> = ({ type= '' }, props: any) => <Iconfont type={type} {...props} />

export default IconFont