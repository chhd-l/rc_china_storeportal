import ChooseCate from './components/ChooseCate'
import MainInfo from './components/MainInfo'
import { createContext, useEffect, useState } from 'react'
import Demo from './components/Demo'
import { ContentContainer } from '@/components/ui'
import { createProduct, getAttrs, getCategories, getProduct, getProductDetail } from '@/framework/api/get-product'
import { useParams } from 'react-router-dom'
import { CateItemProps } from '@/framework/schema/product.schema'
import { cloneDeep } from 'lodash'
export const DetailContext = createContext(null as any)

const Product = () => {
  const [cateInfo, setCateInfo] = useState<{ cateId: string[] }>()
  const [showCatePop, setShowCatePop] = useState<boolean>(false)
  const [detail, setDetail] = useState({})
  const [showMain, setShowMain] = useState(false)
  const params = useParams()
  useEffect(() => {
    let { id } = params
    if (id !== 'add' && id) {
      getDetail(id)
    } else {
      setShowMain(true)
      setShowCatePop(true)
    }
    let datas = {
      spuNo: '20010714',
      goodsName: '离乳期幼猫全价猫奶糕',
      cardName: '离乳期幼猫全价猫奶糕',
      goodsDescription: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1622532998736_aXPk5Z.jpg',
      type: 'REGULAR',
      brandId: '123342',
      goodsCategoryId: '',
      shelvesStatus: true,
      defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
      salesStatus: true,
      weight: 2000,
      weightUnit: 'g',
      parcelSizeLong: '100',
      parcelSizeLongUnit: 'cm',
      parcelSizeHeight: '100',
      parcelSizeHeightUnit: 'cm',
      parcelSizeWidth: '100',
      parcelSizeWidthUnit: 'cm',
      storeId: '12345678',
      isDeleted: 0,
      operator: 'Noah',
      goodsVariants: [
        {
          isSupport100: true,
          skuType: 'REGULAR',
          skuNo: '20010201',
          eanCode: '20010201',
          name: '离乳期幼猫全价猫奶糕',
          stock: 100,
          marketingPrice: 159.0,
          listPrice: 189.0,
          shelvesStatus: true,
          shelvesTime: '2021-01-31 10:10:00',
          storeId: '12345678',
          defaultImage: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
          subscriptionStatus: 1,
          feedingDays: 45,
          subscriptionPrice: 123,
          operator: 'Noah',

          goodsVariantSpecifications: [
            {
              specificationNameEn: '规格',
              specificationName: '规格',
              specificationDetailName: '2KG',
              specificationDetailNameEn: '2KG',
            },
          ],
        },
      ],

      goodsAsserts: [
        {
          artworkUrl: 'https://miniapp-product.royalcanin.com.cn/rcmini2020/upload/1632987707399_z7bUuS.png',
          type: 'image',
          storeId: '12345678',
        },
      ],

      goodsSpecifications: [
        {
          specificationName: '规格',
          specificationNameEn: 'spicification',
          goodsSpecificationDetail: [
            {
              specificationDetailName: '2KG',
              specificationDetailNameEn: '2KG',
            },
            {
              specificationDetailName: '2KG',
              specificationDetailNameEn: '2KG*2包',
            },
          ],
        },
      ],
      goodsAttributeValueRel: [
        {
          attributeId: 'a7ddacc3-c36f-a8a0-d54f-9cb4395b1a02',
          attributeValueId: '05325edb-111b-ce6a-8d72-f95bb11e',
        },
      ],
    }
    // createProduct(datas)
  }, [])
  const getDetail = async (goodsId: string) => {
    // let data = await getProductDetail({ storeId: '12345678', goodsId: '7d58d3fb-77a7-66b2-dfb3-dfcd21a44ead' })
    let data = await getProductDetail({ storeId: '12345678', goodsId })
    console.info('data', data)
    setDetail(cloneDeep(data))
    setShowMain(true)
    // setCateInfo({ cateId: ['123'] })
  }
  useEffect(() => {
    let newDetail = Object.assign({}, detail, cateInfo)
    setDetail(cloneDeep(newDetail))
  }, [cateInfo])
  const handleCate = (value: any) => {
    console.info('tetstets', value)
    if (value) {
      let newDetail = Object.assign({}, detail, cateInfo)
      setDetail(newDetail)
      setCateInfo(value)
    }
  }
  console.info('detail', detail)
  return (
    <ContentContainer>
      {/* <Demo />*/}
      <DetailContext.Provider value={{ detail, setShowCatePop }}>
        {showMain ? (
          <MainInfo details={detail} showCatePop={showCatePop}>
            {/* <div></div> */}
            {showCatePop && <ChooseCate detail={detail} setShowCatePop={setShowCatePop} handleCate={handleCate} />}
          </MainInfo>
        ) : null}
      </DetailContext.Provider>
    </ContentContainer>
  )
}

export default Product
