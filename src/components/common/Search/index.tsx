import { Button, Form, Input, Select } from "antd";
import React from "react";
import { SearchFormItemProps } from "@/framework/types/common";

const Search = ({
  query,
  formItems,
}: {
  query: Function;
  formItems: SearchFormItemProps[];
}) => {
  const [form] = Form.useForm();

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues);
  };

  const search = (values: any) => {
    console.log(values);
    query && query();
  };

  return (
    <div className="p-4 mb-2 bg-white text-left">
      <Form
        form={form}
        onValuesChange={formValuesChange}
        onFinish={search}
        autoComplete="off"
        className="flex flex-row flex-wrap justify-start pr-8"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {formItems.map((item) => (
          <Form.Item
            label={item.label}
            name={item.name}
            className="w-1/3"
            key={item.name}
          >
            {item.type === "select" ? (
              <Select placeholder={item.placeholder}>
                {(item.selectList || []).map((el) => (
                  <Select.Option value={el.key} key={el.key}>{el.label}</Select.Option>
                ))}
              </Select>
            ) : item.type === "textarea" ? (
              <Input.TextArea
                placeholder={item.placeholder}
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            ) : (
              <Input placeholder={item.placeholder} />
            )}
          </Form.Item>
        ))}
        <Form.Item className="w-full flex flex-row pl-8">
          <Button type="primary" htmlType="submit" danger>
            Search
          </Button>
          <Button
            className="ml-4"
            htmlType="button"
            onClick={() => {
              form.resetFields();
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Search;
