import './index.less'
import { Alert, Anchor, message } from 'antd'
import { useLocation } from 'react-router-dom'
import { Form, Space, Button } from 'antd'
import { FC, useContext, useEffect, useState } from 'react'
import { headerOrigition, steps } from '../../modules/constant'
import { InfoContainer, DivideArea } from '@/components/ui'
import { DetailContext } from '../../index'
import { createProduct } from '@/framework/api/get-product'
import { useNavigate } from 'react-router-dom'
interface MainInfoProps {
  details: any
  beforeData: any
  showCatePop: boolean
  cateInfo?: {
    cateId: string[]
  }
}

const { Link } = Anchor
let shelvesStatus = true
const MainInfo: FC<MainInfoProps> = ({ cateInfo, showCatePop, children, beforeData }) => {
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const [tipsIdx, setTipsIdx] = useState(0)
  const { detail, spuType } = useContext(DetailContext)
  const navigator = useNavigate()
  const [dataTips, setDataTips] = useState('')
  const hanldeTips = (idx: number) => {
    setTipsIdx(idx)
  }
  const [info, setInfo] = useState<any>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    document.addEventListener(
      'click',
      e => {
        // @ts-ignore
        let str = e?.target?.closest('.tips-wrap')?.dataset?.tips || ''
        setDataTips(str)
      },
      false,
    )
  }, [])
  const validateRepeat = (data: any, keyVal: string, errMsg: string) => {
    let repeatErrMsg = ''
    let repeatArr: any = []
    data?.forEach((el: any) => {
      let name = el?.[keyVal]?.toLowerCase()
      if (repeatArr.includes(name)) {
        repeatErrMsg = errMsg
        return
      }
      repeatArr.push(name)
    })
    return repeatErrMsg
  }
  const validateNullData = (data: any, keyLableRel: any) => {
    // keyLableRel需要校验的字段key和lable数组
    let nodataKey: any = []
    let errMsg = ''
    data?.forEach((el: any) => {
      if (el) {
        Object.keys(keyLableRel)?.forEach(keyName => {
          if (el?.[keyName]) {
            // console.info('has name', keyName)
          } else {
            console.info('no name', keyName)
            if (keyName === 'subscriptionPrice' && el.subscriptionStatus === '0') {
              //特殊处理:订阅是no的时候，订阅价格非必填
            } else {
              nodataKey.push(keyName)
            }
          }
        })
      }
    })
    if (nodataKey.length) {
      let errKeyname = nodataKey[0]
      errMsg = `Please input ${keyLableRel[errKeyname]}`
    }
    return errMsg
  }
  const onFinish = async (values: any) => {
    console.info('shelvesStatus', shelvesStatus)
    //组装product数据
    console.log(values, detail)
    //校验规格名字
    // let errMsg =
    //   detail.goodsSpecificationsInput?.length &&
    //   validateNullData(detail.goodsSpecificationsInput, { name: 'Variation Name' })
    // //校验规格详情
    // if (!errMsg) {
    //   errMsg =
    //     detail.goodsSpecificationsInput?.length &&
    //     detail.goodsSpecificationsInput.map((el: any) => {
    //       return validateNullData(el.specificationList, { option: 'Variation Option' })
    //     })
    // }
    // if (detail.id && !errMsg) {
    //   //校验规格 没同步add的，有问题，先兼容
    //   errMsg = detail?.editChange?.goodsVariants?.map((el: any) => {
    //     return validateNullData(el, { specificationName: 'Variation Name' })
    //   })
    //   if (!errMsg) {
    //     errMsg = detail?.editChange?.goodsVariants?.map((el: any) => {
    //       return el.goodsSpecificationDetail.map((cel: any) =>
    //         validateNullData(cel, { specificationName: 'Variation Name' }),
    //       )
    //     })
    //   }
    // }
    let noDataErrMsg = ''
    // 校验name
    let goodsSpecificationsNameArr: any = Array.from(document.getElementsByClassName('get-variation-name'))
      .filter((el: any) => el.value !== undefined)
      .map((el: any) => el.value)
    goodsSpecificationsNameArr?.forEach((el: any) => {
      if (el === '') {
        noDataErrMsg = 'Please input Specification Name'
      }
    })
    let goodsSpecificationsDetailArr: any = Array.from(document.getElementsByClassName('get-variation-option'))
      .filter((el: any) => el.value !== undefined)
      .map((el: any) => el.value)
    if (!noDataErrMsg) {
      // 校验option

      goodsSpecificationsDetailArr?.forEach((el: any) => {
        if (el === '') {
          noDataErrMsg = 'Please input Specification Option'
        }
      })
    }
    //校验sku
    if (!noDataErrMsg) {
      let variantsKeyLableRel: any = {}
      headerOrigition
        .filter((el: any) => el.required)
        .map((el: any) => {
          variantsKeyLableRel[el.keyVal] = el.label
        })
      noDataErrMsg =
        detail.goodsVariantsInput?.length && validateNullData(detail.goodsVariantsInput, variantsKeyLableRel)
    }
    if (noDataErrMsg) {
      message.error({ className: 'rc-message', content: noDataErrMsg })
      console.info('....', noDataErrMsg)
      return
    }
    let repeatErrMsg = ''
    let repeatNameArr: any = []
    let repeatOptionArr: any = []
    console.info('goodsSpecificationsNameArr', goodsSpecificationsNameArr)
    console.info('goodsSpecificationsDetailArr', goodsSpecificationsDetailArr)
    // //校验同一个商品的option需要判断是否重复 不区分大小写，规格名称不能重复
    goodsSpecificationsNameArr?.forEach((el: any) => {
      let name = el?.toLowerCase()
      if (repeatNameArr.includes(name)) {
        repeatErrMsg = 'Name repeat'
        return
      }
      repeatNameArr.push(name)
    })
    if (!repeatErrMsg) {
      goodsSpecificationsDetailArr?.forEach((el: any) => {
        let name = el?.toLowerCase()
        if (repeatOptionArr.includes(name)) {
          repeatErrMsg = 'Option repeat'
          return
        }
        repeatOptionArr.push(name)
      })
    }
    // 同一spu下，sku丶sku name丶ean需要唯一
    if (detail.goodsVariantsInput) {
      if (!repeatErrMsg) {
        repeatErrMsg = validateRepeat(detail.goodsVariantsInput, 'skuNo', 'SkuNo repeat')
      }
      if (!repeatErrMsg) {
        repeatErrMsg = validateRepeat(detail.goodsVariantsInput, 'skuName', 'SkuName repeat')
      }
      if (!repeatErrMsg) {
        repeatErrMsg = validateRepeat(detail.goodsVariantsInput, 'eanCode', 'EanCode repeat')
      }
    }

    if (repeatErrMsg) {
      message.error({ className: 'rc-message', content: repeatErrMsg })
      console.info('....', repeatErrMsg)
      return
    }
    let params = Object.assign({}, detail, values, {
      type: spuType,
      shelvesStatus,
    })
    let withoutSku = detail.id ? !detail.variationForm?.variationList?.length : !detail.goodsSpecificationsInput?.length
    debugger
    if (withoutSku) {
      params.goodsVariantsInput = [
        {
          // skuNo: 'test0001', //to do
          // isWithoutSku: true,
          subscriptionPrice: values.subscriptionPrice,
          subscriptionStatus: values.subscriptionStatus,
          stock: values.stock,
          listPrice: Number(values.listPrice),
          marketingPrice: Number(values.marketingPrice),
          feedingDays: Number(values.feedingDays),
          isSupport100: values.isSupport100,
          id: detail.skuId,
          // defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
          goodsVariantBundleInfo: detail.goodsVariantBundleInfo?.map((el: any) => {
            let bundleInfo = {
              bundleNumber: el.bundleNumber,
              id: el.bunldeRelId,
              goodsVariantId: el.goodsVariantId,
              subGoodsVariantId: el.subGoodsVariantId || detail.skuId,
              skuNo: el.skuNo,
            }
            if (!el.goodsVariantId) {
              delete bundleInfo.goodsVariantId
            }
            if (!el.skuNo) {
              delete bundleInfo.skuNo
            }
            return bundleInfo
          }),
        },
      ]
      if (detail.goodsVariantBundleInfo?.length) {
        params.goodsVariantsInput[0].goodsVariantBundleInfo = detail.goodsVariantBundleInfo
      }
      if (detail.id) {
        //编辑 全量
        if (!detail.editChange.goodsVariants) {
          detail.editChange.goodsVariants = params.goodsVariantsInput
        }
      }
    }
    console.info('.......')
    console.info('params', params)
    setLoading(true)
    debugger
    let data = await createProduct(params, beforeData)
    console.info('data', data)
    if (data === true) {
      message.success({ className: 'rc-message', content: 'Operate success' })
      navigator('/product/product-list')
    } else {
      setLoading(false)
      message.error({ className: 'rc-message', content: 'Operate failed' })
    }
  }
  console.info('shelvesStatusshelvesStatus', beforeData)
  return (
    <div id={steps[0].anchor}>
      <div className={!showCatePop ? 'flex-1 MainInfo mr-48' : 'flex-1 MainInfo'}>
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
          initialValues={detail}
        >
          {children}
          {/* <Form.List name="product">
            {(fields) => (
              <> */}
          <div className={showCatePop ? 'hidden' : ''}>
            {steps.map((field, idx) => (
              <Space
                onClick={() => {
                  hanldeTips(idx)
                }}
                key={field.anchor}
                direction='vertical'
                className='flex'
              >
                <InfoContainer>
                  <div id={idx > 0 ? steps[idx].anchor : 'anchor-1'}>
                    <div>
                      <div className='flex justify-between  pb-2'>
                        <div className='font-black text-lg font-bold'>{steps[idx].title}</div>
                        <div>{steps[idx].rightSlot}</div>
                      </div>
                      {steps[idx].subTitle ? <div className='pb-4'>{steps[idx].subTitle}</div> : null}
                    </div>
                    {steps[idx].render(field, form)}
                  </div>
                </InfoContainer>
                <DivideArea />
              </Space>
            ))}
            {/* </>
            )}
          </Form.List> */}
            <div className='text-rigth flex justify-end fixed bottom-2 footerBtn'>
              <Button
                loading={loading}
                className='ml-4'
                onClick={() => {
                  navigator('/product/product-list')
                }}
              >
                Cancel
              </Button>
              {(beforeData.id && beforeData.shelvesStatus) || !beforeData.id ? (
                <Button
                  loading={loading}
                  className='ml-4'
                  onClick={() => {
                    shelvesStatus = false
                    form.submit()
                  }}
                >
                  {beforeData.id && beforeData.shelvesStatus && 'Delist'}
                  {!beforeData.id && 'Save and Delist'}
                </Button>
              ) : null}
              {(beforeData.id && !beforeData.shelvesStatus) || !beforeData.id ? (
                <Button
                  loading={loading}
                  className='ml-4'
                  type='primary'
                  onClick={() => {
                    debugger
                    shelvesStatus = true
                    form.submit()
                  }}
                >
                  {beforeData.id && !beforeData.shelvesStatus && 'Publish'}
                  {!beforeData.id && 'Save and Publish'}
                </Button>
              ) : null}
              {beforeData.id ? (
                <Button
                  loading={loading}
                  className='ml-4'
                  type='primary'
                  onClick={() => {
                    shelvesStatus = true
                    form.submit()
                  }}
                >
                  Update
                </Button>
              ) : null}
            </div>
          </div>
        </Form>
      </div>
      {info?.description ? (
        <Alert message={info.message} description={info.description} type={info.type} showIcon />
      ) : null}
      <div className={`w-48 fixed rc-anchor ${showCatePop ? 'hidden' : ''}`} style={{ top: '100px', right: '8%' }}>
        <Anchor affix={true} targetOffset={164} style={{ top: '64px' }}>
          {steps.map((step, idx) => (
            <Link key={step.anchor + idx} href={`#${step.anchor}`} title={step.title} />
          ))}
        </Anchor>
        {dataTips ? (
          <div className='mt-4 bg-yellow-100 text-yellow-700 px-2 py-4'>
            <div className='font-bold '>Tips</div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: dataTips }}></div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default MainInfo
