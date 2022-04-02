import "./index.less";
import { message } from "antd";
import { LabelOptionProps } from "@/framework/types/common";
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-form";

interface AddCateProps {
  visible: boolean;
  handleVisible: (a: boolean) => void;
}

const AddCate = ({ visible, handleVisible }: AddCateProps) => {
  const options: LabelOptionProps[] | string[] = [
    {
      value: "0",
      label: (
        <>
          <div>Manual Selection</div>
          <div className="text-gray-400">
            Manually select the products you would like to include in your shop
            category
          </div>
        </>
      ),
    },
    {
      value: "1",
      label: (
        <>
          <div>Rule-based Filtering</div>
          <div className="text-gray-400">
            Products will be automatically selected based on the filters you
            have set up
          </div>
        </>
      ),
    },
  ];
  return (
    <ModalForm
      title="Add Category"
      visible={visible}
      onFinish={async (values) => {
        console.info(values);
        message.success("提交成功");
        return true;
      }}
      onVisibleChange={(value) => {
        handleVisible(value);
      }}
      modalProps={{ width: 520, okText: "Confirm", cancelText: "Cancel" }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="displayName"
          label="Category Display Name"
          fieldProps={{ maxLength: 40, showCount: true }}
          placeholder="Enter a Category Display Name"
        />
      </ProForm.Group>
      <ProFormRadio.Group name="type" label="Category Type" options={options} />
    </ModalForm>
  );
};

export default AddCate;
