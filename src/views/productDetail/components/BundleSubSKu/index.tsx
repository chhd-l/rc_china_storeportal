import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import { cloneDeep } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { DetailContext } from '../../index'
import BundleSubSKuPop from '../BundleSubSKuPop'
// let deletedBundles: any = []
const BundleSbuSKu = ({
  skuItem,
  keyVal,
  skuItemIdx,
  updateVations,
}: {
  skuItem: any
  keyVal: string
  skuItemIdx: number
  updateVations: Function
}) => {
  const [showBundleChoose, setShowBundleChoose] = useState(false)
  const { detail } = useContext(DetailContext)
  const [regularList, setRegularList] = useState<Array<any>>([])
  const handleDelete = (idx: number) => {
    debugger
    if (regularList[idx].id) {
      // deletedBundles = [...deletedBundles, regularList[idx]]
      regularList[idx].isDeleted = true
    } else {
      regularList.splice(idx, 1)
    }
    caclNum(regularList)
  }
  const onChange = (val: number, idx: number) => {
    if (!skuItem.goodsVariantBundleInfo) {
      skuItem.goodsVariantBundleInfo = []
    }
    if (!skuItem.goodsVariantBundleInfo[idx]) {
      skuItem.goodsVariantBundleInfo[idx] = {}
    }
    skuItem.goodsVariantBundleInfo[idx].bundleNumber = val
    regularList[idx].bundleNumber = val
    if (regularList[idx].id) {
      //编辑
      skuItem.goodsVariantBundleInfo[idx].id = regularList[idx].id
    } else {
      //新增
      skuItem.goodsVariantBundleInfo[idx].subGoodsVariantId = regularList[idx].subGoodsVariantId
      skuItem.goodsVariantBundleInfo[idx].skuNo = regularList[idx].skuNo
    }
    caclNum(regularList)
  }
  // 计算数量
  const caclNum = (regularList: any, isAll?: boolean) => {
    let stockArr = regularList?.filter((el:any)=>!el.isDeleted)
      ?.filter((el: any, idx: number) => {
        // console.info('regularListregularListregularListregularList', regularList)
        let skuStock = el.bundleNumber || 1
        // console.info(el, 'elelelel')
        // console.info(el.stock, skuStock, 'skuStockskuStockskuStock')
        if (skuStock) {
          el.subSkuStock = Math.floor(el.stock / skuStock)
          // console.info('........', skuStock)
        }
        // console.info('....skuStock', skuStock)
        debugger
        return skuStock
      })
      .map((el: any) => el.subSkuStock)

    // console.info('subSkuStock', JSON.stringify(stockArr))
    let spuStock = stockArr?.length ? Math.min(...stockArr) : 0
    debugger
    // console.info('spuStock', spuStock)
    skuItem.stock = spuStock
    if (regularList[0]?.listPrice && !detail?.id) {
      // 编辑的时候不去计算反显价格
      skuItem.listPrice = getTotal(regularList, 'listPrice')
      skuItem.marketingPrice = getTotal(regularList, 'marketingPrice')
      skuItem.subscriptionPrice = getTotal(regularList, 'subscriptionPrice')
    }
    setRegularList(cloneDeep(regularList))
    updateBundleInfo(regularList, isAll)
  }
  const getTotal = (list: any, key: string) => {
    let total = list.reduce((pre: any, cur: any) => {
      let preNum = pre?.key || pre
      let number = cur.bundleNumber || 1
      return preNum + cur[key] * number
    }, 0)
    return total
  }
  const updateBundleInfo = (val: any, isAll?: boolean) => {
    let bundleInfo = val?.map((el: any) => {
      let info: any = {
        bundleNumber: el.bundleNumber || 1,
        skuNo: el.skuNo,
        subGoodsVariantId: el.subGoodsVariantId,
        stock: el.stock,
        listPrice: el.listPrice,
        marketingPrice: el.marketingPrice,
        subscriptionPrice: el.subscriptionPrice,
        isDeleted:!!el.isDeleted
      }
      if (el.id) {
        info.id = el.id
      }
      if(el.goodsVariantId){
        info.goodsVariantId = el.goodsVariantId
      }
      return info
    })
    if (isAll) {
      skuItem.goodsVariantBundleInfo = bundleInfo
    }
    updateVations(bundleInfo, skuItemIdx, 'goodsVariantBundleInfo', skuItem)
  }
  const chooseBundleSku = (choosedSku: any) => {
    // let deletedArr =
    //   regularList
    //     ?.filter(el => {
    //       let deletedArr =
    //         choosedSku.findIndex((choosed: any) => choosed.subGoodsVariantId === el.subGoodsVariantId) === -1
    //       return deletedArr
    //     })
    //     ?.filter(el => el.bunldeRelId) || []
    // //删除的
    // deletedBundles = [...deletedBundles, ...deletedArr]?.map(el => {
    //   el.isDeleted = true
    //   return el
    // })
    //匹配选择已输入的数量
    regularList.forEach(oldSku => {
      choosedSku.forEach((newSku: any) => {
        if (oldSku.subGoodsVariantId === newSku.subGoodsVariantId) {
          newSku.bundleNumber = oldSku.bundleNumber || 1
        }
      })
    })

    //把删除的也存起来
    // choosedSku.push(...deletedBundles)
    caclNum(choosedSku, true)
  }
  useEffect(() => {
    // console.info('testtest', skuItem?.goodsVariantBundleInfo)
    if (skuItem?.goodsVariantBundleInfo) {
      setRegularList(skuItem?.goodsVariantBundleInfo)
    }
  }, [skuItem?.goodsVariantBundleInfo])
  return (
    <div className='flex items-center' style={{ minWidth: '6rem' }}>
      <div
        onClick={() => {
          // console.info('regularList', regularList)
          setShowBundleChoose(true)
        }}
        className=' w-8 h-8 p-1 cursor-pointer m-auto'
      >
        <div
          className='rounded-full border border-solid p-1 border-primary w-full h-full justify-center flex items-center'
          style={{ borderColor: 'rgb(81, 172, 245)', color: 'rgb(81, 172, 245)' }}
        >
          <PlusOutlined style={{ color: '#51ACF5' }} color='#51ACF5' />
        </div>
      </div>
      <div>
        {regularList
          ?.filter(el => !el.isDeleted)
          ?.map((el: any, index: number) => {
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
      <BundleSubSKuPop
        isModalVisible={showBundleChoose}
        setShowBundleChoose={setShowBundleChoose}
        handleOk={chooseBundleSku}
        defaultSelected={regularList}
      />
    </div>
  )
}

export default BundleSbuSKu
