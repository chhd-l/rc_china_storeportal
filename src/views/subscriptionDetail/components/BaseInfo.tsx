import React from 'react'
import { Button, Row, Col } from 'antd'
import { SubscriptionStatus, SubscriptionCycle, SubscriptionType } from '@/framework/constants/subscription'
import moment from 'moment'

const BaseInfo = ({ data, onChange }: { data: any, onChange: () => void }) => {
  return (
    <div className="flex justify-start space-x-4">
      <span className="iconfont icon-dingdan primary-color text-xl"></span>
      <div className="flex-grow mx-4">
        <Row gutter={[10, 10]}>
          <Col span={24}><span className="primary-color font-medium">{SubscriptionStatus[data?.status]}</span></Col>
          <Col span={12}><div className="truncate">Subscription ID: {data?.no}</div></Col>
          <Col span={12}><div className="truncate">Subscription Time: {moment(data?.createdAt).format("YYYY/MM/DD HH:mm")}</div></Col>
          <Col span={12}><div className="truncate">Subscription Type: {SubscriptionType[data?.type]}</div></Col>
          <Col span={12}><div className="truncate">Subscription Cycle: {SubscriptionCycle[data?.cycle]}</div></Col>
        </Row>
      </div>
      <div>
        {data?.status === "ONGOING" || data?.status === "PAUSED" ? <Button type="primary" style={{minWidth: 80}} onClick={onChange}>{data?.status === "ONGOING" ? "Pause" : "Restart"}</Button> : null}
      </div>
    </div>
  )
}

export default BaseInfo
