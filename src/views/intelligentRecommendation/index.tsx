import { ContentContainer } from '@/components/ui'
import { Typography } from 'antd'
import { useNavigate } from 'react-router'
import Card from './components/Card'
import { IntelligentRecommendationList } from './modules/card'
import './Style.less'
const { Title } = Typography

const IntelligentRecommendation = () => {
  const navigator = useNavigate()
  return (
    <ContentContainer className="IntelligentRecommendation">
      {IntelligentRecommendationList.map((item, index) => {
        return (
          <ContentContainer className={`bg-white px-4 pl-0 ${index !== 0 && 'mt-6'}`}>
            <Title className="ml-4" level={4}>
              {item.title}
            </Title>
            <div className="flex flex-wrap">
              {item?.children?.map((value) => (
                <Card
                  title={value.title}
                  bgcImg={value.bgcImg}
                  span={value.span}
                  Edit={() => navigator('/marketingCenter/comingSoon')}
                  Details={index !== 0 ? () => navigator('/marketingCenter/comingSoon') : null}
                  Enable={index === 2 ? () => {} : null}
                  open={index === 2 ? (v: string) => console.log(v) : null}
                />
              ))}
            </div>
          </ContentContainer>
        )
      })}
    </ContentContainer>
  )
}

export default IntelligentRecommendation
