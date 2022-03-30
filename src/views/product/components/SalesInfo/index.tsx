import FormItem from "../../../../components/common/FormItem"
import { Form, Input, Button, Space, Col, Row } from "antd"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
const noSkuForm = [
  {
    options: [{ name: 'size', value: 'size' }],
    name: 'subscription',
    label: 'Subscription',
    type: 'select',
    rules: [{ required: true }]
  }, {
    type: 'input',
    addonBefore: '¥',
    label: 'List Price',
    name: 'listPrice',
    rules: [{ required: true }]
  }, {
    type: 'input',
    addonBefore: '¥',
    label: 'Marketing Price',
    name: 'marketingPrice',
    rules: [{ required: true }]

  }, {
    type: 'input',
    addonBefore: '¥',
    label: 'Subscription Price',
    name: 'subscriptionPrice',
    rules: [{ required: true }]

  }, {
    type: 'input',
    label: 'Stock',
    name: 'stock',
    rules: [{ required: true }]

  }, {
    type: 'input',
    label: 'Feeding Days',
    name: 'feedingDays',
    rules: [{ required: true }]

  }, {
    type: 'input',
    label: 'Support 100',
    name: 'support100',
    rules: [{ required: true }]

  },
]
export default (props: any) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }
  return <div>
    <Form.List name="specifications">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, ...parentField }, idx) => (
            <Space key={key} direction="vertical" style={{ display: 'flex', marginBottom: 8 }} >
              {/* <div className="flex"> */}
              <Row>
                <Col span={layout.labelCol.span.toString()} className="text-right"><div className="ant-form-item-label">
                  <label>{`Variations${idx}`}</label> 
                  {/* <label>Name</label> */}
                </div></Col>
                <Col className="bg-gray-100 pt-4" span={layout.wrapperCol.span.toString()}>
                  <Row className="pt-4">
                    <Col span="2">
                    </Col>
                    <Col span="19">
                      <Form.Item wrapperCol={{ span: 16 }} labelCol={{ span: 7 }}
                        {...parentField}
                        name={[props.field.name, parentField.name, 'variation']}
                        label="Name"
                        // label={`Variations${idx}`}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                    </Col>
                    {/* <Col span="3">
                      <MinusCircleOutlined onClick={() => remove(name)} />
                      </Col> */}
                  </Row>
                  <Form.List name="specification">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }, idx) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} direction="vertical">
                            <Row>
                              <Col span="2">
                              </Col>
                              <Col span="19">
                                <Form.Item wrapperCol={{ span: 16 }} labelCol={{ span: 7 }}
                                  {...restField}
                                  name={[props.field.name, parentField.name, name, 'option']}
                                  label="options"
                                >
                                  <Input placeholder="options" />
                                </Form.Item>
                              </Col>
                              <Col span="3">
                                <MinusCircleOutlined onClick={() => remove(name)} /></Col>
                            </Row>
                          </Space>
                        ))}
                        <Row>
                          <Col span="2">
                          </Col>
                          <Col span="19">
                            <Row>
                              <Col span="7">
                              </Col>

                              <Col span="16">
                                <Form.Item wrapperCol={{ span: 24 }} >
                                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                  </Button>
                                </Form.Item>
                              </Col>
                            </Row>

                          </Col>
                        </Row>

                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </Space>
          ))}
          <Form.Item label="Variations"  {...layout}>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Enable variations
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    {/* <FormItem {...props} parentName={[props.field.name]} list={noSkuForm} layout={layout} /> */}
  </div>
}