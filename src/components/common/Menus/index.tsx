import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { menus, initActive } from "@/lib/menus";
const Menus = () => {
  const { pathname } = useLocation();
  const { SubMenu } = Menu;
  const selectedKeys = initActive(pathname);
  const openKeys = [selectedKeys[0]];

  return (
    <Menu
      style={{ width: 200 }}
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      mode="inline"
    >
      {menus.map((menu) => (
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
