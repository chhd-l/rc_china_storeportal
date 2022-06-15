import React from 'react'
import { Divider, Steps } from 'antd'
import { Log } from '@/framework/types/order'
import { handleReturnTime } from '@/utils/utils'
import { LogEventEnum } from '@/framework/constants/subscription'

const OperateLogWidget: React.FC<{ logs: Log[] }> = ({ logs }) => {
  const subscriptionLogs = logs.slice().reverse()

  return (
    <div>
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
              icon={<span className="icon-dingdan iconfont text-theme-red text-xl" />}
            />
          ))}
      </Steps>
    </div>
  )
}

export default OperateLogWidget
