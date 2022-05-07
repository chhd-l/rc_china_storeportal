import { Button, Form, Input, message, Select, Upload } from 'antd'
import { ADD_VIDEO_FORM } from './modules/form'
import { useNavigate } from 'react-router'
import { ContentContainer, InfoContainer } from '@/components/ui'
import { createMedia } from '@/framework/api/wechatSetting'
import React from 'react'

const AddAccount = () => {
  const navigator = useNavigate()
  const [form] = Form.useForm()

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues)
  }

  const addVideoAsset = async (values: any) => {
    console.log(values)
    const res = await createMedia({
      type: 'video',
      url: values.url,
      fileExtension: 'mp4',
      title: values.title,
      description: values.description,
    })
    if (res) {
      navigator('/assets-management')
    }
  }

  const uploadProps = {
    name: 'file',
    action: 'https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange: async (info: any) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        console.log('success', info.file.response)
        message.success(`${info.file.name} file uploaded successfully`)
        form.setFieldsValue({ url: info.file.response.url })
        // await createMedia({ type: 'video', url: info.file.response.url, fileExtension: 'mp4' })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">add Video</div>
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
                <Upload {...uploadProps}>
                  <Button className="flex items-center">
                    <span className="iconfont icon-a-bianzu67beifen3 mr-2 text-xl" />
                    Upload Local File
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
                navigator('/assets-management')
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" danger>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}
export default AddAccount
