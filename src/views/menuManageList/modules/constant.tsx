import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { ColumnProps } from 'antd/es/table';
import { Switch } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';

export type TWxMenuUpdateParam = {
  id: string;
  accountId: string;
  content: string;
  isEnabled: boolean;
  isDeleted: boolean;
  operator?: string;
}

interface TableColumns {
  handleDelete: (e: TWxMenuUpdateParam) => void;
  changeStatus: (e: TWxMenuUpdateParam) => void;
}
interface ColumnsProps {
  accountId: string;
  content: string;
  createdAt: string;
  lastModifiedAt: string;
  isEnabled: boolean;
  id: string;
}
export const tableColumns = ({ handleDelete, changeStatus }: TableColumns) => {
  const columns: ColumnProps<ColumnsProps>[] = [
    {
      title: "Official Account",
      dataIndex: "content",
      key: "contet",
    },
    {
      title: "Create Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{moment(text).format('YYYY/MM/DD HH:mm:ss')}</div>
    },
    {
      title: "Update Time",
      dataIndex: "lastModifiedAt",
      key: "lastModifiedAt",
      render: (text) => <div>{moment(text).format('YYYY/MM/DD HH:mm:ss')}</div>
    },
    {
      title: "Status",
      dataIndex: "isEnabled",
      key: "isEnabled",
      render: (_, record) => (
        <Switch
          checked={record.isEnabled}
          onChange={() => {
            changeStatus({
              id: record.id,
              accountId: record.accountId,
              content: record.content,
              isDeleted: false,
              isEnabled: !record.isEnabled
            });
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => [
        <Link to={`/menuManagempqr/menu-manage-detail/${record.id}`} className="mr-4">
          <FormOutlined />
        </Link>,
        <a className="mr-4">
          <DeleteOutlined
            onClick={() => {
              handleDelete({
                id: record.id,
                accountId: record.accountId,
                content: record.content,
                isEnabled: record.isEnabled,
                isDeleted: true
              });
            }}
          />
        </a>,
      ],
    },
  ];
  return columns;
};
