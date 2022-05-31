import { ColumnProps } from 'antd/es/table';
import { Switch, Tooltip } from "antd";
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
      title: "Wechat Account",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Menu Name",
      dataIndex: "name",
      key: "name",
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
      render: (_, record) => (
        <div className="flex flex-row items-center">
          <Tooltip title="Edit">
            <Link to={`/menuManagempqr/menu-manage-detail/${record.id}`} className="mr-4">
              <i className="cursor-pointer ml-2 iconfont icon-Edit primary-color"></i>
            </Link>
          </Tooltip>
          {record.isEnabled ? null : <Tooltip title="Delete">
            <span
              className="cursor-pointer ml-2 iconfont icon-delete primary-color text-xl"
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
          </Tooltip>}
        </div>
      )
    },
  ];
  return columns;
};
