import { Button, Form, Input, Select } from "antd";
import React from "react";
import { SearchFormItemProps } from "@/framework/types/common";

const Search = ({
  query,
  formItems,
  classes = "",
  style = { width: "320px" },
}: {
  query: Function;
  formItems: SearchFormItemProps[];
  classes?: string;
  style?: any;
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
    <Form
      form={form}
      onValuesChange={formValuesChange}
      onFinish={search}
      autoComplete="off"
      className={`${classes} flex flex-row flex-wrap justify-start`}
      layout={"inline"}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
    >
      {formItems.map((item) => (
        <Form.Item
          label={item.label}
          name={item.name}
          key={item.name}
          style={style}
          className="mt-4"
        >
          {item.type === "select" ? (
            <Select placeholder={item.placeholder}>
              {(item.selectList || []).map((el) => (
                <Select.Option value={el.key} key={el.key}>
                  {el.label}
                </Select.Option>
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
      <Form.Item className="w-full flex flex-row mt-4">
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
  );
};

export default Search;
