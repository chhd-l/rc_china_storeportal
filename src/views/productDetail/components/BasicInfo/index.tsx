import Upload from '@/components/common/Upload'
import Wangeditor from '@/components/common/Wangeditor'
import { Form, Input, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { DetailContext } from '../../index'
import { FormProps } from '@/framework/types/common'
import { EditOutlined } from '@ant-design/icons'
const breedList = [
  { name: 'B1', value: 'B1', label: 'Royal Canin' },
  { name: 'B2', value: 'B2', label: 'Royal Canin Sub' },
]
const salesStatusList = [
  { label: 'Saleable', value: '1' },
  { label: 'Not saleable', value: '0' },
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
    <div className='basicinfo'>
      <Form.Item label='Product Image' name='assets'>
        <div className='text-left'>
          <Upload handleImgUrl={handleImgUrl} fileList={detail.assets} showUploadList={false} />
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
        name='goodsDescription'
        // initialValue={detail.goodsDescription}
        rules={[{ required: true, message: 'Missing Product Description' }]}
      >
        <Wangeditor defaultValue={detail.goodsDescription} onChange={handleEditorChange} />
      </Form.Item>
      <Form.Item label='Category' name='category'>
        <div className='flex'>
          {detail.selectedCateOptions?.map((cate: any, idx: number) => (
            <div>
              {idx === 0 ? '' : '>'}
              {cate.label}
            </div>
          ))}
          <EditOutlined
            onClick={() => {
              setShowCatePop(true)
            }}
          />
        </div>
        {/* <Input
         
        /> */}
      </Form.Item>
      <Form.Item label='Brand' name='brandId'>
        <Select placeholder='please select Brand' options={breedList} />
      </Form.Item>
      <Form.Item label='Sales Status' name='salesStatus'>
        <Select placeholder='please select Sales Status' options={salesStatusList} />
      </Form.Item>
    </div>
  )
}

export default BasicInfo
