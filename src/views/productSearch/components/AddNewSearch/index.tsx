


import { PlusOutlined } from '@ant-design/icons';
import ProForm, { ModalForm,  ProFormDigit,  ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const AddNewSearch= () => {
  return (
    <ModalForm<{
      name: string;
      company: string;
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
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText width="md" name="id" label="
      To Search Name"  placeholder="Input"/>
      <ProFormDigit
      width="md"
      label="Priority"
      name="input-number"
      min={0}
      fieldProps={{ precision: 0 }}
/>
    </ModalForm>
  );
};


export default AddNewSearch