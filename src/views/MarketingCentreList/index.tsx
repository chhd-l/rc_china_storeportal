import { Typography } from 'antd';
import { ContentContainer } from "@/components/ui"
import Card from "./components/Card";
import { conter } from './modules/conten'
const { Title } = Typography;

const MarketingCentreList = () => {

    return (
        <ContentContainer className="bg-white px-8">
            <Title level={3}>Marketing Tools</Title>
            <div>
                <Title level={4}>Boost Sales with Promotion</Title>
                <div className='flex items-center'>
                    {
                        conter.map((item) => (
                            <Card title={item.title} span={item.span} icon={item.icon} backColor={item.backColor} />
                        ))
                    }
                </div>
            </div>
            <div className='mt-10 mb-48'>
                <Title level={4}>Engage with Your Pet Owner</Title>
                <div className='flex items-center'>
                    <Card
                        title='Live Streaming'
                        span='Connect Live with your audience and answer shopper questions easily'
                        icon='icon-a-Frame2'
                        backColor='#E5F5F4'
                    />
                </div>
            </div>
        </ContentContainer>
    )
}

export default MarketingCentreList