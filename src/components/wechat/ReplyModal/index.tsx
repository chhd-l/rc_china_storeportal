import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Table, Button } from 'antd';
import { WxReplyContent } from "@/framework/types/wechat";
import { getReplyContentList } from "@/framework/api/wechatSetting";
import { normaliseReplyContent } from "@/framework/normalize/wechatSetting";
import { ColumnProps } from "antd/es/table";
import { replyTypeList } from "@/framework/constants/wechat";

const Option = Select.Option;

interface IProps {
  visible: boolean
  onlyEnabled: boolean
  onConfirm: (reply: WxReplyContent) => void
  onCancel: () => void
}

const columns: ColumnProps<WxReplyContent>[] = [
  {
    title: "Reply Type",
    dataIndex: "type",
    key: "type",
    render: (_text) => (replyTypeList.find(r => r.key === _text))?.label ?? _text
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
  const [replyList, setReplyList] = useState<WxReplyContent[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [param, setParam] = useState<{ description: string, type: string }>({ description: "", type: "" });
  const [selectedRows, setSelectedRows] = useState<WxReplyContent[]>([]);

  useEffect(() => {
    getReplyList(1, 10, {});
  }, []);

  const getReplyList = async (current: number, limit: number, params: any = {}) => {
    setLoading(true);
    const data = await getReplyContentList({
      offset: current * limit - limit,
      limit: limit,
      sample: params.description || params.type || onlyEnabled ? {
        responseDescribeFuzzy: params.description || undefined,
        responseType: params.type || undefined,
        isActive: onlyEnabled ? true : undefined,
      }: undefined
    });
    setLoading(false);
    setReplyList(normaliseReplyContent(data?.records ?? []));
  }

  const handleSearch = () => {
    setPages(Object.assign({}, pages, { page: 1 }));
    getReplyList(1, pages.limit, param);
  }

  const onSelectChange = (val: string) => {
    setPages(Object.assign({}, pages, { page: 1 }));
    setParam(Object.assign({}, param, { type: val }));
    getReplyList(1, pages.limit, Object.assign({}, param, { type: val }));
  }

  const onReset = () => {
    setPages(Object.assign({}, pages, { page: 1 }));
    setParam({ description: "", type: "" });
    getReplyList(1, pages.limit, { description: "", type: "" });
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
      <div className="py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">Content Description</span>
            <div><Input placeholder="Input" value={param.description} style={{width: 220}} onChange={(e) => setParam(Object.assign({}, param, { description: e.target.value }))} onPressEnter={handleSearch} /></div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Reply Type</span>
            <div>
              <Select placeholder="Select" value={param.type || undefined} style={{width: 220}} onChange={onSelectChange}>
                {replyTypeList.map((item, idx) => <Option key={idx} value={item.key}>{item.label}</Option>)}
              </Select>
            </div>
          </div>
        </div>
        <div className="mt-4 space-x-md">
          <Button type="primary" onClick={handleSearch}>Search</Button>
          <Button onClick={onReset}>Reset</Button>
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
