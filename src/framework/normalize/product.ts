import { categoryList } from './../mock/categorylist'
import { ChangeType, VarationProps, VarationsFormProps } from '../types/product'
import { CateItemProps, Goods, GoodsAssets, GoodsAttribute, GoodsSpecification, GoodsVariants } from '../schema/product.schema'
import { ProductListSkuItem } from '../types/product'
import { VarviationProps } from '@/views/productDetail/components/EditVariationList'
import { ElementFlags } from 'typescript'
import { specialCharMap } from '@testing-library/user-event/dist/keyboard'

export const normaliseDetailforFe = (detail: any) => {
  let withoutSku = detail.goodsVariants[0]?.withoutSku

  let { variationList, variationLists } = normaliseVariationAndSpecification(detail.goodsSpecifications, detail.goodsVariants)

  let choosedCate = normaliseCateIdProps(detail.goodsCategoryId, detail.listCategoryGet, [])
  let spu = {
    // age: string
    brandId: detail.brandId,
    goodsAttributeValueRel: detail.goodsAttributeValueRel,
    // breeds: string
    cardName: detail.cardName,
    selectedCateOptions: choosedCate.map((el: any) => {
      return {
        value: el?.id + '',
        label: el?.categoryName,
      }
    }),
    cateId: choosedCate.map((el: any) => el.id + ''),
    categoryList: normaliseCateProps(detail.listCategoryGet),
    // attributeList: normaliseAttrProps(detail.listAttributeGet),
    brandList: detail.brandList,
    goodsDescription: detail.goodsDescription,
    // feedingDays: detail.feedingDays,
    // functions: detail.
    height: detail.parcelSizeHeight,
    assets: detail.goodsAsserts?.map((el: GoodsAssets) => {
      return {
        type: el.type,
        url: el.artworkUrl,
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
    // isSupport100: detail.isSupport100 ? 'ture' : 'false',
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
    // spu.skuNo: 'test0001', //to do
    // withoutSku: true,
    spu.subscriptionPrice = detail.subscriptionPrice
    spu.subscriptionStatus = detail.subscriptionStatus
    spu.stock = detail.stock
    spu.listPrice = detail.listPrice
    spu.marketingPrice = detail.marketingPrice
    spu.feedingDays = detail.feedingDays
    spu.isSupport100 = detail.isSupport100 ? 'ture' : 'false'
    spu.defaultImage = 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png'
  }
  console.info('datasss', choosedCate)
  // debugger
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
export const normaliseProductCreatFor = (data: any) => {
  let detail = {
    spuNo: data.spuNo,
    goodsName: data.name,
    cardName: data.cardName,
    goodsDescription: data.goodsDescription,
    type: data.type || 'REGULAR',
    brandId: data.brandId,
    goodsCategoryId: data.goodsCategoryId || '8',
    shelvesStatus: false,
    defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
    salesStatus: data.salesStatus === "1",
    weight: data.weight ? Number(data.weight) : 0,
    // weightUnit: 'g',
    parcelSizeLong: data.length || '1',
    // parcelSizeLongUnit: 'cm',
    parcelSizeHeight: data.height || '2',
    // parcelSizeHeightUnit: 'cm',
    parcelSizeWidth: data.width || '3',
    // parcelSizeWidthUnit: 'cm',
    storeId: '12345678',
    isDeleted: false,
    operator: 'Noah',
    // goodsVariants: [
    //   {
    //     isSupport100: true,
    //     skuType: 'REGULAR',
    //     skuNo: '20010201',
    //     eanCode: '20010201',
    //     name: '离乳期幼猫全价猫奶糕',
    //     stock: 100,
    //     marketingPrice: 159.0,
    //     listPrice: 189.0,
    //     shelvesStatus: true,
    //     shelvesTime: '2021-01-31 10:10:00',
    //     storeId: '12345678',
    //     defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
    //     subscriptionStatus: 1,
    //     feedingDays: 45,
    //     subscriptionPrice: 123,
    //     operator: 'Noah',

    //     goodsVariantSpecifications: [
    //       {
    //         specificationNameEn: '规格',
    //         specificationName: '规格',
    //         specificationDetailName: '2KG',
    //         specificationDetailNameEn: '2KG',
    //       },
    //     ],
    //   },
    // ],
    goodsVariants: normaliseInputVariationProps(data.goodsVariantsInput, data),
    goodsAsserts: [
      {
        artworkUrl: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
        type: 'image',
        storeId: '12345678',
      },
    ],
    goodsSpecifications: data.goodsSpecificationsInput && normaliseInputSpecificationProps(data.goodsSpecificationsInput),

    // goodsSpecifications: [
    //   {
    //     specificationName: '规格',
    //     specificationNameEn: 'spicification',
    //     goodsSpecificationDetail: [
    //       {
    //         specificationDetailName: '2KG',
    //         specificationDetailNameEn: '2KG',
    //       },
    //       {
    //         specificationDetailName: '2KG',
    //         specificationDetailNameEn: '2KG*2包',
    //       },
    //     ],
    //   },
    // ],
    goodsAttributeValueRel: data.goodsAttributeValueRelInput && normaliseInputAttrProps(data.goodsAttributeValueRelInput)
  }
  console.info('...', detail)
  return detail
}
export const normaliseInputVariationProps = (skus: any, spu: any) => {
  let data = []
  if (skus) {
    data = skus.map((data: any) => {
      let newVariation = {
        isSupport100: data.isSupport100 === 'true' ? true : false,
        skuType: spu.type,
        skuNo: data.skuNo,
        eanCode: data.eanCode,//withoutSku
        name: data.skuName,
        stock: data.stock ? Number(data.stock) : 0,
        marketingPrice: data.marketingPrice ? Number(data.marketingPrice) : 0,
        listPrice: data.listPrice ? Number(data.listPrice) : 0,
        shelvesStatus: true,
        // shelvesTime: '2021-01-31 10:10:00',
        storeId: '12345678',
        defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
        subscriptionStatus: Number(data.subscriptionStatus),
        feedingDays: data.feedingDays ? Number(data.feedingDays) : 0,
        subscriptionPrice: data.subscriptionPrice ? Number(data.subscriptionPrice) : 0,
        operator: 'Noah',
        //特殊处理，有bug
        goodsVariantSpecifications: data.relArr && Object.keys(data.relArr)?.filter((rel: any) => rel !== 'Variation1').map((rel: any) => {
          let item = {
            specificationNameEn: rel,
            specificationName: rel,
            specificationDetailNameEn: data.relArr[rel],
            specificationDetailName: data.relArr[rel],
          }
          return item
          // return {
          //   specificationNameEn: rel.specificationName,
          //   specificationName: rel.specificationName,
          //   specificationDetailNameEn: rel.specificationDetailName,
          //   specificationDetailName: rel.specificationDetailName,
          // }
        })
      }
      return newVariation
    })
  } else {
    data = [{
      isSupport100: spu.isSupport100 === 'true' ? true : false,
      skuType: spu.type,
      // skuNo: data.skuNo,
      // eanCode: data.eanCode,
      // name: data.skuName,
      stock: spu.stock ? Number(spu.stock) : 0,
      marketingPrice: spu.marketingPrice ? Number(spu.marketingPrice) : 0,
      listPrice: spu.listPrice ? Number(spu.listPrice) : 0,
      shelvesStatus: true,
      // shelvesTime: '2021-01-31 10:10:00',
      storeId: '12345678',
      defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
      subscriptionStatus: Number(spu.subscriptionStatus),
      feedingDays: spu.feedingDays ? Number(spu.feedingDays) : 0,
      subscriptionPrice: spu.subscriptionPrice ? Number(spu.subscriptionPrice) : 0,
      operator: 'Noah',
    }]
  }
  return data
}

export const normaliseInputSpecificationProps = (data: any) => {
  return data.map((spec: any) => {
    let newSpec = {
      specificationName: spec.name,
      specificationNameEn: spec.name,
      goodsSpecificationDetail: spec.specificationList.map((specDetail: any) => {
        return {
          specificationDetailName: specDetail.option,
          specificationDetailNameEn: specDetail.option,

        }
      })
    }
    return newSpec
  })
}
export const normaliseInputAttrProps = (goodsAttributeValueRel: any) => {
  return Object.keys(goodsAttributeValueRel)?.map(el => {
    let newItem = {
      attributeId: el,
      attributeValueId: goodsAttributeValueRel[el]
    }
    return newItem
  })
}

export const normaliseVariationAndSpecification = (data: GoodsSpecification[], goodsVariants: GoodsVariants[]): {
  variationList: VarationProps[], variationLists: any[]
} => {
  let variationList = data.map((el, idx) => {
    let variation = {
      name: el.specificationName,
      sortIdx: idx,
      id: el.id,
      specificationList: el.goodsSpecificationDetail.map((spe, cidx) => {
        let newSpe = {
          option: spe.specificationDetailName,
          id: spe.id,
          sortIdx: `${idx}-${cidx}`,
        }
        return newSpe
      })
    }
    return variation
  })
  let variationLists = goodsVariants.map(el => {
    let newItem = {
      ...el, sortIdx: '', spec: '', skuName: el.name,
      subscriptionStatus: el.subscriptionStatus.toString(),
      isSupport100: el.isSupport100 ? 'true' : 'false'
    }
    let name = el.goodsSpecificationRel?.map(elRel => {
      let specDetail = data.filter(spec => spec.id === elRel.goodsSpecificationId)
      specDetail.forEach((cElRel: GoodsSpecification) => {
        let nameVal = cElRel.goodsSpecificationDetail.find(specDetail => specDetail.id === elRel.goodsSpecificationDetailId)?.specificationDetailName
        // @ts-ignore
        newItem[cElRel.specificationName] = nameVal
      })
    })
    // el.goodsSpecificationRel.forEach(el=>{
    //   newItem[el.]
    // })
    let sortIdxArr = el.goodsSpecificationRel?.map(cel => {
      return variationList.find(variation => variation.id === cel.goodsSpecificationId)?.specificationList.filter(specification => {
        return specification.id === cel.goodsSpecificationDetailId
      }).map(ccel => {
        //多规格有问题
        newItem.sortIdx = ccel.sortIdx
        // @ts-ignore
        console.info('el.sortIdxArr', newItem.sortIdxArr)
        return ccel.sortIdx
      })
    })
    console.info('newItem', newItem)
    return newItem
    // @ts-ignore
    // let sortIdx: string = sortIdxArr.map(sortIdxItem => {
    //   debugger
    //   return sortIdxItem?.join('^')
    // })
  })
  return { variationList, variationLists }
}
export const normalizeSpecText = (goodsSpecificationRel: any, goodsSpecifications: any): string[] => {
  return goodsSpecificationRel?.map((el: any) => {
    // debugger
    let specObj = goodsSpecifications.find((spec: any) => spec.id === el.goodsSpecificationId)
    let specDetailName = specObj?.goodsSpecificationDetail?.find(
      (specDetail: any) => specDetail.id === el.goodsSpecificationDetailId,
    )?.specificationDetailName
    return specDetailName || ''
  })
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
export const normaliseProductListSpu = (spu: any): ProductListSkuItem => {
  let listItem = {
    skus: spu.goodsVariants?.map((sku: any) => normaliseProductListSku(sku, spu.goodsSpecifications)),
    img: spu.defaultImage,
    id: spu.id,
    no: spu.spuNo,
    showAll: false,
    checked: false,
    specs: 'string',
    price: 0,
    stock: 0,
    shelvesStatus: spu.shelvesStatus,
    name: spu.goodsName
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
      label: item.attributeName,
      name: `attrName-${item.id}`,
      options: item.values.map(citem => {
        return {
          name: citem.id,
          value: citem.attributeValueName,
          id: citem.id,
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