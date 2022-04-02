import { ProColumns } from "@/components/common/ProTable";
import { CategoryBaseProps } from "@/framework/types/shop";
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
    dataIndex: "isDispaly",
    render: (_, record) => (
      <Switch
        defaultChecked={record.isDispaly}
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
