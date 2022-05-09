import { DeleteOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import { cloneDeep } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { DetailContext } from '../../index'
import BundleSubSKuPop from '../BundleSubSKuPop'
let deletedBundles: any = []
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
    if (regularList[idx].bunldeRelId) {
      deletedBundles = [...deletedBundles, regularList[idx]]
      regularList[idx].isDeleted = true
    } else {
      regularList.splice(idx, 1)
    }
    console.info('regularList', regularList)
    updateBundleInfo(regularList)
    setRegularList([...regularList])
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
    if (regularList[idx].bunldeRelId) {
      //编辑
      skuItem.goodsVariantBundleInfo[idx].bunldeRelId = regularList[idx].bunldeRelId
    } else {
      //新增
      skuItem.goodsVariantBundleInfo[idx].subGoodsVariantId = regularList[idx].id
      skuItem.goodsVariantBundleInfo[idx].skuNo = regularList[idx].skuNo
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
    debugger
    let spuStock = Math.min(...stockArr)
    skuItem.stock = spuStock
    setRegularList(cloneDeep(regularList))
    updateBundleInfo(skuItem.goodsVariantBundleInfo)
  }
  const updateBundleInfo = (val: any) => {
    debugger
    let bundleInfo = val?.map((el: any) => {
      let info: any = {
        bundleNumber: el.bundleNumber,
        skuNo: el.skuNo,
        subGoodsVariantId: el.subGoodsVariantId,
      }
      if (el.id) {
        info.id = el.id
        info.goodsVariantId = el.goodsVariantId
      }
      return info
    })
    updateVations(bundleInfo, skuItemIdx, 'goodsVariantBundleInfo', skuItem)
  }
  const chooseBundleSku = (choosedSku: any) => {
    let deletedArr =
      regularList
        ?.filter(el => {
          let deletedArr =
            choosedSku.findIndex((choosed: any) => choosed.subGoodsVariantId === el.subGoodsVariantId) === -1
          return deletedArr
        })
        ?.filter(el => el.bunldeRelId) || []
    //删除的
    deletedBundles = [...deletedBundles, ...deletedArr]?.map(el => {
      el.isDeleted = true
      return el
    })
    //匹配选择已输入的数量
    regularList.forEach(oldSku => {
      choosedSku.forEach((newSku: any) => {
        if (oldSku.subGoodsVariantId === newSku.subGoodsVariantId) {
          newSku.bundleNumber = oldSku.bundleNumber
        }
      })
    })
    //把删除的也存起来
    choosedSku.push(...deletedBundles)
    updateBundleInfo(choosedSku)
    setRegularList(choosedSku)
  }
  useEffect(() => {
    console.info('testtest', skuItem?.goodsVariantBundleInfo)
    if (skuItem?.goodsVariantBundleInfo) {
      setRegularList(skuItem?.goodsVariantBundleInfo)
    }
  }, [skuItem?.goodsVariantBundleInfo])
  return (
    <div className='flex'>
      <div
        onClick={() => {
          console.info('regularList', regularList)
          setShowBundleChoose(true)
        }}
        className='border border-dashed border-primary w-8 h-8 p-1 cursor-pointer'
      >
        <div className='rounded-full border border-solid  border-primary w-full h-full justify-center flex items-center'>
          +
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
        defaultSelected={regularList?.filter(el => !el.isDeleted)?.map((el: any) => el?.subGoodsVariantId || el)}
      />
    </div>
  )
}

export default BundleSbuSKu
