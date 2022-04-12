import ProTable from "@/components/common/ProTable";
import "./index.less";
import { mockList, mockOptionsList } from "./modules/mockdata";
import Mock from "mockjs";
import { Button, Modal } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useState } from "react";
import { tableColumns } from "./modules/constant";
const QrCodeManage = () => {
  const [previewImage, setPreviewImage] = useState("");
  const QRcodeTypeList = Mock.mock(mockOptionsList).list;
  const handlePreview = (img: string) => {
    setPreviewImage(img);
  };
  const columns = tableColumns({ handlePreview, QRcodeTypeList });
  return (
    <div className="qr-code-manage  bg-gray-50 py-14 px-6 text-left">
      <ProTable
        toolBarRender={() => [
          <Button className="mt-8 " type="primary" ghost>
            + Add
          </Button>,
          <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, sorter, filter);
          return Promise.resolve({
            data: Mock.mock(mockList).list,
            success: true,
          });
        }}
      />
      <Modal
        visible={!!previewImage}
        // title={previewTitle}
        footer={null}
        onCancel={() => {
          setPreviewImage("");
        }}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default QrCodeManage;
