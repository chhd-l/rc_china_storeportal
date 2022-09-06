import { Row, Col } from 'antd'
import intl from 'react-intl-universal'

export default function TableHeader() {
  return (
    <Row className="bg-gray1 border p-4 rounded">
      <Col span={10}>{intl.get('subscription.Product(s)')}</Col>
      <Col span={4} className="text-left">
        {intl.get('subscription.Subscription Status')}
      </Col>
      <Col span={4} className="text-left">
        {intl.get('subscription.Subscription Type')}
      </Col>
      <Col span={4} className="text-left">
        {intl.get('subscription.Subscription Cycle')}
      </Col>
      <Col span={2} className="text-left">
        {intl.get('subscription.Actions')}
      </Col>
    </Row>
  )
}
