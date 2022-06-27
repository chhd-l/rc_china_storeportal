import React from 'react'
import { Divider, Steps } from 'antd'
import { Log } from '@/framework/types/order'
import { handleReturnTime } from '@/utils/utils'
import { LogEventEnum } from '@/framework/constants/subscription'
import './index.less'

const OperateLogWidget: React.FC<{ logs: Log[] }> = ({ logs }) => {
  const subscriptionLogs = logs.slice().reverse()

  return (
    <div className='SubscriptionOperationLog'>
      <Divider>
        <span>Operation log</span>
      </Divider>
      <Steps direction="vertical" current={0}>
        {subscriptionLogs.map((item) => (
            <Steps.Step
              key={item.id}
              title={LogEventEnum[item.event] ?? item.event}
              description={
                <div className="flex justify-between w-full text-gray-400 text-sm">
                  <span>{handleReturnTime(item.createdAt)}</span>
                  <span>By {item.createdBy}</span>
                </div>
              }
              icon={<div className={`${item.operatorType === 'MP' ? 'OperationLogMP' : 'OperationLogSC'} w-8 h-8`} />}
            />
          ))}
      </Steps>
    </div>
  )
}

export default OperateLogWidget
