import { ContentContainer } from '@/components/ui'
import { DownOutlined, QuestionCircleOutlined, UpOutlined } from '@ant-design/icons'
import { Descriptions, Divider, Tooltip } from 'antd'
import moment from 'moment'
import { useState } from 'react'

const BasicInformation = ({ state }: { state: any }) => {
  const [DescriptionsOpen, setDescriptionsOpen] = useState(false)

  return (
    <ContentContainer className="bg-white p-4 BasicInformation">
      <Descriptions
        title={
          <div className="text-xl">
            Basic Information <span className="text-xs BasicInformationDescriptions ml-10">Expired</span>
          </div>
        }
        className={`${DescriptionsOpen ? '' : 'h-32'} overflow-hidden`}
      >
        <Descriptions.Item label="Voucher Name">{state.voucherName}</Descriptions.Item>
        <Descriptions.Item label="Order Type">{state.orderType}</Descriptions.Item>
        <Descriptions.Item label="Minimum Basket Price">￥{state.minimumBasketPrice}</Descriptions.Item>
        <Descriptions.Item label="Discount Amount">{
          state.discountType === 'FIX_AMOUNT' ? 'Fix Amount' : 'By Percentage'
          }</Descriptions.Item>
        <Descriptions.Item label="Voucher Usage Period">
          {moment(state.voucherUsageBeginningOfTime).format('YYYY/MM/DD HH:mm')} to {moment(state.voucherUsageEndOfTimemoment).format('YYYY/MM/DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="Voucher Type">{state.voucherType}</Descriptions.Item>
        <Descriptions.Item label="Applicable Products">{state.discountType}</Descriptions.Item>
        {/* <Descriptions.Item label="Quantity">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Claimed">empty</Descriptions.Item> */}
        <Descriptions.Item
          label={
            <div className="flex items-center">
              Quantity
              <Tooltip color="white" overlayClassName="BasicInformationTooltip" title="Total number of vouchers">
                <QuestionCircleOutlined className="text-gray-400" />
              </Tooltip>
            </div>
          }
        >
          {state.usageQuantity}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div className="flex items-center">
              Claimed
              <Tooltip
                color="white"
                overlayClassName="BasicInformationTooltip"
                title="Number of vouchers that have been claimed"
              >
                <QuestionCircleOutlined className="text-gray-400" />
              </Tooltip>
            </div>
          }
        >
          {state.distributeQuantity}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div className="flex items-center">
              Usage
              <Tooltip
                color="white"
                overlayClassName="BasicInformationTooltip"
                title="Number of vouchers that have been used (excluding cancelled and orders)"
              >
                <QuestionCircleOutlined className="text-gray-400" />
              </Tooltip>
            </div>
          }
        >
          {state.usage}
        </Descriptions.Item>
      </Descriptions>
      <Divider className="text-blue-500 border-black" dashed>
        {DescriptionsOpen ? (
          <div onClick={() => setDescriptionsOpen(false)} className="flex items-center cursor-default">
            Collapse Voucher Information <UpOutlined className="ml-1" />
          </div>
        ) : (
          <div onClick={() => setDescriptionsOpen(true)} className="flex items-center cursor-default">
            More Voucher Information <DownOutlined className="ml-1" />
          </div>
        )}
      </Divider>
    </ContentContainer>
  )
}

export default BasicInformation
