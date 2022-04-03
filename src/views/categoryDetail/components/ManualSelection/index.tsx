import "./index.less";
import { message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
} from "@ant-design/pro-form";
import { useState } from "react";
import SearchHeader from "../SearchHeader";
import ProTable from "@/components/common/ProTable";
import { manualTable } from "../../modules/mockdata";
import { manualColumns } from "../../modules/constant";
import Mock from "mockjs";
export type ManualSelectionProps = {
  visible: boolean;
  handleVisible: (visible: boolean) => void;
};

const ManualSelection = ({ visible, handleVisible }: ManualSelectionProps) => {
  const getFormData = (data: any) => {
    console.info(data, "data");
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([""]);
  const onSelectChange = (selectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  return (
    <ModalForm
      className="manual-selection"
      layout="horizontal"
      title="Select Products"
      visible={visible}
      onFinish={async () => {
        message.success("提交成功");
        return true;
      }}
      onVisibleChange={handleVisible}
    >
      <SearchHeader getFormData={getFormData} />
      <ProTable
        columns={manualColumns}
        toolBarRender={false}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, sorter, filter);
          return Promise.resolve({
            data: Mock.mock(manualTable).table,
            success: true,
          });
        }}
        tableAlertRender={() => false}
        rowKey={(record: { key: any }) => record.key}
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        className="pt-4 bg-white"
        dateFormatter="string"
      />
    </ModalForm>
  );
};

export default ManualSelection;
