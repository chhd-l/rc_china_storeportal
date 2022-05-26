import React from 'react';
import { Form, Input } from 'antd';
import { GraphicContext, getCurrentArticleById } from '../context';
import { Asset } from '@/framework/types/wechat';
import MyUpload from './upload';

const NewVideo: React.FC = () => {
  const [form] = Form.useForm();
  const { articleList, currentArticleId, onChangeFieldValue } = React.useContext(GraphicContext);
  const article = getCurrentArticleById(articleList, currentArticleId);

  const handleUploadVideo = (asset: Partial<Asset>) => {
    onChangeFieldValue({ video: asset })
    form.setFieldsValue({ description: asset.description })
  }

  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">Add Video Message</div>
        <Form
          layout="horizontal"
          className="mt-lg p-4"
          form={form}
          labelAlign="right"
          labelCol={{span: 2}}
          wrapperCol={{span:22}}
        >          
          <Form.Item label="Title">
            <Input
              style={{maxWidth: 500}}
              placeholder="Input"
              value={article?.title}
              onChange={(e) => onChangeFieldValue({ title: e.target.value })}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item label="Content">
            <div className="flex items-center space-x-4">
            {article?.video
              ? <div><video width="320" height="240" controls>
              <source src={article.video?.video}  type="video/mp4" />
            </video></div> : null}
            <div><MyUpload value={{}} assetType="video" onChange={handleUploadVideo} /></div>
            </div>
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
      </div>
    </div>
  )
}

export default NewVideo
