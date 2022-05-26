import React from 'react';
import { Form, Input } from 'antd';
import MyUpload from './upload';

const NewVideo: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">Add Picture Message</div>
        <Form
          layout="horizontal"
          className="mt-lg p-4"
          form={form}
          labelAlign="right"
          labelCol={{span: 2}}
          wrapperCol={{span:22}}
        >          
          <Form.Item label="Title">
            <Input style={{maxWidth: 500}} placeholder="Input" />
          </Form.Item>
          <Form.Item label="Description">
            <Input style={{maxWidth: 500}} placeholder="Input" />
          </Form.Item>
          <Form.Item label="Content">
            {/* <MyUpload /> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default NewVideo
