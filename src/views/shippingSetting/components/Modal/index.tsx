import { Modal, Form, Input, Button } from "antd";
import React from "react";

const ShippingSettingModal = ({
  shipModalVisible,
  onCancel,
}: {
  shipModalVisible: boolean;
  onCancel: Function;
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Edit Express 100 setting"
      visible={shipModalVisible}
      footer={null}
      onCancel={() => {
        onCancel && onCancel();
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 9, offset: 0 }}
        wrapperCol={{ span: 12, offset: 0 }}
        onValuesChange={() => {}}
      >
        <Form.Item label="Header token:">
          <Input placeholder="Please input header token" />
        </Form.Item>
        <Form.Item label="User name:">
          <Input placeholder="please input user name" />
        </Form.Item>
        <Form.Item label="Url:">
          <Input placeholder="please input url" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 24, offset: 0 }}
          style={{ textAlign: "end" }}
        >
          <Button type="primary" danger>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ShippingSettingModal;
