import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import Mock from "mockjs";
import { replyContentsSource } from "@/views/replyContents/modules/mockdata";
import { WxReplyContent } from "@/framework/types/wechat";
import { MODAL_FORM_ITEM } from "@/views/addAutoReply/modules/form";
import intl from 'react-intl-universal';

const column = [
  {
    title: intl.get('wx.reply_type'),
    dataIndex: "type",
    key: "type",
  },
  {
    title: intl.get('wx.content_desc'),
    dataIndex: "description",
    key: "description",
  },
  {
    title: intl.get('public.status'),
    dataIndex: "status",
    key: "status",
    render: (text: any) => `${text ? "Enable" : "Disable"}`,
  },
];

const SelectContentModal = ({
  modalVisible,
  onCancel,
  onConfirm,
}: {
  modalVisible: boolean;
  onCancel: Function;
  onConfirm: Function;
}) => {
  const [replyContents, setReplyContents] = useState<WxReplyContent[]>([]);
  const [selectContent, setSelectContent] = useState<WxReplyContent>({
    id: "",
    type: "",
    description: "",
    status: true,
  });

  useEffect(() => {
    setReplyContents(Mock.mock(replyContentsSource).array);
  }, []);

  const getReplyContents = () => {};

  const changeSelect = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectContent(selectedRows[0]);
  };

  return (
    <Modal
      title={intl.get('wx.select_reply_content')}
      visible={modalVisible}
      closable={false}
      cancelText={intl.get('public.cancel')}
      okText={intl.get('public.confirm')}
      width={700}
      onCancel={() => {
        onCancel && onCancel();
      }}
      onOk={() => {
        if (selectContent.id) {
          onConfirm && onConfirm(selectContent);
        }
      }}
    >
      <Search
        query={getReplyContents}
        formItems={MODAL_FORM_ITEM}
        style={{ width: "290px" }}
        classes={'-mt-2'}
      />
      <Table
        columns={column}
        dataSource={replyContents}
        rowSelection={{
          onChange: changeSelect,
          hideSelectAll: true,
          type: "radio",
        }}
        rowKey={"id"}
        className="rc-table"
      />
    </Modal>
  );
};
export default SelectContentModal;
