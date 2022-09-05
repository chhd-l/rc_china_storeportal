import { DownOutlined, QuestionCircleOutlined, UpOutlined } from '@ant-design/icons'
import { Descriptions, Divider, Tooltip } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import intl from 'react-intl-universal'

const OrderType = [
  { label: intl.get('voucher.orders.All'), value: 'ALL' },
  { label: intl.get('voucher.orders.SingleOrder'), value: 'SING_ORDER' },
  { label: intl.get('voucher.orders.NormalSubscription'), value: 'NORMAL_SUBSCRIPTION' },
]

const VoucherType = [
  { label: intl.get('voucher.orders.ShopVoucher'), value: 'SHOP_VOUCHER' },
  { label: intl.get('voucher.orders.ProductVoucher'), value: 'PRODUCT_VOUCHER' },
]

const BasicInformation = ({ state }: { state: any }) => {
  const [DescriptionsOpen, setDescriptionsOpen] = useState(false)

  return (
    <div className="BasicInformation">
      <Descriptions
        title={
          <div className="text-xl flex flex-row">
            {intl.get('voucher.orders.BasicInformation')}{' '}
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
        <Descriptions.Item label={intl.get('voucher.orders.VoucherName')}>{state.voucherName}</Descriptions.Item>
        <Descriptions.Item label={intl.get('voucher.orders.OrderType')}>
          {OrderType.find((item) => item.value === state.orderType)?.label}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('voucher.orders.MinimumBasketPrice')}>
          ￥{state.minimumBasketPrice}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('voucher.orders.DiscountAmount')}>
          {state.discountType === 'PERCENTAGE' ? state.discountValue + '%OFF' : '￥' + state.discountValue}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('voucher.orders.Valid Period')}>
          {moment(state.voucherUsageBeginningOfTime).format('YYYY-MM-DD HH:mm')} to{' '}
          {moment(state.voucherUsageEndOfTimemoment).format('YYYY-MM-DD HH:mm')}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('voucher.orders.Voucher Type')}>
          {VoucherType.find((item) => item.value === state.voucherType)?.label}
        </Descriptions.Item>
        <Descriptions.Item label={intl.get('voucher.orders.Applicable Products')}>
          {state.voucherType === 'SHOP_VOUCHER'
            ? intl.get('voucher.orders.All Products')
            : `${state?.voucherProductRelated?.length} ${intl.get('voucher.orders.Products')}`}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Quantity">Hangzhou, Zhejiang</Descriptions.Item>
                <Descriptions.Item label="Claimed">empty</Descriptions.Item> */}
        <Descriptions.Item
          label={
            <div className="flex items-center">
              {intl.get('voucher.orders.Quantity')}
              <Tooltip
                color="white"
                overlayClassName="BasicInformationTooltip"
                title={intl.get('voucher.orders.TotalNumberOfVouchers')}
              >
                <QuestionCircleOutlined className="text-gray-400" />
              </Tooltip>
            </div>
          }
        >
          {state.usageQuantity === 0 ? intl.get('voucher.Unlimited') : state.usageQuantity}
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div className="flex items-center">
              {intl.get('voucher.orders.Claimed')}
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
              {intl.get('voucher.orders.Usage')}
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
            {intl.get('voucher.orders.Collapse Voucher Information')} <UpOutlined className="ml-1" />
          </div>
        ) : (
          <div onClick={() => setDescriptionsOpen(true)} className="flex items-center cursor-default">
            {intl.get('voucher.orders.More Voucher Information')} <DownOutlined className="ml-1" />
          </div>
        )}
      </Divider>
    </div>
  )
}

export default BasicInformation
