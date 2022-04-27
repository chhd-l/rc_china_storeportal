import { ChangeType, VarationProps, VarationsFormProps } from '../types/product'
import { CateItemProps, Goods, GoodsAssets, GoodsAttribute, GoodsSpecification, GoodsVariants } from '../schema/product.schema'
import { ProductListSkuItem } from '../types/product'
import { VarviationProps } from '@/views/productDetail/components/EditVariationList'
import { ElementFlags } from 'typescript'

export const normaliseDetailforFe = (detail: any) => {
  let { variationList, variationLists } = normaliseVariationAndSpecification(detail.goodsSpecifications, detail.goodsVariants)
  let spu = {
    // age: string
    brand: detail.brandId,
    goodsAttributeValueRel: detail.goodsAttributeValueRel,
    // breeds: string
    cardName: detail.cardName,
    cateId: detail.goodsCategoryId,
    categoryList: normaliseCateProps(detail.listCategoryGet),
    attributeList: normaliseAttrProps(detail.listAttributeGet),
    brandList: detail.brandList,
    description: detail.goodsDescription,
    // feedingDays: detail.feedingDays,
    // functions: detail.
    height: detail.parcelSizeHeight,
    assets: detail.goodsAsserts.map((el: GoodsAssets) => {
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
    salesStatus: detail.salesStatus,
    // size: detail.,
    spuNo: detail.spuNo,
    variationLists,
    variationForm: {
      changeType: ChangeType.handleSpec,
      variationList
    },
    // stock: detail.stock,
    // subscription: detail.subscriptionStatus,//??
    // subscriptionPrice: detail.subscriptionPrice,//？？
    support100: detail.isSupport100,
    // technology: detail.,
    // video: detail.,//??
    weight: detail.weight,
    width: detail.parcelSizeWidth,
    // zone: detail.,
  }
  console.info('spu', spu)
  return spu
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


    let newItem = { ...el, sortIdx: '', spec: '', skuName: el.name }
    let name = el.goodsSpecificationRel.map(elRel => {
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
    let sortIdxArr = el.goodsSpecificationRel.map(cel => {
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

export const normaliseProductListSku = (sku: GoodsVariants): ProductListSkuItem => {
  let skuItem = {
    id: sku.id,
    no: sku.skuNo,
    specs: '',
    price: sku.marketingPrice,
    stock: sku.stock
  }
  return skuItem
}
export const normaliseProductListSpu = (spu: Goods): ProductListSkuItem => {
  let listItem = {
    skus: spu.goodsVariants.map(sku => normaliseProductListSku(sku)),
    img: spu.defaultImage,
    id: spu.id,
    no: spu.spuNo,
    showAll: false,
    checked: false,
    specs: 'string',
    price: 0,
    stock: 0,
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
const getTree = (data: CateItemProps[], sid: any, parentId: any): any => {
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