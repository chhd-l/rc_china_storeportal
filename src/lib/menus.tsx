import {MailOutlined, ShoppingOutlined, WechatOutlined} from "@ant-design/icons";

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
        url: "/shipment-list",
        key: "my_shipment",
      },
      {
        name: "Shipping Setting",
        value: "shipping_setting",
        url: "/shipping-setting",
        key: "shipping_setting",
      },
    ],
  },
  {
    name: "Order",
    value: "order",
    url: "",
    key: "order",
    icon: <MailOutlined />,
    children: [
      {
        name: "My Orders",
        value: "my_orders",
        url: "/order-list",
        key: "my_orders",
      },
      {
        name: "Order Setting",
        value: "order_setting",
        url: "/order-setting",
        key: "order_setting",
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
    name: "Pet Owner",
    value: "petOwner",
    url: "",
    key: "petOwner",
    icon: <ShoppingOutlined />,
    children: [
      {
        name: "My Pet Owner",
        value: "my_pet_owner",
        url: "/pet-owner-list",
        key: "my_pet_owner",
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
  {
    name: "Wechat Management",
    value: "wechat_management",
    url: "",
    key: "wechat_management",
    icon: <WechatOutlined />,
    children: [
      {
        name: "Account Management",
        value: "account_management",
        url: "/account-list",
        key: "account_management",
      },
      {
        name: "Fans Management",
        value: "fans_management",
        url: "/fans-list",
        key: "fans_management",
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
