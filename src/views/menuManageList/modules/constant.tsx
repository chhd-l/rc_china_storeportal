import { ColumnProps } from 'antd/es/table';
import { Switch, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { handleReturnTime } from '@/utils/utils';
import moment from 'moment';
import intl from 'react-intl-universal';

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
      title: intl.get('wx.wechat_account'),
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: intl.get('wx.menu_name'),
      dataIndex: "name",
      key: "name",
    },
    {
      title: intl.get('wx.create_time'),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{handleReturnTime(text)}</div>
    },
    {
      title: intl.get('wx.update_time'),
      dataIndex: "lastModifiedAt",
      key: "lastModifiedAt",
      render: (text) => <div>{handleReturnTime(text)}</div>
    },
    {
      title: intl.get('public.status'),
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
      title: intl.get('public.action'),
      key: "action",
      render: (_, record) => (
        <div className="flex flex-row items-center">
          <Tooltip title={intl.get('public.edit')}>
            <Link to={`/menuManagempqr/menu-manage-detail/${record.id}`} className="mr-4">
              <i className="cursor-pointer ml-2 iconfont icon-Edit primary-color"></i>
            </Link>
          </Tooltip>
          {record.isEnabled ? null : <Tooltip title={intl.get('public.delete')}>
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
