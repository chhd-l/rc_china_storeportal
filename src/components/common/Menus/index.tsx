import { Menu } from "antd";
import intl from 'react-intl-universal';
import { Link, useLocation } from "react-router-dom";
import { menus } from "@/lib/menus";
import { useEffect, useState } from 'react'
import { session } from '@/utils/global'
// import "./index.less"

const { SubMenu } = Menu;

const findOpenKeysAndSelectedKeysByPathname = (menuList: any[], pathname: string) => {
  const openKeys: any[] = [], selectedKeys: any[] = [];
  (menuList || []).forEach((parent: any) => {
    (parent.children || []).forEach((child: any) => {
      if (child.url === pathname || `/${pathname.split('/')[1]}` === child.url) {
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
    // console.log(333333,pathname)
    if (pathname === "/dashboard") {
      setOpenKeys([]);
      setSelectKeys(['dashboard']);
    } else if (pathname === "/aireco") {
      setOpenKeys([]);
      setSelectKeys(['aireco']);
    } else {
      let { openKeys, selectedKeys } = findOpenKeysAndSelectedKeysByPathname(menus, pathname);
      if (!openKeys.length || !selectedKeys.length) {
        openKeys = session.get('openMenuKeys') || [];
        selectedKeys = session.get('selectedMenuKeys') || [];
      }
      setSelectKeys(selectedKeys);
      setOpenKeys(openKeys);
    }
  },[pathname])

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
      <Menu.Item key="dashboard" icon={<span className='icon iconfont text-xl icon-a-bianzu33' />} style={{paddingLeft: 20, backgroundColor: '#fff'}}>
        <Link to="/dashboard" style={{ fontSize: "13px" }}>{intl.get('menu.dashboard')}</Link>
      </Menu.Item>
      {menus.map(({ key, icon, name, url, langKey, children }) => (
        <>
          {!children || children.length === 0 ? <Menu.Item
            key={key}
            icon={icon}
            style={{paddingLeft: 20, backgroundColor: '#fff'}}
          >
            <Link to={url} style={{ fontSize: "13px" }}>{intl.get(langKey)}</Link>
          </Menu.Item> : <SubMenu key={key} icon={icon} title={intl.get(langKey)} >
            {children?.map((subMenu) => (
              <Menu.Item key={subMenu.key} >
                <Link key={subMenu.key} to={subMenu.url} style={{ fontSize: "13px" }}>
                  {intl.get(subMenu.langKey)}
                </Link>
              </Menu.Item>
            ))}
          </SubMenu>}
        </>
      ))}
    </Menu>
  );
};
export default Menus;
