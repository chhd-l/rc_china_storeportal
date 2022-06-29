import { Button, Divider } from 'antd'
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form'
import Cascader from '../Cascader'
import { ProductType } from '@/framework/types/product'
import './style.less'
import { useEffect, useState } from 'react'
import { setActiveWxMenu } from '@/views/menuManageDetail/context'
// import { detail } from '@/framework/mock/productdetail'
interface ChooseCateProps {
  handleCate: Function
  setShowCatePop: Function
  detail: any
  setProductName: Function
  setSpuType: Function
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const ChooseCate = ({ handleCate, setShowCatePop, detail, setProductName, setSpuType }: ChooseCateProps) => {
  const [disableType, setDisableType] = useState(false)
  const [activeBtn, setActiveBtn] = useState(false)
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  // const layout = {
  //   labelCol: { span: 2 },
  //   wrapperCol: { span: 16 },
  // };
  // const onSearch = (value: any) => console.log(value);
  useEffect(() => {
    if (detail?.type) {
      setDisableType(true)
      setActiveBtn(true)
    }
  }, [])
  return (
    <div className='bg-gray-50  pb-6 px-20 text-left addProduct'>
      <div className='bg-white py-6 px-8'>
        <div>
          <div className='font-black text-lg'>Add a New Product</div>
          <div>Please choose the right category for your product</div>
          <Divider />
          <ProForm
            submitter={{
              render: (props, doms) => {
                console.log(props)
                return [
                  <Button
                    type='primary'
                    className={`pramry ${activeBtn ? '' : 'opacity-50'}`}
                    key='submit'
                    onClick={() => {
                      if (activeBtn) {
                        props.form?.submit?.()
                      }
                    }}
                  >
                    Next
                  </Button>,
                ]
              },
              // 配置按钮文本
              // searchConfig: {
              //   submitText: 'Next',
              // },
              // // 配置按钮的属性
              // resetButtonProps: {
              //   style: {
              //     // 隐藏重置按钮
              //     display: 'none',
              //   },
              // },
            }}
            initialValues={detail}
            layout='horizontal'
            name='validate_other'
            onValuesChange={(_, values) => {
              console.log(_, values)
              if (values.name && values.type && values.cateId) {
                //都填了
                if (values.cateId.length === 3) {
                  setActiveBtn(true)
                } else {
                  setActiveBtn(false)
                }
              } else {
                setActiveBtn(false)
              }
            }}
            onFinish={async value => {
              detail.spuType = value.type
              setProductName(value.name || '')
              setSpuType(value.type)
              setShowCatePop(false)
              setTimeout(()=>{
                console.info('setFirstInllllllllll',document.getElementsByClassName('upload-list-wrap'))
                //@ts-ignore
                document.getElementsByClassName('upload-list-wrap')?.[0]?.click()
              },1000)
              handleCate(value)
            }}
          >
            <ProFormText
              fieldProps={{ maxLength: 120, showCount: true, placeholder: 'Please Enter' }}
              name='name'
              rules={[{ required: true, message: 'Product Name required' }]}
              // required={true}
              label='Product Name'
            />
            <ProFormSelect
              width={200}
              name='type'
              disabled={disableType}
              rules={[{ required: true, message: 'Product Type required' }]}
              // required={true}
              label='Product Type'
              valueEnum={{
                REGULAR: 'Regular',
                BUNDLE: 'Bundle',
              }}
              placeholder='Please select'
            />
            <div>
              <Cascader />
            </div>
          </ProForm>
        </div>
      </div>
    </div>
  )
}
export default ChooseCate
