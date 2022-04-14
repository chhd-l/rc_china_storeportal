import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input } from "antd";
import React from "react";
import { Comment } from "@/framework/types/order";

const OrderComment = ({ comments }: { comments: Comment[] }) => {
  const [form] = Form.useForm();

  return (
    <div className="bg-white p-4">
      <div className="h-80 border-b-2">
        {comments.map((item) => (
          <div>
            <div className="flex justify-between">
              <span className="flex items-center">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="ml-2">{item.createdBy}</span>
              </span>
              <span>{item.createdAt}</span>
            </div>
            <div className="text-left pl-8">{item.content}</div>
          </div>
        ))}
      </div>
      <div>
        <Form
          form={form}
          name="dynamic_rule"
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Form.Item
            name="comment"
            rules={[
              {
                required: true,
                message: "Please input your comment",
              },
            ]}
          >
            <Input.TextArea
              style={{ border: "none" }}
              autoSize={{ minRows: 3, maxRows: 5 }}
              placeholder="Input Enter,quickly save comment"
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 0 }}
            wrapperCol={{ span: 24, offset: 18 }}
          >
            <Button type="text" danger htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default OrderComment;
