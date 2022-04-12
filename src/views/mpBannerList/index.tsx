import ProTable from "@/components/common/ProTable";
import "./index.less";
import { mockClickType, mockList } from "./modules/mockdata";
import Mock from "mockjs";
import { Button, Modal } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { useState } from "react";
import { tableColumns } from "./modules/constant";

const MpBannerList = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const clickTypeList = Mock.mock(mockClickType).list;
  const handlePreview = (img: string) => {
    setPreviewImage(img);
  };
  const changeStatus = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
  const handleDelete = (id: string) => {
    console.info("handleDelete", id);
  };
  const columns = tableColumns({
    handlePreview,
    changeStatus,
    handleDelete,
    clickTypeList,
  });
  return (
    <div className="mp-banner-list bg-gray-50 py-14 px-6 text-left">
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

export default MpBannerList;
