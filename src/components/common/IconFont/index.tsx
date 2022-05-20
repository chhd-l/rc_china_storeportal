import React from "react";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";

 const IconFont: React.FC<IconFontProps<string>> = (props: any) => {
   const pro = {...props}
   pro.className = pro.className + 'iconfont' + pro.type
   delete pro.type
   return (
    <span {...pro} />
   )
 }

export default IconFont