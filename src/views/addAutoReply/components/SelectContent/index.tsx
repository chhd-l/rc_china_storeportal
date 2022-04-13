import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Search from "@/components/common/Search";
import "./index.less";
import Mock from "mockjs";
import { dataListSource } from "@/views/addAutoReply/modules/mockdata";
import { ReplyContent } from "@/framework/types/wechat";

const formItems = [
  { label: "Content description", name: "description" },
  {
    label: "Reply Type",
    name: "type",
    searchList: [
      { label: "Text message", key: "text" },
      { label: "Picture message", key: "picture" },
      { label: "Voice message", key: "voice" },
      { label: "Video message", key: "video" },
      { label: "Graphic message", key: "graphic" },
    ],
  },
];

const column = [
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
  const [replyContents, setReplyContents] = useState<ReplyContent[]>([]);
  const [selectContent, setSelectContent] = useState<ReplyContent>({
    id: "",
    type: "",
    description: "",
    status: true,
  });

  useEffect(() => {
    setReplyContents(Mock.mock(dataListSource).array);
  }, []);

  const getReplyContents = () => {};

  const changeSelect = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectContent(selectedRows[0]);
  };

  return (
    <Modal
      title="Select Reply Content"
      visible={modalVisible}
      closable={false}
      cancelText={"Cancel"}
      okText={"Confirm"}
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
        formItems={formItems}
        classes={"select-content-search"}
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
      />
    </Modal>
  );
};
export default SelectContentModal;
