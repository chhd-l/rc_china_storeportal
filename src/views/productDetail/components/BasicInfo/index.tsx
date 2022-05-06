import Upload from '@/components/common/Upload'
import Wangeditor from '@/components/common/Wangeditor'
import { Form, Input, Select } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { DetailContext } from '../../index'
import { FormProps } from '@/framework/types/common'
import { EditOutlined } from '@ant-design/icons'
import ProForm from '@ant-design/pro-form'
import { useForm } from 'antd/lib/form/Form'
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
  const { setShowCatePop, detail, ProductName } = useContext(DetailContext)
  const [form] = Form.useForm()
  const [editorHtml, setEditorHtml] = useState('')
  const [initAsserts, setInitAsserts] = useState<any>(Array(9).fill(null))
  const [videoUrl, setvideoUrl] = useState('')
  const handleEditorChange = (html: string) => {
    setEditorHtml(html)
    console.info('editorHtml', html)
  }
  const handleImgUrl = (url: string) => {
    setvideoUrl(url)
    console.info('videoUrl', videoUrl)
  }
  useEffect(() => {
    if (detail.assets) {
      let list = initAsserts.map((item: any, index: number) => {
        return detail.assets[index] || null
      })
      console.info('initAsserts', list)
      setInitAsserts(list)
    }
  }, [detail?.assets])

  useEffect(() => {
    form.setFieldsValue({
      name: ProductName,
    })
  }, [ProductName])

  return ProductName ? (
    <div className='basicinfo'>
      <Form.Item
        label='Product Image'
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 22,
        }}
      >
        <div className='text-left pl-6  flex flex-wrap'>
          {initAsserts?.map((img: any) => (
            <Upload handleImgUrl={handleImgUrl} fileList={[img]} showUploadList={false} />
          ))}
        </div>
      </Form.Item>
      <Form.Item label='Product Video' labelCol={{
        span: 2,
      }}
        wrapperCol={{
          span: 22,
        }} name='video'>
        <div className='text-left pl-6'>
          <Upload handleImgUrl={handleImgUrl} showUploadList={false} />
        </div>
      </Form.Item>
      <Form.Item label='SPU' name='spuNo' rules={[{ required: true, message: 'Missing SPU' }]} labelCol={{ span: 2 }} >
        <div className='text-left pl-6'>
          <Input />
        </div>
      </Form.Item>
      <Form.Item label='Product Name' name='name' rules={[{ required: true, message: 'Missing Product Name' }]} labelCol={{ span: 2 }}>
        <div className='text-left pl-6'>
          <Input showCount maxLength={120} />
        </div>
      </Form.Item>

      <Form.Item label='Product Card Name' name='cardName' labelCol={{ span: 2 }}>
        <div className='text-left pl-6'>
          <Input showCount maxLength={120} />
        </div>
      </Form.Item>
      <Form.Item
        label='Product Description'
        name='goodsDescription'
        // initialValue={detail.goodsDescription}
        rules={[{ required: true, message: 'Missing Product Description' }]}
        labelCol={{ span: 2 }}>
        <div className='text-left pl-6'>
          <Wangeditor defaultValue={detail.goodsDescription} onChange={handleEditorChange} />
        </div>
      </Form.Item>
      <Form.Item label='Category' name='category' labelCol={{ span: 4 }} rules={[{ required: true }]}>
        <div className='flex pr-6'>
          {detail.selectedCateOptions?.map((cate: any, idx: number) => (
            <div>
              {idx === 0 ? '' : '>'}
              {cate.label}
            </div>
          ))}
          <div className="text-left ml-6">
            <EditOutlined
              onClick={() => {
                setShowCatePop(true)
              }}
            />
          </div>
        </div>
        {/* <Input
         
        /> */}
      </Form.Item>
      <Form.Item label='Brand' name='brandId' labelCol={{ span: 4 }} rules={[{ required: true }]}>
        <Select placeholder='please select Brand' options={breedList} style={{ width: 195 }} />
      </Form.Item>
      <Form.Item label='Sales Status' name='salesStatus' labelCol={{ span: 4 }} rules={[{ required: true }]}>
        <Select placeholder='please select Sales Status' options={salesStatusList} style={{ width: 195 }} />
      </Form.Item>
    </div>
  ) : null
}

export default BasicInfo
