import "./index.less";
import { Anchor } from "antd";
import BasicInfomation from "../BasicInfomation";
import Specification from "../Specification";
import SalesInfo from "../SalesInfo";
import Shipping from "../Shipping";
import { Form, Space, Button } from "antd";
import { ReactNode, useRef, useState } from "react";
import { steps, formInitialValues } from "../../modules/constant";
interface MainInfoProps {
  cateInfo: {
    cateId: string[];
  };
}

const { Link } = Anchor;

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
          initialValues={formInitialValues}
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
