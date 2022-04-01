import { Divider } from "antd";
import ProForm, { ProFormText, ProFormSelect } from "@ant-design/pro-form";
import Cascader from "../Cascader";
import { PRODUCTYPE } from "@/framework/enum/product";
interface ChooseCateProps {
  handleCate: Function;
}
const ChooseCate = (props: ChooseCateProps) => {
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  // const layout = {
  //   labelCol: { span: 2 },
  //   wrapperCol: { span: 16 },
  // };
  // const onSearch = (value: any) => console.log(value);
  return (
    <div className="bg-gray-50 px-14 py-6 text-left">
      <div className="bg-white py-6 px-8">
        <div>
          <div className="font-bold text-lg">Add a New Product</div>
          <div>Please choose the right category for your product</div>
          <Divider />
          {/* <Form {...layout} name="control-ref" onFinish={onFinish}>
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item>
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> */}
          <ProForm
            submitter={{
              // 配置按钮文本
              searchConfig: {
                submitText: "Next",
              },
              // 配置按钮的属性
              resetButtonProps: {
                style: {
                  // 隐藏重置按钮
                  display: "none",
                },
              },
            }}
            layout="horizontal"
            name="validate_other"
            onValuesChange={(_, values) => {
              console.log(values);
            }}
            onFinish={async (value) => {
              props.handleCate(value);
            }}
          >
            <ProFormText
              fieldProps={{ maxLength: 120, showCount: true }}
              name="name"
              label="Product Name"
            />
            <ProFormSelect
              width={200}
              name="select"
              label="Product Type"
              valueEnum={PRODUCTYPE}
              placeholder="Please select"
            />
            <div>
              <Cascader />
            </div>
          </ProForm>
        </div>
      </div>
    </div>
  );
};
export default ChooseCate;
