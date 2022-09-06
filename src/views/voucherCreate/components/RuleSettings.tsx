/**
 * @dataverification
 * 此部分页面逻辑较为(混乱)复杂，如遇问题，请使用www.baidu.com | 联系chhd !!!
 */

import { Checkbox, Form, InputNumber, Select, Typography } from 'antd'
import { useState } from 'react'
import intl from 'react-intl-universal'
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
  Edit: boolean | undefined
}

const OrderType = [
  { label: intl.get('voucher.orders.All'), value: 'ALL' },
  { label: intl.get('voucher.orders.SingleOrder'), value: 'SING_ORDER' },
  { label: intl.get('voucher.orders.NormalSubscription'), value: 'NORMAL_SUBSCRIPTION' },
]

const voucherType = [
  { label: intl.get('voucher.Fix Amount'), value: 'FIX_AMOUNT' },
  { label: intl.get('voucher.By Percentage'), value: 'PERCENTAGE' },
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
  Edit,
}: RuleSettingsType) => {
  const [AmountOpen, setAmountOpen] = useState(true)
  const [recurrence, setRecurrence] = useState(false)
  const [MinimumBasketPrice, setMinimumBasketPrice] = useState<string | number>('')
  const [UsageQuantity, setUsageQuantity] = useState<string | number>('')

  return (
    <div className="bg-white px-6 RuleSettings">
      <Title className="m-0 mb-8" level={4}>
        {intl.get('voucher.Rule Settings')}
      </Title>
      <Form.Item
        label={intl.get('voucher.orders.OrderType')}
        name="orderType"
        wrapperCol={{ span: 9 }}
        rules={[
          {
            required: true,
            message: intl.get('public.Please Select'),
          },
        ]}
      >
        <Select placeholder={intl.get('public.select')} disabled={Edit} options={OrderType} />
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Discount Type | Amount')}
        className={`${AmountOpen ? '' : 'mb-10'}`}
        wrapperCol={{ span: 9 }}
        shouldUpdate={(prevValues, curValues) => prevValues.discountType !== curValues.discountType}
        required
      >
        {({ setFieldsValue, validateFields }) => {
          return (
            <div
              className="flex items-center border border-gray-300 border-solid"
              style={{ borderRadius: '4px', backgroundColor: Edit ? '#f6f6f6' : '' }}
            >
              <Form.Item name="discountType" className="m-0 h-8" wrapperCol={{ span: 'auto' }}>
                <Select
                  className="Selectborder"
                  placeholder={intl.get('public.selects')}
                  disabled={Edit}
                  onChange={(v) => {
                    setAmountOpen(true)
                    setFieldsValue({
                      discountValue: '',
                    })
                    setDiscountType(v)
                    if (v === 'PERCENTAGE') {
                      setRecurrence(false)
                      setFieldsValue({
                        recurrence: false,
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
                  <span className={`text-gray-400 w-8 text-center border-l border-r ${Edit ? 'bg-gray-100' : ''}`}>
                    ￥
                  </span>
                  <Form.Item
                    name="discountValue"
                    className="m-0 flex-1 h-8 Amount1"
                    rules={[
                      {
                        required: true,
                        message: intl.get('public.Please Input'),
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(v) => {
                        price && validateFields(['minimumBasketPrice'])
                      }}
                      disabled={Edit}
                      placeholder={intl.get('public.input')}
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
                          const v = Number(value) || 0
                          return v > 0 && v < 100
                            ? Promise.resolve()
                            : Promise.reject(new Error(intl.get('voucher.Please enter a value between 1 and 99')))
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={(v) => {
                        if (v < 100) {
                          setAmountOpen(true)
                        } else {
                          setAmountOpen(false)
                        }
                      }}
                      controls={false}
                      disabled={Edit}
                      placeholder={intl.get('public.input')}
                      className="border-0 border-l rounded-none w-full"
                    />
                  </Form.Item>
                  <span
                    className={`text-gray-400 w-10 text-center h-8 flex items-center justify-center border-l ${
                      Edit ? 'bg-gray-100' : ''
                    }`}
                  >
                    %OFF
                  </span>
                </>
              )}
            </div>
          )
        }}
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Recurrence')}
        wrapperCol={{ span: 9 }}
        shouldUpdate={(prevValues, curValues) => prevValues.discountType !== curValues.discountType}
      >
        {({ getFieldValue, setFieldsValue }) => {
          const type = getFieldValue('discountType')
          return type === 'PERCENTAGE' || PriceOpen ? (
            <Form.Item className="m-0">
              <Select
                placeholder={intl.get('public.select')}
                value={false}
                disabled={Edit || PriceOpen || DiscountType !== 'FIX_AMOUNT'}
                options={[{ label: intl.get('public.no'), value: false }]}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="recurrence"
              className="m-0"
              rules={[
                {
                  required: DiscountType === 'FIX_AMOUNT',
                  message: intl.get('voucher.Please Select'),
                },
              ]}
            >
              <Select
                placeholder={intl.get('public.select')}
                disabled={Edit || DiscountType !== 'FIX_AMOUNT'}
                onChange={(v) => {
                  setRecurrence(v)
                  if (v) {
                    setFieldsValue({
                      minimumBasketPrice: '',
                    })
                  }
                }}
                options={[
                  { label: intl.get('public.yes'), value: true },
                  { label: intl.get('public.no'), value: false },
                ]}
              />
            </Form.Item>
          )
        }}
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Minimum Basket Price')}
        wrapperCol={{ span: 9 }}
        required={!PriceOpen}
        shouldUpdate={true}
      >
        {({ validateFields, getFieldValue, setFieldsValue }) => (
          <div className="flex w-full">
            <Form.Item
              className="m-0 w-full"
              name="minimumBasketPrice"
              rules={[
                {
                  required: !PriceOpen,
                  message: intl.get('voucher.Please Input'),
                },
                {
                  validator: (_, value) => {
                    const price = Number(value) || 0
                    const Amount = getFieldValue('discountValue') || 0
                    const Bool = DiscountType !== 'FIX_AMOUNT' || PriceOpen || price >= Amount
                    return Bool
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(intl.get('voucher.The price cannot be less than the voucher discount amount.')),
                        )
                  },
                },
              ]}
            >
              <div className="flex">
                <span
                  className="bg-gray-100 text-gray-400 w-10 text-center border border-l-0 flex items-center justify-center border-l"
                  style={{
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                  }}
                >
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
                      if (Amount > 100 && Amount > price) {
                        setAmountOpen(false)
                      } else {
                        setAmountOpen(true)
                      }
                    }
                  }}
                  controls={false}
                  placeholder={intl.get('public.input')}
                  className="w-full rounded-l-none"
                  disabled={Edit || PriceOpen}
                />
              </div>
            </Form.Item>
            <Checkbox
              className="ml-4 mt-1.5 h-8"
              checked={PriceOpen}
              disabled={Edit || recurrence}
              onChange={(e) => {
                const Amount = getFieldValue('discountValue')
                setPriceOpen(e.target.checked)
                if (e.target.checked) {
                  setFieldsValue({
                    minimumBasketPrice: '',
                    recurrence: false,
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
              {intl.get('voucher.Unlimited')}
            </Checkbox>
          </div>
        )}
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Usage Quantity')}
        wrapperCol={{ span: 9 }}
        extra={intl.get('voucher.Total usable voucher for all pet owners')}
        required={!usageQuantityOpen}
        className="m-0"
        shouldUpdate={(prevValues, curValues) => prevValues.usageQuantity !== curValues.usageQuantity}
      >
        {({ setFieldsValue, validateFields }) => (
          <div className="flex w-full">
            <Form.Item
              className="m-0 w-full"
              name="usageQuantity"
              wrapperCol={{ span: 'auto' }}
              rules={[
                {
                  required: !usageQuantityOpen,
                  message: intl.get('voucher.Please Input'),
                },
              ]}
            >
              <InputNumber
                min={1}
                value={UsageQuantity}
                onChange={(v) => setUsageQuantity(v)}
                placeholder={intl.get('public.input')}
                controls={false}
                className="w-full"
                parser={(v) => (v ? parseInt(v) : '')}
                disabled={Edit || usageQuantityOpen}
              />
            </Form.Item>
            <Form.Item className="m-0" name="isLimitedQuantity">
              <Checkbox
                className="ml-4 mt-1.5 h-8"
                checked={usageQuantityOpen}
                disabled={Edit}
                onChange={(e) => {
                  setusageQuantityOpen(e.target.checked)
                  setFieldsValue({
                    isLimitedQuantity: e.target.checked,
                  })
                  validateFields(['usageQuantity'])
                  if (e.target.checked) {
                    setUsageQuantity('')
                    setFieldsValue({
                      usageQuantity: '',
                    })
                  }
                }}
              >
                {intl.get('voucher.Unlimited')}
              </Checkbox>
            </Form.Item>
          </div>
        )}
      </Form.Item>
    </div>
  )
}

export default RuleSettings
