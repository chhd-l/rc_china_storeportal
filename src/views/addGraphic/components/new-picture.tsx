import React from 'react';
import { Form, Input } from 'antd';
import MyUpload from './upload';

const NewPicture: React.FC = () => {
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
          <Form.Item label="Content">
            {/* <MyUpload /> */}
          </Form.Item>
        </Form>
      </div>
      <div className="mt-4 p-4 bg-white">
        <div className="text-xl">Cover Preview</div>
        <div className="mt-lg p-4 flex items-center">
          <div>
            {/* <MyUpload /> */}
          </div>
          <div className="flex-grow ml-lg text-gray-400">
            <div>Suggested Size</div>
            <div>Large Pic: 900*500(Single image or multi-image first article)</div>
            <div>Small Pic: 200*200(Below the first picture and text of multiple pictures)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPicture
