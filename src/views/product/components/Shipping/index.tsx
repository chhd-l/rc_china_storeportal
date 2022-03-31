import { Form, Input, Row, Col } from "antd";
export default (props: any) => (
  <div>
    <Form.Item label="Weight" name={[props.field.name, "weight"]}>
      <Input addonAfter="kg" />
    </Form.Item>
        <Row>
          <Col span={12}>
          <Form.Item  label="Parcel Size" labelCol={{span:10}} wrapperCol={{span:12}} name={[props.field.name, "width"]}>
          <Input addonAfter="cm" />
         
        </Form.Item></Col>
      <Col span={5}>
        <Form.Item label="" wrapperCol={{span:20}} name={[props.field.name, "length"]}>
          <Input addonAfter="cm" />
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="" wrapperCol={{span:20}} name={[props.field.name, "height"]}>
          <Input addonAfter="cm" />
        </Form.Item>
      </Col>
    </Row>
   
  </div>
);
