import { Steps } from 'antd'
import OrderActions from '@/components/order/OrderActions'
import React, { useEffect, useState } from 'react'
import { OrderStatus } from '@/framework/types/order'
import { stepList } from '../../modules/constants'

const OrderProgress = ({
  orderState,
  orderId,
  subscriptionId,
  orderAddress,
}: {
  orderState: string
  orderId: string
  subscriptionId: string | undefined
  orderAddress: any
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [filterSteps, setFilterSteps] = useState(stepList)

  useEffect(() => {
    if (orderState === OrderStatus.Cancellation) {
      setFilterSteps(stepList.filter((el) => el.key === OrderStatus.Unpaid || el.key === OrderStatus.Cancellation))
    } else {
      setFilterSteps(stepList.filter((el) => el.key !== OrderStatus.Cancellation))
    }
  }, [orderState])

  useEffect(() => {
    filterSteps.map((el, i) => {
      if (orderState === el.key) {
        setCurrentStep(i)
      }
    })
  }, [filterSteps, orderState])

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="text-left flex flex-row text-black">
          <span className="icon-dingdan iconfont text-red-500 text-xl" />
          <span className="ml-4">
            Order ID:{orderId}
            <br />
            {subscriptionId&&( <span>Subscription ID:{subscriptionId}</span>)}
          </span>
        </div>
        <div className="justify-items-end">
          <OrderActions orderState={orderState} orderId={orderId} orderAddress={orderAddress} />
        </div>
      </div>
      <div className="mt-4">
        <Steps progressDot current={currentStep}>
          {filterSteps.map((el) => (
            <Steps.Step title={el.label} description={el.updateTime} key={el.key} />
          ))}
        </Steps>
      </div>
    </div>
  )
}
export default OrderProgress
