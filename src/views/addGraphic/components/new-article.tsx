import React from 'react';
import { Form, Input } from 'antd';

const NewArticle: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">Add Graphic Message</div>
        <Form
          layout="horizontal"
          className="mt-lg"
          form={form}
          labelAlign="right"
          labelCol={{span: 4}}
          wrapperCol={{span:20}}
        >
          

        </Form>
      </div>
      <div className="mt-4 p-4 bg-white">
        <div className="text-xl">Cover Preview</div>
      </div>
    </div>
  )
}

export default NewArticle
