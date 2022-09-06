import { ProColumns } from "@/components/common/ProTable";
import { DeleteOutlined, EyeOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import intl from 'react-intl-universal';

interface TableColumnsProps {
  handleDelete: (e: string) => void;
}
interface ColumnsProps {
  channel: string;
  scenario: string;
  id: string;
  path: string;
}
export const tableColumns = ({ handleDelete }: TableColumnsProps) => {
  let columns: ProColumns<ColumnsProps>[] = [
    {
      title: intl.get('wx.channel'),
      dataIndex: "channel",
      hideInSearch: true,
    },
    {
      title: intl.get('wx.channel_type'),
      dataIndex: "channel",
      hideInTable: true,
    },
    {
      title: intl.get('wx.scenario'),
      dataIndex: "scenario",
      hideInSearch: true,
    },
    {
      title: intl.get('wx.scenario_type'),
      dataIndex: "scenario",
      hideInTable: true,
    },
    {
      title: intl.get('wx.qr_code_value'),
      dataIndex: "id",
    },
    {
      title: intl.get('wx.mini_program_path'),
      dataIndex: "path",
      hideInSearch: true,
    },
    {
      title: intl.get('public.action'),
      hideInSearch: true,
      render: (_, record) => [
        <Link to={`/mpqr/${record.id}`}>
          <EyeOutlined className="mr-4" />
        </Link>,
        <a>
          <DeleteOutlined
            className="mr-4"
            onClick={() => {
              handleDelete(record.id);
            }}
          />
        </a>,
        <a>
          <QrcodeOutlined className="mr-4" />
        </a>,
      ],
    },
  ];
  return columns;
};
