import { Modal, Form, Input, Button, Select, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { CarrierType } from '@/framework/types/order'
import { getExpressCompanyList } from '@/framework/api/get-order'
import moment from 'moment'

const ShipmentModal = ({
  shipModalVisible,
  orderId,
  onCancel,
  shipped,
}: {
  shipModalVisible: boolean
  orderId?: string
  onCancel: Function
  shipped?: Function
}) => {
  const [form] = Form.useForm()
  const [carrierTypes, setCarrierTypes] = useState<CarrierType[]>([])
  const [shippingTime, setShippingTime] = useState('')

  const disabledDate=(current:any) =>{
    return current && current < moment().subtract(1,"days");
  }

  const getExpressCompanys = async () => {
    const res = await getExpressCompanyList()
    setCarrierTypes(res)
  }

  useEffect(() => {
    getExpressCompanys()
  }, [])

  const shippedOrderEvent = (values: any) => {
    console.log('values', values)
    const tradeShippingInfoInput = Object.assign(values, { shippingTime: new Date(shippingTime).toISOString() })
    shipped && shipped(tradeShippingInfoInput)
  }

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
      >
        <Form.Item label="Order ID:">
          <Input value={orderId} disabled />
        </Form.Item>
        <Form.Item label="Carrier company:" name="shippingCompany">
          <Select placeholder="Please select">
            {carrierTypes.map((item:any) => (
              <Select.Option value={item.code} key={item.code}>
                {item?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Carrier number:" name="trackingId">
          <Input placeholder="please input" />
        </Form.Item>
        <Form.Item label="Shipment Date:" name="shippingTime">
          <DatePicker
            className="w-full"
            disabledDate={disabledDate}
            onChange={(date, dateString) => {
              console.log(date, dateString)
              setShippingTime(dateString)
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24, offset: 0 }} style={{ textAlign: 'end' }}>
          <Button type="primary" danger htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default ShipmentModal
