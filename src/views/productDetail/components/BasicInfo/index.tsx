import Upload from '../UploadList'
import Wangeditor from '@/components/common/Wangeditor'
import { Form, Input, Select } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { DetailContext } from '../../index'
import './index.less'
import { FormProps } from '@/framework/types/common'
import { EditOutlined } from '@ant-design/icons'
import ProForm from '@ant-design/pro-form'
import { useForm } from 'antd/lib/form/Form'
import { getBrands } from '@/framework/api/wechatSetting'
interface uploadHandleProps {
  url: string
  idx: number
  type: string
  id?: string
}
// const breedList = [
//   { name: 'B1', value: 'B1', label: 'Royal Canin' },
//   { name: 'B2', value: 'B2', label: 'Royal Canin Sub' },
// ]
const salesStatusList = [
  { label: 'Saleable', value: '1' },
  { label: 'Not saleable', value: '0' },
]
const BasicInfo = ({ field, form }: FormProps) => {
  const { setShowCatePop, detail, ProductName } = useContext(DetailContext)
  // const [form] = Form.useForm()
  const [editorHtml, setEditorHtml] = useState('')
  const [brandList, setBrandList] = useState([])
  const [initAsserts, setInitAsserts] = useState<any>(Array(9).fill(null))
  const [videoUrl, setvideoUrl] = useState<uploadHandleProps | {}>({})
  // const [assetsUrl, setAssetsUrl] = useState<any>([])
  const handleEditorChange = (html: string) => {
    setEditorHtml(html)
    form.setFieldsValue({
      goodsDescription: html,
    })
    console.info('editorHtml', html)
  }
  const handleImgUrl = ({ url, idx, type, id }: uploadHandleProps) => {
    let newAssets = [...initAsserts]
    newAssets[idx] = { url, type, id }
    setInitAsserts(newAssets)
    form.setFieldsValue({
      goodsAsserts: newAssets,
    })
    console.info('setAssetsUrl', newAssets)
  }
  const handleVideoUrl = ({ url, idx, type, id }: uploadHandleProps) => {
    // setvideoUrl({ url, idx, type, id })
    // form.setFieldsValue({
    //   goodsDescription: html,
    // })
  }
  useEffect(() => {
    if (detail?.goodsAsserts) {
      let newAssets = [...initAsserts]
      detail?.goodsAsserts.forEach((img: any, idx: number) => {
        newAssets[idx] = { url: img.url, id: img.id, type: img.type || 'image', key: img.id }
      })
      setInitAsserts(newAssets)
    }
  }, [detail?.goodsAsserts])
  const getBrandList = async () => {
    let list = await getBrands('12345678')
    setBrandList(list)
  }
  useEffect(() => {
    getBrandList()
  }, [])

  useEffect(() => {
    if (ProductName) {
      form.setFieldsValue({
        name: ProductName,
      })
    }
  }, [ProductName])

  useEffect(() => {
    if (detail?.selectedCateOptions) {
      form.setFieldsValue({
        category: detail?.selectedCateOptions,
      })
    }
  }, [detail?.selectedCateOptions])
  console.info('......detaildetaildetaildetail', initAsserts)
  return (
    <div className='basicinfo'>
      <Form.Item
        label='Product Image'
        labelCol={{
          span: 3,
        }}
        name='goodsAsserts'
        className='tips-wrap'
        data-tips={`Product Image:<p>Cover photo should have 1. white background & 2. present obvious product packaging</p><p>Every photos should have fine resolution - pixel doesn't appear breaking when zooming in<p>Product image can add up to 9 photos</p>`}
        wrapperCol={{
          span: 22,
        }}
      >
        <div className='flex flex-wrap'>
          {initAsserts?.map((img: any, index: number) => (
            <Upload
              key={img?.key || `img-${index}`}
              handleImgUrl={handleImgUrl}
              idx={index}
              type='image'
              fileList={[img]}
              showUploadList={false}
            />
          ))}
        </div>
      </Form.Item>
      <Form.Item
        label='Product Video'
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 22,
        }}
        name='video'
      >
        <Upload handleImgUrl={handleVideoUrl} fileName='Cover Video' type='video' idx={0} showUploadList={false} />
      </Form.Item>
      <Form.Item
        label='SPU'
        className='tips-wrap'
        data-tips='SPU:<p>SPU should be unique and conform to coding rules.</p>'
        name='spuNo'
        rules={[{ required: true, message: 'Missing SPU' }]}
        labelCol={{ span: 3 }}
      >
        <Input className='input-radius' />
      </Form.Item>
      <Form.Item
        label='Product Name'
        name='name'
        className='tips-wrap'
        data-tips={`Product Name:<p>Briefly summarize the product</p>`}
        rules={[{ required: true, message: 'Missing Product Name' }]}
        labelCol={{ span: 3 }}
      >
        <Input data-tips='test' showCount maxLength={120} className='input-radius' />
      </Form.Item>

      <Form.Item
        label='Product Card Name'
        className='tips-wrap'
        data-tips={`Product Card Name:<p>Product Card Name should be set as the display name in the product list</p>`}
        name='cardName'
        labelCol={{ span: 3 }}
      >
        <Input showCount maxLength={120} className='input-radius' />
      </Form.Item>
      <Form.Item
        label='Product Description'
        name='goodsDescription'
        className='tips-wrap'
        data-tips={`Product Description:
        Should consist of<br/>
        1. Brand<br/>
        2. Weight<br/>
        3. Benefits<br/>
        4. Feeding advice<br/>
        5. Products Recommended<br/>
        6. Product guarantee"<br/>
        `}
        // initialValue={detail.goodsDescription}
        rules={[{ required: true, message: 'Missing Product Description' }]}
        labelCol={{ span: 3 }}
      >
        <Wangeditor defaultValue={detail.goodsDescription} onChange={handleEditorChange} />
      </Form.Item>
      <Form.Item
        className=' with-no-margin'
        label='Category'
        name='category'
        labelCol={{ span: 4 }}
        rules={[{ required: true }]}
      >
        <div className='flex pr-6'>
          {detail.selectedCateOptions?.map((cate: any, idx: number) => (
            <div>
              {idx === 0 ? '' : ` > `}
              {cate.label}
            </div>
          ))}
          <div className='text-left ml-6 flex items-center'>
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
      <Form.Item
        label='Brand'
        className=' with-no-margin'
        name='brandId'
        labelCol={{ span: 4 }}
        rules={[{ required: true }]}
      >
        <Select placeholder='Please select Brand' options={brandList} style={{ width: 195 }} className='input-radius' />
      </Form.Item>
      <Form.Item
        label='Sales Status'
        className='tips-wrap with-no-margin'
        data-tips={`Sales Status:
<p>Products that need to be displayed and sold in the store should be set to Y</p>
<p>Products that are not displayed and sold in the mall should be set to N</p>
`}
        name='salesStatus'
        labelCol={{ span: 4 }}
        rules={[{ required: true }]}
      >
        <Select
          placeholder='Please select Sales Status'
          options={salesStatusList}
          style={{ width: 195 }}
          className='input-radius'
        />
      </Form.Item>
    </div>
  )
}

export default BasicInfo
