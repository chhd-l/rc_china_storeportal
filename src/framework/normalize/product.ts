import { categoryList } from './../mock/categorylist'
import { ChangeType, ProductListQueryProps, VarationProps, VarationsFormProps } from '../types/product'
import { CateItemProps, Product, ProductAssets, ProductAttribute, ProductSpecification, ProductVariants } from '../schema/product.schema'
import { ProductListSkuItem } from '../types/product'
import { VarviationProps } from '@/views/productDetail/components/EditVariationList'
import { ElementFlags } from 'typescript'
import { specialCharMap } from '@testing-library/user-event/dist/keyboard'
import { handleObjDataForEdit } from '@/utils/utils'
import { map } from 'lodash'

export const normaliseDetailforFe = (detail: any) => {
  let withoutSku = !detail.variants?.[0]?.skuNo

  let { variationList, variationLists } = detail.specifications?.length && normaliseVariationAndSpecification(detail.specifications, detail.variants)

  let choosedCate = normaliseCateIdProps(detail.categoryId, detail.listCategoryGet, [])
  let spu: any = {
    wxCodeUrl: detail.wxCodeUrl,
    id: detail.id,
    // age: string
    brandId: detail.brandId,
    editChange: {
      variationList: []
    },
    productAttributeValueRel: detail.attributeValueRelations,
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
    productDescription: detail.description,
    // feedingDays: detail.feedingDays,
    // functions: detail.
    height: detail.parcelSizeHeight,
    productAsserts: detail.asserts?.map((el: ProductAssets) => {
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
    name: detail.name,
    salesStatus: detail.salesStatus ? '1' : '0',
    shelvesStatus: detail.shelvesStatus,
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
    let sku = detail.variants?.[0]
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
    spu.regularList = sku.variantBundles?.map((el: any) => {
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
export const normaliseDeletedData: any | ProductAssets = (data: any = [], beforeData: any = []) => {
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
  let productAsserts = (data.productAsserts ? [...data.productAsserts, data.video] : [data.video])?.filter((el: any) => el?.url)?.map((el: any) => {
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
  productAsserts = data.id ? normaliseDeletedData(productAsserts, beforeData.productAsserts) : productAsserts
  let editChangeVariationList = data.editChange?.variationList?.map((el: any, index: number) => {
    if (el) {
      el.rank = index
      if (el.specificationDetails?.length) {
        el.specificationDetails.forEach((cel: any, celIdx: number) => {
          if (cel) {
            cel.rank = celIdx
          }
        })
      }
    }
    return el
  })
  let detail: any = {
    spuNo: data.spuNo,
    name: data.name,
    cardName: data.cardName,
    description: data.productDescription,
    type: data.type,
    brandId: data.brandId,
    categoryId: data.cateId[data.cateId.length - 1],
    shelvesStatus: data.shelvesStatus,
    salesStatus: data.salesStatus === "1",
    weight: data.weight && Number(data.weight),
    parcelSizeLong: data.length,
    parcelSizeHeight: data.height,
    parcelSizeWidth: data.width,
    storeId: '12345678',
    isDeleted: false,
    operator: data.operator,
    variants: data.productVariantsInput && normaliseInputVariationProps(data.productVariantsInput, data, beforeData),
    // productAsserts: [
    //   {
    //     artworkUrl: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
    //     type: 'image',
    //     storeId: '12345678',
    //   },
    // ],
    asserts: productAsserts,
    specifications: data.id ? editChangeVariationList : data.productSpecificationsInput && normaliseInputSpecificationProps(data.productSpecificationsInput),
    attributeValueRelations: data.productAttributeValueRelInput && normaliseInputAttrProps(data.productAttributeValueRelInput, beforeData.productAttributeValueRel)
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
      debugger
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
        // operator: spu.operator,
        specificationRelations: data.relArr?.map((rel: any) => {
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
      if (data.variantBundles) {
        newVariation.variantBundles = data.variantBundles?.map((el: any) => {
          let bundleInfo = {
            bundleNumber: el.bundleNumber,
            id: el.bunldeRelId,
            variantId: el.variantId,
            subVariantId: el.subVariantId || data.id,
            skuNo: el.skuNo,
          }
          if (!el.variantId) {
            delete bundleInfo.variantId
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
      // operator: spu.operator,
      variantBundles: spu.variantBundles
    }]
    if (!spu.variantBundles) {
      delete skuData[0].variantBundles
    }
    editData = skuData
  }
  if (spu.id && beforeData) {
    //编辑 需要检查之前保存后的变更并返回变更
    // 页面上没展示的商品需要被删除
    if (spu?.productVariantsInput?.length) {
      let deletedSkuIdx: any = []
      spu.editChange.productVariants?.forEach((el: any, index: number) => {
        if (el?.specifications) {
          let editspecStr = ''
          el?.specifications.forEach((specItem: any) => {
            editspecStr = editspecStr + specItem.specificationName + '-' + specItem.specificationDetailName + '^'
          })
          let hasSku = spu.productVariantsInput.find((cel: any) => {
            let inputspecStr = ''
            cel.relArr?.forEach((relItem: any) => {
              inputspecStr = inputspecStr + relItem.specificationName + '-' + relItem.specificationDetailName + '^'
            })
            return editspecStr === inputspecStr
          })
          if (!hasSku) {
            deletedSkuIdx.push(index)
          }
        }
        if (!el?.id) {
          // 新增sku subscriptionStatus和stock没有值的时候需要默认赋值
          if (typeof el.subscriptionStatus === 'undefined') {
            el.subscriptionStatus = '1'
          }
          if (typeof el.stock === 'undefined') {
            el.stock = '0'
          }
          if (typeof el.shelvesStatus === 'undefined') {
            el.shelvesStatus = 'true'
          }
          if (typeof el.isSupport100 === 'undefined') {
            el.isSupport100 = 'true'
          }
        }
      })
      if (deletedSkuIdx.length) {
        for (let i = deletedSkuIdx.length - 1;i >= 0;i--) {
          spu.editChange.productVariants.splice(deletedSkuIdx[i], 1)
        }
      }

    }

    // }
    // beforeData.variants.filter((el: any) => el.id)
    // spu.variationLists.filter((el: any) => el.id)
    // skuData.filter((el: any) => el.id)
    //被删除的
    let delArr: any = []
    for (let item in beforeData.variants) {
      var found = false
      for (let citem in spu.productVariantsInput) {
        if (spu.productVariantsInput[citem].id === beforeData.variants[item].id) {
          found = true
          break
        }
      }
      if (!found) {
        delArr.push(beforeData.variants[item])
      }
    }
    delArr = delArr.map((el: any) => {
      let newEl = {
        isDeleted: true,
        id: el.id
      }
      return newEl
    })
    if (!spu.editChange.productVariants) {
      spu.editChange.productVariants = []
    }
    //无规格变有规格的情况，sku编辑有默认值，但是默认增量，需要处理
    let addDefault = spu.id && !beforeData.variants?.[0].skuNo && skus[0]?.skuNo
    //处理规格值转换
    let editVariationData = spu.editChange.productVariants?.map((el: any, elIdx: number) => {
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
        if (el?.variantBundles?.length) {
          el?.variantBundles?.forEach((bundleInfo: any) => {
            if (bundleInfo.stock) {
              delete bundleInfo.stock
            }
          })
          // let beforeBundleInfo = beforeData.variants?.find(el=>el.)
          // for (let item in el.variantBundles) {
          //   var found = false
          //   for (let citem in spu.productVariantsInput) {
          //     if (spu.productVariantsInput[citem].id === beforeData.variants[item].id) {
          //       found = true
          //       break
          //     }
          //   }
          //   if (!found) {
          //     delArr.push(beforeData.variants[item])
          //   }
          // }
        }
      }
      console.info('normaliseData', normaliseData)
      debugger
      return normaliseData
    }).filter((el: any) => el)

    editData = [...editVariationData, ...delArr]
    //规格有改变的
    spu.productVariantsInput?.forEach((variantInput: any, index: number) => {
      if (variantInput?.id) {
        //取到补集
        let deleteComplement = variantInput?.specificationRelations?.filter((beforeItem: any) => {
          return variantInput.relArr?.findIndex((afterItem: any) => beforeItem.specificationDetailId === afterItem.id) === -1
        })
        let addedComplement = variantInput.relArr?.filter((beforeItem: any) => {
          return variantInput.specificationRelations?.findIndex((afterItem: any) => beforeItem.id === afterItem.specificationDetailId) === -1
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
            if (!editData[index].specifications) {
              editData[index].specifications = []
            }
          }
          editData[index].specifications.push({
            id: variantInput.id || variantInput.specificationDetailId,
            isDeleted: true
          })
        })
        // 新增的
        addedComplement?.forEach((rel: any) => {
          if (!editData[index]) {
            editData[index] = {
              id: variantInput.id
            }
            if (!editData[index].specifications) {
              editData[index].specifications = []
            }
          }
          editData[index].specificationRelations.push({
            specificationNameEn: rel.specificationName,
            specificationName: rel.specificationName,
            specificationDetailNameEn: rel.specificationDetailName,
            specificationDetailName: rel.specificationDetailName,
          })
        })
      }

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
      specificationDetails: spec.specificationList.map((specDetail: any, idx: number) => {
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
export const normaliseInputAttrProps = (productAttributeValueRel: any, beforeProductAttributeValueRel: any) => {
  let newRel: any = []
  let delArr = []
  let changedOriginArr: any = []
  // let changedParent: any = []
  Object.keys(productAttributeValueRel)?.map(el => {
    let data = productAttributeValueRel[el]
    if (data) {
      changedOriginArr.push(...data)
    }
  })
  //删除
  console.info('changedOriginArr', changedOriginArr)
  if (beforeProductAttributeValueRel) {
    for (let item in beforeProductAttributeValueRel) {
      var found = false
      for (let citem in changedOriginArr) {
        if (changedOriginArr[citem] === beforeProductAttributeValueRel[item].attributeValueId) {
          found = true
          break
        }
      }
      if (!found) {
        delArr.push({
          attributeId: beforeProductAttributeValueRel[item].attributeId,
          attributeValueId: beforeProductAttributeValueRel[item].attributeValueId,
          isDeleted: true,
          relId: beforeProductAttributeValueRel[item].relId,
        })
      }
    }
  }
  //新增
  Object.keys(productAttributeValueRel)?.map(el => {
    // let filterData = beforeProductAttributeValueRel.filter((cel: any) => cel.attributeId === el)
    // changedParent.push(...filterData)
    let valueArr = productAttributeValueRel[el]
    if (beforeProductAttributeValueRel) {
      valueArr = productAttributeValueRel[el]?.filter((item: any) => beforeProductAttributeValueRel.findIndex((citem: any) => citem.attributeValueId === item) === -1)
    }
    valueArr.forEach((rel: any) => {
      if (rel) {
        newRel.push({
          attributeId: el,
          attributeValueId: rel
        })
      }
    })
  })
  if (delArr?.length) {
    newRel.push(...delArr)
  }

  console.info('newRel', newRel)
  return newRel
}

export const normaliseVariationAndSpecification = (data: ProductSpecification[], productVariants: ProductVariants[]): {
  variationList: VarationProps[], variationLists: any[]
} => {
  let variationList = data?.filter(el => el.specificationDetails).map((el, idx) => {
    let variation = {
      name: el.specificationName,
      sortIdx: idx,
      id: el.id,
      specificationList: el.specificationDetails?.map((spe, cidx) => {
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
  let variationLists = productVariants?.map(el => {
    let newItem = {
      ...el, sortIdx: '', spec: '', skuName: el.name,
      subscriptionStatus: el.subscriptionStatus?.toString(),
      isSupport100: el.isSupport100 ? 'true' : 'false',
      shelvesStatus: el.shelvesStatus ? 'true' : 'false',
    }
    let name = el.specificationRelations?.map(elRel => {
      let specDetail = data.filter(spec => spec.id === elRel.specificationId)
      specDetail.forEach((cElRel: ProductSpecification) => {
        let nameVal = cElRel.specificationDetails.find(specDetail => specDetail.id === elRel.specificationDetailId)?.specificationDetailName
        // @ts-ignore
        newItem[cElRel.specificationName] = nameVal
      })
    })
    el.variantBundles?.forEach((el: any) => {
      Object.keys(el).forEach(bundleKey => {
        if (el[bundleKey] === null) {
          delete el[bundleKey]
        }
      })
    })
    // el.specificationRelations.forEach(el=>{
    //   newItem[el.]
    // })
    let sortIdxArr = el.specificationRelations?.map(cel => {
      return variationList.find(variation => variation.id === cel.specificationId)?.specificationList.filter(specification => {
        return specification.id === cel.specificationDetailId
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
export const normalizeSpecText = (specificationRelations: any, productSpecifications: any): string[] => {
  return specificationRelations?.map((el: any) => {
    let specObj = productSpecifications.find((spec: any) => spec.id === el.specificationId)
    let specDetailName = specObj?.specificationDetails?.find(
      (specDetail: any) => specDetail.id === el.specificationDetailId,
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
export const normalizeNullDataRemove = (params: any) => {
  let newData: any = {}
  Object.keys(params).filter(el => params[el] !== undefined).forEach(el => {
    newData[el] = params[el]
  }
  )
  return newData
}

export const normaliseProductListSku = (sku: ProductVariants, productSpecifications: ProductSpecification): ProductListSkuItem => {
  let skuItem = {
    id: sku.id,
    no: sku.skuNo,
    specs: normalizeSpecText(sku.specificationRelations, productSpecifications)?.join(','),
    price: sku.marketingPrice,
    stock: sku.stock
  }
  return skuItem
}
export const normaliseProductListSpu = (spu: any): any => {
  let listItem = {
    skus: spu.variants?.map((sku: any) => normaliseProductListSku(sku, spu.specifications)),
    img: spu.variants?.[0]?.defaultImage || spu.asserts?.[0]?.artworkUrl,
    id: spu.id,
    no: spu.spuNo,
    showAll: false,
    checked: false,
    specs: 'string',
    salesStatus: spu.salesStatus,
    price: 0,
    stock: 0,
    shelvesStatus: spu.shelvesStatus,
    name: spu.name,
    wxCodeUrl: spu.wxCodeUrl
  }
  return listItem
}
export const normaliseCateProps = (data: CateItemProps[]) => {
  return getTree(data, null, 0)
}
export const normaliseAttrProps = (data: ProductAttribute[]) => {
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