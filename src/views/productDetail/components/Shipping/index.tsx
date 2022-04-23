import { Form, Input, Row, Col } from 'antd'
import type { FormProps } from '@/framework/types/common'

const Shipping = ({ field }: FormProps) => (
  <div>
    {/* test */}
    <Form.Item label="Weight" name="weight">
      <Input placeholder="please input" addonAfter="kg" />
    </Form.Item>
    <Row>
      <Col span={12}>
        <Form.Item label="Parcel Size" labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} name="width">
          <Input placeholder="please input" addonAfter="cm" />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="" wrapperCol={{ span: 20 }} name="length">
          <Input placeholder="please input" addonAfter="cm" />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="" wrapperCol={{ span: 20 }} name="height">
          <Input placeholder="please input" addonAfter="cm" />
        </Form.Item>
      </Col>
    </Row>
  </div>
)
export default Shipping
