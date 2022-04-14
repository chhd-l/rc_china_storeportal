import { Button, message, Table, Tooltip, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Asset } from "@/framework/types/wechat";
import { assetListSource } from "@/views/assetList/modules/mockdata";
import Mock from "mockjs";

const column = [
  {
    title: "Picture",
    dataIndex: "picture",
    key: "picture",
  },
  {
    title: "Wechat Assets Link",
    dataIndex: "assetLink",
    key: "assetLink",
  },
  {
    title: "Create Time",
    dataIndex: "createTime",
    key: "createTime",
    render: (text: any, record: any) =>
      `${record.status === "synchronized" ? record.syncTime : text}`,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (text: any, record: any) => (
      <>
        <Tooltip title="View QR Code">
          <span
            className="cursor-pointer ml-2 iconfont icon-Frame-1 text-red-500 text-xl"
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <span
            className="cursor-pointer ml-2 iconfont icon-Frame3 text-red-500 text-xl"
            onClick={() => {}}
          />
        </Tooltip>
      </>
    ),
  },
];

const Picture = () => {
  const [pictureList, setPictureList] = useState<Asset[]>([]);

  useEffect(() => {
    setPictureList(Mock.mock(assetListSource).array);
  }, []);

  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <div className="flex flex-row mb-4">
        <Upload {...uploadProps}>
          <Button>Upload Local File</Button>
        </Upload>
        <Button className="ml-4" onClick={() => {}}>
          <span className="iconfont icon-bianzu2 mr-2" />
          Synchronous WeChat Assets
        </Button>
      </div>
      <Table columns={column} dataSource={pictureList} />
    </div>
  );
};
export default Picture;
