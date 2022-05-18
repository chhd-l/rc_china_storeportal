import { Typography, Form, Input, Select, Checkbox } from 'antd'
import { useState } from 'react'
const { Title } = Typography

const RuleSettings = () => {
    const [isOpen, setIsopen] = useState(false)
    const [isOpen2, setIsopen2] = useState(false)

  return (
    <div className="bg-white p-4">
      <Title className="mb-8" level={4}>
        Rule Settings
      </Title>
      <Form.Item label="Order Type" name="OrderType" required>
        <Select placeholder='Select' />
      </Form.Item>
      <Form.Item label="Recurrence" name="Recurrence" required>
        <Select placeholder='Select' />
      </Form.Item>
      <Form.Item
        label="Discount Type | Amount"
        shouldUpdate={(prevValues, curValues) => prevValues.DiscountType !== curValues.DiscountType}
        required
      >
        {({ getFieldValue }) => {
          const DiscountType = getFieldValue('DiscountType')
          return (
            <div className="flex items-center border border-gray-300 border-solid">
              <Form.Item name="DiscountType" initialValue="Fix Amount" className="m-0" style={{ width: '35%' }}>
                <Select
                  className="Selectborder"
                  placeholder='Select'
                  options={[
                    { lable: 'Fix Amount', value: 'Fix Amount' },
                    { lable: 'By Percentage', value: 'By Percentage' },
                  ]}
                />
              </Form.Item>
              {DiscountType === 'Fix Amount' ? (
                <>
                  <span className="w-8 text-center">￥</span>
                  <Form.Item name="Amount" className="m-0 flex-1">
                    <Input placeholder='Input' className="border-0 border-l" />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item name="Amount" className="m-0 flex-1">
                    <Input placeholder='Input' className="border-0 border-r" />
                  </Form.Item>
                  <span className="bg-gray-100 text-gray-400 w-10 text-center h-8 flex items-center justify-center">
                    %OFF
                  </span>
                </>
              )}
            </div>
          )
        }}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 'auto' }} label="Minimum Basket Price" required>
          <div className='flex items-center w-full'>
            <Form.Item className='m-0' name="Price"  wrapperCol={{ span: 'auto' }}>
                <Input placeholder='Input' className='w-72' disabled={isOpen} />
            </Form.Item>
            <Checkbox className='ml-4' value={isOpen} onChange={(e) => {
                console.log('e',e)
                setIsopen(e.target.checked)
            }}>Unlimited</Checkbox>
          </div>
      </Form.Item>
      <Form.Item label="Usage Quantity" extra='Total usable voucher for all buyers' required>
          <div className='flex items-center w-full'>
            <Form.Item className='m-0' name="UsageQuantity" wrapperCol={{ span: 'auto' }}>
                <Input placeholder='Input' className='w-72' disabled={isOpen2} />
            </Form.Item>
            <Checkbox className='ml-4' value={isOpen2} onChange={(e) => {
                setIsopen2(e.target.checked)
            }}>Unlimited</Checkbox>
          </div>
      </Form.Item>
    </div>
  )
}

export default RuleSettings
