import './index.less'
import { VariationosContext } from '../SalesInfo'
import { useContext, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Button, Form, Input, Popover, Select } from 'antd'
import { FormProps } from '@/framework/types/common'
import { ChangeType, SpecificationListProps, VarationProps, VarationsFormProps } from '@/framework/types/product'
import { headerOrigition } from '../../modules/constant'
import Upload, { UploadType } from '@/components/common/Upload'
import { DetailContext } from '../..'
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
}
let isInited = false
const commonClass = 'w-32 border-0 border-t border-r border-solid border-gray-200 text-center'
const EditVariationList = (props: FormProps) => {
  const { detail } = useContext(DetailContext)
  const { variationForm: cloneVariationForm } = useContext(VariationosContext)
  //changeType操作variation需要做include处理；操作spec需要做===处理
  const [variationList, setVariationList] = useState<VarviationProps[]>([])
  const [headerList, setHeaderList] = useState<HeaderProps[]>([])
  const [variationForm, setVariationForm] = useState({} as VarationsFormProps)
  console.info('changeType', variationForm)
  // console.info("variationForm", variationForm);
  // const aa = {
  //   variationList: [
  //     {
  //       name: "test1",
  //       specificationList: [
  //         { option: 1111111111 },
  //         { option: 22 },
  //         { option: 33 },
  //       ],
  //     },
  //     {
  //       name: "test2",
  //       specificationList: [{ option: 4455555 }, { option: 55 }],
  //     },
  //     {
  //       name: "test3",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //     {
  //       name: "test4",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //     {
  //       name: "test5",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //     {
  //       name: "test6",
  //       specificationList: [{ option: 66 }, { option: 77 }],
  //     },
  //   ],
  // };
  useEffect(() => {
    const variationForm = cloneDeep(cloneVariationForm)
    const { variationList } = variationForm
    variationList?.forEach((variation: any, idx: number) => {
      variation.name = variation.name || `Variation${idx}`
      variation.specificationList.forEach((specification: any) => {
        specification.option = specification.option || 'option'
      })
    })
    // variationForms
    setVariationForm(variationForm)
    if (variationList[0]) {
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
    // vartions.map(vartion=>{
    //   detail.goodsVariants.find(el=>vartion.goodsSpecificationId==el.)
    // })
  }
  const init = (vartions: any, { variationList: formData }: any, isDefultData?: boolean) => {
    let lastData = isDefultData ? detail.variationLists : variationList
    let list = vartions.map((vartion: any) => {
      console.info('variationListvariationList', JSON.stringify(lastData))
      let sortIdx = vartion.map?.((el: any) => el.sortIdx).join('^') || vartion.sortIdx
      let newEl: any = {
        spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
        defaultImage: '',
        skuNo: '',
        skuName: '',
        stock: '',
        subSku: '',
        feedingDays: '',
        support100: '',
        shelvesStatus: '',
        subscriptionStatus: '',
        eanCode: '',
        listPrice: '',
        marketingPrice: '',
        subscriptionPrice: '',
        sortIdx,
      }
      if (variationForm.changeType === ChangeType.handleSpec || isDefultData) {
        //to do spec选择,需要操作====
        debugger
        let oldData = lastData.find((el: any) => el.sortIdx === sortIdx)
        console.info('oldData', oldData)
        newEl = Object.assign({}, newEl, oldData, {
          spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
          key: Math.random(),
        })
      }
      if (variationForm.changeType === ChangeType.handleVariation) {
        //to do variation选择，需要操作include
        let oldData = lastData
          .filter((el: any) => el.choosed)
          .find((el: any) => {
            return sortIdx.includes(el.sortIdx)
          })
        newEl = Object.assign({}, newEl, oldData, {
          spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
          key: Math.random(),
        })
      }
      if (vartion.length) {
        vartion.forEach((spec: any, idx: number) => {
          let name = formData[idx]?.name || `Variation${idx}`
          newEl[name] = (spec[0] || spec)?.option || 'option'
        })
      } else {
        debugger
        let name = formData[0]?.name || `Variation0`
        newEl[name] = vartion?.option || 'option'
      }

      return newEl
    })
    console.info('list', list)
    setVariationList(cloneDeep(list))
    // return list
  }
  const handleSelect = () => {}
  return (
    <div className='overflow-scroll w-full'>
      {variationList?.length ? (
        <table className='table' width={1500}>
          <thead>
            <tr>
              {headerList.map((th, index) => (
                <th key={index}>{th.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variationList.map((tr, index) => (
              <tr key={tr.sortIdx}>
                {headerList.map((td, count) => (
                  <td key={`${tr.sortIdx}-${count}`}>
                    <span>
                      {(() => {
                        switch (td.type) {
                          case 'input':
                            return (
                              <Input
                                onBlur={e => {
                                  tr[td.keyVal] = e.target.value
                                }}
                                defaultValue={tr[td.keyVal]}
                              />
                            )
                          case 'text':
                            return <span>{tr[td.keyVal]}</span>
                          case 'upload':
                            // return <span>{tr[td.keyVal]}</span>
                            return (
                              <Upload
                                type={UploadType.button}
                                showUploadList={false}
                                handleImgUrl={() => {
                                  console.info('...')
                                }}
                              />
                            )
                          case 'priceInput':
                            return <Input prefix='￥' />
                          case 'select':
                            return (
                              <Select
                                defaultValue=''
                                style={{ width: 120 }}
                                options={[
                                  { label: 'yes', value: '0' },
                                  { label: 'no', value: '1' },
                                ]}
                                onChange={handleSelect}
                              ></Select>
                            )
                          case 'number':
                            return <Input type='number' />
                          // return
                          case 'popup':
                            return (
                              <Popover content='哈哈哈' trigger='click' placement='bottom' title='Title'>
                                <Button type='primary'>Hover me</Button>
                              </Popover>
                            )
                          case 'subSku':
                            return <div>test</div>

                          default:
                            return <span>ooo</span>
                        }
                      })()}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
    // <>
    //   {variationForm.variationList?.length ? (
    //     <div className="edit-variation-list bg-white">
    //       <div className="border-l border-b border-solid border-gray-200 table table-warp">
    //         <div
    //           className={classNames(
    //             "list-header table-caption  table-row  bg-gray-200 z-10 h-12"
    //           )}
    //         >
    //           {headerList.map((el) => (
    //             <div className={classNames(commonClass, "align-middle")}>
    //               {el}
    //             </div>
    //           ))}
    //         </div>
    //         {variationList.map((el) => (
    //           <Form className="list-content table-row ">
    //             <Form.Item name="img" className="table-cell">
    //               <Input
    //                 defaultValue={el.img}
    //                 onChange={()=>{}}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //             {variationForm.variationList.map(
    //               (spec: VarationProps, idx: number) => (
    //                 <div className={classNames(commonClass, "px-2 table-cell")}>
    //                   {el[spec.name]}
    //                 </div>
    //               )
    //             )}
    //             <Form.Item name="sku" className="table-cell">
    //               <Input
    //                 value={el.sku}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //             <Form.Item name="subSku" className="table-cell">
    //               <Input
    //                 value={el.subSku}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //             <Form.Item name="ean" className="table-cell">
    //               <Input
    //                 value={el.ean}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //             <Form.Item name="listPrice" className="table-cell">
    //               <Input
    //                 value={el.listPrice}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //             <Form.Item name="subscriptionPrice" className="table-cell">
    //               <Input
    //                 value={el.subscriptionPrice}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //             <Form.Item name="subscription" className="table-cell">
    //               <Input
    //                 value={el.subscription}
    //                 className={commonClass}
    //                 placeholder="input"
    //               />
    //             </Form.Item>
    //           </Form>
    //         ))}
    //       </div>
    //     </div>
    //   ) : null}
    // </>
  )
}

export default EditVariationList
