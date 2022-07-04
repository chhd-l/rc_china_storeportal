import { ContentContainer } from '@/components/ui'
import { Button, Form, message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import BasicInformation from './components/BasicInformation'
import RuleSettings from './components/RuleSettings'
import ApplicableProducts from './components/ApplicableProducts'
import { normaliseVoucherProduct } from '@/framework/normalize/voucher'
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
  const [keys, setkeys] = useState<string[]>([])
  const [DiscountType, setDiscountType] = useState('FIX_AMOUNT')
  const [selectProducts, setSelectProducts] = useState([])
  const [spinning, setSpinning] = useState(false)

  //编辑voucher商品回显 voucher detail里的productInfoList
  const getvoucherDetails = async (Id: string) => {
    try {
      setSpinning(true)
      let res = await getVoucherById(Id)
      state.displayOnShop = res.displayOnShop
      state.usageQuantity = res.usageQuantity
      const arr: string[] = []
      res.productInfoList.forEach((item: any) => {
        arr.push(item.id)
      })
      setkeys(arr)
      const vlue = normaliseVoucherProduct(res.productInfoList)
      setSelectProducts(vlue)
      setSpinning(false)
    } catch(err) {
      console.log('err',err)
      setSpinning(false)
    }
  }

  useEffect(() => {
    if (state) {
      getvoucherDetails(state.id)
      setVoucherType(state.voucherType)
      state.minimumBasketPrice ? setPrice(state.minimumBasketPrice === 0 ? '' : state.minimumBasketPrice) : setPriceOpen(true)
      state.usageQuantity || setusageQuantityOpen(true)
      setImageUrl(state.voucherDefaultImage)
      setDiscountType(state.discountType)
    }
  }, [state])

  const scrollTop = () => document.documentElement.scrollTop = 0
  useEffect(() => {
    scrollTop()
  }, [])

  return (
    <ContentContainer className="mb-4">
      <Spin spinning={spinning} className="CreateNewVoucherSpin">
        {
          (!spinning) ? (
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              className="CreateNewVoucher"
              initialValues={
                state
                  ? {
                      ...state,
                      Image: { file: { response: { url: state?.voucherDefaultImage || '' } } },
                      recurrence: state.discountType !== 'FIX_AMOUNT' ? '' : state.recurrence,
                      usageQuantity: state.usageQuantity === 0 ? '' : state.usageQuantity,
                      minimumBasketPrice: state.minimumBasketPrice === 0 ? '' : state.minimumBasketPrice,
                    }
                  : {
                      discountType: 'FIX_AMOUNT',
                      displayOnShop: false,
                    }
              }
              onFinish={async (v) => {
                try {
                  // setSpinning(true)
                  console.log('v',v)
                  v.voucherUsageBeginningOfTime = moment(v.times[0]).utc().format()
                  v.voucherUsageEndOfTime = moment(v.times[1]).utc().format()
                  v.voucherDefaultImage = v.Image?.file?.response?.url || ''
                  v.voucherType = VoucherType
                  v.minimumBasketPrice = Math.round(Number(v.minimumBasketPrice) * 100) / 100 || 0
                  v.usageQuantity = v.usageQuantity || 0
                  v.discountValue = '' + v.discountValue
                  v.isLimitedQuantity = !!v.isLimitedQuantity
                  if (VoucherType === 'SHOP_VOUCHER') {
                    v.voucherProductRelated = []
                  } else {
                    if (state) {
                      v.voucherProductRelated = keys.length
                        ? keys.map((item) => ({
                            productId: item,
                            voucherId: state.id,
                          }))
                        : ''
                    } else {
                      v.voucherProductRelated = keys.length
                        ? keys.map((item) => ({
                            productId: item,
                          }))
                        : ''
                    }
                  }
                  delete v.times
                  delete v.Image
                  delete v.Edit
                  state && (v = { ...state, ...v })
                  for (const key in v) {
                    const item = v[key]
                    if (!item && typeof item !== 'boolean' && item !== 0) {
                      delete v[key]
                    }
                  }
                  let res = undefined
                  if (!state) {
                    v.voucherStatus = 'Upcoming'
                    res = await createVoucher(v)
                  } else {
                    delete v.isDeleted
                    res = await updateVoucher(v)
                  }
                  if (!res) {
                    throw new Error()
                  }
                  setSpinning(false)
                  message.success({ className: 'rc-message', content: 'Operation success' })
                  navigator('/marketingCenter/vouchers')
                } catch (err) {
                  console.log('err',err)
                  setSpinning(false)
                }
              }}
            >
              <BasicInformation
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                VoucherType={VoucherType}
                setVoucherType={setVoucherType}
                Edit={state?.Edit}
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
                Edit={state?.Edit}
              />
              <ApplicableProducts
                VoucherType={VoucherType}
                keys={keys}
                setkeys={setkeys}
                selectProducts={selectProducts}
                setSelectProducts={setSelectProducts}
                Edit={state?.Edit}
              />
              <Form.Item className="w-full flex items-center justify-end py-8">
                <div className="flex items-center justify-end">
                  <Button htmlType="button" onClick={() => navigator('/marketingCenter/vouchers')}>
                    Cancel
                  </Button>
                  {!state?.Edit ? (
                    <Button className="ml-4" type="primary" htmlType="submit">
                      Confirm
                    </Button>
                  ) : null}
                </div>
              </Form.Item>
            </Form>
          ) : null
        }
      </Spin>
    </ContentContainer>
  )
}

export default CreateNewVoucher
