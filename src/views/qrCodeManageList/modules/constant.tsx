import { ProColumns } from "@/components/common/ProTable";
import { LabelOptionProps } from "@/framework/types/common";
import { handleValueEnum } from "@/utils/utils";
import { QrcodeOutlined } from "@ant-design/icons";
interface TableColumnsProps {
  handlePreview: (e: string) => void;
  QRcodeTypeList: LabelOptionProps[];
}
interface ColumnsProps {
  officialAccount: string;
  name: string;
  id: string;
  type: string;
  qrCode: string;
  expiredTime: string;
}
export const tableColumns = ({
  handlePreview,
  QRcodeTypeList,
}: TableColumnsProps) => {
  const columns: ProColumns<ColumnsProps>[] = [
    {
      title: "Official Account",
      dataIndex: "officialAccount",
    },
    {
      title: "QR Code Name",
      dataIndex: "name",
    },
    {
      title: "QR Code Type",
      dataIndex: "type",
      valueEnum: handleValueEnum(QRcodeTypeList),
    },
    {
      title: "Expired Time",
      dataIndex: "expiredTime",
      hideInSearch: true,
    },
    {
      title: "Action",
      hideInSearch: true,
      render: (_, record) => [
        <a className=" mr-4">
          <QrcodeOutlined
            onClick={() => {
              handlePreview(record.qrCode);
            }}
          />
        </a>,
      ],
    },
  ];
  return columns;
};
