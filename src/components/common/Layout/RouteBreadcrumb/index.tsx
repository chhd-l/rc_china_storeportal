import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import r from "@/routers";
import { useEffect, useState } from "react";
import "./style.less";

/**
 * @description: 该组件用于渲染全局面包屑
 *  根据路由自动绑定跳转地址和面包屑标题
 *   注意： 路由中的必须配置 breadcrumbName: 优先根据breadcrumbName去匹配locales文件中的值作为面包屑标题,如果匹配不到对应的将使用breadcrumbName作为面包屑标题
 * @return {*}
 */


 interface RouteObject {
    caseSensitive?: boolean;
    children?: RouteObject[];
    element?: React.ReactNode;
    index?: boolean;
    path: string;
    breadcrumbName?: string;
  }
  

const RouteBreadcrumb = () => {
  const Location = useLocation();
  const [breadcrumbItem, setBreadcrumbItem] = useState<RouteObject>({
    path: '/'
  })

    const depy = (arr: any[]) => {
        if(!arr.length) return
        arr.find((item): any => {
            if(item.path === Location.pathname) {
                setBreadcrumbItem(item)
                return item
            } else if (item.children?.length) {
                depy(item.children)
            }
        })
    }

    useEffect(() => {
        depy(r)
    }, [Location])
    

  // 路由拆分成数组用于匹配面包屑
//   const pathSnippets = getUrlList(currentRoute.path);
  
//   const breadcrumbItems = getBreadcrumbItems(Location);
//   if (!breadcrumbItems) return null;
  return (
    <Breadcrumb className="route-breadcrumb" separator=">">
    <Breadcrumb.Item>
        <span>Deloitte</span>
    </Breadcrumb.Item>
      <Breadcrumb.Item className="Breadcrumb">
          <Link to={breadcrumbItem.path}>{breadcrumbItem.breadcrumbName}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default RouteBreadcrumb;
