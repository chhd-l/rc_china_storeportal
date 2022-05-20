import React from "react";
import {
    createFromIconfontCN,
  } from "@ant-design/icons";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";

const Iconfont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_3298206_gt7wntjmcm.js',
  });

 const IconFont: React.FC<IconFontProps<string>> = (props: any) => <Iconfont {...props} />

export default IconFont