import "./index.less";
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-form";
import { useNavigate } from "react-router-dom";
import { AddCateOptions } from "../../modules/constant";
import { saveShopCategory } from '@/framework/api/get-product'
interface AddCateProps {
  visible: boolean;
  handleVisible: (a: boolean) => void;
  handleUpdate:(a: boolean)=>void
}
const AddCate = ({ visible, handleVisible,handleUpdate }: AddCateProps) => {
  const navigation = useNavigate();
  const onFinish = async (values: any) => {
    console.info(values);
   let res= await saveShopCategory({storeId: '12345678',displayName:values.displayName,categoryType:values.type==='0'?'MANUAL':'RULE_BASED'})
    console.log(res)
    if(res.saveShopCategory.id){
      handleUpdate(true)
      return true
    } else {
      return false
    }
    // navigation(`/category/category-detail/add`, { state: { addCateType: values.type } });
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
