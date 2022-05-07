import { Avatar, DatePicker, Row, Col, Tooltip, Empty } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useNavigate } from 'react-router'

const SubscriptionInformation = ({ subscriptionList, id }: any) => {
  const navigator = useNavigate()

  return (
    <div id={id} className="mt-4">
      <div className="py-4 px-2 border-b text-xl font-medium">Subscription Information</div>
      <div className="px-2 py-4 flex flex-row items-center justify-end">
        <div className="flex flex-row items-center mr-10">
          <div className="mr-4">Subscription Time Date:</div>
          <DatePicker.RangePicker
            style={{ width: '300px' }}
            onChange={(date, dateString) => {
              console.log(date, dateString)
            }}
          />
        </div>
      </div>
      <Row className="bg-gray1 border p-4">
        <Col span={6}>Product(s)</Col>
        <Col span={6} className="text-right">
          Subscription Status
        </Col>
        <Col span={6} className="text-right">
          Subscription Type
        </Col>
        <Col span={6} className="text-right">
          Subscription Actions
        </Col>
      </Row>
      {subscriptionList.length > 0 ? (
        subscriptionList.map((item: any) => (
          <div className="border mt-4" key={item.subscriptionId}>
            <Row className="bg-gray1 border-b p-4">
              <Col span={12} className="flex items-center">
                <Avatar icon={<UserOutlined />} />
                <span className="ml-2">{item.customerName}</span>
              </Col>
              <Col span={12} className="text-right">
                <div>subscription ID:{item.subscriptionId}</div>
              </Col>
            </Row>
            <Row className="p-4 flex items-center">
              <Col span={6} className="flex flex-row items-center">
                {item.products.map((product: any) => (
                  <Row className="items-center" key={product.id}>
                    <Col span={8}>
                      <Avatar shape="square" size={64} icon={<UserOutlined />} />
                    </Col>
                    <Col span={14}>
                      <span>{product.productName}</span>
                      <br />
                      <span>
                        Variation:{product.size},{product.color}
                      </span>
                    </Col>
                    <Col span={2}>x{product.quantity}</Col>
                  </Row>
                ))}
              </Col>
              <Col span={6} className="text-right">
                <div>{item.subscriptionStatus}</div>
              </Col>
              <Col span={6} className="text-right">
                <div>{item.subscriptionType}</div>
              </Col>
              <Col span={6} className="text-right">
                <Tooltip title="View Details">
                  <span
                    className="cursor-pointer iconfont icon-kjafg primary-color"
                    onClick={() => {
                      navigator('/subscription-detail', {
                        state: { id: item.subscriptionId },
                      })
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  )
}
export default SubscriptionInformation
