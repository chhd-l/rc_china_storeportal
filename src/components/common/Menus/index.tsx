import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { menus, initActive } from "@/lib/menus";
// import "./index.less"
const Menus = () => {
  const { pathname } = useLocation();
  const { SubMenu } = Menu;
  const selectedKeys = initActive(pathname);
  const openKeys = [selectedKeys[0]];

  return (
    <Menu
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      mode="inline"
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
