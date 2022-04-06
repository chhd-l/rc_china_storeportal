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
        url: "/shipment-list",
        key: "my_shipment",
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
        url: "/shop/categories",
        key: "shop_categories",
      },
    ],
  },
];
