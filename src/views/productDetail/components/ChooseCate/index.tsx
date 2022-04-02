import { Divider } from "antd";
import ProForm, { ProFormText, ProFormSelect } from "@ant-design/pro-form";
import Cascader from "../Cascader";
import { ProductType } from "@/framework/types/product";
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
              valueEnum={ProductType}
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
