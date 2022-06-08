import './index.less'
import { VariationosContext } from '../SalesInfo'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Button, Col, Form, Input, InputNumber, Popover, Row, Select } from 'antd'
import { FormProps } from '@/framework/types/common'
import { ChangeType, SpecificationListProps, VarationProps, VarationsFormProps } from '@/framework/types/product'
import { headerOrigition } from '../../modules/constant'
import { DetailContext } from '../../index'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
import BundleSubSKu from '../BundleSubSKu'
import Upload from '../UploadList'
import ValidateInput from '../ValidateInput'
import SkuNameInput from '../SkuNameInput'
import classNames from 'classnames'
import MyInputNumber from '../InputNumber'

export interface VarviationProps {
  defaultImage: string
  skuNo: string
  name: string
  eanCode: string
  listPrice: string
  marketingPrice: string
  spec: string
  sortIdx: string
  [key: string]: string
}
interface HeaderProps {
  type: string
  label: string | ReactElement
  keyVal: string
  dataTips?: string
  options?: any
  required?: boolean
}
const EditVariationList = (props: FormProps) => {
  const { detail, spuType } = useContext(DetailContext)
  const [isInited, setIsInited] = useState(false)
  // let isInited = false
  const { variationForm: cloneVariationForm } = useContext(VariationosContext)
  //changeType操作variation需要做include处理；操作spec需要做===处理
  const [variationList, setVariationList] = useState<VarviationProps[]>([])
  const [headerList, setHeaderList] = useState<any[]>([])

  const [variationForm, setVariationForm] = useState({} as VarationsFormProps)
  useEffect(() => {
    const variationForm = cloneDeep(cloneVariationForm)
    const variationList = variationForm?.variationList?.filter((el: any) => {
      el.specificationList = el.specificationList?.filter((spec: any) => !spec.isDeleted)
      return !el.isDeleted
    })
    variationList?.forEach((variation: any, idx: number) => {
      variation.name = variation.name || `Variation${idx + 1}`
      variation.specificationList.forEach((specification: any) => {
        specification.option = specification.option || 'option'
      })
    })
    if (variationList?.length === 0) {
      setVariationList([])
    }
    // variationForms
    // debugger
    setVariationForm(variationForm)
    if (variationList?.length) {
      getRows(variationForm)
      initHeader(variationForm)
    }
  }, [cloneVariationForm])

  const initHeader = ({ variationList }: VarationsFormProps) => {
    let variationHeaders = variationList.map((el, idx) => {
      let header = { label: el.name || `Varations[${idx}]`, type: 'text', keyVal: el.name }
      return header
    })

    const cloneHeaderOrigition = [...headerOrigition]

    if (spuType === 'REGULAR') {
      let idx = cloneHeaderOrigition.findIndex((el: any) => el.keyVal === 'subSku')
      cloneHeaderOrigition.splice(idx, 1)
    }
    // debugger
    cloneHeaderOrigition.splice(1, 0, ...variationHeaders)
    setHeaderList(cloneHeaderOrigition)
  }
  const updateVations = (val: any, index: any, propertyName: any, tr: any) => {
    console.info(val, index, propertyName, tr, '(e,index,propertyName,tr)')
    if (detail.id) {
      if (!detail.editChange.goodsVariants) {
        detail.editChange.goodsVariants = []
      }
      if (!detail.editChange.goodsVariants[index]) {
        detail.editChange.goodsVariants[index] = {}
      }
      if (tr.id) {
        detail.editChange.goodsVariants[index].id = tr.id
      }
      if (propertyName === 'subscriptionStatus' && val === '0') {
        //处理订阅状态为no的时候订阅价格为0
        detail.editChange.goodsVariants[index].subscriptionPrice = ''
      }
      detail.editChange.goodsVariants[index][propertyName] = val
      if (propertyName === 'goodsVariantBundleInfo') {
        //stock需要同步改变
        detail.editChange.goodsVariants[index].stock = tr.stock
        // detail.editChange.goodsVariants[index].stock = tr.stock
        // detail.editChange.goodsVariants[index].stock = tr.stock
      }
      //处理类型转换
      if (
        propertyName === 'stock' ||
        propertyName === 'marketingPrice' ||
        propertyName === 'subscriptionStatus' ||
        propertyName === 'feedingDays' ||
        propertyName === 'listPrice' ||
        propertyName === 'subscriptionPrice'
      ) {
        detail.editChange.goodsVariants[index][propertyName] = Number(val)
      }
      if (propertyName === 'isSupport100') {
        detail.editChange.goodsVariants[index][propertyName] = val === 'true' ? true : false
      }
      debugger
      if (!tr.id) {
        //新增的
        detail.editChange.goodsVariants[index].goodsVariantSpecifications = tr.relArr?.map((rel: any) => {
          return {
            specificationNameEn: rel.specificationName,
            specificationName: rel.specificationName,
            specificationDetailNameEn: rel.specificationDetailName,
            specificationDetailName: rel.specificationDetailName,
          }
        })
      }
    }
    if (propertyName === 'goodsVariantBundleInfo') {
      //同步展示库存
      setVariationList([...variationList])
    }
    detail.goodsVariantsInput = variationList
    detail.goodsSpecificationsInput = variationForm.variationList
  }

  const calcDescartes = (array: any) => {
    if (array.length < 2) return array[0] || []
    // @ts-ignore
    return [].reduce.call(array, (col: any, set: any) => {
      var res: any = []
      col?.forEach(function (c: ConcatArray<never>) {
        set?.forEach(function (s: ConcatArray<never>) {
          // @ts-ignore
          var t = [].concat(Array.isArray(c) ? c : [c])
          // @ts-ignore
          t.push(s)
          res.push(t)
        })
      })

      return res
    })
  }

  const getRows = (data: VarationsFormProps) => {
    let specList: any = data?.variationList?.map(el => {
      return el.specificationList
    })
    if (specList?.[0]) {
      let datas = calcDescartes(specList)
      if (detail.variationLists?.length && !isInited) {
        // debugger
        initWithDefault(cloneDeep(datas))
      } else {
        init(cloneDeep(datas), data)
      }
      // let varations: string[] = combination(specList)
      // initData(varations, data)
    }
  }
  const initWithDefault = (vartions: any) => {
    setIsInited(true)
    // isInited = true //设置在组件外只能渲染一次，重复进来不会重置初始值
    // debugger

    init(vartions, { variationList: detail.variationLists }, true)
  }
  const init = (vartions: any, { variationList: formData, changeType }: any, isDefultData?: boolean) => {
    let lastData = isDefultData ? cloneDeep(detail.variationLists) : cloneDeep(variationList)
    let list = vartions.map((vartion: any) => {
      let sortIdx = vartion.map?.((el: any) => el.sortIdx).join('^') || vartion.sortIdx
      let newEl: any = {
        spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
        defaultImage: '',
        skuNo: '',
        skuName: '',
        stock: '0',
        subSku: '',
        feedingDays: '',
        isSupport100: 'true',
        shelvesStatus: 'true',
        subscriptionStatus: '1',
        eanCode: '',
        listPrice: '',
        marketingPrice: '',
        subscriptionPrice: '',
        sortIdx,
        relArr: [],
      }
      if (changeType === ChangeType.handleSpec || isDefultData) {
        //spec选择,需要操作====
        let oldData = lastData.find((el: any) => el.sortIdx === sortIdx)
        newEl = Object.assign({}, newEl, oldData, {
          spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
          key: Math.random(),
        })
      }
      if (changeType === ChangeType.handleVariation) {
        debugger
        //variation选择，需要操作include
        let lastIdx = lastData
          // .filter((el: any) => el.choosed)
          .findIndex((el: any) => {
            return sortIdx.includes(el.sortIdx)
          })
        let oldData = lastData[lastIdx]
        newEl = Object.assign({}, newEl, oldData, {
          spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
          key: Math.random(),
        })
        if (lastIdx > -1) {
          lastData.splice(lastIdx, 1)
        }
      }
      if (vartion.length) {
        vartion.forEach((spec: any, idx: number) => {
          let name = formData[idx]?.name || `Variation${idx}`
          newEl[name] = (spec[0] || spec)?.option || 'option'
          newEl.relArr[idx] = {
            specificationName: formData[idx]?.name || `Variation${idx + 1}`,
            specificationDetailName: spec.option,
          }
          if (formData[idx]?.goodsSpecificationId) {
            newEl.relArr[idx].goodsSpecificationId = formData[idx]?.goodsSpecificationId
          }
          if (spec.id) {
            newEl.relArr[idx].id = spec.id
          }
          // newEl.relArr[name] = (spec[0] || spec)?.option || 'option'
          // newEl.relArr.push({
          //   specificationName: name,
          //   specificationDetailName: newEl[name],
          // })
        })
      } else {
        newEl.relArr=[{}]
        let name = formData[0]?.name || `Variation1`
        newEl[name] = vartion?.option || 'option'
        newEl.relArr[0] = {
          specificationName: formData[0]?.name || `Variation1`,
          specificationDetailName: vartion?.option || 'option',
        }
        if (vartion.id) {
          newEl.relArr[0].id = vartion.id
        }
        // newEl.relArr.push({
        //   specificationName: name,
        //   specificationDetailName: newEl[name],
        // })
      }
      // let name = formData[0]?.name || `Variation0`
      // newEl[name] = vartion?.option || 'option'
      // newEl.relArr.push({
      //   specificationName: name,
      //   specificationDetailName: newEl[name],
      // })
      // debugger
      return newEl
    })
    detail.goodsVariantsInput = list //编辑的时候需要赋值todo
    setVariationList(cloneDeep(list))
    // return list
  }
  return variationList?.length ? (
    <div className='edit-variation-list'>
      <Row>
        <Col span={4} className='text-right pr-2 pb-4'>
          {`Variation List `}
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={2} className='edit-variation-table overflow-scroll w-full'>
          <table className='table' width={1500}>
            <thead>
              <tr className='text-center bg-gray-primary h-12'>
                {headerList.map((th, index) => (
                  <th className={classNames('font-normal', th.className)} key={index}>
                    {!th.required ||
                    (variationList.every(el => {
                      return el.subscriptionStatus === '0'
                    }) &&
                      th.keyVal === 'subscriptionPrice') ? (
                      th.label
                    ) : (
                      <span>
                        <span className='primary-color required-text'>*</span>
                        {th.label}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variationList.map((tr, index) => (
                <tr key={tr.sortIdx} className='h-12'>
                  {headerList.map((td, count) => (
                    <td key={`${tr.sortIdx}-${count}`}>
                      <span data-tips={td.dataTips} className='tips-wrap'>
                        {(() => {
                          switch (td.type) {
                            case 'input':
                              return (
                                <Input
                                  className='text-center'
                                  placeholder='Input'
                                  // onInput={e => {
                                  //   console.info('....', e)
                                  //   tr[td.keyVal] = e.currentTarget.value?.replace(/[^\a-\z\A-\Z]/g, '')
                                  //   debugger
                                  // }}
                                  // onChange={(e: any) => {
                                  //   debugger
                                  //   return e.target.value.replace(/[\W]/g, '')
                                  // }}
                                  onBlur={e => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                  defaultValue={tr[td.keyVal]}
                                />
                              )
                            case 'validateInput':
                              return (
                                <ValidateInput
                                  className='text-center'
                                  placeholder='Input'
                                  // onInput={e => {
                                  //   console.info('....', e)
                                  //   tr[td.keyVal] = e.currentTarget.value?.replace(/[^\a-\z\A-\Z]/g, '')
                                  //   debugger
                                  // }}
                                  // onChange={(e: any) => {
                                  //   debugger
                                  //   return e.target.value.replace(/[\W]/g, '')
                                  // }}
                                  onBlur={(e: any) => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                  defaultValue={tr[td.keyVal]}
                                ></ValidateInput>
                              )
                            case 'text':
                              return (
                                <span className='text-center inline-block px-4 whitespace-nowrap'>{tr[td.keyVal]}</span>
                              )
                            case 'upload':
                              return (
                                <div className='px-3'>
                                  <Upload
                                    size='small'
                                    hideName={true}
                                    type='image'
                                    fileList={[{ url: tr[td.keyVal], type: 'image' }]}
                                    showUploadList={false}
                                    handleImgUrl={(imgInfo: any) => {
                                      tr[td.keyVal] = imgInfo.url
                                      updateVations(imgInfo.url, index, td.keyVal, tr)
                                    }}
                                  />
                                </div>
                              )
                            case 'priceInput':
                              return td.keyVal === 'subscriptionPrice' && tr.subscriptionStatus === '0' ? (
                                <Input
                                  className='text-center'
                                  disabled={td.keyVal === 'subscriptionPrice' && tr.subscriptionStatus === '0'}
                                  value=''
                                />
                              ) : (
                                <MyInputNumber
                                  td={td}
                                  tr={tr}
                                  val={tr[td.keyVal]}
                                  onBlur={(e: any) => {
                                    let price = Number(e.target.value).toFixed(2)
                                    tr[td.keyVal] = price
                                    updateVations(price, index, td.keyVal, tr)
                                  }}
                                />
                                // <InputNumber
                                //   className='price-input text-center'
                                //   placeholder='Input'
                                //   type='number'
                                //   min={'0'}
                                //   disabled={td.keyVal === 'subscriptionPrice' && tr.subscriptionStatus === '0'}
                                //   prefix='￥'
                                //   precision={2}
                                //   // formatter={value => Number(value)?.toFixed(2)}
                                //   onBlur={e => {
                                //     let price = Number(e.target.value).toFixed(2)
                                //     tr[td.keyVal] = price
                                //     updateVations(price, index, td.keyVal, tr)
                                //   }}
                                //   defaultValue={tr[td.keyVal]}
                                // />
                              )
                            case 'select':
                              return (
                                <Select
                                  className='text-center'
                                  defaultValue={tr[td.keyVal]}
                                  // value={tr[td.keyVal]}
                                  style={{ width: 120 }}
                                  placeholder='Select'
                                  options={td.options}
                                  // defaultValue={tr[td.keyVal]}
                                  onChange={(value, option) => {
                                    tr[td.keyVal] = value
                                    if (td.keyVal === 'subscriptionStatus' && value === '0') {
                                      tr.subscriptionPrice = ''
                                    }
                                    updateVations(value, index, td.keyVal, tr)
                                    setVariationList([...variationList])
                                  }}
                                ></Select>
                              )
                            case 'number':
                              return td.keyVal === 'stock' && spuType === 'BUNDLE' ? (
                                <div className='text-center'>{tr[td.keyVal]}</div>
                              ) : (
                                <Input
                                  className='text-center'
                                  type='number'
                                  min={0}
                                  placeholder='Input'
                                  onBlur={e => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                  defaultValue={tr[td.keyVal]}
                                />
                              )
                            case 'popup':
                              return (
                                <SkuNameInput
                                  defaultValue={tr[td.keyVal]}
                                  onBlur={(e: any) => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                />
                              )
                            case 'subSku':
                              return (
                                <BundleSubSKu
                                  updateVations={updateVations}
                                  skuItem={tr}
                                  skuItemIdx={index}
                                  keyVal={td.keyVal}
                                />
                              )
                            case 'shelves':
                              return (
                                <div className='text-center '>
                                  {tr[td.keyVal] === 'true' ? (
                                    <span
                                      className='icon text-theme-red  iconfont icon-xiajia'
                                      onClick={() => {
                                        tr[td.keyVal] = 'false'
                                        setVariationList([...variationList])
                                        updateVations('false', index, td.keyVal, tr)
                                        debugger
                                      }}
                                    ></span>
                                  ) : (
                                    <span
                                      className='icon text-theme-red  iconfont icon-Frame4'
                                      onClick={() => {
                                        debugger
                                        tr[td.keyVal] = 'true'
                                        updateVations('true', index, td.keyVal, tr)
                                        setVariationList([...variationList])
                                      }}
                                    ></span>
                                  )}
                                </div>
                              )
                            default:
                              return <span className=''>ooo</span>
                          }
                        })()}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className='hidden'
            onClick={() => {
              console.info('variationListvariationListvariationListdata', variationList)
            }}
          >
            get VAlue
          </button>
        </Col>
      </Row>
    </div>
  ) : null
}

export default EditVariationList
