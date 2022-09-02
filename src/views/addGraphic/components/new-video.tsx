import React from 'react';
import { Form, Input } from 'antd';
import { GraphicContext, getCurrentArticleById } from '../context';
import { Asset } from '@/framework/types/wechat';
import MyUpload from './upload';
import intl from 'react-intl-universal';

const NewVideo = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const { articleList, currentArticleId, onChangeFieldValue } = React.useContext(GraphicContext);
  const article = getCurrentArticleById(articleList, currentArticleId);

  React.useImperativeHandle(ref, () => ({ form }));

  const formValueChange = (changedValue: any) => {
    onChangeFieldValue(changedValue);
  }

  const handleUploadVideo = (asset: Partial<Asset>) => {
    onChangeFieldValue({ video: asset })
    form.setFieldsValue({ description: asset.description })
  }

  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">{intl.get('wx.add_video_message')}</div>
        <Form
          layout="horizontal"
          className="mt-lg p-4"
          form={form}
          labelAlign="right"
          labelCol={{span: 2}}
          wrapperCol={{span:22}}
          onValuesChange={formValueChange}
          initialValues={{title: article?.title}}
        >          
          <Form.Item name="title" label={intl.get('wx.title')}>
            <Input
              style={{maxWidth: 500}}
              placeholder={intl.get('public.input')}
            />
          </Form.Item>
          <Form.Item name="description" label={intl.get('wx.description')}>
            <Input />
          </Form.Item>
          <Form.Item label={intl.get('wx.content')}>
            <div className="flex items-center space-x-4">
            {article?.video
              ? <div key={article?.video?.assetId ?? 'newvideo'}><video width="320" height="240" controls>
              <source src={article.video?.video} />
            </video></div> : null}
            <div><MyUpload value={{}} assetType="video" onChange={handleUploadVideo} /></div>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-4 p-4 bg-white">
        <div className="text-xl">{intl.get('wx.cover_preview')}</div>
        <div className="mt-lg p-4 flex items-center">
          <div>
            <MyUpload value={article?.thumbMedia ?? {}} assetType="image" onChange={(asset) => onChangeFieldValue({ thumbMedia: asset })} />
          </div>
          <div className="flex-grow ml-lg text-gray-400">
            <div>{intl.get('wx.suggest_size')}</div>
            <div>{intl.get('wx.large_pic_size')}</div>
            <div>{intl.get('wx.small_pic_size')}</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default NewVideo
