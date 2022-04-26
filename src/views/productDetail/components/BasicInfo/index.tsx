import Upload from '@/components/common/Upload'
import Wangeditor from '@/components/common/Wangeditor'
import { Form, Input, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { DetailContext } from '../../index'
import { FormProps } from '@/framework/types/common'
const breedList = [
  { name: 'breed1', value: 'breed1' },
  { name: 'breed2', value: 'breed2' },
]

const salesStatusList = [
  { value: 'Saleable', name: true },
  { value: 'Not saleable', name: false },
]
const BasicInfo = ({ field }: FormProps) => {
  // const [form] = Form.useForm();
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  const { setShowCatePop, detail } = useContext(DetailContext)
  const [editorHtml, setEditorHtml] = useState('')
  const [videoUrl, setvideoUrl] = useState('')
  const handleEditorChange = (html: string) => {
    setEditorHtml(html)
    console.info('editorHtml', editorHtml)
  }
  const handleImgUrl = (url: string) => {
    setvideoUrl(url)
    console.info('videoUrl', videoUrl)
  }

  return (
    <>
      <Form.Item label='Product Image' name='assets'>
        <div className='text-left'>
          <Upload handleImgUrl={handleImgUrl} showUploadList={false} />
        </div>
      </Form.Item>
      <Form.Item label='Product Video' name='video'>
        <div className='text-left'>
          <Upload handleImgUrl={handleImgUrl} showUploadList={false} />
        </div>
      </Form.Item>
      <Form.Item label='SPU' name='spuNo' rules={[{ required: true, message: 'Missing SPU' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Product Name' name='name' rules={[{ required: true, message: 'Missing Product Name' }]}>
        <Input showCount maxLength={120} />
      </Form.Item>

      <Form.Item label='Product Card Name' name='cardName'>
        <Input showCount maxLength={120} />
      </Form.Item>
      <Form.Item
        label='Product Description'
        name='description'
        // initialValue={detail.description}
        rules={[{ required: true, message: 'Missing Product Description' }]}
      >
        <Wangeditor defaultValue={detail.description} onChange={handleEditorChange} />
      </Form.Item>
      <Form.Item label='Category' name='category'>
        <Input
          onClick={() => {
            setShowCatePop(true)
          }}
        />
      </Form.Item>
      <Form.Item label='Brand' name='brand'>
        <Select placeholder='please select Brand' options={breedList} />
      </Form.Item>
      <Form.Item label='Sales Status' name='salesStatus'>
        <Select placeholder='please select Sales Status' options={salesStatusList} />
      </Form.Item>
    </>
  )
}

export default BasicInfo
