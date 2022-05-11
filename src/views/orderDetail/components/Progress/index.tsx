import { Steps } from 'antd'
import OrderActions from '@/components/order/OrderActions'
import React, { useEffect, useState } from 'react'
import { OrderStatus } from '@/framework/types/order'
import { stepList } from '../../modules/constants'
import { KeyRules } from '@/framework/types/common'
import { handleReturnTime } from '@/utils/utils'

const LogsAndState: KeyRules = {
  UNPAID: 'INITIALIZATION',
  TO_SHIP: 'PAY',
  SHIPPED: 'SHIP',
  COMPLETED: 'COMPLETE',
  VOID: 'CANCEL',
}

const OrderProgress = ({
  orderState,
  orderId,
  subscriptionId,
  orderAddress,
  logs,
  buyer,
  shipOrCompleteSuccess,
}: {
  orderState: string
  orderId: string
  subscriptionId: string | undefined
  orderAddress: any[]
  logs: any
  buyer: any
  shipOrCompleteSuccess: Function
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [filterSteps, setFilterSteps] = useState(stepList)

  useEffect(() => {
    let steps = stepList
    if (orderState === OrderStatus.Cancellation) {
      steps = stepList.filter((el) => el.key === OrderStatus.Unpaid || el.key === OrderStatus.Cancellation)
    } else {
      steps = stepList.filter((el) => el.key !== OrderStatus.Cancellation)
    }
    steps.map((item) => {
      const log = logs.filter((el: any) => el.event === LogsAndState[item.key])
      item.updateTime = log.length > 0 ? handleReturnTime(log[0].createdAt) : ''
      return item
    })
    setFilterSteps(steps)
  }, [orderState, logs])

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
          <span className="icon-dingdan iconfont primary-color text-xl" />
          <span className="ml-4">
            Order ID:{orderId}
            <br />
            {subscriptionId && <span>Subscription ID:{subscriptionId}</span>}
          </span>
        </div>
        <div className="justify-items-end">
          <OrderActions
            orderState={orderState}
            orderId={orderId}
            orderAddress={orderAddress}
            orderBuyer={buyer}
            shipOrCompleteSuccess={shipOrCompleteSuccess}
            origin={'detail'}
          />
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
