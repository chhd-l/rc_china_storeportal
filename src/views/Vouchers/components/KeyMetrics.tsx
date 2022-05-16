import { ContentContainer } from "@/components/ui"
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip, Typography } from 'antd';
const { Title } = Typography;

const KeyMetrics = () => {
    return (
        <ContentContainer className="bg-white px-4 mb-8">
            <Title level={5}>
                <span className="font-black">Key Metrics</span>
                <span className="text-xs text-gray-400 ml-2">(Data from 07-12-2021 to 14-12-2021 GMT+7)</span>
            </Title>
            <div className="flex w-full">
                {/* GSV */}
                <div className="p-4 flex-1 flex flex-col justify-center">
                    <div className="align-center text-xs flex-1 ml-2">
                        GSV
                        <Tooltip title="prompt text">
                            <QuestionCircleOutlined className="ml-2" style={{ fontSize: '10px' }} />
                        </Tooltip>
                    </div>
                    <Title className="flex-1 mt-2 mb-0" level={4}>￥23.00</Title>
                </div>
                {/* Orders */}
                <div className="p-4 flex-1 flex flex-col justify-center border-l border-r border-gray-300 border-solid">
                    <div className="align-center text-xs flex-1">
                        Orders
                        <Tooltip title="prompt text">
                            <QuestionCircleOutlined className="ml-2" style={{ fontSize: '10px' }} />
                        </Tooltip>
                    </div>
                    <Title className="flex-1 mt-2 mb-0" level={4}>24</Title>
                </div>
                {/* Usage Rate */}
                <div className="p-4 flex-1 flex flex-col justify-center border-r border-gray-300 border-solid">
                    <div className="align-center text-xs flex-1">
                        Usage Rate
                        <Tooltip title="prompt text">
                            <QuestionCircleOutlined className="ml-2" style={{ fontSize: '10px' }} />
                        </Tooltip>
                    </div>
                    <Title className="flex-1 mt-2 mb-0" level={4}>12%</Title>
                </div>
                {/* Buyers */}
                <div className="p-4 flex-1 flex flex-col justify-center">
                    <div className="align-center text-xs flex-1">
                        Buyers
                        <Tooltip title="prompt text">
                            <QuestionCircleOutlined className="ml-2" style={{ fontSize: '10px' }} />
                        </Tooltip>
                    </div>
                    <Title className="flex-1 mt-2 mb-0" level={4}>8</Title>
                </div>
            </div>
        </ContentContainer>
    )
}

export default KeyMetrics