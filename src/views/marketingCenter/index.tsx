import { Typography } from 'antd'
import { ContentContainer } from '@/components/ui'
import { PromotionTabList } from './modules/constants'
import { useNavigate } from 'react-router-dom'
import './Style.less'
const { Title } = Typography

const MarketingCentreList = () => {
  const navigator = useNavigate()

  return (
    <ContentContainer className="bg-white px-8">
      <Title level={4}>Marketing Center</Title>
      {PromotionTabList.map((item) => (
        <div className="mb-16" key={item.title}>
          <Title level={5}>{item.title}</Title>
          <div className="grid grid-cols-3 gap-4">
            {item.children.map((el: any) => (
              <div
                className="flex items-center justify-between p-4 bg-gray2 hover:cursor-pointer"
                key={el.title}
                onClick={() => {
                  navigator(el.url)
                }}
              >
                <div className={`bacIcon ${el.bacImg}`} />
                <div className="flex flex-col justify-between w-4/5">
                  <div className="mb-1 font-black">{el.title}</div>
                  <span className="text-gray-500 text-10 leading-14">{el.span}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className='bacikaksd'></div>
    </ContentContainer>
  )
}

export default MarketingCentreList
