import { ContentContainer, InfoContainer } from '@/components/ui'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router'
import './index.less'
import { dashboardList } from './modules/content'

const Dashboard = () => {
  const navigator = useNavigate()
  return (
    <ContentContainer className='dashboard pb-0'>
      {dashboardList.map(dashboard => (
        <InfoContainer className='mb-8'>
          <div className='main-title pb-4'>{dashboard.title}</div>
          <Row gutter={[33, 46]}>
            {dashboard.content.map((item: any, idx: number) => (
              <Col span={8} key={idx}>
                <div className='cursor-pointer' onClick={() => navigator(item.url)}>
                  <img style={{ minHeight: 150 }} src={item.img} alt='' />
                </div>
                <div className='title'>{item.title}</div>
                <div className='span'>{item.span}</div>
              </Col>
            ))}
          </Row>

          {/* <div className='ContentArea flex justify-between flex-wrap'>
        {body.map((item: any, idx: number) => (
          <div className="block" key={idx}>
            <div className='cursor-pointer' onClick={() => navigator(item.url)} >
              <img src={item.img} alt="" />
            </div>
            <div className="title">{item.title}</div>
            <div className="span">{item.span}</div>
          </div>
        ))}
      </div> */}
        </InfoContainer>
      ))}
    </ContentContainer>
  )
}

export default Dashboard
