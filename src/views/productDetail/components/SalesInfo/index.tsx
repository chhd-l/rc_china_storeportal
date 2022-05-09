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
import { DeleteOutlined } from '@ant-design/icons'
import { data } from 'browserslist'
import { debug } from 'console'
interface ContextProps {
  variationForm: VarationsFormProps
  setVariationForm: () => void
  form: any
}
export const VariationosContext = createContext(null as any)
let deletedBundles: any = []
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
    let deletedArr =
      regularList
        ?.filter(el => {
          let deletedArr =
            choosedSku.findIndex((choosed: any) => choosed.subGoodsVariantId === el.subGoodsVariantId) === -1
          return deletedArr
        })
        ?.filter(el => el.bunldeRelId) || []
    //存储删除的
    deletedBundles = [...deletedBundles, ...deletedArr]
    console.info('deletedArr', deletedArr)
    //匹配选择已输入的数量
    regularList.forEach(oldSku => {
      choosedSku.forEach((newSku: any) => {
        if (oldSku.subGoodsVariantId === newSku.subGoodsVariantId) {
          newSku.bundleNumber = oldSku.bundleNumber
        }
      })
    })
    console.info('choosedSku', choosedSku)
    setRegularList(choosedSku)
    validateNumber(regularList)
  }
  const onChange = (val: number, idx: number) => {
    if (!detail.goodsVariantBundleInfo) {
      detail.goodsVariantBundleInfo = []
    }
    if (!detail.goodsVariantBundleInfo[idx]) {
      detail.goodsVariantBundleInfo[idx] = {}
    }

    detail.goodsVariantBundleInfo[idx].bundleNumber = val
    regularList[idx].bundleNumber = val
    if (regularList[idx].bunldeRelId) {
      //编辑
      detail.goodsVariantBundleInfo[idx].bunldeRelId = regularList[idx].bunldeRelId
      detail.goodsVariantBundleInfo[idx].goodsVariantId = detail.skuId
    } else {
      //新增
      detail.goodsVariantBundleInfo[idx].subGoodsVariantId = regularList[idx].id
      detail.goodsVariantBundleInfo[idx].skuNo = regularList[idx].skuNo
    }
    let stockArr = regularList
      ?.filter((el, idx) => {
        let skuStock = el.bundleNumber || 0
        if (skuStock) {
          el.subSkuStock = Math.floor(el.stock / skuStock)
        }
        return skuStock
      })
      .map(el => el.subSkuStock)
    let spuStock = Math.min(...stockArr)
    console.info('spuStock', spuStock)
    detail.stock = spuStock
    props.form.setFieldsValue({
      stock: spuStock,
    })
    setRegularList([...regularList])
    validateNumber(regularList)
  }
  const handleDelete = (idx: number) => {
    if (regularList[idx].bunldeRelId) {
      deletedBundles = [...deletedBundles, regularList[idx]]
    }
    regularList.splice(idx, 1)
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
      subSku = regularData
    }
    props.form.setFieldsValue({
      subSku,
    })
  }
  useEffect(() => {
    if (detail.regularList) {
      setRegularList(detail.regularList)
    }
  }, [detail.regularList])
  useEffect(() => {
    let formList: any = noSkuForm.map((el: any) => {
      let item: any = Object.assign({}, el, { disabled: el.name === 'stock' && spuType === 'BUNDLE' ? true : false })
      return item
    })
    setNoSkuFormList(formList)
  }, [spuType])
  return (
    // <div>test</div>
    <VariationosContext.Provider value={{ variationForm, setVariationForm }}>
      <AddVariation />
      <EditVariationList field={props.field} />
      <BundleSubSKuPop
        isModalVisible={showBundleChoose}
        setShowBundleChoose={setShowBundleChoose}
        handleOk={chooseBundleSku}
        defaultSelected={regularList?.filter(el => !el.isDeleted)?.map((el: any) => el?.subGoodsVariantId || el)}
      />

      {variationForm.variationList.filter((el: any) => !el.isDeleted)?.length ? null : (
        <div>
          {spuType === 'BUNDLE' ? (
            // {true ? (
            <Form.Item {...layout} label='Sub SKU' name='subSku' rules={[{ required: true }]}>
              <div className='flex'>
                <div
                  onClick={() => {
                    setShowBundleChoose(true)
                  }}
                  className='border border-dashed border-primary w-8 h-8 p-1 cursor-pointer'
                >
                  <div className='rounded-full border border-solid  border-primary w-full h-full justify-center flex items-center'>
                    +
                  </div>
                </div>
                <div>
                  {regularList?.map((el: any, index: number) => {
                    return (
                      <div className='flex items-center my-1' key={el.subGoodsVariantId}>
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
          <FormItem list={noSkuFormList} {...props} layout={layout} />
        </div>
      )}
    </VariationosContext.Provider>
  )
}

export default SalesInfo
