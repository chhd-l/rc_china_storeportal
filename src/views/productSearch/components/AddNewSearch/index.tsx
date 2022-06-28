


import { hotSearchCreate } from '@/framework/api/get-product';
import { PlusOutlined } from '@ant-design/icons';
import  { ModalForm,  ProFormDigit,  ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';


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
        <Button key="button" type="primary" className='flex items-center'>
          <PlusOutlined />
          Add
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        okText:'Confirm',
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await hotSearchCreate({...values,storeId:'12345678',status:true});
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
      initialValue={0}
/>
    </ModalForm>
  );
};


export default AddNewSearch