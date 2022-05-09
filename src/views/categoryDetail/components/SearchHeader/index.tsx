import { Form, Input, Button, Row, Col, Select } from "antd";
import type { OptionsProps } from "@/framework/types/common";
import Mock from "mockjs";
import { mockOption } from "../../modules/mockdata";
import { ProFormMoney } from "@ant-design/pro-form";
const { Option } = Select;
interface SearchProps {
  getFormData: Function;
}
const mockOptions = Mock.mock(mockOption).options;

const nameForKey: OptionsProps[] = [
  { name: "Product Name", value: "ProductName" },
  { name: "SKU", value: "SKU" },
  { name: "SPU", value: "SPU" },
];
const SearchHeader = ({ getFormData }: SearchProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Finish??:", values);
    getFormData(values);
  };
  const handleSearch = () => {
    const data = form.getFieldsValue(true);
    console.info("data", data);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      layout={"inline"}
      className="py-6 px-3 bg-white mb-3"
      form={form}
      initialValues={{
        selectName: nameForKey[0].value,
        category: mockOptions[0].value,
      }}
      onFinish={onFinish}
    >
      <Row justify="start" gutter={[0, 14]}>
        <Col span={9}>
          <Form.Item label="Category" name="category">
            <Select
              placeholder="Select a category"
              defaultValue={mockOptions[0].value}
            >
              {mockOptions.map((el: any) => (
                <Option key={el.value} value={el.value}>
                  {el.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={14}>
          <Input.Group compact className="flex">
            <Form.Item name="selectName">
              <Select
                style={{ width: 140 }}
                placeholder="Select a option and change input text above"
              >
                {nameForKey.map((el: any) => (
                  <Option key={el.value} value={el.value}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="username" className="flex-1">
              <Input placeholder={`Please Input `} />
            </Form.Item>
          </Input.Group>
        </Col>

        <Col span={9}>
          <Form.Item label="Stock" name="stock">
            <Input placeholder={`Please Input stock`} />
          </Form.Item>
        </Col>
        <Col span={14}>
          <div className="flex">
            <ProFormMoney
              width={135}
              label="Markting Price"
              name="lowestPrice"
              customSymbol="￥"
            />
            <span style={{ marginRight: 16 }}>-</span>
            <ProFormMoney width={135} name="highestPrice" customSymbol="￥" />
          </div>
        </Col>
        <Col span={14}>
          <Form.Item>
            <Button onClick={handleSearch} type="primary" className="mr-4">
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
