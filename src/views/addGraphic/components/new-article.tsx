import React, { useContext, forwardRef } from 'react';
import { Form, Input } from 'antd';
import { GraphicContext, getCurrentArticleById } from "../context";
import MyEditor from './editor';
import MyUpload from './upload';

const NewArticle = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const { articleList, currentArticleId, onChangeFieldValue } = useContext(GraphicContext);
  const article = getCurrentArticleById(articleList, currentArticleId);

  React.useImperativeHandle(ref, () => ({ form }));

  const formValueChange = (changedValue: any) => {
    onChangeFieldValue(changedValue);
  }

  React.useEffect(() => {
    form.setFieldsValue({ content: article?.content ?? "" })
  }, []);
  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">Add Graphic Message</div>
        <Form
          layout="horizontal"
          className="mt-lg p-4"
          form={form}
          initialValues={{title: article?.title, author: article?.author, contentSourceURL: article?.contentSourceURL, content: article?.content}}
          labelAlign="right"
          labelCol={{span: 2}}
          wrapperCol={{span:22}}
          onValuesChange={formValueChange}
        >          
          <Form.Item name="title" label="Title" rules={[{required:true,message:"Please input title!"}]}>
            <Input
              style={{maxWidth: 500}}
              placeholder="Input"
            />
          </Form.Item>
          <Form.Item name="author" label="Author">
            <Input
              style={{maxWidth: 500}}
              placeholder="Input"
            />
          </Form.Item>
          <Form.Item name="contentSourceURL" label="Link">
            <Input
              style={{maxWidth: 500}}
              placeholder='Link for "Read Original Article"'
            />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{required:true,message:"Please input content!"}]}>
            <MyEditor />
          </Form.Item>
        </Form>
      </div>
      <div className="mt-4 p-4 bg-white">
        <div className="text-xl">Cover Preview</div>
        <div className="mt-lg p-4 flex items-center">
          <div>
            <MyUpload value={article?.thumbMedia ?? {}} assetType="image" onChange={(asset) => onChangeFieldValue({ thumbMedia: asset })} />
          </div>
          <div className="flex-grow ml-lg text-gray-400">
            <div>Suggested Size</div>
            <div>Large Pic: 900*500(Single image or multi-image first article)</div>
            <div>Small Pic: 200*200(Below the first picture and text of multiple pictures)</div>
          </div>
        </div>
        <div className="mt-lg p-4">
          <div>Abstract</div>
          <div className="mt-2">
            <Input.TextArea
              value={article?.digest ?? ""}
              placeholder="Abstrac (optional, if not filled, the first line of 45 words will be grabbed by default)"
              onChange={(e) => onChangeFieldValue({ digest: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default NewArticle
