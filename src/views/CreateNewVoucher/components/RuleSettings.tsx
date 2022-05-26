/**
 * @dataverification
 * 此部分页面逻辑较为(混乱)复杂，如遇问题，请使用www.baidu.com | 联系chhd !!!
 */

import { Typography, Form, Select, Checkbox, InputNumber } from 'antd'
import { useState } from 'react'
const { Title } = Typography

type RuleSettingsType = {
  PriceOpen: boolean
  setPriceOpen: Function
  usageQuantityOpen: boolean
  setusageQuantityOpen: Function
  price: string | number
  setPrice: Function
  DiscountType: string
  setDiscountType: Function
}

const OrderType = [
  { label: 'All', value: 'ALL' },
  { label: 'Single Order', value: 'SING_ORDER' },
  { label: 'Normal Subscription', value: 'NORMAL_SUBSCRIPTION' },
]

const voucherType = [
  { label: 'Fix Amount', value: 'FIX_AMOUNT' },
  { label: 'By Percentage', value: 'PERCENTAGE' },
]

const RuleSettings = ({
  PriceOpen,
  usageQuantityOpen,
  setPriceOpen,
  setusageQuantityOpen,
  price,
  setPrice,
  DiscountType,
  setDiscountType,
}: RuleSettingsType) => {
  const [AmountOpen, setAmountOpen] = useState(true)
  const [MinimumBasketPrice, setMinimumBasketPrice] = useState<string | number>('')
  const [UsageQuantity, setUsageQuantity] = useState<string | number>('')

  return (
    <div className="bg-white px-4 RuleSettings">
      <Title className="m-0 mb-8" level={4}>
        Rule Settings
      </Title>
      <Form.Item
        label="Order Type"
        name="orderType"
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
        label="Discount Type | Amount"
        className={`${AmountOpen ? '' : 'mb-20'}`}
        wrapperCol={{ span: 10 }}
        shouldUpdate={(prevValues, curValues) => prevValues.discountType !== curValues.discountType}
        required
      >
        {({ setFieldsValue, validateFields }) => {
          return (
            <div className="flex items-center border border-gray-300 border-solid">
              <Form.Item name="discountType" className="m-0 h-8" wrapperCol={{ span: 'auto' }}>
                <Select
                  className="Selectborder"
                  placeholder="Select"
                  onChange={(v) => {
                    setAmountOpen(true)
                    setFieldsValue({
                      discountValue: '',
                    })
                    setDiscountType(v)
                    if (v === 'PERCENTAGE') {
                      setFieldsValue({
                        Recurrence: '',
                      })
                      validateFields(['Recurrence'])
                      price && validateFields(['minimumBasketPrice'])
                    }
                  }}
                  options={voucherType}
                />
              </Form.Item>
              {DiscountType !== 'PERCENTAGE' ? (
                <>
                  <span className="w-8 text-center border-l border-r">￥</span>
                  <Form.Item
                    name="discountValue"
                    className="m-0 flex-1 h-8 Amount1"
                    rules={[
                      {
                        required: true,
                        message: 'Please input',
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(v) => {
                        price && validateFields(['minimumBasketPrice'])
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
                    name="discountValue"
                    className="m-0 flex-1 h-8 Amount2"
                    rules={[
                      {
                        validator: (_, value) => {
                          return value <= 60
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error('Please note that the discount amount is > 60% of min basket price'),
                              )
                        },
                        warningOnly: true,
                      },
                      {
                        validator: (_, value) => {
                          const v = Number(value) || 0
                          return v > 0 && v < 99
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
        label="Recurrence"
        name="recurrence"
        rules={[
          {
            required: DiscountType === 'FIX_AMOUNT',
            message: 'Pless Select',
          },
        ]}
      >
        <Select
          placeholder="Select"
          disabled={DiscountType !== 'FIX_AMOUNT'}
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 'auto' }} label="Minimum Basket Price" required={!PriceOpen} shouldUpdate={true}>
        {({ validateFields, getFieldValue, setFieldsValue }) => (
          <div className="flex w-full">
            <Form.Item
              className="m-0"
              style={{ width: '32%' }}
              name="minimumBasketPrice"
              wrapperCol={{ span: 'auto' }}
              rules={[
                {
                  required: !PriceOpen,
                  message: 'Pless Input',
                },
                {
                  validator: (_, value) => {
                    const price = Number(value) || 0
                    const Amount = getFieldValue('discountValue') || 0
                    const Bool = (DiscountType !== 'FIX_AMOUNT') || PriceOpen || (price >= Amount)
                    return Bool
                      ? Promise.resolve()
                      : Promise.reject(new Error('Voucher discount amount cannot exceed min. spend required'))
                  },
                },
              ]}
            >
              <div className="flex">
                <span className="bg-gray-100 text-gray-400 w-10 text-center border border-l-0 flex items-center justify-center border-l">
                  ￥
                </span>
                <InputNumber
                  value={price}
                  onChange={(v) => {
                    setPrice(v)
                    const price = (Number(v) * 0.6).toFixed(2) || 0
                    setMinimumBasketPrice(price)
                    validateFields(['discountValue'])
                    const Amount = getFieldValue('discountValue')
                    if (DiscountType !== 'FIX_AMOUNT') {
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
                  disabled={PriceOpen}
                />
              </div>
            </Form.Item>
            <Checkbox
              className="ml-4 mt-1.5 h-8"
              checked={PriceOpen}
              onChange={(e) => {
                const Amount = getFieldValue('discountValue')
                setPriceOpen(e.target.checked)
                if (e.target.checked) {
                  setFieldsValue({
                    minimumBasketPrice: '',
                  })
                  setPrice('')
                  setAmountOpen(true)
                } else {
                  if (Amount > MinimumBasketPrice) {
                    setAmountOpen(false)
                  } else {
                    setAmountOpen(true)
                  }
                }
                validateFields(['discountValue', 'minimumBasketPrice'])
              }}
            >
              Unlimited
            </Checkbox>
          </div>
        )}
      </Form.Item>
      <Form.Item
        label="Usage Quantity"
        extra="Total usable voucher for all buyers"
        required={!usageQuantityOpen}
        shouldUpdate={(prevValues, curValues) => prevValues.usageQuantity !== curValues.usageQuantity}
      >
        {({ setFieldsValue }) => (
          <div className="flex w-full">
            <Form.Item
              className="m-0"
              name="usageQuantity"
              wrapperCol={{ span: 'auto' }}
              rules={[
                {
                  required: !usageQuantityOpen,
                  message: 'Pless Input',
                },
              ]}
            >
              <InputNumber
                value={UsageQuantity}
                onChange={(v) => setUsageQuantity(v)}
                placeholder="Input"
                step='0'
                parser={(v) => v ? parseInt(v) : ''}
                className="w-72"
                disabled={usageQuantityOpen}
              />
            </Form.Item>
            <Form.Item className="m-0" name="isLimitedQuantity" wrapperCol={{ span: 'auto' }}>
              <Checkbox
                className="ml-4 mt-1.5 h-8"
                checked={usageQuantityOpen}
                onChange={(e) => {
                  setusageQuantityOpen(e.target.checked)
                  if (e.target.checked) {
                    setUsageQuantity('')
                    setFieldsValue({
                      usageQuantity: '',
                    })
                  }
                }}
              >
                Unlimited
              </Checkbox>
            </Form.Item>
          </div>
        )}
      </Form.Item>
    </div>
  )
}

export default RuleSettings
