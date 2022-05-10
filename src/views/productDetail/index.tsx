import ChooseCate from './components/ChooseCate'
import MainInfo from './components/MainInfo'
import { createContext, useEffect, useState } from 'react'
import { ContentContainer } from '@/components/ui'
import { getProductDetail } from '@/framework/api/get-product'
import { useParams } from 'react-router-dom'
import { cloneDeep } from 'lodash'
export const DetailContext = createContext(null as any)

const Product = () => {
  const [cateInfo, setCateInfo] = useState<{ cateId: string[] }>()
  const [showCatePop, setShowCatePop] = useState<boolean>(false)
  const [ProductName, setProductName] = useState<string>('')
  const [spuType, setSpuType] = useState()
  const [detail, setDetail] = useState({})
  const [showMain, setShowMain] = useState(false)
  const [beforeData, setBeforeData] = useState({})
  const params = useParams()
  useEffect(() => {
    let { id } = params
    if (id !== 'add' && id) {
      getDetail(id)
    } else {
      setShowMain(true)
      setShowCatePop(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDetail = async (goodsId: string) => {
    // let data = await getProductDetail({ storeId: '12345678', goodsId: '7d58d3fb-77a7-66b2-dfb3-dfcd21a44ead' })
    let { afterData, beforeData } = await getProductDetail({ storeId: '12345678', goodsId })
    console.info('data', afterData)
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
    console.info('tetstets', value)
    // if (value) {
    //   let newDetail = Object.assign({}, detail, cateInfo)
    //   setDetail(newDetail)
    //   setCateInfo(value)
    // }
  }

  return (
    <ContentContainer>
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
