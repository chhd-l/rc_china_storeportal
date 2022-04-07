import { Form, Input, Button, Row, Col, Select } from "antd";
import type { OptionsProps } from "@/framework/types/common";
const { Option } = Select;
interface SearchProps {
  getFormData: Function;
}
const nameForKey: OptionsProps[] = [
  { name: "Product Name", value: "ProductName" },
  { name: "SKU", value: "SKU" },
  { name: "SPU", value: "SPU" },
];
const typeForKey: OptionsProps[] = [
  { name: "Product Type", value: "ProductType" },
  { name: "Subscription Status", value: "SubscriptionStatus" },
];

const SearchHeader = ({ getFormData }: SearchProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Finish:", values);
    getFormData(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      layout={"inline"}
      className="py-6 px-3 bg-white mb-3"
      form={form}
      onFinish={onFinish}
      initialValues={{
        layout: "inline",
      }}
    >
      <Row justify="start" gutter={[0, 14]}>
        <Col span={12}>
          <Input.Group compact className="flex">
            <Form.Item name="selectName">
              <Select
                style={{ width: 140 }}
                placeholder="Select a option and change input text above"
                defaultValue={nameForKey[0].value}
              >
                {nameForKey.map((el: any) => (
                  <Option key={el.value} value={el.value}>
                    {el.name}
                  </Option>
                ))}
              </Select>
              {/* <SelectKey list={nameForKey} /> */}
            </Form.Item>
            <Form.Item name="username" className="flex-1">
              <Input placeholder={`please Input `} />
            </Form.Item>
          </Input.Group>
        </Col>
        <Col span={12}>
          <Form.Item label="Category" name="category">
            <Input placeholder={`please Input category`} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Stock" name="stock">
            <Input placeholder={`please Input stock`} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Input.Group compact className="flex">
            <Form.Item name="typeName">
              <Select
                style={{ width: 140 }}
                placeholder="Select a option and change input text above"
                defaultValue={typeForKey[0].value}
              >
                {typeForKey.map((el: any) => (
                  <Option key={el.value} value={el.value}>
                    {el.name}
                  </Option>
                ))}
              </Select>
              {/* <SelectKey list={typeForKey} /> */}
            </Form.Item>
            <Form.Item className="flex-1" name="username3">
              <Input placeholder={`please Input `} />
            </Form.Item>
          </Input.Group>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Button htmlType="submit" type="primary" className="mr-4">
              Submit
            </Button>
            <Button onClick={onReset}>Reset</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default SearchHeader;
