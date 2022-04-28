import { VarationProps, VarationsFormProps } from '../types/product'
import { CateItemProps, Goods, GoodsAssets, GoodsAttribute, GoodsSpecification, GoodsVariants } from '../schema/product.schema'
import { ProductListSkuItem } from '../types/product'

export const normaliseDetailforFe = (detail: any) => {
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
    variationForm: {
      variationList: normaliseVariation(detail.goodsSpecifications)
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
  return spu
}
export const normaliseVariation = (data: GoodsSpecification[]): VarationProps[] => {
  let variationList = data.map(el => {
    let variation = {
      name: el.specificationName,
      specificationList: el.goodsSpecificationDetail.map(spe => {
        let newSpe = {
          option: spe.specificationDetailName,
          goodsSpecificationId: spe.id
        }
        return newSpe
      })
    }
    return variation
  })
  return variationList
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
export const normaliseProductListSpu = (spu: any): ProductListSkuItem => {
  let listItem = {
    skus: spu.goodsVariants.map((sku: any) => normaliseProductListSku(sku)),
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