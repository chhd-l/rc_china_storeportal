import './index.less'
import { VariationosContext } from '../SalesInfo'
import { useContext, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Button, Col, Form, Input, Popover, Row, Select } from 'antd'
import { FormProps } from '@/framework/types/common'
import { ChangeType, SpecificationListProps, VarationProps, VarationsFormProps } from '@/framework/types/product'
import { headerOrigition } from '../../modules/constant'
import Upload, { UploadType } from '@/components/common/Upload'
import { DetailContext } from '../../index'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'
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
  label: string
  keyVal: string
  dataTips?: string
  options?: any
}
let isInited = false
const EditVariationList = (props: FormProps) => {
  const { detail } = useContext(DetailContext)
  const { variationForm: cloneVariationForm } = useContext(VariationosContext)
  //changeType操作variation需要做include处理；操作spec需要做===处理
  const [variationList, setVariationList] = useState<VarviationProps[]>([])
  const [headerList, setHeaderList] = useState<HeaderProps[]>([])
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
    console.info('variationForm==========================', variationForm)
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
      detail.editChange.goodsVariants[index][propertyName] = val
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
        initWithDefault(cloneDeep(datas))
      } else {
        init(cloneDeep(datas), data)
      }
      // let varations: string[] = combination(specList)
      // initData(varations, data)
    }
  }
  const initWithDefault = (vartions: any) => {
    isInited = true
    init(vartions, { variationList: detail.variationLists }, true)
  }
  const init = (vartions: any, { variationList: formData, changeType }: any, isDefultData?: boolean) => {
    let lastData = isDefultData ? detail.variationLists : variationList
    let list = vartions.map((vartion: any) => {
      console.info('variationListvariationList', JSON.stringify(lastData))
      // console.info('vartionvartionvartionvartion', JSON.stringify(vartion), vartion)
      let sortIdx = vartion.map?.((el: any) => el.sortIdx).join('^') || vartion.sortIdx
      let newEl: any = {
        spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
        defaultImage: '',
        skuNo: '',
        skuName: '',
        stock: '',
        subSku: '',
        feedingDays: '',
        isSupport100: '',
        shelvesStatus: '',
        subscriptionStatus: '',
        eanCode: '',
        listPrice: '',
        marketingPrice: '',
        subscriptionPrice: '',
        sortIdx,
        relArr: [],
      }
      // debugger
      if (changeType === ChangeType.handleSpec || isDefultData) {
        //spec选择,需要操作====
        // debugger
        let oldData = lastData.find((el: any) => el.sortIdx === sortIdx)
        console.info('oldData', oldData)
        newEl = Object.assign({}, newEl, oldData, {
          spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
          key: Math.random(),
        })
      }
      if (changeType === ChangeType.handleVariation) {
        //variation选择，需要操作include
        let oldData = lastData
          // .filter((el: any) => el.choosed)
          .find((el: any) => {
            return sortIdx.includes(el.sortIdx)
          })
        newEl = Object.assign({}, newEl, oldData, {
          spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
          key: Math.random(),
        })
      }
      console.info('vartioneditChange.variationList', detail?.editChange?.variationList)

      if (vartion.length) {
        console.info('vartion', vartion)
        // debugger

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
          // debugger
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
        // debugger
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
    console.info('list', list)
    setVariationList(cloneDeep(list))
    // return list
  }
  return variationList?.length ? (
    <div className='edit-variation-list'>
      <Row>
        <Col span={4} className='text-right mr-2 pb-4'>
          Variation List
        </Col>
      </Row>
      <Row>
        <Col span={22} offset={2} className='edit-variation-table overflow-scroll w-full'>
          <table className='table' width={1500}>
            <thead>
              <tr className='text-center bg-gray-primary h-12'>
                {headerList.map((th, index) => (
                  <th className='font-normal' key={index}>
                    {th.label}
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
                          // console.info(td.keyVal, tr[td.keyVal], typeof tr[td.keyVal])
                          switch (td.type) {
                            case 'input':
                              return (
                                <Input
                                  onBlur={e => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                  defaultValue={tr[td.keyVal]}
                                />
                              )
                            case 'text':
                              return <span className=' inline-block px-4'>{tr[td.keyVal]}</span>
                            case 'upload':
                              // return <span>{tr[td.keyVal]}</span>
                              return (
                                <Upload
                                  type={UploadType.button}
                                  fileList={[{ img: tr[td.keyVal] }]}
                                  showUploadList={false}
                                  handleImgUrl={() => {
                                    console.info('...')
                                  }}
                                />
                              )
                            case 'priceInput':
                              return (
                                <Input
                                  className='price-input'
                                  disabled={td.keyVal === 'subscriptionPrice' && tr.subscriptionStatus === '0'}
                                  prefix='￥'
                                  onBlur={e => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                  defaultValue={tr[td.keyVal]}
                                />
                              )
                            case 'select':
                              return (
                                <Select
                                  defaultValue={tr[td.keyVal]}
                                  // value={tr[td.keyVal]}
                                  style={{ width: 120 }}
                                  options={td.options}
                                  // defaultValue={tr[td.keyVal]}
                                  onChange={(value, option) => {
                                    tr[td.keyVal] = value
                                    updateVations(value, index, td.keyVal, tr)
                                    setVariationList([...variationList])
                                  }}
                                ></Select>
                              )
                            case 'number':
                              return (
                                <Input
                                  className=''
                                  type='number'
                                  onBlur={e => {
                                    tr[td.keyVal] = e.target.value
                                    updateVations(e.target.value, index, td.keyVal, tr)
                                  }}
                                  defaultValue={tr[td.keyVal]}
                                />
                              )
                            // return
                            case 'popup':
                              return (
                                <Popover className='' content='哈哈哈' trigger='click' placement='bottom' title='Title'>
                                  <Button type='primary'>Hover me</Button>
                                </Popover>
                              )
                            case 'subSku':
                              return <div className=''>test</div>
                            case 'shelves':
                              return (
                                <div className='text-center '>
                                  {tr[td.keyVal] === 'true' ? (
                                    <VerticalAlignTopOutlined
                                      onClick={() => {
                                        tr[td.keyVal] = 'flse'
                                        updateVations('false', index, td.keyVal, tr)
                                        setVariationList([...variationList])
                                      }}
                                    />
                                  ) : (
                                    <VerticalAlignBottomOutlined
                                      onClick={() => {
                                        tr[td.keyVal] = 'true'
                                        setVariationList([...variationList])
                                        updateVations('true', index, td.keyVal, tr)
                                      }}
                                    />
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
