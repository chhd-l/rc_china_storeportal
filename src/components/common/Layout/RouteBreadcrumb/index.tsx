import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./style.less";
import r from "@/routers";
import { useEffect, useState } from "react";

/**
 * @description: 该组件用于渲染全局面包屑
 *  根据路由自动绑定跳转地址和面包屑标题
 *   注意： 路由中的必须配置 breadcrumbName: 优先根据breadcrumbName去匹配locales文件中的值作为面包屑标题,如果匹配不到对应的将使用breadcrumbName作为面包屑标题
 * @return {*}
 */
let breadcrumbItemsaRr: any[] = []
const RouteBreadcrumb = () => {
  const { pathname } = useLocation();
  const [breadcrumbItems, setbreadcrumbItems] = useState<any[]>([])
  // 将路由处理成路由表对应的路由


  const depy = (arr: any[], path: string) => {
    if (!arr.length) return
    arr.forEach((item): any => {
      if (item.path === path) {
        breadcrumbItemsaRr.push(item)
        return item
      } else if (item.children?.length) {
        return depy(item.children, path)
      }
    })
    setbreadcrumbItems(breadcrumbItemsaRr)
  }

  useEffect(() => {
    breadcrumbItemsaRr = []
    pathname.split('/').forEach((path) => {
      depy(r, path)
    })
  }, [pathname])

  return (
    <Breadcrumb className="route-breadcrumb" separator=">">
      {
        breadcrumbItems.length ? (
          <>
            <Breadcrumb.Item>
              <Link to='/Home'>Seller Center</Link>
            </Breadcrumb.Item>
            {
              breadcrumbItems.map((breadcrumbItem, index) => (
                <Breadcrumb.Item key={index}>
                  <Link to={breadcrumbItem.path}>{breadcrumbItem.breadcrumbName}</Link>
                </Breadcrumb.Item>
              ))
            }
          </>
        ) : null
      }
    </Breadcrumb>
  );
};

export default RouteBreadcrumb;

