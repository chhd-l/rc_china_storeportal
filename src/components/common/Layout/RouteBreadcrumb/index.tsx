import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./style.less";
import r from "@/routers/index";
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
    if (path === '') return
    arr.forEach((item): any => {
      if (item.path === path) {
        if(item.breadcrumbName) {
          breadcrumbItemsaRr.push(item)
        }
        return item
      } else if (item.children?.length) {
        return depy(item.children, path)
      }
    })
    setbreadcrumbItems(breadcrumbItemsaRr)
  }

  useEffect(() => {
    breadcrumbItemsaRr = []
    // if(pathname.split('/').some((path) => path === 'product') && pathname !== '/product/product-list' && pathname !== '/product') {
    //   if(pathname === '/product/product-detail/add') {
    //     setbreadcrumbItems([{
    //       path: '/product/product-list',
    //       breadcrumbName: 'My Products'
    //     },{
    //       path: pathname,
    //       breadcrumbName: 'Add New Product'
    //     }])
    //   } else {
    //     setbreadcrumbItems([{
    //       path: '/product/product-list',
    //       breadcrumbName: 'My Products'
    //     },{
    //       path: pathname,
    //       breadcrumbName: 'Product Details'
    //     }])
    //   }
    // } else {
    //   // const path = pathname.split('/')[pathname.split('/').length - 1]
    //   pathname.split('/').forEach(item => {
    //     console.log('item',item)
    //     depy(r, item)
    //   })
    // }
    // const path = pathname.split('/')[pathname.split('/').length - 1]
    pathname.split('/').forEach(item => {
      console.log('item',item)
      depy(r, item)
    })
  }, [pathname])

  return (
    <Breadcrumb className="route-breadcrumb pt-1" separator=">">
      {
        breadcrumbItems.length ? (
          <>
            <Breadcrumb.Item>
              <Link className="hover:text-gray-400" to='/Home'>Seller Center</Link>
            </Breadcrumb.Item>
            {
              breadcrumbItems.map((breadcrumbItem, index) => (
                <Breadcrumb.Item key={index}>
                  <Link className={`${index === breadcrumbItems.length-1 ? '' : "hover:text-gray-400"}`} to={breadcrumbItem.path}>{breadcrumbItem.breadcrumbName}</Link>
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

