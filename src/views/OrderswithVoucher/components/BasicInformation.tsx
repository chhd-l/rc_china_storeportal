import { ContentContainer } from "@/components/ui"
import { DownOutlined, QuestionCircleOutlined, UpOutlined } from "@ant-design/icons"
import { Descriptions, Divider, Tooltip } from "antd"
import { useState } from "react"

const BasicInformation = () => {
    const [DescriptionsOpen, setDescriptionsOpen] = useState(false)

    return (
        <ContentContainer className="bg-white p-4 BasicInformation">
            <Descriptions title={<div className="text-xl">Basic Information <span className="text-xs BasicInformationDescriptions ml-10">Expired</span></div>} className={`${DescriptionsOpen ? '' : 'h-32'} overflow-hidden`}>
                <Descriptions.Item label="Voucher Name">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Order Type">1810000000</Descriptions.Item>
                <Descriptions.Item label="Minimum Basket Price">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Discount Amount">empty</Descriptions.Item>
                <Descriptions.Item label="Voucher Usage Period">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
                <Descriptions.Item label="Voucher Type">Zhou Maomao</Descriptions.Item>
                <Descriptions.Item label="Applicable Products">1810000000</Descriptions.Item>
                {/* <Descriptions.Item label="Quantity">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Claimed">empty</Descriptions.Item> */}
                <Descriptions.Item
                    label={
                        <div className="flex items-center">
                            Quantity
                            <Tooltip color='white' overlayClassName="BasicInformationTooltip" title="prompt text">
                                <QuestionCircleOutlined className="text-gray-400" />
                            </Tooltip>
                        </div>
                    }
                >
                    Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item
                    label={
                        <div className="flex items-center">
                            Claimed
                            <Tooltip color='white' overlayClassName="BasicInformationTooltip" title="prompt text">
                                <QuestionCircleOutlined className="text-gray-400" />
                            </Tooltip>
                        </div>
                    }
                >
                    Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item
                    label={
                        <div className="flex items-center">
                            Usage
                            <Tooltip color='white' overlayClassName="BasicInformationTooltip" title="prompt text">
                                <QuestionCircleOutlined className="text-gray-400" />
                            </Tooltip>
                        </div>
                    }
                >
                    Zhou Maomao
                </Descriptions.Item>
            </Descriptions>
            <Divider className="text-blue-500 border-black" dashed>
                {
                    DescriptionsOpen ? (
                        <div onClick={() => setDescriptionsOpen(false)} className="flex items-center cursor-default">Collapse Voucher Information <UpOutlined className="ml-1" /></div>
                    ) : (
                        <div onClick={() => setDescriptionsOpen(true)} className="flex items-center cursor-default">More Voucher Information <DownOutlined className="ml-1" /></div>
                    )
                }
            </Divider>
        </ContentContainer>
    )
}

export default BasicInformation