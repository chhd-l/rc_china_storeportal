import React from 'react'
import { PayInfo } from '@/framework/types/order'

const PaymentInformation = ({ payInfo }: { payInfo: PayInfo | any }) => {
  const { payTypeName, payWayCode, payTime, payWayOrderID } = payInfo

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-md">
        <span className="iconfont icon-Frame2 text-theme-red" />
        <div className="text-left text-base ml-md">Payment</div>
      </div>
      {payTypeName ? (
        <div className="pl-8 grid grid-cols-2 gap-2 text-gray-400">
          <div>Payment method:{payTypeName}</div>
          <div>Transaction id:{payWayOrderID}</div>
          <div>Payment time:{payTime}</div>
        </div>
      ) : null}
    </div>
  )
}
export default PaymentInformation
