import { Divider } from "antd";
import ProForm, {
  ProFormGroup,
  ProFormText,
  ProFormSelect,
  ProFormCascader,
} from "@ant-design/pro-form";
import {Form,Input,Select,Button} from 'antd'
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const { Search } = Input;
const {Option} = Select
export default () => {
  const  onFinish = (values: any) => {
    console.log(values);
  };
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
  };
  const onSearch = (value:any) => console.log(value);
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
            layout="horizontal"
            name="validate_other"
            onValuesChange={(_, values) => {
              console.log(values);
            }}
            onFinish={async (value) => console.log(value)}
          >
            <ProFormText
              fieldProps={{ showCount: true }}
              name="name"
              label="Product Name"
            />
            <ProFormSelect
              width={200}
              name="select"
              label="Product Type"
              valueEnum={{
                china: "China",
                usa: "U.S.A",
              }}
              placeholder="Please select a country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            />
           <div className="p-6 bg-gray-50">
           <ProFormSelect
          fieldProps={{

            showSearch:true
          }}
              name="select2"
              width={300}
              showSearch
              debounceTime={300}
              request={async ({ keyWords }) => {
                await waitTime(1000);
                return [{ value: "111", label: "tesst" }];
              }}
              placeholder="Categories Name"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            />
            <ProFormCascader
              name="area"
              label="区域"
              fieldProps={{
                dropdownMatchSelectWidth: true,
                options: [
                  {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                      {
                        value: "hangzhou",
                        label: "Hangzhou",
                        children: [
                          {
                            value: "xihu",
                            label: "West Lake",
                          },
                        ],
                      },
                    ],
                  },
                ],
              }}
            />
           </div>
          </ProForm>
        </div>
      </div>
    </div>
  );
};
