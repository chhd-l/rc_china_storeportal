import { Row, Col } from 'antd'

export default function TableHeader() {
  return (
    <Row className="bg-gray1 border p-4 rounded">
      <Col span={10}>Product(s)</Col>
      <Col span={4} className="text-left">
        Subscription Status
      </Col>
      <Col span={4} className="text-left">
        Subscription Type
      </Col>
      <Col span={4} className="text-left">
        Subscription Cycle
      </Col>
      <Col span={2} className="text-left">
        Actions
      </Col>
    </Row>
  )
}
