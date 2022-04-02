import { ProColumns } from "@/components/common/ProTable";
import { productBase } from "@/framework/types/product";
import {
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
export const columns: ProColumns<productBase>[] = [
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
