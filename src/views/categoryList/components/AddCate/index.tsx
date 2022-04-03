import "./index.less";
import { message } from "antd";
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-form";
import { useNavigate } from "react-router-dom";
import { AddCateOptions } from "../../modules/constant";
interface AddCateProps {
  visible: boolean;
  handleVisible: (a: boolean) => void;
}
const AddCate = ({ visible, handleVisible }: AddCateProps) => {
  const navigation = useNavigate();
  const onFinish = async (values: any) => {
    console.info(values);
    navigation(`/category/add`, { state: { addCateType: values.type } });
    return true;
  };
  return (
    <ModalForm
      title="Add Category"
      visible={visible}
      onFinish={onFinish}
      onVisibleChange={(value) => {
        handleVisible(value);
      }}
      modalProps={{ width: 520, okText: "Confirm", cancelText: "Cancel" }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          rules={[{ required: true, message: "Missing Display Name" }]}
          name="displayName"
          label="Category Display Name"
          fieldProps={{ maxLength: 40, showCount: true }}
          placeholder="Enter a Category Display Name"
        />
      </ProForm.Group>
      <ProFormRadio.Group
        name="type"
        initialValue={"0"}
        label="Category Type"
        options={AddCateOptions}
      />
    </ModalForm>
  );
};

export default AddCate;
