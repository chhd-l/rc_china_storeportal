import FormItem from "@/components/common/FormItem";
import { Form, Input, Button, Space, Col, Row } from "antd";
import type { FormProps } from '@/framework/types/product'
import type {InputTextProps,InputSelectProps} from '@/framework/types/common'
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
const noSkuForm:(InputTextProps|InputSelectProps)[] = [
  {
    options: [{ name: "size", value: "size" }],
    name: "subscription",
    label: "Subscription",
    type: "select",
    rules: [{ required: true }],
  },
  {
    type: "input",
    addonBefore: "¥",
    label: "List Price",
    name: "listPrice",
    rules: [{ required: true }],
  },
  {
    type: "input",
    addonBefore: "¥",
    label: "Marketing Price",
    name: "marketingPrice",
    rules: [{ required: true }],
  },
  {
    type: "input",
    addonBefore: "¥",
    label: "Subscription Price",
    name: "subscriptionPrice",
    rules: [{ required: true }],
  },
  {
    type: "input",
    label: "Stock",
    name: "stock",
    rules: [{ required: true }],
  },
  {
    type: "input",
    label: "Feeding Days",
    name: "feedingDays",
    rules: [{ required: true }],
  },
  {
    type: "input",
    label: "Support 100",
    name: "support100",
    rules: [{ required: true }],
  },
];
const SalesInfo = (props: FormProps) => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  return (
    <div>
      <Form.List
        name={"variationList"}
      >
        {(variations, { add: addVariations, remove: removeVariations }) => (
          <>
            {variations.map((variation, idx) => (
              <Space
                key={variation.key}
                direction="vertical"
                style={{ display: "flex", marginBottom: 8 }}
              >
                {/* <div className="flex"> */}
                <Form.List
                  {...variation}
                  initialValue={[{
                    option: '',name:''
                 }]}
                  name={[variation.name, "specificationList"]}
                >
                  {(
                    specifications,
                    { add: addSpecification, remove: removeSpecification }
                  ) => (
                    <>
                      <Row>
                        <Col
                          span={layout.labelCol.span.toString()}
                          className="text-right"
                        >
                          <div className="ant-form-item-label">
                            <label>{`Variations${idx}`}</label>
                            {/* <label>Name</label> */}
                          </div>
                        </Col>
                        <Col
                          className="bg-gray-100 pt-4"
                          span={layout.wrapperCol.span.toString()}
                        >
                          <>
                            {/* <Row className="pt-4" >
                              <Col span="2"></Col>
                              <Col span="19">
                                <Form.Item
                                  wrapperCol={{ span: 16 }}
                                  labelCol={{ span: 7 }}
                                  {...variation}
                                  name={[variation.name, "name"]}
                                  label="Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing first name",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Name" />
                                </Form.Item>
                              </Col>
                            </Row> */}
                            {specifications.map(
                              (specification, specificationIdx) => (
                                <Space
                                  key={specification.key}
                                  style={{ display: "flex", marginBottom: 8 }}
                                  direction="vertical"
                                >

                                  <Row>
                                    <Col span="2"></Col>
                                    <Col span="19">
                                      <Form.Item
                                        wrapperCol={{ span: 16 }}
                                        labelCol={{ span: 7 }}
                                        {...specification}
                                        rules={[{ required: specificationIdx===0, message: 'Missing name' }]}
                                        name={[specification.name, specificationIdx===0?"name":'option']}
                                        label="options"
                                      >
                                        <Input placeholder="options" />
                                      </Form.Item>
                                    </Col>
                                    <Col span="3">
                                      {specificationIdx > 0 && <MinusCircleOutlined
                                        onClick={() =>
                                          removeSpecification(
                                            specification.name
                                          )
                                        }
                                      />}
                                    </Col>
                                  </Row>
                                </Space>
                              )
                            )}
                          </>
                          <Row>
                            <Col span="2"></Col>
                            <Col span="19">
                              <Row>
                                <Col span="7"></Col>
                                <Col span="16">
                                  <Form.Item wrapperCol={{ span: 24 }}>
                                    <Button
                                      type="dashed"
                                      onClick={() =>
                                        addSpecification()
                                      }
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Add field
                                    </Button>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  )}
                </Form.List>
              </Space>
            ))}
            <Form.Item className="mt-4" label="Variations" {...layout}>
              <Button
                type="dashed"
                onClick={() => addVariations()}
                block
                icon={<PlusOutlined />}
              >
                Enable variations
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <FormItem {...props} parentName={[props.field.name]} list={noSkuForm} layout={layout} />
    </div>
  );
};

export default  SalesInfo