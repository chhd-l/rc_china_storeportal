import { DownOutlined, QuestionCircleOutlined, UpOutlined } from '@ant-design/icons'
import { Descriptions, Divider, Tooltip } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'

const OrderType = [
  { label: 'All', value: 'ALL' },
  { label: 'Single Order', value: 'SING_ORDER' },
  { label: 'Normal Subscription', value: 'NORMAL_SUBSCRIPTION' },
]

const VoucherType = [
  { label: 'Shop Voucher', value: 'SHOP_VOUCHER' },
  { label: 'Product Voucher', value: 'PRODUCT_VOUCHER' },
]

const BasicInformation = ({ state }: { state: any }) => {
  const [DescriptionsOpen, setDescriptionsOpen] = useState(false)

  return (
    <div className="BasicInformation">
      <Descriptions
        title={
          <div className="text-xl flex flex-row">
            Basic Information{' '}
            <span
              className={`${
                state.voucherStatus === 'Ongoing'
                  ? 'bg-ongoingBg text-ongoingText'
                  : state.voucherStatus === 'Upcoming'
                  ? 'bg-upcomingBg text-theme-red'
                  : state.voucherStatus === 'Expired'
                  ? 'bg-expiredBg'
                  : ''
              } w-20 h-6 flex items-center justify-center text-xs ml-md`}
            >
              {state.voucherStatus}
            </span>
          </div>
        }
        className={`${DescriptionsOpen ? '' : 'h-32'} overflow-hidden`}
      >
        <Descriptions.Item label="Voucher Name">{state.voucherName}</Descriptions.Item>
        <Descriptions.Item label="Order Type">{OrderType.find(item => item.value === state.orderType)?.label}</Descriptions.Item>
        <Descriptions.Item label="Minimum Basket Price">￥{state.minimumBasketPrice}</Descriptions.Item>
        <Descriptions.Item label="Discount Amount">
          {state.discountType === 'PERCENTAGE' ? state.discountValue + '%OFF' : '￥' + state.discountValue}
        </Descriptions.Item>
        <Descriptions.Item label="Valid Period">
          {moment(state.voucherUsageBeginningOfTime).format('YYYY-MM-DD HH:mm')} to{' '}
          {moment(state.voucherUsageEndOfTimemoment).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label="Voucher Type">{VoucherType.find(item => item.value === state.voucherType)?.label}</Descriptions.Item>
        <Descriptions.Item label="Applicable Products">
          {state.voucherType === 'SHOP_VOUCHER' ? 'All Products' : `${state?.voucherGoodsRelated?.length} Products`}
        </Descriptions.Item>
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
          {state.usageQuantity === 0 ? 'Unlimited' : state.usageQuantity}
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
      <Divider className="text-blue-500 border-gray-500 text-14" dashed>
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
    </div>
  )
}

export default BasicInformation
