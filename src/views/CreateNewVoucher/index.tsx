import { ContentContainer } from '@/components/ui'
import { Button, Form, message } from 'antd'
import { useEffect, useState } from 'react'
import BasicInformation from './components/BasicInformation'
import RuleSettings from './components/RuleSettings'
import ApplicableProducts from './components/ApplicableProducts'
import './Style.less'
import { createVoucher, updateVoucher } from '@/framework/api/voucher'
import moment from 'moment'
import { useLocation, useNavigate } from 'react-router'

const CreateNewVoucher = () => {
  const navigator = useNavigate()
  const { state }: any = useLocation()
  const [VoucherType, setVoucherType] = useState('SHOP_VOUCHER')
  const [PriceOpen, setPriceOpen] = useState(false)
  const [usageQuantityOpen, setusageQuantityOpen] = useState(false)
  const [price, setPrice] = useState<string | number>('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (state) {
      console.log('state', state)
      setVoucherType(state.voucherType)
      state.minimumBasketPrice ? setPrice(state.minimumBasketPrice) : setPriceOpen(true)
      state.usageQuantity || setusageQuantityOpen(true)
      setImageUrl(state.voucherDefaultImage)
    }
  }, [state])

  return (
    <ContentContainer>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
        className="CreateNewVoucher"
        initialValues={
          state || {
            discountType: 'FIX_AMOUNT',
            isLimitedQuantity: false,
          }
        }
        onFinish={async (v) => {
          try {
            v.voucherUsageBeginningOfTime = moment(v.times[0]).utc().format()
            v.voucherUsageEndOfTime = moment(v.times[1]).utc().format()
            v.voucherDefaultImage = v.Image.file.response.url
            v.voucherType = VoucherType
            delete v.times
            delete v.Image
            for (const key in v) {
              const item = v[key]
              if (!item) {
                delete v[key]
              }
            }
            v.discountValue = '' + v.discountValue
            // v.minimumBasketPrice = Math.round(Number(v.minimumBasketPrice) * 100) / 100
            v.minimumBasketPrice = 1222
            let res = undefined
            if (!state) {
              res = await createVoucher(v)
            } else {
              delete state.isDeleted
              res = updateVoucher({ ...state, ...v })
            }
            console.log('v',v)
            // if (!res) {
            //   console.log('res', res)
            //   throw new Error('失败')
            // }
            // message.success({ className: 'rc-message', content: 'Operation success' })
            // navigator('/marketingCentre/vouchers')
          } catch (err) {
            message.error({ className: 'rc-message', content: 'Operation failed' })
          }
        }}
      >
        <BasicInformation
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          VoucherType={VoucherType}
          setVoucherType={setVoucherType}
        />
        <RuleSettings
          PriceOpen={PriceOpen}
          setPriceOpen={setPriceOpen}
          usageQuantityOpen={usageQuantityOpen}
          setusageQuantityOpen={setusageQuantityOpen}
          price={price}
          setPrice={setPrice}
        />
        <ApplicableProducts VoucherType={VoucherType} />
        <Form.Item className="w-full flex items-center justify-end py-8">
          <div className="flex items-center justify-end">
            <Button htmlType="button" onClick={() => navigator('/marketingCentre/vouchers')}>
              Cancel
            </Button>
            <Button className="ml-4" type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </ContentContainer>
  )
}

export default CreateNewVoucher
