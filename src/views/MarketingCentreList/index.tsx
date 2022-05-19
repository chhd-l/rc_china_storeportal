import { Typography } from 'antd'
import { ContentContainer } from '@/components/ui'
import { PromotionTabList } from './modules/constants'
import { useNavigate } from 'react-router-dom'
import IconFont from '@/components/common/IconFont'

const { Title } = Typography

const MarketingCentreList = () => {
  const navigator = useNavigate()
  return (
    <ContentContainer className="bg-white px-8">
      <Title level={3}>Marketing Tools</Title>
      {PromotionTabList.map((item) => (
        <div className="mb-16">
          <Title level={4}>{item.title}</Title>
          <div className="grid grid-cols-3 gap-4">
            {item.children.map((el: any) => (
              <div
                onClick={() => {
                  navigator(el.url)
                }}
              >
                <div style={{ backgroundColor: '#F9FAFB' }} className="flex items-center justify-between p-4">
                  <IconFont className="m-auto" style={{ fontSize: '60px' }} type={el.icon} />
                  <div className="flex flex-col justify-between w-4/5">
                    <div className="mb-1">{el.title}</div>
                    <span className="text-gray-500" style={{ fontSize: '10px', lineHeight: '14px' }}>
                      {el.span}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </ContentContainer>
  )
}

export default MarketingCentreList
