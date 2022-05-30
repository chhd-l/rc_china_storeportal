import { ContentContainer } from '@/components/ui'
import { Typography } from 'antd'
import { useNavigate } from 'react-router'
import Card from './components/Card'
import { IntelligentRecommendationList } from './modules/card'
const { Title } = Typography

const IntelligentRecommendation = () => {
    const navigator = useNavigate()
  return (
    <ContentContainer>
      {IntelligentRecommendationList.map((item, index) => {
        return (
          <ContentContainer className={`bg-white px-4 pl-0 ${(index !== 0) && 'mt-8'}`}>
            <Title className='ml-4' level={4}>
              {item.title}
            </Title>
            <div className="flex flex-wrap">
              {item?.children?.map((value) => {
                  if(index === 0) {
                    return <Card 
                            title={value.title || ''}
                            span={value.span || ''}
                            Edit={()=>navigator('/marketingCenter/comingSoon')}
                        />
                  } else if (index === 1) {
                    return <Card 
                            title={value.title || ''}
                            span={value.span || ''}
                            Edit={()=>navigator('/marketingCenter/comingSoon')}
                            Details={()=>navigator('/marketingCenter/comingSoon')}
                        />
                  } else {
                    return <Card 
                            title={value.title || ''}
                            span={value.span || ''}
                            Edit={()=>navigator('/marketingCenter/comingSoon')}
                            Details={()=>navigator('/marketingCenter/comingSoon')}
                            Enable={()=>{}}
                            open={()=>{}}
                        />
                  }
              })}
            </div>
          </ContentContainer>
        )
      })}
    </ContentContainer>
  )
}

export default IntelligentRecommendation
