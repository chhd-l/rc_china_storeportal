import "./index.less";
import { Anchor } from "antd";
import BasicInfomation from "../BasicInfomation";
import Specification from "../Specification";
import SalesInfo from "../SalesInfo";
import Shipping from "../Shipping";
import { Form, Space, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { ReactNode, useRef, useState } from "react";
interface MainInfoProps {
  cateInfo: {
    cateId: string[];
  };
}
interface StepsProps {
  title: string;
  anchor: string;
  subTitle?: string;
  tips: string;
  rightSlot?: ReactNode | null;
}

const { Link } = Anchor;
const steps: StepsProps[] = [
  {
    title: "Basic Infomation",
    anchor: "product_basic_infomation",
    subTitle: "",
    tips: "Basic Infomation",
    rightSlot: <EyeOutlined />,
  },
  {
    title: "Specification",
    anchor: "product_specification",
    tips: "Specification",
    subTitle:
      "Complete: 1 / 7 Fill in more attributes to boost the exposure of your product.",
    rightSlot: null,
  },
  {
    title: "Sales Infomation",
    anchor: "product_sales_infomation",
    subTitle: "",
    tips: "Sales Infomation",
    rightSlot: null,
  },
  {
    title: "Shipping",
    tips: "Shipping",
    anchor: "product_shipping",
    subTitle: "",
    rightSlot: null,
  },
];
const MainInfo = ({ cateInfo }: MainInfoProps) => {
  const [form] = Form.useForm();
  const [tipsIdx, setTipsIdx] = useState(0);
  const hanldeTips = (idx: number) => {
    setTipsIdx(idx);
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div id={steps[0].anchor} className="flex bg-gray-50 px-14 py-6 text-left">
      <div className="flex-1" style={{ marginRight: "130px" }}>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            product: [
              {
                fieldKey: 0,
                isListField: true,
                key: 0,
                name: 0,
              },
              {
                fieldKey: 1,
                isListField: true,
                key: 1,
                name: 1,
              },
              {
                fieldKey: 2,
                isListField: true,
                key: 2,
                name: 2,
              },
              {
                fieldKey: 3,
                isListField: true,
                key: 3,
                name: 3,
              },
            ],
          }}
        >
          <Form.List name="product">
            {(fields) => (
              <>
                {fields.map((field, idx) => (
                  <Space
                    onClick={() => {
                      hanldeTips(idx);
                    }}
                    key={field.key}
                    direction="vertical"
                    className="flex mb-10"
                  >
                    <div
                      id={idx > 0 ? steps[idx].anchor : "anchor-1"}
                      className="bg-white py-6 px-8"
                    >
                      <div className=" pb-2">
                        <div className="flex justify-between  pb-1">
                          <div className="font-bold text-lg">
                            {steps[idx].title}
                          </div>
                          <div>{steps[idx].rightSlot}</div>
                        </div>
                        <div>{steps[idx].subTitle}</div>
                      </div>
                      {idx === 0 && <BasicInfomation field={field} />}
                      {idx === 1 && <Specification field={field} />}
                      {idx === 2 && <SalesInfo field={field} />}
                      {idx === 3 && <Shipping field={field} />}
                    </div>
                    {/* {idx === 0 && <div id={steps[idx].anchor}><BasicInfomation field={field} /></div>} */}
                  </Space>
                ))}
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-40 fixed right-0" style={{ top: "64px" }}>
        <Anchor affix={false} targetOffset={64} style={{ top: "64px" }}>
          {steps.map((step) => (
            <Link href={`#${step.anchor}`} title={step.title} />
          ))}
        </Anchor>
        <div className="mt-4 bg-yellow-100 text-yellow-700 px-2 py-4">
          <div className="font-bold ">Tips</div>
          <div>{steps[tipsIdx].tips}</div>
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
