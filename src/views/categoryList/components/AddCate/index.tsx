import "./index.less";
import ProForm, {
  ModalForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-form";
import { useRef } from 'react'

import type { ProFormInstance } from '@ant-design/pro-form';
import { AddCateOptions } from "../../modules/constant";
import { saveShopCategory } from '@/framework/api/get-product'
import { userAtom } from '@/store/user.store'
import { useAtom } from 'jotai'
interface AddCateProps {
  visible: boolean;
  handleVisible: (a: boolean) => void;
  handleUpdate:(a: boolean)=>void
}
const AddCate = ({ visible, handleVisible,handleUpdate }: AddCateProps) => {
  const [userInfo] = useAtom(userAtom)
  const formRef = useRef<ProFormInstance>();
  const onFinish = async (values: any) => {
   let res= await saveShopCategory({
     name:userInfo?.name,
     storeId: '12345678',
     displayName:values.displayName,
     categoryType:values.type==='0'?'MANUAL':'RULE_BASED',
     isDisplay:false
   })
    if(res.saveShopCategory.id){
      formRef?.current?.resetFields()
      handleUpdate(true)
      return true
    } else {
      return false
    }
  };
  return (
    <ModalForm
      title="Add Category"
      visible={visible}
      onFinish={onFinish}
      formRef={formRef}
      onVisibleChange={(value) => {
        handleVisible(value);
        formRef?.current?.resetFields()
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
