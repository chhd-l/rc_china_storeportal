import { Modal, Form, Input, Button } from 'antd'
import React from 'react'
import { LogisticsIntegration } from '@/framework/types/order'
import intl from 'react-intl-universal'

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
      title={intl.get('Shipping.Edit Express 100 setting')}
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
          consumer: logisticsIntegration?.consumer,
          pullUrl: logisticsIntegration?.pullUrl || 'http://poll.kuaidi100.com/poll',
          queryUrl: logisticsIntegration?.queryUrl || 'http://poll.kuaidi100.com/poll/query.do',
          callbackUrl: logisticsIntegration?.callbackUrl,
        }}
      >
        <Form.Item
          label={intl.get('Shipping.Key:')}
          name="key"
          rules={[{ required: true, message: intl.get('Shipping.Please input key') }]}
        >
          <Input placeholder={intl.get('Shipping.Please input key')} />
        </Form.Item>
        <Form.Item
          label={intl.get('Shipping.Consumer:')}
          name="consumer"
          rules={[{ required: true, message: intl.get('Shipping.Please input consumer') }]}
        >
          <Input placeholder={intl.get('Shipping.Please input consumer')} />
        </Form.Item>
        <Form.Item label={intl.get('Shipping.Pull URL:')} name="pullUrl">
          <Input disabled placeholder={intl.get('Shipping.please input user name')} />
        </Form.Item>
        <Form.Item label={intl.get('Shipping.Query URL:')} name="queryUrl">
          <Input disabled placeholder={intl.get('Shipping.please input url')} />
        </Form.Item>
        <Form.Item
          label={intl.get('Shipping.SCallback URL:')}
          name="callbackUrl"
          rules={[{ required: true, message: intl.get('Shipping.Please input callbackUrl') }]}
        >
          <Input.TextArea
            placeholder={intl.get('Shipping.please input callbackUrl')}
            autoSize={{ minRows: 5, maxRows: 7 }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'end' }}>
          <Button type="primary" danger htmlType="submit" loading={confirmLoading}>
            {intl.get('public.confirm')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ShippingSettingModal
