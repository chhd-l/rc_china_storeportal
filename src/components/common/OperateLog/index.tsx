import React from 'react'
import { Divider, Steps } from 'antd'
import { Log } from '@/framework/types/order'
import { handleReturnTime } from '@/utils/utils'

const OperateLogWidget: React.FC<{ logs: Log[] }> = ({ logs }) => {
  return (
    <div>
      <Divider>
        <span>Operation log</span>
      </Divider>
      <Steps direction="vertical" current={0}>
        {logs.reverse().map((item) => (
            <Steps.Step
              key={item.id}
              title={item.event}
              description={
                <div className="flex justify-between w-full text-gray-400 text-sm">
                  <span>{handleReturnTime(item.createdAt)}</span>
                  <span>By {item.createdBy}</span>
                </div>
              }
              icon={<span className="icon-dingdan iconfont primary-color text-xl" />}
            />
          ))}
      </Steps>
    </div>
  )
}

export default OperateLogWidget
