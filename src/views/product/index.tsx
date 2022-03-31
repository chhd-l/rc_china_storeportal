import { Anchor } from 'antd';
import BasicInfomation from './components/BasicInfomation'
import Specification from './components/Specification'
import SalesInfo from './components/SalesInfo'
import Demo from './components/Demo'
import Shipping from './components/Shipping'
import {
  Form,
  Space,
  Button,
} from 'antd';
import {EyeOutlined} from '@ant-design/icons'
import { Field } from 'rc-field-form';
const { Link } = Anchor;

const steps = [
  { title: 'Basic Infomation', anchor: 'product_basic_infomation', subTitle: '', rightSlot: <EyeOutlined /> },
  { title: 'Specification', anchor: 'product_specification', subTitle: 'Complete: 1 / 7 Fill in more attributes to boost the exposure of your product.', rightSlot: null },
  { title: 'Sales Infomation', anchor: 'product_sales_infomation', subTitle: '', rightSlot: null },
  { title: 'Shipping', anchor: 'product_shipping' , subTitle: '', rightSlot: null}
];
export default () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  // return<>
  //  <Form
  //       form={form}
  //       onFinish={onFinish}
  //       labelCol={{
  //         span: 5,
  //       }}
  //       wrapperCol={{
  //         span: 14,
  //       }}
  //       layout="horizontal"
  //       initialValues={{
  //         "product": [{
  //           fieldKey: 0,
  //           isListField: true,
  //           key: 0,
  //           name: 0,
  //         }]
  //       }}
  //     >
  //       <SalesInfo field={{name:'product'}}/>
  //       <Form.Item>
  //         <Button type="primary" htmlType="submit">
  //           Submit
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //  </>
  return <div id={steps[0].anchor} className='flex bg-gray-50 px-14 py-6 text-left'>
   
    <div className='flex-1' style={{marginRight:'130px'}}>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          "product": [{
            fieldKey: 0,
            isListField: true,
            key: 0,
            name: 0,
          }, {
            fieldKey: 1,
            isListField: true,
            key: 1,
            name: 1,
            
          }, {
            fieldKey: 2,
            isListField: true,
            key: 2,
            name: 2,
           
          }, {
            fieldKey:3,
            isListField: true,
            key:3,
            name:3
          }]
        }}
      >
        <Form.List name="product">
          {(fields) => (
            <>
              {fields.map((field, idx) => (
                <Space key={field.key} direction="vertical" className='flex mb-10'>
                  <div id={idx>0?steps[idx].anchor:'anchor-1'} className="bg-white py-6 px-8">
                    <div className=' pb-2'>
                      <div className='flex justify-between  pb-1'>
                        <div className='font-bold text-lg'>{steps[idx].title}</div>
                        <div>{steps[idx].rightSlot}</div>
                      </div>
                      <div>{steps[idx].subTitle}</div>
                    </div>
                    {idx === 0 && <BasicInfomation field={field} />}
                    {idx === 1 && <Specification field={field} />}
                    {idx === 2 && <SalesInfo field={field} />}
                    {idx === 3 && <Shipping field={field} />}
                    {/* {idx === 2 && <Demo  />} */}
                  </div>
                  {/* {idx === 0 && <div id={steps[idx].anchor}><BasicInfomation field={field} /></div>} */}
                </Space>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    <Anchor affix={false} targetOffset={64} className='w-40 fixed right-0 bottom-0' style={{top:'64px'}}>
      {steps.map(step => <Link href={`#${step.anchor}`} title={step.title} />)}
    </Anchor>
  </div>
}
