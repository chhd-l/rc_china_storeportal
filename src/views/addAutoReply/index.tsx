import { Button, Form, Input, Select } from "antd";
import { ADD_AUTO_REPLY_FORM } from "./modules/form";
import { useNavigate } from "react-router";
import { useState } from "react";
import SelectContext from "./components/SelectContent";
import {ReplyContent} from "@/framework/types/wechat";

const AddAccount = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigator = useNavigate();
  const [form]=Form.useForm()

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues);
  };

  const searchDescription = () => {
    setModalVisible(true);
  };

  const addAccount = (values: any) => {
    console.log(values);
  };

  const setReplyDes=(selectReplyContent:ReplyContent)=>{
    form.setFieldsValue({description:selectReplyContent.description})
    setModalVisible(false)
  }

  return (
    <div className="p-4 text-left">
      <div className="bg-white p-4">
        <div className="text-2xl text-medium mb-4">add Automatic Reply</div>
        <Form
          onValuesChange={formValuesChange}
          onFinish={addAccount}
          autoComplete="off"
          className="w-3/4"
          form={form}
        >
          {ADD_AUTO_REPLY_FORM.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={item.rules}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              key={item.name}
            >
              {item.type === "select" ? (
                <Select placeholder={item.placeholder}>
                  {(item.selectList || []).map((el) => (
                    <Select.Option value={el.key}>{el.label}</Select.Option>
                  ))}
                </Select>
              ) : item.type === "search" ? (
                <Input.Search
                  placeholder={item.placeholder}
                  onSearch={searchDescription}
                />
              ) : (
                <Input placeholder={item.placeholder} />
              )}
            </Form.Item>
          ))}
          <Form.Item
            className="w-full flex flex-row justify-end"
            wrapperCol={{ span: 8 }}
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
      <SelectContext
        modalVisible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        onConfirm={setReplyDes}
      />
    </div>
  );
};
export default AddAccount;
