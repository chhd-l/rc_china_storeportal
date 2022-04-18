import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-table";
import { Switch } from "antd";
import { Link } from "react-router-dom";
interface TableColumns {
  handleDelete: (e: string) => void;
  changeStatus: (e: boolean) => void;
}
interface ColumnsProps {
  officialAccount: string;
  createTime: string;
  updateTime: string;
  status: boolean;
  id: string;
}
export const tableColumns = ({ handleDelete, changeStatus }: TableColumns) => {
  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: "Official Account",
      dataIndex: "officialAccount",
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
    },
    {
      title: "Update Time",
      dataIndex: "updateTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Switch
          defaultChecked={record.status}
          onChange={() => {
            changeStatus(record.status);
          }}
        />
      ),
    },
    {
      title: "Action",
      hideInSearch: true,
      render: (_, record) => [
        <Link to={`/menu-manage/${record.id}`} className="mr-4">
          <FormOutlined />
        </Link>,
        <a className="mr-4">
          <DeleteOutlined
            onClick={() => {
              handleDelete(record.id);
            }}
          />
        </a>,
      ],
    },
  ];
  return columns;
};
