import { ContentContainer } from '@/components/ui'
import { Button, Form, message } from 'antd'
import { useEffect, useState } from 'react'
import BasicInformation from './components/BasicInformation'
import RuleSettings from './components/RuleSettings'
import ApplicableProducts from './components/ApplicableProducts'
import './Style.less'
import { createVoucher, getVoucherById, updateVoucher } from '@/framework/api/voucher'
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [DiscountType, setDiscountType] = useState('FIX_AMOUNT')

  const getvoucherDetails = async (Id: string) => {
     let res = await getVoucherById(Id)
     console.log('res',res)
  }

  useEffect(() => {
    if (state) {
      console.info('state', state)
      getvoucherDetails(state.id)
      setVoucherType(state.voucherType)
      state.minimumBasketPrice ? setPrice(state.minimumBasketPrice) : setPriceOpen(true)
      state.usageQuantity || setusageQuantityOpen(true)
      setImageUrl(state.voucherDefaultImage)
      setDiscountType('PERCENTAGE')
    }
  }, [state])

  return (
    <ContentContainer>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
        className="CreateNewVoucher"
        initialValues={
          state ?
          {
            ...state,
            Image: { file:{response:{url:state?.voucherDefaultImage || ''}} },
            recurrence: state.discountType !== 'FIX_AMOUNT' ? '' : state.recurrence
          } : {
            discountType: 'FIX_AMOUNT',
            isLimitedQuantity: false,
          }
        }
        onFinish={async (v) => {
          try {
            console.log('v',v)
            v.voucherUsageBeginningOfTime = moment(v.times[0]).utc().format()
            v.voucherUsageEndOfTime = moment(v.times[1]).utc().format()
            v.voucherDefaultImage = v.Image.file.response.url
            v.voucherType = VoucherType
            if(state) {
              v.voucherGoodsRelated = selectedRowKeys.length ? selectedRowKeys.map(item => ({
                operator: 'zz',
                goodsId: item,
                storeId: '123456',
                voucherId: state.id
              })) : ''
            } else {
              v.voucherGoodsRelated = selectedRowKeys.length ? selectedRowKeys.map(item => ({
                operator: 'zz',
                goodsId: item,
                storeId: '123456'
              })) : ''
            }
            v.minimumBasketPrice = Math.round(Number(v.minimumBasketPrice) * 100) / 100 || 0
            v.usageQuantity = v.usageQuantity || 0
            v.discountValue = '' + v.discountValue
            delete v.times
            delete v.Image
            state && (v = {...state, ...v})
            for (const key in v) {
              const item = v[key]
              if (!item && typeof item !== 'boolean' && item !== 0) {
                delete v[key]
              }
            }
            console.log('v',v)
            let res = undefined
            if (!state) {
              v.voucherStatus = 'Upcoming'
              res = await createVoucher(v)
            } else {
              delete v.isDeleted
              res = await updateVoucher(v)
            }
            if (!res) {
              console.log('res', res)
              throw new Error('失败')
            }
            message.success({ className: 'rc-message', content: 'Operation success' })
            navigator('/marketingCentre/vouchers')
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
          DiscountType={DiscountType}
          setDiscountType={setDiscountType}
        />
        <ApplicableProducts VoucherType={VoucherType} setSelectedRowKeys={setSelectedRowKeys} />
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
