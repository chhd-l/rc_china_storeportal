import "./index.less";
import { Form, Input, Button, Space, Col, Row, FormInstance } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useForceUpdate from "use-force-update";
import { cloneDeep } from "lodash";
import { useContext, useRef } from "react";
import { arrayMoveImmutable } from "array-move";
import { VariationosContext } from "../SalesInfo";
import SortElement from "../SortElement";
import { SortContainer } from "../../modules/constant";
export type AddVariationProps = {};

const AddVariation = ({}: AddVariationProps) => {
  const { variationForm, setVariationForm } = useContext(VariationosContext);
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(null);
  const forceUpdate = useForceUpdate();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };
  const onFinish = (values: any) => {
    console.info("values", values);
  };
  const handleVariationUpdate = () => {
    setVariationForm(form.getFieldsValue());
  };
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    const { variationList } = cloneDeep(formRef?.current?.getFieldsValue());
    variationList[0].specificationList = arrayMoveImmutable(
      variationList[0].specificationList,
      oldIndex,
      newIndex
    );
    console.info("data", variationList);
    debugger;
    // formRef?.current?.setFieldsValue(data);
    form.setFieldsValue({ variationList });
    forceUpdate();
  };
  return (
    <div className="add-variation">
      <Form
        form={form}
        ref={formRef}
        onFinish={onFinish}
        onChange={() => {
          handleVariationUpdate();
        }}
        name="variationform"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        // initialValues={{
        //   variationList: aa.map((el, index) => {
        //     let item = {
        //       fieldKey: index,
        //       isListField: true,
        //       key: index,
        //       name: index,
        //     };
        //     return;
        //   }),
        // }}
        layout="horizontal"
      >
        <Form.List name={"variationList"}>
          {(variations, { add: addVariations, remove: removeVariations }) => (
            <>
              {variations.map((variation, idx) => (
                <SortContainer
                  useDragHandle={true}
                  key={variation.key + idx}
                  onSortEnd={onSortEnd}
                >
                  <Space
                    direction="vertical"
                    style={{ display: "flex", marginBottom: 8 }}
                  >
                    <Row className="pt-4">
                      <Col
                        span={layout.labelCol.span.toString()}
                        className="text-right"
                      >
                        <div className="ant-form-item-label">
                          <label>{`Variations${idx}`}</label>
                        </div>
                      </Col>
                      <Col span="19" className="bg-gray-100 pt-4">
                        <Form.Item
                          // wrapperCol={{ span: 16 }}
                          // labelCol={{ span: 4 }}
                          {...variation}
                          name={[variation.name, "name"]}
                          label="Name"
                          // initialValue={aa[idx].variationList.name}
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Missing first name",
                          //   },
                          // ]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                        {/* <div className="flex"> */}
                        <Form.List
                          {...variation}
                          initialValue={[
                            {
                              option: "",
                            },
                          ]}
                          name={[variation.name, "specificationList"]}
                        >
                          {(
                            specifications,
                            {
                              add: addSpecification,
                              remove: removeSpecification,
                              move,
                            }
                          ) => (
                            <>
                              {specifications.map(
                                (specification, specificationIdx) => (
                                  <SortElement
                                    index={specificationIdx}
                                    key={specification.key}
                                    specificationIdx={specificationIdx}
                                    removeSpecification={removeSpecification}
                                    specification={specification}
                                  />
                                )
                              )}

                              <Row>
                                <Col span={5}></Col>
                                <Col span={14}>
                                  <Form.Item wrapperCol={{ span: 24 }}>
                                    <Button
                                      type="dashed"
                                      onClick={() => {
                                        addSpecification();
                                        variationForm.variationList[
                                          idx
                                        ].specificationList.push({
                                          option: "",
                                        });
                                        setVariationForm(
                                          cloneDeep(variationForm)
                                        );
                                      }}
                                      block
                                      icon={<PlusOutlined />}
                                    >
                                      Add field
                                    </Button>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                  </Space>
                </SortContainer>
              ))}
              <Form.Item className="mt-4" label="Variations" {...layout}>
                <Button
                  type="dashed"
                  onClick={() => {
                    addVariations();
                    variationForm.variationList.push({
                      name: "",
                      specificationList: [{ option: "" }],
                    });
                    setVariationForm(cloneDeep(variationForm));
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Enable variations
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default AddVariation;
