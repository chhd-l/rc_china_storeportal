import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import moment from 'moment'

const { Option } = Select
const { RangePicker } = DatePicker

const SearchHeader = ({ setBody, getList, body }: { setBody: Function; getList: Function; body: any }) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    for (const key in values) {
      if (!values[key]) {
        delete values[key]
      }
    }
    if (values.time) {
      values.addStartTime = moment(values.time[0]).utc()
      values.addEndTime = moment(values.time[1]).utc()
      delete values.time
    }
    if (body?.invoiceStatus) values.invoiceStatus = body.invoiceStatus
    setBody(values)
    getList(values)
  }

  const onReset = () => {
    form.resetFields()
    setBody({})
    getList({})
  }

  return (
    <Form
      name="basic"
      form={form}
      className="bg-white px-[24px] pb-[24px] mb-[24px]"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 12 }}
      onFinish={onFinish}
    >
      <Row justify="start" style={{ width: '100%' }} gutter={[0, 14]}>
        <Col span={11}>
          <Form.Item label="Order Number" name="orderNum">
            <Input placeholder="Input" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Application Period" name="time">
            <RangePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Invoice Type" name="invoiceType">
            <Select placeholder="Choose Invoice Type" allowClear>
              <Option value="增值税电子普通发票">增值税电子普通发票</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Invoice Title" name="invoiceTitle">
            <Input placeholder="Input" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Button className="ml-[17%]" type="primary" htmlType="submit">
              Search
            </Button>
            <Button className="ml-[16px]" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchHeader
