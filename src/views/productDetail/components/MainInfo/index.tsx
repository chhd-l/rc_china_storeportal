import './index.less'
import { Alert, Anchor, message, Modal, Image } from 'antd'
import { useLocation } from 'react-router-dom'
import { Form, Space, Button } from 'antd'
import { FC, useContext, useEffect, useState } from 'react'
import { headerOrigition, steps } from '../../modules/constant'
import { InfoContainer, DivideArea } from '@/components/ui'
import { DetailContext } from '../../index'
import { createProduct, switchShelves } from '@/framework/api/get-product'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
interface MainInfoProps {
  details: any
  beforeData: any
  showCatePop: boolean
  cateInfo?: {
    cateId: string[]
  }
}

const { Link } = Anchor
let shelvesStatus: any = undefined
const MainInfo: FC<MainInfoProps> = ({ cateInfo, showCatePop, children, beforeData }) => {
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const [tipsIdx, setTipsIdx] = useState(0)
  const [userInfo] = useAtom(userAtom)
  const [imgUrl, setImgUrl] = useState('')

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
          if (el?.[keyName] || el?.[keyName] === 0) {
            // console.info('has name', keyName)
          } else {
            console.info('no name', keyName)
            if (
              (keyName === 'subscriptionPrice' && el.subscriptionStatus === '0') ||
              (keyName === 'stock' && el.stock !== undefined && el.stock !== null)
            ) {
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
    // let withoutSku = detail.id ? !detail.variationForm?.variationList?.length : !detail.productSpecificationsInput?.length
    let withoutSku =
      Array.from(document.getElementsByClassName('get-variation-name'))
        .filter((el: any) => el.value !== undefined)
        ?.filter(el => !el.className.includes('hidden'))?.length === 0
    let noDataErrMsg = ''
    // 校验name
    let productSpecificationsNameArr: any = Array.from(document.getElementsByClassName('get-variation-name'))
      .filter((el: any) => el.value !== undefined)
      ?.filter(el => !el.className.includes('hidden'))
      .map((el: any) => el.value)
    productSpecificationsNameArr?.forEach((el: any) => {
      if (el === '') {
        noDataErrMsg = 'Please input Specification Name'
      }
    })
    let productSpecificationsDetailArr: any = Array.from(document.getElementsByClassName('get-variation-option'))
      .filter((el: any) => el.value !== undefined)
      ?.filter(el => !el.className.includes('hidden'))
      .map((el: any) => el.value)
    if (!noDataErrMsg) {
      // 校验option

      productSpecificationsDetailArr?.forEach((el: any) => {
        if (el === '') {
          noDataErrMsg = 'Please input Specification Option'
        }
      })
    }
    //校验sku
    if (!withoutSku) {
      if (!noDataErrMsg) {
        let variantsKeyLableRel: any = {}
        headerOrigition
          .filter((el: any) => el.required)
          .map((el: any) => {
            variantsKeyLableRel[el.keyVal] = el.label
          })
        noDataErrMsg =
          detail.productVariantsInput?.length && validateNullData(detail.productVariantsInput, variantsKeyLableRel)
      }
      if (noDataErrMsg) {
        message.error({ className: 'rc-message', content: noDataErrMsg })
        console.info('....', noDataErrMsg)
        return
      }
      let repeatErrMsg = ''
      let repeatNameArr: any = []
      let repeatOptionArr: any = []
      console.info('productSpecificationsNameArr', productSpecificationsNameArr)
      console.info('productSpecificationsDetailArr', productSpecificationsDetailArr)
      // //校验同一个商品的option需要判断是否重复 不区分大小写，规格名称不能重复
      productSpecificationsNameArr?.forEach((el: any) => {
        let name = el?.toLowerCase()
        if (repeatNameArr.includes(name)) {
          repeatErrMsg = 'Name repeat'
          return
        }
        repeatNameArr.push(name)
      })
      if (!repeatErrMsg) {
        productSpecificationsDetailArr?.forEach((el: any) => {
          let name = el?.toLowerCase()
          if (repeatOptionArr.includes(name)) {
            repeatErrMsg = 'Option repeat'
            return
          }
          repeatOptionArr.push(name)
        })
      }
      // 同一spu下，sku丶sku name丶ean需要唯一
      if (detail.productVariantsInput) {
        if (!repeatErrMsg) {
          repeatErrMsg = validateRepeat(detail.productVariantsInput, 'skuNo', 'SkuNo repeat')
        }
        if (!repeatErrMsg) {
          repeatErrMsg = validateRepeat(detail.productVariantsInput, 'skuName', 'SkuName repeat')
        }
        if (!repeatErrMsg) {
          repeatErrMsg = validateRepeat(detail.productVariantsInput, 'eanCode', 'EanCode repeat')
        }
      }
      if (repeatErrMsg) {
        message.error({ className: 'rc-message', content: repeatErrMsg })
        console.info('....', repeatErrMsg)
        return
      }
    }

    let params = Object.assign({}, detail, values, {
      type: spuType,
      // operator: userInfo?.username || 'system',
    })
    if (typeof shelvesStatus !== 'undefined') {
      params.shelvesStatus = shelvesStatus
    }
    // 处理删除新增option的时候sku没有被同步删除
    if (detail.id) {
      let specificationDetailList: any = []
      detail.variationForm?.variationList?.map((el: any) => {
        let detailList = el.specificationList
        if (detailList) {
          specificationDetailList.push(...detailList)
        }
      })
      let deletedSkuIdx: number[] = []
      if (detail.editChange?.productVariants?.length) {
        detail.editChange.productVariants?.forEach((el: any, idx: number) => {
          el?.specificationRelations?.forEach((specEl: any, specIdx: number) => {
            debugger
            let inData = specificationDetailList.find(
              (detailEl: any) => detailEl.option == specEl.specificationDetailName,
            )
            debugger
            if (!inData) {
              deletedSkuIdx.push(idx)
            }
          })
        })
        for (let i = detail.editChange.productVariants?.length; i > -1; i--) {
          if (deletedSkuIdx.find((deleteIdx: number) => deleteIdx === i)) {
            detail.editChange.productVariants.splice(i, 1)
          }
        }
      }
    }
    debugger
    if (withoutSku) {
      params.productVariantsInput = [
        {
          // skuNo: 'test0001', //to do
          // isWithoutSku:true,
          shelvesStatus: 'true', //没有sku默认上架
          subscriptionPrice: values.subscriptionPrice,
          subscriptionStatus: values.subscriptionStatus,
          stock: values.stock,
          listPrice: Number(values.listPrice),
          marketingPrice: Number(values.marketingPrice),
          feedingDays: Number(values.feedingDays),
          isSupport100: values.isSupport100,
          id: detail.skuId,
          defaultImage:
            values?.productAsserts?.find((el: any) => el.url)?.url ||
            'https://dtc-platform.oss-cn-shanghai.aliyuncs.com/static/Non_photo.png',
          variantBundles: detail.variantBundles?.map((el: any) => {
            let bundleInfo = {
              bundleNumber: el.bundleNumber,
              id: el.id,
              variantId: el.variantId || detail.skuId,
              subVariantId: el.subVariantId,
              skuNo: el.skuNo,
            }
            if (!el.variantId && !detail.skuId) {
              delete bundleInfo.variantId
            }
            if (!el.skuNo) {
              delete bundleInfo.skuNo
            }
            return bundleInfo
          }),
        },
      ]
      if (detail.variantBundles?.length) {
        params.productVariantsInput[0].variantBundles = detail.variantBundles
      }
      if (detail.id) {
        //编辑 全量
        if (!detail.editChange.productVariants) {
          detail.editChange.productVariants = params.productVariantsInput
        }
      }
    }
    console.info('.......')
    console.info('params', params)
    setLoading(true)
    let data = await createProduct(params, beforeData)
    console.info('data', data)
    if (typeof shelvesStatus !== 'undefined' && detail.id) {
      data = await switchShelves({ productId: [detail.id], status: shelvesStatus })
    }
    if (data === true) {
      message.success({ className: 'rc-message', content: 'Operate success' })
      navigator('/product/product-list')
      // } else {
      //   setLoading(false)
      //   message.error({ className: 'rc-message', content: 'Operate failed' })
    }
  }
  const showQrImg = () => {
    detail?.wxCodeUrl && setImgUrl(detail.wxCodeUrl)
  }
  console.info('shelvesStatusshelvesStatus', detail)
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
                        {detail?.id && detail?.salesStatus === '1' && detail?.shelvesStatus ? (
                          <div>{steps?.[idx]?.rightSlot?.(showQrImg)}</div>
                        ) : null}
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
                    // shelvesStatus = true
                    debugger
                    console.info('shelvesStatus', shelvesStatus)
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
      {imgUrl ? (
        <Modal
          visible={!!imgUrl}
          closable={false}
          onCancel={() => {
            setImgUrl('')
          }}
          footer={null}
        >
          <Image src={imgUrl} width='100%' height='100%' preview={false} />
        </Modal>
      ) : null}
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
