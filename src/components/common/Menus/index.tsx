import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { menus, initActive } from "@/lib/menus";
import { useEffect, useState } from 'react'
// import "./index.less"

const Menus = () => {
  const { pathname } = useLocation();
  const { SubMenu } = Menu;
  const [selectedKeys,setSelectKeys]=useState(initActive(pathname))
  const [openKeys,setOpenKeys]=useState([initActive(pathname)[0]])

  useEffect(()=>{
    console.log(333333,pathname)
    setSelectKeys(initActive(pathname));
    setOpenKeys([initActive(pathname)[0]])
    try {
      pathname.split('/').find(path => {
        if(path === 'product') {
          setOpenKeys(['product'])
          throw new Error('0')
        } else if (path === 'order') {
          setOpenKeys(['order'])
          throw new Error('0')
        } else if (path === 'subscription') {
          setOpenKeys(['subscription'])
          throw new Error('0')
        } else if (path === 'shipment-list') {
          setOpenKeys(['shipment'])
          throw new Error('0')
        } else if (path === 'petOwner') {
          setOpenKeys(['petOwner'])
          throw new Error('0')
        } else if (path === 'petOwner') {
          setOpenKeys(['petOwner'])
          throw new Error('0')
        } else if (path === 'petOwner') {
          setOpenKeys(['petOwner'])
          throw new Error('0')
        } else if (path === 'category') {
          setOpenKeys(["shop"])
          throw new Error('0')
        } else if (path === 'marketingCentre') {
          setOpenKeys(["marketing_centres"])
          throw new Error('0')
        }  else {
          setOpenKeys(["wechat_management"])
        }
      })
    } catch (e) {
      console.log('e',e)
    }
  },[pathname])

  const onOpenChange=(opens:string[])=>{
    console.log('opens',opens)
    setOpenKeys(opens)
  }

  return (
    <Menu
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      defaultOpenKeys={openKeys}
      mode="inline"
      onOpenChange={onOpenChange}
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
