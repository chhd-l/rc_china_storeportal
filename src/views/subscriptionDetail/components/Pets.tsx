import React from 'react'
import { Avatar, Row, Col } from 'antd'

const Pets: React.FC = () => {
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-xuanzechongwu primary-color text-lg" />
        <span>Pet detail</span>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <div><Avatar shape="square" size={64} /></div>
        <div className="flex-grow">
          <div className="text-lg">Silva</div>
          <Row gutter={10}>
            <Col span={4}><span className="text-gray-400">Age</span></Col>
            <Col span={4}><span className="text-gray-400">Breed</span></Col>
          </Row>
          <Row gutter={10}>
            <Col span={4}>9 months</Col>
            <Col span={4}>Race mixte</Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Pets
