import { ProColumns } from "@/components/common/ProTable";
import { Switch } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { template } from "lodash";
import { handleValueEnum } from "@/utils/utils";
import { LabelOptionProps } from "@/framework/types/common";

interface TableColumnsProps {
  handleDelete: (e: string) => void;
  templateTitleList: LabelOptionProps[];
}
interface ColumnsProps {
  channel: string;
  scenario: string;
  id: string;
  path: string;
  title: string;
  status: boolean;
}
export const tableColumns = ({
  handleDelete,
  templateTitleList,
}: TableColumnsProps) => {
  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: "Template ID",
      dataIndex: "id",
      order: 4,
    },
    {
      title: "Scenario",
      dataIndex: "scenario",
      hideInSearch: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      hideInSearch: true,
    },
    {
      title: "Template Title",
      dataIndex: "title",
      order: 3,
      hideInTable: true,
      valueEnum: handleValueEnum(templateTitleList),
    },
    {
      title: "Application Scenario",
      dataIndex: "scenario",
      initialValue: "all",
      order: 2,
      hideInTable: true,
      valueEnum: {
        all: { text: "全部", status: "Default" },
        close: { text: "关闭", status: "Default" },
        running: { text: "运行中", status: "Processing" },
        online: { text: "已上线", status: "Success" },
        error: { text: "异常", status: "Error" },
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          defaultChecked={record.status}
          onChange={(checked: boolean) => {
            console.log(`switch to ${checked}`);
          }}
        />
      ),
    },
    {
      title: "Action",
      hideInSearch: true,
      render: (_, record) => [
        <Link to={`/template-message/${record.id}`} className="mr-4">
          <FormOutlined />
        </Link>,
        <a className=" mr-4">
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
