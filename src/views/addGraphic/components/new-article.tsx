import React, { useContext } from 'react';
import { Form, Input } from 'antd';
import { GraphicContext, getCurrentArticleById } from "../context";
import MyEditor from '@/components/common/Wangeditor';
import MyUpload from './upload';

const NewArticle: React.FC = () => {
  const [form] = Form.useForm();
  const { articleList, currentArticleId, onChangeFieldValue } = useContext(GraphicContext);
  const article = getCurrentArticleById(articleList, currentArticleId);

  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">Add Graphic Message</div>
        <Form
          layout="horizontal"
          className="mt-lg p-4"
          form={form}
          labelAlign="right"
          labelCol={{span: 2}}
          wrapperCol={{span:22}}
        >          
          <Form.Item label="Title" rules={[{required:true,message:"Please input title!"}]}>
            <Input
              style={{maxWidth: 500}}
              placeholder="Input"
              value={article?.title}
              onChange={(e) => onChangeFieldValue({ title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Author">
            <Input style={{maxWidth: 500}} placeholder="Input" />
          </Form.Item>
          <Form.Item label="Link">
            <Input style={{maxWidth: 500}} placeholder='Link for "Read Original Article"' />
          </Form.Item>
          <Form.Item label="Content">
            <MyEditor />
          </Form.Item>
        </Form>
      </div>
      <div className="mt-4 p-4 bg-white">
        <div className="text-xl">Cover Preview</div>
        <div className="mt-lg p-4 flex items-center">
          <div>
            <MyUpload />
          </div>
          <div className="flex-grow ml-lg text-gray-400">
            <div>Suggested Size</div>
            <div>Large Pic: 900*500(Single image or multi-image first article)</div>
            <div>Small Pic: 200*200(Below the first picture and text of multiple pictures)</div>
          </div>
        </div>
        <div className="mt-lg p-4">
          <div>Abstract</div>
          <div className="mt-2"><Input.TextArea /></div>
        </div>
      </div>
    </div>
  )
}

export default NewArticle
