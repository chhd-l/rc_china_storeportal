import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "antd";
import {
  MailOutlined,
} from "@ant-design/icons";
const MenuList = [
  {
    title: "Shipment",
    url: "",
    key: "11",
    icon: <MailOutlined />,
    children: [
      { title: "My Shipment", url: "", key: "22" },
      { title: "Mass Ship", url: "", key: "33" },
      { title: "Shipping Setting", url: "", key: "44" },
    ],
  },
];
const AppLayout = () => {
  const { SubMenu } = Menu;
  const handleClick = (e: any) => {
    console.log("click ", e);
  };
  return (
    <section className="flex">
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["11"]}
        defaultOpenKeys={["11"]}
        mode="inline"
      >
        {MenuList.map((menu) => (
          <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
            {menu.children?.map((subMenu) => (
                <Menu.Item key={subMenu.key}>{subMenu.title}</Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
      <main className="flex-1">
        <Outlet />
      </main>
    </section>
  );
};
export default AppLayout;
