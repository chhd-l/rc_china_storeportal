import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Mock from "mockjs";
import { dataListSource } from "../../modules/mockdata";
import { Asset } from "@/framework/types/wechat";
import { cloneDeep } from "lodash";
import Search from "@/components/common/Search";

const formItems = [{ label: "Title", name: "title" }];

const column = [
  {
    title: "Wechat Assets ID",
    dataIndex: "assetId",
    key: "assetId",
  },
  {
    title: "Create Time",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

const pictureColumn = {
  title: "Picture",
  dataIndex: "picture",
  key: "picture",
};

const voiceColumn = {
  title: "Voice",
  dataIndex: "voice",
  key: "voice",
};

const videoColumn = {
  title: "Video",
  dataIndex: "video",
  key: "video",
};

const graphicColumn = {
  title: "Graphic main cover",
  dataIndex: "graphic",
  key: "graphic",
};

const titleColumn = {
  title: "Title",
  dataIndex: "title",
  key: "title",
};

const SelectContentModal = ({
  modalVisible,
  onCancel,
  onConfirm,
  type,
}: {
  modalVisible: boolean;
  onCancel: Function;
  onConfirm: Function;
  type: string;
}) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectAsset, setSelectAsset] = useState(null);
  const [columns, setColumns] = useState(column);

  const changeSelect = (selectedRowKeys: any, selectedRows: any) => {
    console.log(selectedRowKeys, selectedRows);
    setSelectAsset(selectedRows[0]);
  };

  const handleColumns = () => {
    let baseColumn = cloneDeep(column);
    switch (type) {
      case "picture":
        baseColumn.unshift(pictureColumn);
        break;
      case "voice":
        baseColumn.unshift(voiceColumn);
        break;
      case "video":
        baseColumn.unshift(videoColumn);
        baseColumn.splice(2, 1, titleColumn);
        break;
      case "graphic":
        baseColumn.unshift(graphicColumn);
        baseColumn.splice(2, 1, titleColumn);
        break;
      default:
        break;
    }
    setColumns(baseColumn);
  };

  const getAssets = () => {};

  useEffect(() => {
    setAssets(Mock.mock(dataListSource).array);
  }, []);

  useEffect(() => {
    handleColumns();
  }, [type]);

  return (
    <Modal
      title="Select Assets"
      destroyOnClose={true}
      visible={modalVisible}
      closable={false}
      cancelText={"Cancel"}
      okText={"Confirm"}
      width={700}
      onCancel={() => {
        onCancel && onCancel();
      }}
      onOk={() => {
        if (selectAsset) {
          onConfirm && onConfirm(selectAsset);
        }
      }}
    >
      {type === "video" || type === "graphic" ? (
        <Search
          query={getAssets}
          formItems={formItems}
          classes={"select-content-search"}
        />
      ) : null}
      <Table
        columns={columns}
        dataSource={assets}
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
