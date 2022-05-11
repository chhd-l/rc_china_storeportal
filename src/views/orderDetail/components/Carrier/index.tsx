import { useState } from 'react'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { Carrier } from '@/framework/types/order'
import { Timeline } from 'antd'

const OrderCarrier = ({ carrier }: { carrier: Carrier[] }) => {
  const [showMore, setShowMore] = useState(true)

  return (
    <div className="flex flex-col justify-start mt-4">
      <div className="flex flex-row justify-between">
        <div>
          <span className="iconfont icon-a-xingzhuangjiehe3 primary-color text-xl" />
          <span className="ml-4 text-black text-base">Carrier information</span>
        </div>
        <div className="flex flex-row items-center">
          <span className="mr-2">View carrier detail</span>
          {showMore ? (
            <UpOutlined
              onClick={() => {
                setShowMore(false)
              }}
            />
          ) : (
            <DownOutlined
              onClick={() => {
                setShowMore(true)
              }}
            />
          )}
        </div>
      </div>
      {showMore
        ? carrier.map((item, index) => (
            <div className="flex flex-col justify-start items-start pl-10" key={item.packId}>
              <div className="flex flex-row items-center">
                <span>Carrier company:{item.company}</span>
                <span className="ml-8">Carrier number:{item.packId}</span>
              </div>
              <div className="mt-4">
                <Timeline className="rc-timeline">
                  {item?.deliveries?.map((el, index) => (
                    <Timeline.Item className="text-gray-500">
                      <span>{el.context}</span>
                      <br /> <span>{el.time}</span>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </div>
            </div>
          ))
        : null}
    </div>
  )
}
export default OrderCarrier
