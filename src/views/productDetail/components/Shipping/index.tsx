import { Form, Input, Row, Col } from 'antd'
import { FormProps } from '@/framework/types/common'
import './index.less'

const Shipping = ({ field }: FormProps) => (
  <div className='shipping'>
    {/* test */}
    <Form.Item
      label='Weight'
      name='weight'
      className='tips-wrap'
      labelCol={{ span: 4 }}
      data-tips={`Product Weight:
<p>Should input the weight when the product is ready to ship, meaning product weight + package weight.</p>`}
    >
      <Input placeholder='Input' addonAfter='kg' />
    </Form.Item>
    <Row
      className='tips-wrap'
      data-tips={`Parcel Size:
<p>Should input the parcel size not the product size, so that the system can calculate the pick-up car accurately.</p>`}
    >
      <Col span={12}>
        <Form.Item label='Parcel Size' labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} name='width'>
          <Input placeholder='W(Integer)' addonAfter='cm' />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label='' wrapperCol={{ span: 20 }} name='length'>
          <Input placeholder='L(Integer)' addonAfter='cm' />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label='' wrapperCol={{ span: 20 }} name='height'>
          <Input placeholder='H(Integer)' addonAfter='cm' />
        </Form.Item>
      </Col>
    </Row>
  </div>
)
export default Shipping
