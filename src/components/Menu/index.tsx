import React, { useEffect, useLayoutEffect, useState } from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
const MenuLists = [
  {
    name: "Shipment",
    value: "shipment",
    url: "",
    key: "11",
    icon: <MailOutlined />,
    children: [
      {
        name: "My Shipment",
        value: "My Shipment",
        url: "/product-list",
        key: "22",
      },
      { name: "Mass Ship", value: "Mass Ship", url: "/home", key: "33" },
      {
        name: "Shipping Setting",
        value: "Shipping Setting",
        url: "",
        key: "44",
      },
    ],
  },
];
const Menus = () => {
  const { SubMenu } = Menu;
  const {pathname} = useLocation()
  console.info('pathname', pathname)
  const [defaultSelectedKeys,setDefaultSelectedKeys] = useState([''])
  const [defaultOpenKeys,setDefaultOpenKeys] = useState([''])
  const [menuList, setMenuList] = useState(MenuLists);
  const handleClick = (e: any) => {
    console.log("click ", e);
  };
  useEffect(()=>{
    initActive()
  },[pathname])
  useLayoutEffect(()=>{
    initActive()
  },[])
  const initActive = ()=>{
    menuList.forEach(menu=>{
        menu.children.forEach(subMenu=>{
            if(subMenu.url===pathname){
                setDefaultSelectedKeys([menu.key,subMenu.key])
                setDefaultOpenKeys([menu.key])
            }
        })
    })
  }
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline"
    >
      {menuList.map((menu) => (
        <SubMenu key={menu.key} icon={menu.icon} title={menu.name}>
          {menu.children?.map((subMenu) => (
            <Menu.Item key={subMenu.key}>
              <Link key={subMenu.key} to={subMenu.url}>
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
