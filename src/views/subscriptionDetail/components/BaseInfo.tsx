import React from 'react'
import { Button, Row, Col } from 'antd'

const BaseInfo: React.FC = () => {
  return (
    <div className="flex justify-start space-x-4">
      <span className="iconfont icon-dingdan primary-color text-xl"></span>
      <div className="flex-grow mx-4">
        <Row gutter={[10, 10]}>
          <Col span={24}><span className="primary-color font-medium">Ongoing</span></Col>
          <Col span={12}><div className="truncate">Subscription ID: xxxxxx</div></Col>
          <Col span={12}><div className="truncate">Subscription Time: xxxxxx</div></Col>
          <Col span={12}><div className="truncate">Subscription Type: xxxxxx</div></Col>
          <Col span={12}><div className="truncate">Subscription Cycle: xxxxxx</div></Col>
        </Row>
      </div>
      <div>
        <Button type="primary">Pause</Button>
      </div>
    </div>
  )
}

export default BaseInfo
