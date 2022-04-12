import { Button, Form, Input, Select } from "antd";
import { ACCOUNT_FORM } from "@/views/addAccount/modules/form";
import { useState } from "react";
import { useNavigate } from "react-router";

const AddAccount = () => {
  const [fromItems, setFormItems] = useState(ACCOUNT_FORM);
  const navigator = useNavigate();

  const formValuesChange = (changedValues: any, allValues: any) => {
    if (allValues.type === "serviceAccount") {
      setFormItems(ACCOUNT_FORM);
    } else {
      setFormItems(ACCOUNT_FORM.splice(0, 9));
    }
  };

  const addAccount = (values: any) => {
    console.log(values);
  };

  return (
    <div className="p-4 text-left">
      <div className="bg-white p-4">
        <div className="text-2xl text-medium mb-4">add Account</div>
        <Form
          initialValues={{ type: "serviceAccount" }}
          onValuesChange={formValuesChange}
          onFinish={addAccount}
          autoComplete="off"
          className="flex flex-row flex-wrap justify-start pr-4"
        >
          {fromItems.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={item.rules}
              className={`${item.type === "textarea" ? "w-full" : "w-1/2"}`}
              labelCol={{ span: item.type === "textarea" ? 4 : 8 }}
              wrapperCol={{ span: item.type === "textarea" ? 20 : 16 }}
            >
              {item.type === "select" ? (
                <Select placeholder={item.placeholder}>
                  {(item.selectList || []).map((el) => (
                    <Select.Option value={el.key}>{el.label}</Select.Option>
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
          <Form.Item
            className="w-full flex flex-row justify-end"
            wrapperCol={{ span: 4 }}
          >
            <Button
              danger
              className="mr-4"
              onClick={() => {
                navigator("/account-list");
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" danger>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default AddAccount;
