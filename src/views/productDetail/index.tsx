import ChooseCate from './components/ChooseCate'
import MainInfo from './components/MainInfo'
import { createContext, useEffect, useState } from 'react'
import { ContentContainer } from '@/components/ui'
import { getProductDetail } from '@/framework/api/get-product'
import { useLocation } from 'react-router'
import { cloneDeep } from 'lodash'
import './index.less'
export const DetailContext = createContext(null as any)

const Product = () => {
  const [cateInfo, setCateInfo] = useState<{ cateId: string[] }>()
  const [showCatePop, setShowCatePop] = useState<boolean>(false)
  const [ProductName, setProductName] = useState<string>('')
  const [spuType, setSpuType] = useState()
  const [detail, setDetail] = useState({})
  const [showMain, setShowMain] = useState(false)
  const [beforeData, setBeforeData] = useState({})
  const { state }: any = useLocation()
  useEffect(() => {
    if (state) {
      getDetail(state)
    } else {
      setShowMain(true)
      setShowCatePop(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDetail = async (productId: string) => {
    let { afterData, beforeData } = await getProductDetail({ storeId: 'storeIdMock', productId })
    // console.info('data', afterData)
    setBeforeData(beforeData)
    setDetail(afterData)
    if (afterData.type) {
      setSpuType(afterData.type)
    }
    setProductName(afterData.name || '')
    setShowMain(true)
    // setCateInfo({ cateId: ['123'] })
  }

  useEffect(() => {
    let newDetail = Object.assign({}, detail, cateInfo)
    setDetail(cloneDeep(newDetail))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateInfo])

  const handleCate = (value: any) => {
    // console.info('tetstets', value)
    if (value) {
      let newDetail = Object.assign({}, detail, cateInfo)
      setDetail(newDetail)
      setCateInfo(value)
    }
  }

  return (
    <ContentContainer className='product-detail-info'>
      <DetailContext.Provider value={{ detail, setShowCatePop, setProductName, spuType, ProductName }}>
        {showMain ? (
          <MainInfo details={detail} beforeData={beforeData} showCatePop={showCatePop}>
            {showCatePop && (
              <ChooseCate
                setSpuType={setSpuType}
                detail={detail}
                setShowCatePop={setShowCatePop}
                setProductName={setProductName}
                handleCate={handleCate}
              />
            )}
          </MainInfo>
        ) : null}
      </DetailContext.Provider>
    </ContentContainer>
  )
}

export default Product
