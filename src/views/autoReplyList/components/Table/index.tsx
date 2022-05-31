import { Button, Switch, Table, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { matchTypeList } from "../../modules/constants";
import { replyTypeList } from "@/framework/constants/wechat";
import { AutoReplies } from "@/framework/types/wechat";

const Index = ({
  autoReplies,
  pages,
  loading,
  onPageChange,
  onChangeStatus,
  onDelete
}: {
  autoReplies: AutoReplies[]
  pages: { page: number, limit: number, total: number }
  loading: boolean
  onPageChange: Function
  onChangeStatus: Function
  onDelete: Function
}) => {
  const navigator = useNavigate();
  const columns = [
    {
      title: "Wechat Account",
      dataIndex: "accountName",
      key: "accountName",
    },
    {
      title: "Match Type",
      dataIndex: "matchType",
      key: "matchType",
      render: (_text: string) => (matchTypeList.find(m => m.key === _text))?.label ?? _text
    },
    {
      title: "Keywords",
      dataIndex: "keywords",
      key: "keywords",
    },
    {
      title: "Response Type",
      dataIndex: "responseType",
      key: "responseType",
      render: (_text: string) => (replyTypeList.find(m => m.key === _text))?.label ?? _text
    },
    {
      title: "Response Description",
      dataIndex: "responseDes",
      key: "responseDes",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: AutoReplies) => (
        <Switch
          checked={text}
          onChange={(checked) => {
            onChangeStatus(record.id, {
              isActive: checked
            })
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "Action",
      render: (text: any, record: AutoReplies) => (
        <>
          <Tooltip title="Edit">
            <span
              className="cursor-pointer iconfont icon-a-Group437 text-red-500"
              onClick={() => { navigator("/auto-reply/edit-auto-reply", { state: record }) }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span
              className="cursor-pointer iconfont icon-delete text-red-500 ml-2"
              onClick={() => {
                onDelete(record.id)
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div className="pt-4">
      <div className="flex flex-row justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            navigator("/auto-reply/add-auto-reply");
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        dataSource={autoReplies}
        columns={columns}
        loading={loading}
        rowKey="id"
        className="rc-table"
        pagination={{
          current: pages.page,
          total: pages.total,
          onChange: (page) => {
            onPageChange(page)
          }
        }}
      />
    </div>
  );
};
export default Index;
