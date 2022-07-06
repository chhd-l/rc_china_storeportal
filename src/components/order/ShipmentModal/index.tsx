import { Modal, Form, Input, Button, Select, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { CarrierType } from '@/framework/types/order'
import { getExpressCompanyList } from '@/framework/api/order'
import moment from 'moment'

const ShipmentModal = ({
  shipModalVisible,
  orderId,
  onCancel,
  shipped,
  expectedShippingDate,
  loading,
}: {
  shipModalVisible: boolean
  orderId?: string
  onCancel: Function
  shipped?: Function
  expectedShippingDate: string
  loading: boolean
}) => {
  const [form] = Form.useForm()
  const [carrierTypes, setCarrierTypes] = useState<CarrierType[]>([])
  const [shippingTime, setShippingTime] = useState('')

  const disabledDate = (current: any) => {
    return current && current < moment().subtract(1, 'days')
  }

  const getExpressCompanies = async () => {
    const res = await getExpressCompanyList()
    setCarrierTypes(res)
  }

  useEffect(() => {
    getExpressCompanies()
  }, [])

  const shippedOrderEvent = (values: any) => {
    console.log('values', values)
    const orderShippingInfoInput = Object.assign(values, { shippingTime: new Date(shippingTime).toISOString() })
    shipped && shipped(orderShippingInfoInput)
  }

  useEffect(() => {
    if (expectedShippingDate) {
      setShippingTime(moment(expectedShippingDate).format('YYYY-MM-DD'))
    }
  }, [expectedShippingDate])

  return (
    <Modal
      title="Arrange shipment"
      visible={shipModalVisible}
      footer={null}
      onCancel={() => {
        onCancel && onCancel()
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 9, offset: 0 }}
        wrapperCol={{ span: 12, offset: 0 }}
        onFinish={shippedOrderEvent}
        initialValues={{ shippingTime: moment(expectedShippingDate) }}
      >
        <Form.Item label="Order ID:">
          <Input value={orderId} disabled />
        </Form.Item>
        <Form.Item
          label="Carrier company:"
          name="shippingCompany"
          rules={[{ required: true, message: 'Please select carrier company' }]}
        >
          <Select placeholder="Please select">
            {carrierTypes.map((item: any) => (
              <Select.Option value={item.code} key={item.code}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Carrier number:"
          name="trackingId"
          rules={[{ required: true, message: 'Please input carrier number' }]}
        >
          <Input placeholder="please input" />
        </Form.Item>
        <Form.Item
          label="Shipment Date:"
          name="shippingTime"
          rules={[{ required: true, message: 'Please select shipment Date' }]}
        >
          <DatePicker
            className="w-full"
            // disabledDate={disabledDate}
            // defaultValue={moment(expectedShippingDate)}
            onChange={(date, dateString) => {
              console.log(date, dateString)
              setShippingTime(dateString)
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'end' }}>
          <Button loading={loading} type="primary" danger htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ShipmentModal
