import { Divider, Steps } from 'antd'
import { Log } from '@/framework/types/order'
import { KeyRules } from '@/framework/types/common'
import { handleReturnTime } from '@/utils/utils'
import { useEffect, useState } from 'react'

const LogEventEnum: KeyRules = {
  COMPLETE: 'Order was completed',
  SHIP: 'Order was shipped',
  PAY: 'Pay successfully',
  CANCEL: 'Order was cancelled',
  INITIALIZATION: 'Order was created',
}

const OperationLog = ({ logs }: { logs: Log[] }) => {
  const [curLogs, setCurLogs] = useState<Log[]>([])

  useEffect(() => {
    setCurLogs(logs.reverse())
  }, [logs])

  return (
    <div>
      <Divider>
        <span>Operation log</span>
      </Divider>
      <Steps direction="vertical" current={0}>
        {curLogs.length > 0 &&
          curLogs.map((item) => (
            <Steps.Step
              key={item.id}
              title={LogEventEnum[item.event]}
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
export default OperationLog
