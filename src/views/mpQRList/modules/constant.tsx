import { ProColumns } from "@/components/common/ProTable";
import { DeleteOutlined, EyeOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
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
      title: "Channel",
      dataIndex: "channel",
      hideInSearch: true,
    },
    {
      title: "Channel Type",
      dataIndex: "channel",
      hideInTable: true,
    },
    {
      title: "Scenario",
      dataIndex: "scenario",
      hideInSearch: true,
    },
    {
      title: "Scenario type",
      dataIndex: "scenario",
      hideInTable: true,
    },
    {
      title: "二维码键值",
      dataIndex: "id",
    },
    {
      title: "Min Program Path",
      dataIndex: "path",
      hideInSearch: true,
    },
    {
      title: "Action",
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
