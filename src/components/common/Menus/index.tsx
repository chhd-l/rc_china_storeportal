import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { menus, initActive } from "@/lib/menus";
import { useEffect, useState } from 'react'
import { session } from '@/utils/global'
// import "./index.less"

const { SubMenu } = Menu;

const findOpenKeysAndSelectedKeysByPathname = (menuList: any[], pathname: string) => {
  const openKeys: any[] = [], selectedKeys: any[] = [];
  (menuList || []).forEach((parent: any) => {
    (parent.children || []).forEach((child: any) => {
      if (child.url === pathname) {
        openKeys.push(parent.key);
        selectedKeys.push(child.key);
      }
    });
  });
  return { openKeys, selectedKeys };
}

const Menus = () => {
  const { pathname } = useLocation();
  const [selectedKeys,setSelectKeys]=useState<any[]>([])
  const [openKeys,setOpenKeys]=useState<any[]>([])

  useEffect(()=>{
    console.log(333333,pathname)
    let { openKeys, selectedKeys } = findOpenKeysAndSelectedKeysByPathname(menus, pathname);
    if (!openKeys.length || !selectedKeys.length) {
      openKeys = session.get('openMenuKeys') || [];
      selectedKeys = session.get('selectedMenuKeys') || [];
    }
    setSelectKeys(selectedKeys);
    setOpenKeys(openKeys);
  },[])

  const onOpenChange=(opens:string[])=>{
    console.log('opens',opens)
    setOpenKeys(opens);
    session.set('openMenuKeys', opens);
  }

  const onSelect=({ item, key, keyPath, selectedKeys, domEvent }:any)=>{
    console.log('selectMenuKey',item, key, keyPath, selectedKeys, domEvent)
    setSelectKeys([key]);
    session.set('selectedMenuKeys', [key]);
  }

  return (
    <Menu
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      mode="inline"
      onOpenChange={onOpenChange}
      onSelect={onSelect}
    >
      {menus.map(({ key, icon, name, children }) => (
        <SubMenu key={key} icon={icon} title={name} >
          {children?.map((subMenu) => (
            <Menu.Item key={subMenu.key} >
              <Link key={subMenu.key} to={subMenu.url} style={{ fontSize: "13px" }}>
                {subMenu.name}
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};
export default Menus;
