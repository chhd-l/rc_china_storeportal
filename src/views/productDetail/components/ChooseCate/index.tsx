import { Divider } from 'antd'
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form'
import Cascader from '../Cascader'
import { ProductType } from '@/framework/types/product'
import "./style.less"
// import { detail } from '@/framework/mock/productdetail'
interface ChooseCateProps {
  handleCate: Function
  setShowCatePop: Function
  detail: any
  setProductName: Function
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const ChooseCate = ({ handleCate, setShowCatePop, detail, setProductName }: ChooseCateProps) => {
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  // const layout = {
  //   labelCol: { span: 2 },
  //   wrapperCol: { span: 16 },
  // };
  // const onSearch = (value: any) => console.log(value);
  return (
    <div className='bg-gray-50  py-6 px-20 text-left addProduct'>
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
              setProductName(value.name || '')
              setShowCatePop(false)
              handleCate(value)
            }}
          >
            <ProFormText
              fieldProps={{ maxLength: 120, showCount: true, placeholder: 'Please Enter' }}
              name='name'
              required={true}
              label='Product Name'
            />
            <ProFormSelect
              width={200}
              name='type'
              required={true}
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
