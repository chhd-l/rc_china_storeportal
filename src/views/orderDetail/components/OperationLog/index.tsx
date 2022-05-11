import { Divider, Steps } from 'antd'
import { Log } from '@/framework/types/order'
import { KeyRules } from '@/framework/types/common'
import { handleReturnTime } from '@/utils/utils'

const LogEventEnum: KeyRules = {
  INITIALIZATION: 'Order was created',
  PAY: 'Pay successfully',
  SHIP: 'Order was shipped',
  COMPLETE: 'Order was completed',
  CANCEL: 'Order was cancelled',
}

const OperationLog = ({ logs }: { logs: Log[] }) => {
  return (
    <div>
      <Divider>
        <span>Operation log</span>
      </Divider>
      <Steps direction="vertical" current={0}>
        {logs.length>0&&logs.reverse().map((item) => (
          <Steps.Step
            key={item.id}
            title={LogEventEnum[item.event]}
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
      {/*{logs.map((item) => (*/}
      {/*  <div className="flex items-center justify-start px-2">*/}
      {/*    <span className="icon-dingdan iconfont primary-color text-xl" />*/}
      {/*    <div className="flex flex-col justify-start items-start ml-2 w-full">*/}
      {/*      <div>{LogEventEnum[item.event]}</div>*/}
      {/*      <div className="flex justify-between w-full text-gray-400 text-sm">*/}
      {/*        <span>{handleReturnTime(item.createdAt)}</span>*/}
      {/*        <span>By {item.createdBy}</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  )
}
export default OperationLog
