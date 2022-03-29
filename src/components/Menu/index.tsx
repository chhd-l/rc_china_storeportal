import React, { useEffect, useLayoutEffect, useState } from "react";
import { Menu } from "antd";
import { MailOutlined,ShoppingOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
const MenuLists = [
  {
    name: "Shipment",
    value: "shipment",
    url: "",
    key: "shipment",
    icon: <MailOutlined />,
    children: [
      {
        name: "My Shipment",
        value: "my_shipment",
        url: "/home",
        key: "my_shipment",
      },
      { name: "Mass Ship", value: "mass_ship", url: "/home", key: "mass_ship" },
      {
        name: "Shipping Setting",
        value: "shippingsetting",
        url: "/home",
        key: "shippingsetting",
      },
    ],
  },
  {
    name: "Product",
    value: "product",
    url: "",
    key: "product",
    icon: <ShoppingOutlined />,
    children: [
      {
        name: "My Products",
        value: "my_products",
        url: "/product-list",
        key: "my_products",
      },
      { name: "Add New Product", value: "add_new_product", url: "/home", key: "add_new_product" },
    ],
  },
];
const Menus = () => {
  const { SubMenu } = Menu;
  const {pathname} = useLocation()
  console.info('pathname', pathname)
  const [selectedKeys,setSelectedKeys] = useState([''])
  const [openKeys,setOpenKeys] = useState([''])
  const [menuList, setMenuList] = useState(MenuLists);
  const handleClick = (e: any) => {
    console.log("click ", e);
  };
  useEffect(()=>{
    initActive()
  },[pathname])
  const initActive = ()=>{
    menuList.forEach(menu=>{
        menu.children.forEach(subMenu=>{
            if(subMenu.url===pathname){
                setSelectedKeys([menu.key,subMenu.key])
                setOpenKeys([menu.key])
            }
        })
    })
  }
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
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
