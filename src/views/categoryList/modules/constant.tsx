import { ProColumns } from "@/components/common/ProTable";
import { CategoryBaseProps } from "@/framework/types/product";
import {
  SettingOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Switch } from "antd";
import { Link } from "react-router-dom";
export const columns: ProColumns<CategoryBaseProps>[] = [
  {
    title: "Category Display Name",
    dataIndex: "displayName",
  },
  {
    title: "Created By",
    dataIndex: "createdUser",
  },
  {
    title: "Product(s)",
    dataIndex: "productNum",
  },
  {
    title: "Display On/Off",
    dataIndex: "isDisplay",
    render: (_, record) => (
      <Switch
        defaultChecked={record.isDisplay}
        disabled={record.productNum < 1}
        onChange={(checked: boolean) => {
          console.log(`switch to ${checked}`);
        }}
      />
    ),
  },
  {
    title: "操作",
    key: "option",
    width: 180,
    valueType: "option",
    render: (_, record) => [
      <Link to={`/category/:add`} className="text-xl mr-4">
        +
      </Link>,
      <a className=" mr-4">
        <SettingOutlined />
      </a>,
      <a className=" mr-4">
        <DeleteOutlined />
      </a>,
      <Link to={`/category/:${record.id}`} className="text-xl mr-4">
        <FileTextOutlined />
      </Link>,
    ],
  },
];

export const columnsAdjustSequence: ProColumns<any>[] = [
  {
    title: "product Name",
    dataIndex: "productName",
  },
  {
    title: "MarketingPrice",
    dataIndex: "marketingPrice",
  },
  {
    title: "Stock",
    dataIndex: "stock",
  },
];
