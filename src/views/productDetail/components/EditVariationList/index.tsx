import './index.less'
import { VariationosContext } from '../SalesInfo'
import { useContext, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { Form, Input } from 'antd'
import { FormProps } from '@/framework/types/common'
import classNames from 'classnames'
import { SpecificationListProps, VarationProps, VarationsFormProps } from '@/framework/types/product'
import { headerOrigition } from '../../modules/constant'
interface VarviationProps {
  img: string
  sku: string
  ean: string
  listPrice: string
  marketingPrice: string
  spec: string
  sortIdx: string

  [key: string]: string
}
interface HeaderProps {
  type: string
  label: string
}

const commonClass = 'w-32 border-0 border-t border-r border-solid border-gray-200 text-center'
const EditVariationList = (props: FormProps) => {
  const { variationForm: cloneVariationForm, changeType } = useContext(VariationosContext)
  //changeType操作variation需要做include处理；操作spec需要做===处理
  const [variationList, setVariationList] = useState<VarviationProps[]>([])
  const [headerList, setHeaderList] = useState<HeaderProps[]>([])
  const [variationForm, setVariationForm] = useState({} as VarationsFormProps)
  console.info('changeType', changeType)
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
    console.info('variationForm', variationForm)
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
      let header = { label: el.name || `Varations[${idx}]`, type: 'text' }
      return header
    })
    const cloneHeaderOrigition = [...headerOrigition]
    cloneHeaderOrigition.splice(1, 0, ...variationHeaders)
    console.info('cloneHeaderOrigition', cloneHeaderOrigition)
    setHeaderList(cloneHeaderOrigition)
  }
  const combination = (vartion: any) => {
    var heads = vartion[0]
    for (var i = 1, len = vartion.length; i < len; i++) {
      heads = addNewType(heads, vartion[i])
    }
    debugger
    return vartion.length > 1 ? heads : heads.map((el: any) => el.option) //only one variation
  }
  const addNewType = (heads: any, choices: any) => {
    var result = []
    for (var i = 0, len = heads.length; i < len; i++) {
      for (var j = 0, lenj = choices.length; j < lenj; j++) {
        result.push((heads[i]?.option || heads[i]) + ',' + choices[j].option)
      }
    }
    return result
  }
  const initData = (data: any, { variationList }: VarationsFormProps) => {
    let list = data.map((el: any) => {
      let newEl: VarviationProps = {
        spec: el,
        img: '',
        sku: '',
        subSku: '',
        Subscription: '',
        sortIdx: '',
        ean: '',
        listPrice: '',
        marketingPrice: '',
        SubscriptionPrice: '',
      }
      el.split(',').forEach((spec: string, idx: number) => {
        let name = variationList[idx].name || `Varations[${idx}]`
        newEl[name] = spec
      })

      return newEl
    })
    console.info('list', list)
    setVariationList(list)
  }
  //   function calcDescartes (array) {
  //     if (array.length < 2) return array[0] || [];

  //     return [].reduce.call(array, function (col, set) {
  //         var res = [];

  //         col.forEach(function (c) {
  //             set.forEach(function (s) {
  //                 var t = [].concat(Array.isArray(c) ? c : [c]);
  //                 t.push(s);
  //                 res.push(t);
  //             })
  //         });

  //         return res;
  //     });
  // }
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
      init(cloneDeep(datas), data)
      // let varations: string[] = combination(specList)
      // initData(varations, data)
    }
  }
  const init = (vartions: any, { variationList: formData }: VarationsFormProps) => {
    debugger
    let list = vartions.map((vartion: any) => {
      console.info('......', vartion)
      console.info('variationListvariationList', JSON.stringify(variationList))
      let newEl: VarviationProps = {
        spec: vartion.length ? vartion.map((el: any) => el.option).join(',') : vartion.option,
        img: '',
        sku: '',
        subSku: '',
        Subscription: '',
        ean: '',
        listPrice: '',
        marketingPrice: '',
        SubscriptionPrice: '',
        sortIdx: vartion.map?.((el: any) => el.sortIdx).join('^') || vartion.sortIdx,
      }
      if (vartion.length) {
        vartion.forEach((spec: any, idx: number) => {
          debugger
          let name = formData[idx]?.name || `Variation${idx}`
          newEl[name] = (spec[0] || spec)?.option || 'option'
        })
      } else {
        let name = formData[0]?.name || `Variation0`
        newEl[name] = vartion?.option || 'option'
      }

      return newEl
    })
    console.info('list', list)
    setVariationList(list)
    // return list
  }
  console.info('variationListvariationList', variationList)
  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            {headerList.map(th => (
              <th>{th.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variationList.map((tr, index) => (
            <tr>
              {headerList.map((td, count) => (
                <td>
                  <span>
                    {(() => {
                      switch (td.type) {
                        case 'input':
                          return (
                            <Input
                              onBlur={e => {
                                console.info('e.target.value', e.target.value)
                                console.info('eeeeee', variationList)
                                tr[td.label] = e.target.value
                              }}
                              defaultValue={tr[td.label]}
                            />
                          )
                        case 'text':
                          return (
                            <span>
                              {console.info('JSON.stringify(tr)', JSON.stringify(tr))}
                              {tr[td.label]}
                            </span>
                          )
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
