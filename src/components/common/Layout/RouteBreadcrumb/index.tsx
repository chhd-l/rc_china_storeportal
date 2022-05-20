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

  // 备用，如果需要将详情id反馈到url上，可以用这个方法解析需要展示的面包屑
  // const getRouterPathList = () => {
  //   let parentRouter = r;
  //   return pathname.split('/').reduce((prev: any[], curr: any, index: number) => {
  //     if (curr === '' && index === 0) {
  //       const home = parentRouter.find(rt => rt.path === '/')
  //       if (home) {
  //         prev.push(home);
  //         parentRouter = home.children ?? [];
  //       }
  //       prev.push()
  //     } else {
  //       const target = parentRouter.find(rt => ((rt?.path ?? '').split('/')[0] ?? '') === curr);
  //       parentRouter = target?.children ?? [];
  //       if (target) {
  //         prev.push(target);
  //       }
  //     }
  //     return prev;
  //   }, []);
  // }

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
              breadcrumbItems.map((breadcrumbItem, index) => {
                const indx = pathname.indexOf(breadcrumbItem.path) + breadcrumbItem.path.length
                const path = pathname.slice(0, indx)
                return (
                  <Breadcrumb.Item key={index}>
                    <Link className={`${index === breadcrumbItems.length-1 ? '' : "hover:text-gray-400"}`} to={path}>{breadcrumbItem.breadcrumbName}</Link>
                  </Breadcrumb.Item>
                )
              })
            }
          </>
        ) : null
      }
    </Breadcrumb>
  );
};

export default RouteBreadcrumb;

