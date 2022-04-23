import ChooseCate from './components/ChooseCate'
import MainInfo from './components/MainInfo'
import { createContext, useEffect, useState } from 'react'
import Demo from './components/Demo'
import { ContentContainer } from '@/components/ui'
import { getAttrs, getCategories, getProduct } from '@/framework/api/get-product'
import { useParams } from 'react-router-dom'
import { CateItemProps } from '@/framework/schema/product.schema'
export const DetailContext = createContext(null as any)

const Product = () => {
  const [cateInfo, setCateInfo] = useState<{ cateId: string[] }>()
  const [showCatePop, setShowCatePop] = useState<boolean>(false)
  const [detail, setDetail] = useState({})
  const params = useParams()
  useEffect(() => {
    if (params.id !== 'add') {
      getDetail()
    } else {
      setShowCatePop(true)
    }
  }, [])
  const getDetail = async () => {
    let data = await getProduct()
    console.info('data', data)
    setDetail(data)
    setCateInfo({ cateId: ['123'] })
  }

  const handleCate = (value: any) => {
    console.info('tetstets', value)
    if (value) {
      setCateInfo(value)
    }
  }
  return (
    <ContentContainer>
      {/* <Demo />*/}
      <DetailContext.Provider value={{ detail, setShowCatePop }}>
        {showCatePop && <ChooseCate setShowCatePop={setShowCatePop} handleCate={handleCate} />}
        {cateInfo && !showCatePop && <MainInfo cateInfo={cateInfo} detail={detail} />}
      </DetailContext.Provider>
    </ContentContainer>
  )
}

export default Product
