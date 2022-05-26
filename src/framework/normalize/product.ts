import { categoryList } from './../mock/categorylist'
import { ChangeType, ProductListQueryProps, VarationProps, VarationsFormProps } from '../types/product'
import { CateItemProps, Goods, GoodsAssets, GoodsAttribute, GoodsSpecification, GoodsVariants } from '../schema/product.schema'
import { ProductListSkuItem } from '../types/product'
import { VarviationProps } from '@/views/productDetail/components/EditVariationList'
import { ElementFlags } from 'typescript'
import { specialCharMap } from '@testing-library/user-event/dist/keyboard'
import { handleObjDataForEdit } from '@/utils/utils'
import { map } from 'lodash'

export const normaliseDetailforFe = (detail: any) => {
  let withoutSku = !detail.goodsVariants?.[0]?.skuNo

  let { variationList, variationLists } = detail.goodsSpecifications?.length && normaliseVariationAndSpecification(detail.goodsSpecifications, detail.goodsVariants)

  let choosedCate = normaliseCateIdProps(detail.goodsCategoryId, detail.listCategoryGet, [])
  let spu: any = {
    wxCodeUrl: detail.wxCodeUrl,
    id: detail.id,
    // age: string
    brandId: detail.brandId,
    editChange: {
      variationList: []
    },
    goodsAttributeValueRel: detail.goodsAttributeValueRel,
    // breeds: string
    cardName: detail.cardName,
    selectedCateOptions: choosedCate.map((el: any) => {
      return {
        value: el?.id + '',
        label: el?.categoryName,
      }
    }),
    type: detail.type,
    cateId: choosedCate.map((el: any) => el.id + ''),
    categoryList: normaliseCateProps(detail.listCategoryGet),
    // attributeList: normaliseAttrProps(detail.listAttributeGet),
    brandList: detail.brandList,
    goodsDescription: detail.goodsDescription,
    // feedingDays: detail.feedingDays,
    // functions: detail.
    height: detail.parcelSizeHeight,
    goodsAsserts: detail.goodsAsserts?.map((el: GoodsAssets) => {
      return {
        type: el.type,
        storeId: el.storeId,
        id: el.id,
        // isRank:el.isRank,
        url: el.artworkUrl,
        isDeleted: !!el.isDeleted
      }
    }), //包含img和video，通过type区分
    length: detail.parcelSizeLong,
    // lifeStage: detail.,
    // listPrice: detail.listPrice,//??
    // marketingPrice: detail.marketingPrice//??,
    name: detail.goodsName,
    salesStatus: detail.salesStatus ? '1' : '0',
    // size: detail.,
    spuNo: detail.spuNo,
    variationLists: withoutSku ? [] : variationLists,
    variationForm: withoutSku ? {
      changeType: ChangeType.handleSpec,
      variationList: []
    } : {
      changeType: ChangeType.handleSpec,
      variationList
    },
    // stock: detail.stock,
    // subscription: detail.subscriptionStatus,//??
    // subscriptionPrice: detail.subscriptionPrice,//？？
    // isSupport100: detail.isSupport100 ? 'true' : 'false',
    // technology: detail.,
    // video: detail.,//??
    weight: detail.weight,
    width: detail.parcelSizeWidth,
    // zone: detail.,
    // skuNo: 'test0001', //to do
    // withoutSku: true,
    subscriptionPrice: '',
    subscriptionStatus: '',
    stock: '',
    listPrice: '',
    marketingPrice: '',
    feedingDays: '',
    isSupport100: '',
    defaultImage: '',
  }
  if (withoutSku) {
    let sku = detail.goodsVariants?.[0]
    // spu.skuNo: 'test0001', //to do
    // withoutSku: true,
    spu.subscriptionPrice = sku.subscriptionPrice
    spu.subscriptionStatus = sku.subscriptionStatus?.toString()
    spu.stock = sku.stock
    spu.listPrice = sku.listPrice
    spu.marketingPrice = sku.marketingPrice
    spu.feedingDays = sku.feedingDays
    spu.isSupport100 = sku.isSupport100 ? 'true' : 'false'
    spu.defaultImage = sku.defaultImage
    spu.skuId = sku.id
    spu.regularList = sku.goodsVariantBundleInfo?.map((el: any) => {
      let bundleInfo = {
        bunldeRelId: el.id,
        ...el
      }
      delete bundleInfo.id
      return bundleInfo
    })
  }
  console.info('datasss', choosedCate)
  console.info('spu', spu)
  return spu
}

export const normaliseScProductsforFe = (data: any) => {
  let { total, records } = data
  let products = records.map((el: any) => normaliseProductListSpu(el))
  return {
    total,
    products
  }
}
export const normaliseCateIdProps: any = (id: string, list: CateItemProps[], parentNode: any) => {
  let parentOption = list.find((el: any) => el.id == id)
  if (parentOption) {
    parentNode.unshift(parentOption)
    return normaliseCateIdProps(parentOption.parentId + '', list, parentNode)
  } else {
    return parentNode
  }
}
export const normaliseDeletedData: any | GoodsAssets = (data: any = [], beforeData: any = []) => {
  let newData = [...data]
  for (let item in beforeData) {
    var found = false
    for (let citem in data) {
      if (data[citem].id === beforeData[item].id) {
        found = true
        break
      }
    }
    if (!found) {
      beforeData[item].isDeleted = true
      newData.push(beforeData[item])
    }
  }
  return newData
}
export const normaliseProductCreatFor = (data: any, beforeData?: any) => {
  let goodsAsserts = (data.goodsAsserts ? [...data.goodsAsserts, data.video] : [data.video])?.filter((el: any) => el?.url)?.map((el: any) => {
    let asset = {
      artworkUrl: el.url,
      type: el.type,
      id: el.id,
      storeId: "12345678"
    }
    if (!el.id) {
      delete asset.id
    }
    return asset
  })
  goodsAsserts = data.id ? normaliseDeletedData(goodsAsserts, beforeData.goodsAsserts) : goodsAsserts
  let detail: any = {
    spuNo: data.spuNo,
    goodsName: data.name,
    cardName: data.cardName,
    goodsDescription: data.goodsDescription,
    type: data.type,
    brandId: data.brandId,
    goodsCategoryId: data.cateId[data.cateId.length - 1],
    shelvesStatus: data.shelvesStatus,
    // defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',//?干嘛呢
    salesStatus: data.salesStatus === "1",
    weight: data.weight && Number(data.weight),
    // weightUnit: 'g',
    parcelSizeLong: data.length,
    // parcelSizeLongUnit: 'cm',
    parcelSizeHeight: data.height,
    // parcelSizeHeightUnit: 'cm',
    parcelSizeWidth: data.width,
    // parcelSizeWidthUnit: 'cm',
    storeId: '12345678',
    isDeleted: false,
    operator: data.operator,
    goodsVariants: data.goodsVariantsInput && normaliseInputVariationProps(data.goodsVariantsInput, data, beforeData),
    // goodsAsserts: [
    //   {
    //     artworkUrl: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
    //     type: 'image',
    //     storeId: '12345678',
    //   },
    // ],
    goodsAsserts,
    goodsSpecifications: data.id ? data.editChange.variationList : data.goodsSpecificationsInput && normaliseInputSpecificationProps(data.goodsSpecificationsInput),
    goodsAttributeValueRel: data.goodsAttributeValueRelInput && normaliseInputAttrProps(data.goodsAttributeValueRelInput)
  }
  if (data.id) {
    detail.id = data.id
  }
  console.info('...', detail)
  return detail
}
export const normaliseInputVariationProps = (skus: any, spu: any, beforeData?: any) => {
  let skuData = []
  let editData: any = []

  if (skus) {
    skuData = skus.map((data: any, skuIdx: number) => {
      console.info('data.marketingPrice', data.marketingPrice)

      let newVariation: any = {
        isSupport100: data.isSupport100 === 'true',
        skuType: spu.type,
        skuNo: data.skuNo,
        eanCode: data.eanCode,//withoutSku
        name: data.skuName,
        stock: data.stock ? Number(data.stock) : 0,
        marketingPrice: data.marketingPrice ? Number(data.marketingPrice) : 0,
        listPrice: data.listPrice ? Number(data.listPrice) : 0,
        shelvesStatus: data.shelvesStatus === 'true',
        // shelvesTime: '2021-01-31 10:10:00',
        storeId: '12345678',
        defaultImage: data.defaultImage,
        subscriptionStatus: Number(data.subscriptionStatus),
        feedingDays: data.feedingDays ? Number(data.feedingDays) : 0,
        subscriptionPrice: data.subscriptionPrice ? Number(data.subscriptionPrice) : 0,
        operator: spu.operator,
        goodsVariantSpecifications: data.relArr?.map((rel: any) => {
          let newRel: any = {
            specificationNameEn: rel.specificationName,
            specificationName: rel.specificationName,
            specificationDetailNameEn: rel.specificationDetailName,
            specificationDetailName: rel.specificationDetailName,
          }
          if (rel.id) {
            newRel.id = rel.id
          }
          return newRel
        })
      }
      if (data.id) {
        newVariation.id = data.id
      }
      if (data.goodsVariantBundleInfo) {
        newVariation.goodsVariantBundleInfo = data.goodsVariantBundleInfo?.map((el: any) => {
          let bundleInfo = {
            bundleNumber: el.bundleNumber,
            id: el.bunldeRelId,
            goodsVariantId: el.goodsVariantId,
            subGoodsVariantId: el.subGoodsVariantId || data.id,
            skuNo: el.skuNo,
          }
          if (!el.goodsVariantId) {
            delete bundleInfo.goodsVariantId
          }
          if (!el.skuNo) {
            delete bundleInfo.skuNo
          }
          return bundleInfo
        })
      }
      return newVariation
    })
  } else {
    skuData = [{
      isSupport100: spu.isSupport100 === 'true' ? true : false,
      skuType: spu.type,
      // skuNo: data.skuNo,
      // eanCode: data.eanCode,
      // name: data.skuName,
      stock: spu.stock ? Number(spu.stock) : 0,
      marketingPrice: spu.marketingPrice ? Number(spu.marketingPrice) : 0,
      listPrice: spu.listPrice ? Number(spu.listPrice) : 0,
      // shelvesStatus: true,
      // shelvesTime: '2021-01-31 10:10:00',
      storeId: '12345678',
      defaultImage: spu.defaultImage,
      subscriptionStatus: Number(spu.subscriptionStatus),
      feedingDays: spu.feedingDays ? Number(spu.feedingDays) : 0,
      subscriptionPrice: spu.subscriptionPrice ? Number(spu.subscriptionPrice) : 0,
      operator: spu.operator,
      goodsVariantBundleInfo: spu.goodsVariantBundleInfo
    }]
    if (!spu.goodsVariantBundleInfo) {
      delete skuData[0].goodsVariantBundleInfo
    }
    editData = skuData
  }
  if (spu.id && beforeData) {
    //编辑 需要检查之前保存后的变更并返回变更
    beforeData.goodsVariants.filter((el: any) => el.id)
    spu.variationLists.filter((el: any) => el.id)
    skuData.filter((el: any) => el.id)

    //被删除的
    let delArr: any = []
    for (let item in beforeData.goodsVariants) {
      var found = false
      for (let citem in spu.goodsVariantsInput) {
        if (spu.goodsVariantsInput[citem].id === beforeData.goodsVariants[item].id) {
          found = true
          break
        }
      }
      if (!found) {
        delArr.push(beforeData.goodsVariants[item])
      }
    }
    delArr = delArr.map((el: any) => {
      let newEl = {
        isDeleted: true,
        id: el.id
      }
      return newEl
    })
    if (!spu.editChange.goodsVariants) {
      spu.editChange.goodsVariants = []
    }
    //无规格变有规格的情况，sku编辑有默认值，但是默认增量，需要处理
    let addDefault = spu.id && !beforeData.goodsVariants?.[0].skuNo && skus[0]?.skuNo
    //处理规格值转换
    let editVariationData = spu.editChange.goodsVariants?.map((el: any, elIdx: number) => {
      let normaliseData: any = null
      if (el) {
        normaliseData = { ...el }
        if (el?.shelvesStatus) {
          normaliseData.shelvesStatus = el.shelvesStatus === 'true'
        } else if (elIdx === 0 && addDefault) {
          normaliseData.shelvesStatus = true
        }
        if (el?.isSupport100) {
          normaliseData.isSupport100 = el.isSupport100 === 'true'
        } else if (elIdx === 0 && addDefault) {
          normaliseData.isSupport100 = true
        }
        if (el?.listPrice) {
          normaliseData.listPrice = Number(el.listPrice)
        }
        if (el?.stock) {
          normaliseData.stock = Number(el.stock)
        }
        if (el?.subscriptionStatus) {
          normaliseData.subscriptionStatus = Number(el.subscriptionStatus)
        } else if (elIdx === 0 && addDefault) {
          normaliseData.subscriptionStatus = 1
        }
        if (el?.subscriptionPrice !== undefined) {
          normaliseData.subscriptionPrice = Number(el.subscriptionPrice)
        }
        if (el?.marketingPrice) {
          normaliseData.marketingPrice = Number(el.marketingPrice)
        }
        if (el?.goodsVariantBundleInfo?.length) {
          el?.goodsVariantBundleInfo?.forEach((bundleInfo: any) => {
            if (bundleInfo.stock) {
              delete bundleInfo.stock
            }
          })
        }
      }
      console.info('normaliseData', normaliseData)
      debugger
      return normaliseData
    }).filter((el: any) => el)

    editData = [...editVariationData, ...delArr]
    //规格有改变的
    spu.goodsVariantsInput.filter((el: any) => el.id).forEach((variantInput: any, index: number) => {

      //取到补集
      let deleteComplement = variantInput?.goodsSpecificationRel?.filter((beforeItem: any) => {
        return variantInput.relArr?.findIndex((afterItem: any) => beforeItem.goodsSpecificationDetailId === afterItem.id) === -1
      })
      let addedComplement = variantInput.relArr?.filter((beforeItem: any) => {
        return variantInput.goodsSpecificationRel?.findIndex((afterItem: any) => beforeItem.id === afterItem.goodsSpecificationDetailId) === -1
      })
      // let complement = [...complement1, ...complement2]
      console.info('deleteComplement', deleteComplement)
      console.info('addedComplement', addedComplement)
      //删除的
      deleteComplement?.forEach((item: any) => {
        if (!editData[index]) {
          editData[index] = {
            id: variantInput.id
          }
          if (!editData[index].goodsVariantSpecifications) {
            editData[index].goodsVariantSpecifications = []
          }
        }
        editData[index].goodsVariantSpecifications.push({
          id: variantInput.id || variantInput.goodsSpecificationDetailId,
          isDeleted: true
        })
      })
      // 新增的
      addedComplement?.forEach((rel: any) => {
        if (!editData[index]) {
          editData[index] = {
            id: variantInput.id
          }
          if (!editData[index].goodsVariantSpecifications) {
            editData[index].goodsVariantSpecifications = []
          }
        }
        editData[index].goodsVariantSpecifications.push({
          specificationNameEn: rel.specificationName,
          specificationName: rel.specificationName,
          specificationDetailNameEn: rel.specificationDetailName,
          specificationDetailName: rel.specificationDetailName,
        })
      })
    })

  }
  console.info('skuData', skuData)
  console.info('editData', JSON.stringify(editData))
  // return skuData
  return spu.id ? editData : skuData
}

export const normaliseInputSpecificationProps = (data: any) => {
  return data.map((spec: any, index: number) => {
    let newSpec = {
      rank: index,
      specificationName: spec.name,
      specificationNameEn: spec.name,
      id: spec.id,
      goodsSpecificationDetail: spec.specificationList.map((specDetail: any, idx: number) => {
        return {
          rank: idx,
          specificationDetailName: specDetail.option,
          specificationDetailNameEn: specDetail.option,
          id: specDetail.id

        }
      })
    }
    return newSpec
  })
}
export const normaliseInputAttrProps = (goodsAttributeValueRel: any) => {
  let newRel: any = []
  Object.keys(goodsAttributeValueRel)?.map(el => {
    goodsAttributeValueRel[el].forEach((rel: any) => {
      if (rel) {
        newRel.push({
          attributeId: el,
          attributeValueId: rel
        })
      }
    })
  })
  console.info('newRel', newRel)
  return newRel
}

export const normaliseVariationAndSpecification = (data: GoodsSpecification[], goodsVariants: GoodsVariants[]): {
  variationList: VarationProps[], variationLists: any[]
} => {
  let variationList = data?.filter(el => el.goodsSpecificationDetail).map((el, idx) => {
    let variation = {
      name: el.specificationName,
      sortIdx: idx,
      id: el.id,
      specificationList: el.goodsSpecificationDetail?.map((spe, cidx) => {
        let newSpe = {
          option: spe.specificationDetailName,
          id: spe.id,
          sortIdx: `${100 + idx}-${cidx}`,
        }
        return newSpe
      })
    }
    return variation
  })
  let variationLists = goodsVariants?.map(el => {
    let newItem = {
      ...el, sortIdx: '', spec: '', skuName: el.name,
      subscriptionStatus: el.subscriptionStatus?.toString(),
      isSupport100: el.isSupport100 ? 'true' : 'false',
      shelvesStatus: el.shelvesStatus ? 'true' : 'false',
    }
    let name = el.goodsSpecificationRel?.map(elRel => {
      let specDetail = data.filter(spec => spec.id === elRel.goodsSpecificationId)
      specDetail.forEach((cElRel: GoodsSpecification) => {
        let nameVal = cElRel.goodsSpecificationDetail.find(specDetail => specDetail.id === elRel.goodsSpecificationDetailId)?.specificationDetailName
        // @ts-ignore
        newItem[cElRel.specificationName] = nameVal
      })
    })
    el.goodsVariantBundleInfo?.forEach((el: any) => {
      Object.keys(el).forEach(bundleKey => {
        if (el[bundleKey] === null) {
          delete el[bundleKey]
        }
      })
    })
    // el.goodsSpecificationRel.forEach(el=>{
    //   newItem[el.]
    // })
    let sortIdxArr = el.goodsSpecificationRel?.map(cel => {
      return variationList.find(variation => variation.id === cel.goodsSpecificationId)?.specificationList.filter(specification => {
        return specification.id === cel.goodsSpecificationDetailId
      }).map(ccel => {
        return ccel.sortIdx
      })
    })?.sort() || []
    // @ts-ignore
    let sortIdx: string = sortIdxArr.length > 1 ? sortIdxArr?.join('^') : sortIdxArr?.join('')
    newItem.sortIdx = sortIdx
    console.info('newItem', newItem)
    return newItem
  })
  return { variationList, variationLists }
}
export const normalizeSpecText = (goodsSpecificationRel: any, goodsSpecifications: any): string[] => {
  // console.info('goodsSpecificationRel', goodsSpecificationRel)
  return goodsSpecificationRel?.map((el: any) => {
    let specObj = goodsSpecifications.find((spec: any) => spec.id === el.goodsSpecificationId)
    let specDetailName = specObj?.goodsSpecificationDetail?.find(
      (specDetail: any) => specDetail.id === el.goodsSpecificationDetailId,
    )?.specificationDetailName
    return specDetailName || ''
  })
}
export const normaliseEditPDP = (beforeData: any, afterData: any) => {
  console.info('beforeData', beforeData)
  console.info('afterData', afterData)
  var diffData = handleObjDataForEdit(beforeData, afterData, {})

  console.info('diffData', diffData)
  return diffData
}
export const normaliseChangedvaration = (beforeData: any, afterData: any) => {
  // detail.editChange.variationList
  //   .filter((el: any) => el.id)
  //   .forEach((item: any) => {
  //     //标记删除
  //     if (item.id) {
  //       if (item.isDeleted) {
  //         newEl.goodsSpecificationRel
  //           .filter((rel: any) => rel.goodsSpecificationId === item.id)
  //           .forEach((crel: any) => {
  //             crel.isDeleted = true
  //           })
  //       }
  //       item.goodsSpecificationDetail?.forEach((cel: any) => {
  //         if (cel.id) {
  //           if (cel.isDeleted) {
  //             newEl.goodsSpecificationRel
  //               .filter((rel: any) => rel.goodsSpecificationDetailId === item.id)
  //               .forEach((crel: any) => {
  //                 crel.isDeleted = true
  //               })
  //           }
  //         }
  //       })
  //     }
  //   })
}
export const normalizeNullDataRemove = (params: any) => {
  let newData: any = {}
  Object.keys(params).filter(el => params[el] !== undefined).forEach(el => {
    newData[el] = params[el]
  }
  )
  return newData
}

export const normaliseProductListSku = (sku: GoodsVariants, goodsSpecifications: GoodsSpecification): ProductListSkuItem => {
  let skuItem = {
    id: sku.id,
    no: sku.skuNo,
    specs: normalizeSpecText(sku.goodsSpecificationRel, goodsSpecifications)?.join(','),
    price: sku.marketingPrice,
    stock: sku.stock
  }
  return skuItem
}
export const normaliseProductListSpu = (spu: any): any => {
  let listItem = {
    skus: spu.goodsVariants?.map((sku: any) => normaliseProductListSku(sku, spu.goodsSpecifications)),
    img: spu.goodsVariants?.[0]?.defaultImage || spu.goodsAsserts?.[0]?.artworkUrl,
    id: spu.id,
    no: spu.spuNo,
    showAll: false,
    checked: false,
    specs: 'string',
    price: 0,
    stock: 0,
    shelvesStatus: spu.shelvesStatus,
    name: spu.goodsName,
    wxCodeUrl: spu.wxCodeUrl
  }
  return listItem
}
export const normaliseCateProps = (data: CateItemProps[]) => {
  return getTree(data, null, 0)
}
export const normaliseAttrProps = (data: GoodsAttribute[]) => {
  let attrList = data.map(item => {
    let newItem = {
      id: item.id,
      attributeName: item.attributeName,
      attributeNameEn: item.attributeNameEn,
      // attributeRank: item.attributeRank,
      label: item.attributeNameEn,
      name: `attrName-${item.id}`,
      options: item.values.map(citem => {
        return {
          name: citem.id,
          // value: citem.attributeValueName,
          value: citem.id,
          id: citem.id,
          label: citem.attributeValueNameEn,
          relId: item.id,
          attributeName: item.attributeName,
          attributeNameEn: item.attributeNameEn,
          attributeId: citem.attributeId,
          attributeValueName: citem.attributeValueName,
          attributeValueNameEn: citem.attributeValueNameEn,
        }
      })
    }
    return newItem
  })
  return attrList
}
export const getTree = (data: CateItemProps[], sid: any, parentId: any): any => {
  const children = []
  for (const i in data) {
    const node = data[i]
    if (((!parentId && !node.parentId) || node.parentId === parentId) && node.id !== sid) {
      // key, value, label 是为antd添加的属性。若有需求，可任意添加
      children.push({
        value: node.id + '',
        label: node.categoryName,
        children: getTree(data, sid, node.id),
      })
    }
  }
  return children.length ? children : undefined
}