/**
 * @dataverification
 * 此部分页面逻辑较为(混乱)复杂，如遇问题，请使用www.baidu.com | 联系chhd !!!
 */

import { Typography, Form, Input, Select, Checkbox, InputNumber } from 'antd'
import { useState } from 'react'
const { Title } = Typography

const OrderType = [
  { label: 'All', value: 'All' },
  { label: 'Single Order', value: 'Single Order' },
  { label: 'Normal Subscription', value: 'Normal Subscription' },
]

const RuleSettings = () => {
  const [isOpen, setIsopen] = useState(false)
  const [isOpen2, setIsopen2] = useState(false)
  const [AmountOpen, setAmountOpen] = useState(true)
  const [MinimumBasketPrice, setMinimumBasketPrice] = useState<string | number>('')

  return (
    <div className="bg-white p-4 RuleSettings">
      <Title className="mb-8" level={4}>
        Rule Settings
      </Title>
      <Form.Item
        label="Order Type"
        name="OrderType"
        rules={[
          {
            required: true,
            message: 'Pless Select',
          },
        ]}
      >
        <Select placeholder="Select" options={OrderType} />
      </Form.Item>
      <Form.Item
        label="Recurrence"
        name="Recurrence"
        rules={[
          {
            required: true,
            message: 'Pless Select',
          },
        ]}
      >
        <Select
          placeholder="Select"
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="Discount Type | Amount"
        className={`${AmountOpen ? '' : 'mb-12'}`}
        wrapperCol={{ span: 12 }}
        shouldUpdate={(prevValues, curValues) => prevValues.DiscountType !== curValues.DiscountType}
        required
      >
        {({ getFieldValue, setFieldsValue, validateFields }) => {
          const DiscountType = getFieldValue('DiscountType')
          return (
            <div className="flex items-center border border-gray-300 border-solid">
              <Form.Item
                name="DiscountType"
                initialValue="Fix Amount"
                className="m-0 h-8"
                wrapperCol={{ span: 'auto' }}
              >
                <Select
                  className="Selectborder"
                  placeholder="Select"
                  onChange={(v) => {
                    setAmountOpen(true)
                    setFieldsValue({
                      Amount: '',
                    })
                  }}
                  options={[
                    { lable: 'Fix Amount', value: 'Fix Amount' },
                    { lable: 'By Percentage', value: 'By Percentage' },
                  ]}
                />
              </Form.Item>
              {DiscountType !== 'By Percentage' ? (
                <>
                  <span className="w-8 text-center border-l border-r">￥</span>
                  <Form.Item
                    name="Amount"
                    className="m-0 flex-1 h-8 Amount1"
                    rules={[
                      {
                        validator: (_, value) => {
                          const price = value || 0
                          return price <= MinimumBasketPrice
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error('Please note that the discount amount is > 60% of min basket price'),
                              )
                        },
                        warningOnly: true,
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(v) => {
                        validateFields(['Price'])
                        if (v < MinimumBasketPrice) {
                          setAmountOpen(true)
                        } else {
                          setAmountOpen(false)
                        }
                      }}
                      placeholder="Input"
                      bordered={false}
                      className="w-full"
                      controls={false}
                    />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    name="Amount"
                    className="m-0 flex-1 h-8 Amount2"
                    rules={[
                      {
                        validator: (_, value) => {
                          return value < 60
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error('Please note that the discount amount is > 60% of min basket price'),
                              )
                        },
                        warningOnly: true,
                      },
                      {
                        validator: (_, value) => {
                          return value > 0 && value < 99
                            ? Promise.resolve()
                            : Promise.reject(new Error('Please enter a value between 1 and 99'))
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(v) => {
                        if (v < 99) {
                          setAmountOpen(true)
                        } else {
                          setAmountOpen(false)
                        }
                      }}
                      controls={false}
                      placeholder="Input"
                      className="border-0 border-l rounded-none w-full"
                    />
                  </Form.Item>
                  <span className="text-gray-400 w-10 text-center h-8 flex items-center justify-center border-l">
                    %OFF
                  </span>
                </>
              )}
            </div>
          )
        }}
      </Form.Item>
      <Form.Item
        wrapperCol={{ span: 'auto' }}
        label="Minimum Basket Price"
        required
        shouldUpdate={(prevValues, curValues) => prevValues.DiscountType !== curValues.DiscountType}
      >
        {({ validateFields, getFieldValue }) => (
          <div className="flex w-full">
            <Form.Item
              className="m-0"
              style={{ width:'32%' }}
              name="Price"
              wrapperCol={{ span: 'auto' }}
              rules={[
                {
                  required: true,
                  message: 'Pless Input',
                },
                {
                    validator: (_, value) => {
                        const price = Number(value) || 0
                        const DiscountType = getFieldValue('DiscountType')
                        const Amount = getFieldValue('Amount') || 0
                        const Bool = (DiscountType === 'Fix Amount') && (price >= Amount )
                        console.log('Bool',Bool)
                        return Bool
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error('Voucher discount amount cannot exceed min. spend required'),
                            )
                      },
                }
              ]}
            >
              <div className="flex">
                <span className="bg-gray-100 text-gray-400 w-10 text-center border border-l-0 flex items-center justify-center border-l">
                  ￥
                </span>
                <InputNumber
                  onChange={(v) => {
                    const price = (Number(v) * 0.6).toFixed(2) || 0
                    setMinimumBasketPrice(price)
                    validateFields(['Amount'])
                    const DiscountType = getFieldValue('DiscountType')
                    const Amount = getFieldValue('Amount')
                    if (DiscountType !== 'Fix Amount') {
                      if (Amount > 99 && Amount > price) {
                        setAmountOpen(false)
                      } else {
                        setAmountOpen(true)
                      }
                    } else {
                      if (Amount > price) {
                        setAmountOpen(false)
                      } else {
                        setAmountOpen(true)
                      }
                    }
                  }}
                  controls={false}
                  placeholder="Input"
                  className="w-72 rounded-l-none"
                  disabled={isOpen}
                />
              </div>
            </Form.Item>
            <Checkbox
              className="ml-4 mt-1.5 h-8"
              onChange={(e) => {
                setIsopen(e.target.checked)
              }}
            >
              Unlimited
            </Checkbox>
          </div>
        )}
      </Form.Item>
      <Form.Item label="Usage Quantity" extra="Total usable voucher for all buyers" required>
        <div className="flex w-full">
          <Form.Item
            className="m-0"
            name="UsageQuantity"
            wrapperCol={{ span: 'auto' }}
            rules={[
              {
                required: true,
                message: 'Pless Input',
              },
            ]}
          >
            <Input placeholder="Input" className="w-72" disabled={isOpen2} />
          </Form.Item>
          <Checkbox
            className="ml-4 mt-1.5 h-8"
            onChange={(e) => {
              setIsopen2(e.target.checked)
            }}
          >
            Unlimited
          </Checkbox>
        </div>
      </Form.Item>
    </div>
  )
}

export default RuleSettings
