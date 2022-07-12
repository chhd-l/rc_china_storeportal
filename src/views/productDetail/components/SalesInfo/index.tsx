import FormItem from '@/components/common/FormItem'
import { FormProps } from '@/framework/types/common'
import { noSkuForm } from '../../modules/constant'
import { createContext, useContext, useEffect, useState } from 'react'
import AddVariation from '../AddVariation'
import EditVariationList from '../EditVariationList'
import { DetailContext } from '../../index'
import { VarationsFormProps } from '@/framework/types/product'
import { Form, Input, InputNumber } from 'antd'
import BundleSubSKuPop from '../BundleSubSKuPop'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import './index.less'
import { debug } from 'console'
interface ContextProps {
  variationForm: VarationsFormProps
  setVariationForm: () => void
  form: any
}
export const VariationosContext = createContext(null as any)
// let deletedBundles: any = []
const SalesInfo = (props: FormProps) => {
  const { detail, spuType } = useContext(DetailContext)
  const [variationForm, setVariationForm] = useState<any>({
    variationList: [],
  })
  const [regularList, setRegularList] = useState<Array<any>>([])
  const [showBundleChoose, setShowBundleChoose] = useState(false)
  const [noSkuFormList, setNoSkuFormList] = useState(noSkuForm)

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  useEffect(() => {
    if (detail.variationForm) {
      setVariationForm(detail.variationForm)
    }
  }, [detail.variationForm])
  const chooseBundleSku = (choosedSku: any) => {
    console.info('.....choosedSku', choosedSku)
    // let deletedArr =
    //   regularList
    //     ?.filter(el => {
    //       let deletedArr =
    //         choosedSku.findIndex((choosed: any) => choosed.subVariantId === el.subVariantId) === -1
    //       return deletedArr
    //     })
    //     ?.filter(el => el.bunldeRelId) || []
    // //存储删除的
    // // deletedBundles = [...deletedBundles, ...deletedArr]
    // console.info('deletedArr', deletedArr)
    //匹配选择已输入的数量
    regularList.forEach(oldSku => {
      choosedSku.forEach((newSku: any) => {
        if (oldSku.subVariantId === newSku.subVariantId) {
          newSku.bundleNumber = oldSku.bundleNumber || 1
        }
      })
    })
    // 数量没有值的赋值1
    choosedSku.forEach((el: any) => {
      el.bundleNumber = el.bundleNumber || 1
    })
    console.info('choosedSku', choosedSku)
    setRegularList(choosedSku)
    validateNumber(choosedSku)
  }
  const onChange = (val: number, idx: number) => {
    if (!detail.variantBundles) {
      detail.variantBundles = []
    }
    if (!detail.variantBundles[idx]) {
      detail.variantBundles[idx] = {}
    }

    detail.variantBundles[idx].bundleNumber = val
    regularList[idx].bundleNumber = val
    if (regularList[idx].id) {
      //编辑
      detail.variantBundles[idx].id = regularList[idx].id
      detail.variantBundles[idx].variantId = detail.skuId
    } else {
      //新增
      detail.variantBundles[idx].subVariantId = regularList[idx].subVariantId
      detail.variantBundles[idx].skuNo = regularList[idx].skuNo
    }
    setRegularList([...regularList])
    validateNumber(regularList)
  }
  const handleDelete = (idx: number) => {
    if (regularList[idx].id) {
      regularList[idx].isDeleted = true
      // deletedBundles = [...deletedBundles, regularList[idx]]
    } else {
      regularList.splice(idx, 1)
    }
    setRegularList([...regularList])
    validateNumber(regularList)
  }
  const validateNumber = (regularList: any) => {
    //useEffect 没反应，手动监听
    let regularData = regularList?.filter((el: any) => !el.bundleNumber)
    let subSku: any = ''
    if (!regularData?.length) {
      //数量都填好了就可以验证提交
      // deletedBundles.forEach((el: any) => {
      //   el.isDeleted = true
      // })
      // regularData?.push(...deletedBundles)
      subSku = 1
    }
    let stockArr = regularList
      ?.filter((el: any, idx: any) => {
        let skuStock = el.bundleNumber || 0
        if (skuStock) {
          el.subSkuStock = Math.floor(el.stock / skuStock)
        }
        debugger
        return skuStock
      })
      .map((el: any) => el.subSkuStock)
    debugger

    let spuStock = Math.min(...stockArr)
    console.info('spuStock', spuStock)
    detail.stock = spuStock
    let listPrice = props.form.getFieldValue('listPrice')
    let marketingPrice = props.form.getFieldValue('marketingPrice')
    let subscriptionPrice = props.form.getFieldValue('subscriptionPrice')
    if (regularList[0]?.listPrice && !detail?.id) {
      // if (regularList[0]?.listPrice) {
      // 编辑的时候不去计算反显价格
      listPrice = getTotal(regularList, 'listPrice')
      marketingPrice = getTotal(regularList, 'marketingPrice')
      subscriptionPrice = getTotal(regularList, 'subscriptionPrice')
    }
    detail.variantBundles = regularList.map((el: any) => {
      return {
        bundleNumber: el.bundleNumber,
        id: el.id,
        variantId: el.variantId || detail.skuId,
        subVariantId: el.subVariantId,
        skuNo: el.skuNo,
      }
    })
    props.form.setFieldsValue({
      stock: spuStock,
      subSku,
      listPrice,
      marketingPrice,
      subscriptionPrice,
    })
    // props.form.setFieldsValue({
    //   subSku,
    // })
  }
  useEffect(() => {
    if (detail.regularList) {
      setRegularList(detail.regularList)
      validateNumber(detail.regularList)
    }
  }, [detail.regularList])
  useEffect(() => {
    let formList: any = noSkuForm.map((el: any) => {
      if (el.name === 'subscriptionStatus') {
        el.rules.push(({ getFieldValue }: { getFieldValue: any }) => ({
          validator (_: any, value: any) {
            console.info('......', _, value === '0')
            let list = formatSubscription(value)
            setNoSkuFormList(list)
            return Promise.resolve()
          },
        }))
      }
      return el
    })
    setNoSkuFormList(formList)
  }, [])

  const formatSubscription = (value: any) => {
    let formList: any = noSkuFormList.map((el: any) => {
      let item: any = Object.assign({}, el, {
        disabled: el.name === 'subscriptionPrice' && value == 0 ? true : false,
      })
      if (item.name === 'subscriptionPrice') {
        if (value == 0) {
          props.form.setFieldsValue({
            subscriptionPrice: '',
          })
          if (item.rules) {
            delete item.rules
          }
        } else {
          if (!item.rules.length) {
            item.rules.push({ required: true })
          }
        }
      }
      if (item.name === 'stock') {
        item.disabled = spuType === 'BUNDLE'
      }
      return item
    })
    return formList
  }
  const getTotal = (list: any, key: string) => {
    let total = list.reduce((pre: any, cur: any) => {
      let preNum = pre?.key || pre
      let number = cur.bundleNumber || 1
      return preNum + cur[key] * number
    }, 0)
    return total
  }
  useEffect(() => {
    let formList: any = noSkuFormList.map((el: any) => {
      let item: any = { ...el }
      if (item.name === 'stock') {
        item.disabled = spuType === 'BUNDLE'
      }
      return item
    })
    setNoSkuFormList(formList)
  }, [spuType])
  useEffect(() => {
    let formList: any = formatSubscription(detail.subscriptionPrice)
    let list: any = formList.map((el: any) => {
      let item: any = { ...el }
      if (item.name === 'stock') {
        item.disabled = spuType === 'BUNDLE'
      }
      return item
    })
    setNoSkuFormList(list)
  }, [detail.subscriptionPrice])
  return (
    // <div>test</div>
    <div className='salesinfo'>
      <VariationosContext.Provider value={{ variationForm, setVariationForm }}>
        <AddVariation />
        <EditVariationList field={props.field} />
        <BundleSubSKuPop
          isModalVisible={showBundleChoose}
          setShowBundleChoose={setShowBundleChoose}
          handleOk={chooseBundleSku}
          defaultSelected={regularList}
        />

        {variationForm.variationList.filter((el: any) => !el.isDeleted)?.length ? null : (
          <div>
            {spuType === 'BUNDLE' ? (
              // {true ? (
              <Form.Item {...layout} label='Sub SKU' name='subSku' rules={[{ required: true }]}>
                <div className='flex justify-center'>
                  <div
                    onClick={() => {
                      setShowBundleChoose(true)
                    }}
                    className=' w-8 h-8 p-1 cursor-pointer'
                  >
                    <div
                      className='rounded-full border border-solid p-1 border-primary w-full h-full justify-center flex items-center'
                      style={{ borderColor: 'rgb(81, 172, 245)', color: 'rgb(81, 172, 245)' }}
                    >
                      <PlusOutlined style={{ color: '#51ACF5' }} color='#51ACF5' />
                    </div>
                  </div>
                  <div>
                    {regularList?.map((el: any, index: number) => {
                      return (
                        <div className='flex items-center my-1' key={el.subVariantId}>
                          <div className='w-20'>{el.skuNo}</div>
                          <InputNumber
                            size='small'
                            min={1}
                            value={el.bundleNumber}
                            // max={100}
                            onChange={val => {
                              onChange(val, index)
                            }}
                          />
                          <DeleteOutlined
                            className='ml-2'
                            onClick={() => {
                              handleDelete(index)
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Form.Item>
            ) : null}
            {noSkuFormList?.length ? <FormItem list={noSkuFormList} {...props} layout={layout} /> : null}
          </div>
        )}
      </VariationosContext.Provider>
    </div>
  )
}

export default SalesInfo
