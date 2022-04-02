import { MailOutlined, ShoppingOutlined } from "@ant-design/icons";

export const menus = [
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
      {
        name: "Add New Product",
        value: "add_new_product",
        url: "/product/add",
        key: "add_new_product",
      },
    ],
  },
  {
    name: "Shop",
    value: "shop",
    url: "",
    key: "shop",
    icon: <ShoppingOutlined />,
    children: [
      {
        name: "Shop Rating",
        value: "shop_rating",
        url: "/",
        key: "shop_rating",
      },
      {
        name: "Shop Categories",
        value: "shop_categories",
        url: "/category-list",
        key: "shop_categories",
      },
    ],
  },
];

export const initActive = (pathname: string) => {
  let selectedKeys: string[] = [];
  menus.forEach((menu) => {
    menu.children.forEach((subMenu) => {
      if (subMenu.url === pathname) {
        selectedKeys = [menu.key, subMenu.key];
      }
    });
  });
  return selectedKeys;
};
