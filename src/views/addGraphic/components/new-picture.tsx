import React from 'react';
import { Form, Input } from 'antd';
import { GraphicContext, getCurrentArticleById } from '../context';
import { Asset } from '@/framework/types/wechat';
import MyUpload from './upload';
import intl from 'react-intl-universal';

const NewPicture = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const { articleList, currentArticleId, onChangeFieldValue } = React.useContext(GraphicContext);
  const article = getCurrentArticleById(articleList, currentArticleId);

  React.useImperativeHandle(ref, () => ({ form }));

  const formValueChange = (changedValue: any) => {
    onChangeFieldValue(changedValue);
  }

  const handleUploadPicture = (asset: Partial<Asset>, idx: number) => {
    const imageList = (article?.imageList || []).map((image, index) => {
      if (idx === index) {
        return asset;
      } else {
        return image;
      }
    });
    onChangeFieldValue({ imageList: imageList });
  }

  const handleAddPicture = (asset: Partial<Asset>) => {
    const imageList = (article?.imageList || []);
    imageList.push(asset);
    onChangeFieldValue({ imageList: imageList });
  }

  if(article?.content){
    var srcReg = /https:[\'\"]?([^\'\"]*)[\']?/gi;//获取所有src的正则表达式
    var arr2 = article?.content.match(srcReg);//arr2 为包含所有src标签的数组
    console.log(arr2)
    article.imageList=arr2?.map((item=> {
      return{
        picture:item
      }
    }))
  }

  return (
    <div>
      <div className="p-4 bg-white">
        <div className="text-xl">{intl.get('wx.add_picture_message')}</div>
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
          <Form.Item label={intl.get('wx.content')}>
            <div className="flex items-center space-x-4">
            {(article?.imageList || []).map((image, idx) => (
              <div key={idx}><MyUpload value={image ?? {}} assetType="image" onChange={(asset) => handleUploadPicture(asset, idx)} /></div>
            ))}
            {(article?.imageList || []).length < 9
              ? <div><MyUpload value={{}} assetType="image" onChange={(asset) => handleAddPicture(asset)} /></div>
              : null}
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

export default NewPicture
