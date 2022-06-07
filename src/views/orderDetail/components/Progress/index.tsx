import { Steps } from 'antd'
import OrderActions from '@/components/order/OrderActions'
import React, { useEffect, useState } from 'react'
import { OrderStatus } from '@/framework/types/order'
import { stepList } from '../../modules/constants'
import { KeyRules } from '@/framework/types/common'
import { handleReturnTime } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'

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
  subscriptionNo,
  subscriptionId,
  orderAddress,
  logs,
  buyer,
  shipOrCompleteSuccess,
  expectedShippingDate,
}: {
  orderState: string
  orderId: string
  subscriptionNo: string | undefined
  subscriptionId: string
  orderAddress: any[]
  logs: any
  buyer: any
  shipOrCompleteSuccess: Function
  expectedShippingDate: string
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [filterSteps, setFilterSteps] = useState(stepList)
  const navigator = useNavigate()

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
        <div className="flex flex-col text-black">
          <div className="flex flex-row items-center text-black">
            <span className="icon-dingdan iconfont text-theme-red text-xl" />
            <span className="ml-md">Order ID:{orderId}</span>
          </div>
          {subscriptionNo && (
            <div
              className="hover:cursor-pointer pl-9"
              onClick={() => {
                navigator('/subscription/subscription-detail', { state: { id: subscriptionId } })
              }}
            >
              Subscription ID:{subscriptionNo}
            </div>
          )}
        </div>
        <div className="justify-items-end">
          <OrderActions
            orderState={orderState}
            orderId={orderId}
            subscriptionId={subscriptionId}
            orderAddress={orderAddress}
            orderBuyer={buyer}
            shipOrCompleteSuccess={shipOrCompleteSuccess}
            origin={'detail'}
            expectedShippingDate={expectedShippingDate}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <div className={`${filterSteps.length < 3 ? 'w-1/2' : 'w-full'}`}>
          <Steps progressDot current={currentStep}>
            {filterSteps.map((el) => (
              <Steps.Step title={el.label} description={el.updateTime} key={el.key} />
            ))}
          </Steps>
        </div>
      </div>
    </div>
  )
}
export default OrderProgress
