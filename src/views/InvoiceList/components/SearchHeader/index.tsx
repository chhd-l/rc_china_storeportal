import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'

const { Option } = Select
const { RangePicker } = DatePicker

const SearchHeader = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      className="bg-white px-[24px] pb-[24px] mb-[24px]"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row justify="start" style={{ width: '100%' }} gutter={[0, 14]}>
        <Col span={11}>
          <Form.Item label="Order Number" name="username">
            <Input placeholder="Input" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Application Period" name="password">
            <RangePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Invoice Type" name="username">
            <Select placeholder="Choose Invoice Type" allowClear>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Invoice Title" name="password">
            <Input placeholder="Input" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Button className="ml-[17%]" type="primary" htmlType="submit">
              Search
            </Button>
            <Button className="ml-[16px]">Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchHeader
