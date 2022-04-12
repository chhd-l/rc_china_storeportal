import { ProColumns } from "@/components/common/ProTable";
import { OptionsProps } from "@/framework/types/common";
import {
  ProductBaseProps,
  TableHeadersItemProps,
} from "@/framework/types/product";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
export const columns: ProColumns<ProductBaseProps>[] = [
  {
    title: "Product Name",
    dataIndex: "name",
    // render: (_) => {_},
  },
  {
    title: "SKU",
    dataIndex: "skuId",
  },
  {
    title: "Varitions",
    dataIndex: "status",
  },
  {
    title: "Price",
    dataIndex: "price",
    align: "left",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Stock",
    width: 140,
    key: "since",
    dataIndex: "stock",
    valueType: "date",
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: "操作",
    key: "option",
    width: 180,
    valueType: "option",
    render: (_, record) => [
      <a>
        <EyeOutlined />
      </a>,
      <Link to={`/product/${record.id}`}>
        <EditOutlined />
      </Link>,
      <a>
        <DownloadOutlined />
      </a>,
      <a>
        <DeleteOutlined />
      </a>,
    ],
  },
];

export enum Tab {
  All = "ALL",
  Live = "LIVE",
  Soldout = "SOLDOUT",
  Disabled = "DISABLED",
}
export const toolbarInit: OptionsProps[] = [
  {
    name: Tab.All,
    value: "",
  },
  {
    name: Tab.Live,
    value: "",
  },
  {
    name: Tab.Soldout,
    value: "",
  },
  {
    name: Tab.Disabled,
    value: "",
  },
];

export const handleTabValue = (tabData: OptionsProps[], data: any) => {
  return tabData.map((el: { name: string; value: any }) => {
    for (let k in data) {
      if (el.name == k.toUpperCase()) {
        el.value = data[k];
      }
    }
    return el;
  });
};

export const tableHeaders: TableHeadersItemProps[] = [
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "SKU",
    dataIndex: "no",
  },
  {
    title: "Varitions",
    dataIndex: "specs",
  },
  {
    title: "Price",
    dataIndex: "price",
    sortDirection: "",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sortDirection: "",
  },
  {
    title: "Options",
    dataIndex: "actions",
    render: (record: any, index: number) => (
      <div>
        <a className="mr-4">
          <EyeOutlined />
        </a>
        <Link className="mr-4" to={`/product/${record.id}`}>
          <EditOutlined />
        </Link>
        <a className="mr-4">
          <DownloadOutlined />
        </a>
        <a>
          <DeleteOutlined />
        </a>
      </div>
    ),
  },
];
