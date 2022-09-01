import { Button, Form, Input, message, Select, Upload } from 'antd'
import { ADD_VIDEO_FORM } from './modules/form'
import { useNavigate } from 'react-router'
import { ContentContainer, InfoContainer } from '@/components/ui'
import { createMedia } from '@/framework/api/wechatSetting'
import React, { useState } from 'react'
import { UPLOAD_API_URL } from '@/framework/api/fetcher'
import intl from 'react-intl-universal'

const AddAccount = () => {
  const navigator = useNavigate()
  const [form] = Form.useForm()
  const [fileExtension,setFileExtension]=useState('mp4')

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues)
  }

  const addVideoAsset = async (values: any) => {
    console.log(values)
    const res = await createMedia({
      type: 'video',
      url: values.url,
      fileExtension: fileExtension,
      title: values.title,
      description: values.description,
    })
    if (res) {
      navigator('/assets/assets-management', { state: 'video' })
    }
  }

  const uploadProps = {
    name: 'file',
    accept: 'video/*',
    action: UPLOAD_API_URL,
    headers: {
      authorization: 'authorization-text',
    },
    onChange: async (info: any) => {
      const { file } = info
      const { name } = file
      console.log('upload file', file)
      if (file.status === 'done') {
        message.success({ className: 'rc-message', content: `${name} ${intl.get('public.file_upload_success')}` })
        form.setFieldsValue({ url: file.response.url })
        setFileExtension(name.substr(name.lastIndexOf('.') + 1))
      } else if (file.status === 'error') {
        message.error({ className: 'rc-message', content: `${name} ${intl.get('public.file_upload_failed')}` })
      }
    },
  }

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">{intl.get('wx.add_video')}</div>
        <Form
          onValuesChange={formValuesChange}
          onFinish={addVideoAsset}
          autoComplete="off"
          className="w-3/4"
          form={form}
        >
          {ADD_VIDEO_FORM.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={item.rules}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              key={item.name}
            >
              {item.type === 'upload' ? (
                <Upload {...uploadProps} className="w-full">
                  <Button className="flex items-center justify-between w-full">
                    <span>{intl.get('wx.select_file')}</span>
                    <span className="iconfont icon-a-bianzu67beifen3 mr-2 text-xl" />
                  </Button>
                </Upload>
              ) : (
                <Input placeholder={item.placeholder} />
              )}
            </Form.Item>
          ))}
          <Form.Item className="w-full flex flex-row justify-end" wrapperCol={{ span: 8 }}>
            <Button
              danger
              className="mr-4"
              onClick={() => {
                navigator('/assets/assets-management', { state: 'video' })
              }}
            >
              {intl.get('public.cancel')}
            </Button>
            <Button type="primary" htmlType="submit" danger>
              {intl.get('public.confirm')}
            </Button>
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}
export default AddAccount
