import { Modal, Form, Input, Button, Select, DatePicker } from "antd";
import React from "react";

const ShipmentModal = ({
  shipModalVisible,
  orderId,
  onCancel,
}: {
  shipModalVisible: boolean;
  orderId: string;
  onCancel: Function;
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Arrange shipment"
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
        <Form.Item label="Order ID:">
          <Input value={orderId} disabled />
        </Form.Item>
        <Form.Item label="Carrier company:">
          <Select placeholder="Please select" />
        </Form.Item>
        <Form.Item label="Carrier number:">
          <Input placeholder="please input" />
        </Form.Item>
        <Form.Item label="Shipment Date:">
          <DatePicker className="w-full" />
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
export default ShipmentModal;
