import { Form, Input, Button, Row, Col, Select, Tooltip } from "antd";
import type { OptionsProps } from "@/framework/types/common";
import { SearchContainer } from "@/components/ui/Container";
import "./index.less"
import { useState } from "react";

const { Option } = Select;
interface SearchProps {
  getFormData: Function;
}
const nameForKey: OptionsProps[] = [
  { name: "Product Name", value: "goodsName" },
  { name: "SKU", value: "SKU" },
  { name: "SPU", value: "SPU" },
];
const typeForKey: OptionsProps[] = [
  { name: "Product Type", value: "ProductType" },
  { name: "Subscription Status", value: "SubscriptionStatus" },
];
const chooseProductType: OptionsProps[] = [
  { name: "Bundle bundle", value: "BUNDLE BUNDLE" },
  { name: "Regular regular", value: "REGULAR REGULAR" },
  { name: "Other other", value: "OTHER OTHER" },
];
const SubscriptionType: OptionsProps[] = [
  { name: "True", value: true },
  { name: "False", value: false },
];

const SearchHeader = ({ getFormData }: SearchProps) => {
  const [form] = Form.useForm();
  const [typeSelect, setTypeSelect] = useState(typeForKey[0].value)
  const onFinish = (values: any) => {
    const val = {
      startStock : values.startStock,
      [values.selectName] : values.goodsName,
      [values.type] : values.GoodsType,
      endStock : values.endStock,
      cateId : values.cateId,
    }
    getFormData(val);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <SearchContainer className="product-search-top">
      <Form
        layout={"inline"}
        form={form}
        onFinish={onFinish}
        initialValues={{
          layout: "inline",
        }}
      >
        <Row justify="start" gutter={[0, 14]}>
          <Col span={12}>
            <Input.Group compact className="flex">
              <Form.Item name="selectName" initialValue={nameForKey[0].value}>
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
                {/* <SelectKey list={nameForKey} /> */}
              </Form.Item>
              <Form.Item name="goodsName" className="flex-1">
                <Input placeholder={`please Input goodsName`} />
              </Form.Item>
            </Input.Group>
          </Col>
          <Col span={12}>
            <Form.Item label="Category" name="cateId">
              <Input placeholder={`please Input category`} suffix={
                <Tooltip title="Choose Category">
                  <span className="icon iconfont icon-rc-edit" style={{ color: 'rgba(0,0,0,.45)' }}></span>
                </Tooltip>
              } />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="stock" name="startStock">
              <Input placeholder={`please Input startStock`} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="endStock">
              <Input placeholder={`please Input endStock`} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Input.Group compact className="flex">
              <Form.Item name="type" initialValue={typeForKey[0].value}>
                <Select
                  style={{ width: 140 }}
                  placeholder="Select a option and change input text above"
                  onChange={(v)=>{
                    form.setFieldsValue({GoodsType : ''})
                    setTypeSelect(v)
                  }}
                >
                  {typeForKey.map((el: any) => (
                    <Option key={el.value} value={el.value}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
                {/* <SelectKey list={typeForKey} /> */}
              </Form.Item>
              <Form.Item className="flex-1" name="GoodsType">
                <Select placeholder="Choose Product Type">
                  {
                    typeSelect === typeForKey[0].value ?(
                      chooseProductType.map((el: any) => (
                        <Option key={el.value} value={el.value}>
                          {el.name}
                        </Option>
                      ))
                    ) :(
                      SubscriptionType.map((el: any) => (
                        <Option key={el.value} value={el.value}>
                          {el.name}
                        </Option>
                      ))
                    )
                  }
                </Select>
              </Form.Item>
            </Input.Group>
          </Col>
          <Col span={12} offset={12} className="text-right ml-0">
            <Form.Item>
              <Button htmlType="submit" type="primary" className="mr-4">
              search
              </Button>
              <Button onClick={onReset}>Reset</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </SearchContainer>
  );
};
export default SearchHeader;
