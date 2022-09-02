import React, { useContext, forwardRef } from 'react';
import { Form, Input } from 'antd';
import { GraphicContext, getCurrentArticleById } from "../context";
import MyEditor from './editor';
import MyUpload from './upload';
import intl from 'react-intl-universal';

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
        <div className="text-xl">{intl.get('wx.add_graphic_message')}</div>
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
          <Form.Item name="title" label={intl.get('wx.title')} rules={[{required:true,message:intl.get('wx.pls_input_title')}]}>
            <Input
              style={{maxWidth: 500}}
              placeholder={intl.get('public.input')}
            />
          </Form.Item>
          <Form.Item name="author" label={intl.get('wx.author')}>
            <Input
              style={{maxWidth: 500}}
              placeholder={intl.get('public.input')}
            />
          </Form.Item>
          <Form.Item name="contentSourceURL" label={intl.get('wx.link')} rules={[{type:'url',message:intl.get('wx.pls_input_valid_url')}]}>
            <Input
              style={{maxWidth: 500}}
              placeholder={intl.get('wx.link_for_article')}
            />
          </Form.Item>
          <Form.Item name="content" label={intl.get('wx.content')} rules={[{required:true,message:intl.get('wx.pls_input_content')}]}>
            <MyEditor />
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
        <div className="mt-lg p-4">
          <div>{intl.get('wx.abstract')}</div>
          <div className="mt-2">
            <Input.TextArea
              value={article?.digest ?? ""}
              placeholder={intl.get('wx.abstract_tip')}
              onChange={(e) => onChangeFieldValue({ digest: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default NewArticle
