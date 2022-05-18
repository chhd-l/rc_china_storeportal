import React from 'react'
import { Row, Col, Avatar, Tooltip } from 'antd'
import { Link } from 'react-router-dom'

interface IProps {
  handlePauseOrRestart: Function
}

const TableRow: React.FC<IProps> = ({ handlePauseOrRestart }) => {
  return (
    <div className="border mt-4">
      <Row className="bg-gray1 border-b px-4 content-center justify-between">
        <Col span={12} className="flex items-center">
          <Avatar icon="people" />
          <span className="ml-2">Tina</span>
        </Col>
        <Col span={12} className="text-right" style={{ lineHeight: '44px' }}>
          Subscription ID: xxxxx
        </Col>
      </Row>
      <Row className="p-4 flex items-start">
        <Col span={10} className="flex flex-col justify-start">
          <Row>
            <Col span={6}>
              <img className="w-16 h-16 order-img" alt="" />
            </Col>
            <Col span={16}>
              <Row>
                <Col span={20}>
                  <span>product sku name</span>
                  <br />
                  <span className="text-gray-400 text-sm">Variation: sku</span>
                </Col>
                <Col span={4} className="items-start text-left">
                  x 1
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={4} className="text-left">
          Ongoing
        </Col>
        <Col span={4} className="text-left">
          Autoship
        </Col>
        <Col span={4} className="text-left">
          Quater
        </Col>
        <Col span={2} className="text-left">
          <div className="space-x-2">
            <Tooltip title="View">
              <Link to="/subscription/subscription-detail/123" className="cursor-pointer iconfont icon-kjafg primary-color" />
            </Tooltip>
            <Tooltip title="Restart">
              <span
                className="cursor-pointer iconfont icon-Frame-11 primary-color"
                onClick={() => handlePauseOrRestart({
                  visible: true,
                  title: 'Restart Subscription',
                  content: 'Are you sure you want to restart the subscription?'
                })}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default TableRow
