import { Divider } from 'antd'
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form'
import Cascader from '../Cascader'
import { ProductType } from '@/framework/types/product'
// import { detail } from '@/framework/mock/productdetail'
interface ChooseCateProps {
  handleCate: Function
  setShowCatePop: Function
  detail: any
}
const ChooseCate = ({ handleCate, setShowCatePop, detail }: ChooseCateProps) => {
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  // const layout = {
  //   labelCol: { span: 2 },
  //   wrapperCol: { span: 16 },
  // };
  // const onSearch = (value: any) => console.log(value);
  return (
    <div className='bg-gray-50  py-6 text-left'>
      <div className='bg-white py-6 px-8'>
        <div>
          <div className='font-bold text-lg'>Add a New Product</div>
          <div>Please choose the right category for your product</div>
          <Divider />
          <ProForm
            submitter={{
              // 配置按钮文本
              searchConfig: {
                submitText: 'Next',
              },
              // 配置按钮的属性
              resetButtonProps: {
                style: {
                  // 隐藏重置按钮
                  display: 'none',
                },
              },
            }}
            initialValues={detail}
            layout='horizontal'
            name='validate_other'
            onValuesChange={(_, values) => {
              // console.log(values)
            }}
            onFinish={async value => {
              console.info('....vlaue', value)
              setShowCatePop(false)
              handleCate(value)
            }}
          >
            <ProFormText
              fieldProps={{ maxLength: 120, showCount: true, placeholder: 'Please Enter' }}
              width={200}
              name='name'
              label='Product Name'
            />
            <ProFormSelect
              width={210}
              name='type'
              label='Product Type'
              valueEnum={ProductType}
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
