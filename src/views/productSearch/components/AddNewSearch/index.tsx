


import { hotSearchCreate } from '@/framework/api/get-product';
import { PlusOutlined } from '@ant-design/icons';
import  { ModalForm,  ProFormDigit,  ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type AddNewSearchProps={
  refreshTable:()=>void
}
const AddNewSearch= ({refreshTable}:AddNewSearchProps) => {
  return (
    <ModalForm<{
      topName: string;
      priority: number;
    }>
    width={322}
      title="Add New Top Search"
      trigger={
        <Button key="button" icon={<PlusOutlined />} type="primary">
          Add
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
        okText:'Confirm'
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await hotSearchCreate({...values,storeId:'12345678',status:true});
        console.log(values);
        message.success({ className: 'rc-message', content: 'Operation success' })
        refreshTable()
        return true;
      }}
    >
      <ProFormText width="md" name="topName" label="
      To Search Name"  placeholder="Input"/>
      <ProFormDigit
      width="md"
      label="Priority"
      name="priority"
      min={0}
      fieldProps={{ precision: 0 }}
/>
    </ModalForm>
  );
};


export default AddNewSearch