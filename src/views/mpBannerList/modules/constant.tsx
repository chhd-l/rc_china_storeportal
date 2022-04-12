import { LabelOptionProps } from "@/framework/types/common";
import { handleValueEnum } from "@/utils/utils";
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-table";
import { Switch } from "antd";
import { Link } from "react-router-dom";

enum StatusType {
  Close,
  Open,
}
interface TableColumnsProps {
  handleDelete: (e: string) => void;
  changeStatus: (e: boolean) => void;
  handlePreview: (e: string) => void;
  clickTypeList: LabelOptionProps[];
}
interface ColumnsProps {
  officialAccount: string;
  name: string;
  img: string;
  clickType: string;
  path: string;
  default: string;
  sort: number;
  id: string;
  status: boolean;
}
export const tableColumns = ({
  handlePreview,
  handleDelete,
  changeStatus,
  clickTypeList,
}: TableColumnsProps) => {
  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: "Official Account",
      dataIndex: "officialAccount",
      hideInSearch: true,
    },
    {
      title: "Banner Name",
      dataIndex: "name",
      hideInSearch: true,
    },
    {
      title: "Banner Pic",
      dataIndex: "img",
      hideInSearch: true,
      render: (_, record) => (
        <a>
          <SearchOutlined
            onClick={() => {
              handlePreview(record.img);
            }}
          />
        </a>
      ),
    },
    {
      title: "Click Type",
      dataIndex: "clickType",
      valueEnum: handleValueEnum(clickTypeList),
    },
    {
      title: "Path",
      dataIndex: "path",
      hideInSearch: true,
    },
    {
      title: "Default",
      dataIndex: "default",
      hideInSearch: true,
    },
    {
      title: "Sort",
      dataIndex: "sort",
      hideInSearch: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      valueEnum: StatusType,
      render: (_, record) => (
        <Switch
          defaultChecked={record.status}
          onChange={(checked: boolean) => {
            changeStatus(checked);
            console.log(`switch to ${checked}`);
          }}
        />
      ),
    },
    {
      title: "Action",
      hideInSearch: true,
      render: (_, record) => [
        <Link to={`/mpbanner/${record.id}`} className="mr-4">
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
