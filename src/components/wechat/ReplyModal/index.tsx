import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Table } from 'antd';
import { BaseListProps } from "@/framework/types/common";
import { ReplyContent } from "@/framework/types/wechat";
import { getReplyContentList } from "@/framework/api/wechatSetting";
import { normaliseReplyContent } from "@/framework/normalize/wechatSetting";
import { ColumnProps } from "antd/es/table";

const Option = Select.Option;

interface IProps {
  visible: boolean
  onlyEnabled: boolean
  onConfirm: (reply: ReplyContent) => void
  onCancel: () => void
}

const replyTypeSelection: BaseListProps[] = [
  { label: "Text message", key: "text" },
  { label: "Picture message", key: "image" },
  { label: "Voice message", key: "voice" },
  { label: "Video message", key: "video" },
  { label: "Graphic message", key: "news" },
];

const columns: ColumnProps<ReplyContent>[] = [
  {
    title: "Reply Type",
    dataIndex: "type",
    key: "type",
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
    render: (_text: boolean) => _text ? "Enable" : "Disable"
  }
];

const ReplyModal: React.FC<IProps> = ({
  visible,
  onlyEnabled,
  onConfirm,
  onCancel
}) => {
  const [pages, setPages] = useState<{ page: number, limit: number, total: number }>({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [replyList, setReplyList] = useState<ReplyContent[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [param, setParam] = useState<{ description: string, type: string }>({ description: "", type: "" });
  const [selectedRows, setSelectedRows] = useState<ReplyContent[]>([]);

  useEffect(() => {
    getReplyList(1, 10, {});
  }, []);

  const getReplyList = async (current: number, limit: number, params: any = {}) => {
    setLoading(true);
    const data = await getReplyContentList({
      offset: current * limit - limit,
      limit: limit,
      sample: params.description || params.type ? {
        responseDescribeFuzzy: params?.description ?? undefined,
        responseType: params?.type ?? undefined,
      }: undefined
    });
    setLoading(false);
    setReplyList(normaliseReplyContent(data?.records ?? []));
  }

  const handleSearch = () => {
    getReplyList(pages.page, pages.limit, param);
  }

  return (
    <Modal
      title="Select Reply Content"
      visible={visible}
      width={900}
      okText="Confirm"
      cancelText="Cancel"
      onOk={() => {
        if (onConfirm) {
          onConfirm(selectedRows[0])
        } else {
          onCancel()
        }
      }}
      okButtonProps={{disabled: selectedRowKeys.length === 0}}
      onCancel={onCancel}
    >
      <div className="py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">Content Description</span>
          <div><Input placeholder="Input" onChange={(e) => setParam(Object.assign({}, param, { description: e.target.value }))} onPressEnter={handleSearch} /></div>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Reply Type</span>
          <div>
            <Select placeholder="Select" onChange={(val => setParam(Object.assign({}, param, { type: val })))}>
              {replyTypeSelection.map((item, idx) => <Option key={idx} value={item.key}>{item.label}</Option>)}
            </Select>
          </div>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={replyList}
        loading={loading}
        pagination={{
          current: pages.page,
          total: pages.total,
          onChange: (page) => {
            setPages(Object.assign({}, pages, { page }));
            getReplyList(page, pages.limit, param);
          }
        }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
          }
        }}
      />
    </Modal>
  );
}

export default ReplyModal;
