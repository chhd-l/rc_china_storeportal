import { Button, Switch, Table, Tooltip } from "antd";
import { replyTypeList } from '../../modules/constants';
import { ReplyContent } from "@/framework/types/wechat";
import { useNavigate } from "react-router-dom";

const Index = ({
  loading,
  replyContents,
  onPageChange,
  pages,
  onDelete,
  onChangeStatus
}: {
  loading: boolean,
  replyContents: ReplyContent[],
  onPageChange: Function,
  pages: any,
  onDelete: Function,
  onChangeStatus: Function
}) => {
  const navigator = useNavigate();
  const column = [
    {
      title: "Reply Type",
      dataIndex: "type",
      key: "type",
      render: (_text: string) => (replyTypeList.find(r => r.key === _text) ?? {})?.label ?? _text
    },
    {
      title: "Content description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: any, record: ReplyContent) => (
      <Switch
        checked={text}
        onChange={(checked) => {
          onChangeStatus(record.id, {
            accountId: record.accountId,
            responseDescribe: record.description,
            responseType: record.type,
            messageContent: record.content,
            mediaId: record.mediaId,
            isActive: checked
          })
        }} />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: ReplyContent) => (
        <>
          <Tooltip title="Edit">
            <span
              className="cursor-pointer iconfont icon-a-Group437 text-red-500"
              onClick={() => { navigator("/reply/edit-reply-content", { state: record }) }}
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
            navigator("/reply/add-reply-content");
          }}
        >
          + Add
        </Button>
      </div>
      <Table
        loading={loading}
        columns={column}
        dataSource={replyContents}
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
