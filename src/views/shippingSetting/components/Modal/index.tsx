import { Modal, Form, Input, Button } from 'antd'
import React from 'react'
import { LogisticsIntegration } from '@/framework/types/order'

const ShippingSettingModal = ({
  shipModalVisible,
  onCancel,
  logisticsIntegration,
  updateLogisticsIntegration,
  confirmLoading,
}: {
  shipModalVisible: boolean
  onCancel: Function
  logisticsIntegration: LogisticsIntegration | any
  updateLogisticsIntegration: Function
  confirmLoading: boolean
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Edit Express 100 setting"
      visible={shipModalVisible}
      footer={null}
      onCancel={() => {
        onCancel && onCancel()
      }}
      destroyOnClose
    >
      <Form
        form={form}
        labelCol={{ span: 6, offset: 0 }}
        wrapperCol={{ span: 18, offset: 0 }}
        onFinish={(values) => {
          updateLogisticsIntegration && updateLogisticsIntegration({ ...logisticsIntegration, ...values })
        }}
        initialValues={{
          key: logisticsIntegration?.key,
          customer: logisticsIntegration?.customer,
          pullUrl: logisticsIntegration?.pullUrl || 'http://poll.kuaidi100.com/poll',
          queryUrl: logisticsIntegration?.queryUrl || 'http://poll.kuaidi100.com/poll/query.do',
          callbackUrl: logisticsIntegration?.callbackUrl,
        }}
      >
        <Form.Item label="Key:" name="key" rules={[{ required: true, message: 'Please input key' }]}>
          <Input placeholder="Please input key" />
        </Form.Item>
        <Form.Item label="Customer:" name="customer" rules={[{ required: true, message: 'Please input customer' }]}>
          <Input placeholder="Please input customer" />
        </Form.Item>
        <Form.Item label="pullURL:" name="pullUrl">
          <Input disabled placeholder="please input user name" />
        </Form.Item>
        <Form.Item label="queryURL:" name="queryUrl">
          <Input disabled placeholder="please input url" />
        </Form.Item>
        <Form.Item
          label="callbackURL:"
          name="callbackUrl"
          rules={[{ required: true, message: 'Please input callbackUrl' }]}
        >
          <Input.TextArea placeholder="please input callbackURL" autoSize={{ minRows: 5, maxRows: 7 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'end' }}>
          <Button type="primary" danger htmlType="submit" loading={confirmLoading}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ShippingSettingModal
