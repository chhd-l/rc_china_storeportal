import React from 'react'
import { Button, Row, Col, Modal, Spin } from 'antd'
import { SubscriptionStatus, SubscriptionCycle, SubscriptionType } from '@/framework/constants/subscription'
import { handleReturnTime } from '@/utils/utils'
import intl from 'react-intl-universal'

const BaseInfo = ({ data, onChange }: { data: any; onChange: () => Promise<boolean> }) => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleChange = async () => {
    setVisible(false)
    setLoading(true)
    await onChange()
    setLoading(false)
  }
  return (
    <Spin spinning={loading}>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-dingdan primary-color text-xl"></span>
        <div className="flex-grow mx-4">
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <span className="primary-color font-medium">{SubscriptionStatus[data?.status]}</span>
            </Col>
            <Col span={12}>
              <div className="truncate">
                {intl.get('subscription.Subscription ID')}: {data?.no}
              </div>
            </Col>
            <Col span={12}>
              <div className="truncate">
                {intl.get('subscription.Subscription Time')}: {handleReturnTime(data?.createdAt)}
              </div>
            </Col>
            <Col span={12}>
              <div className="truncate">
                {intl.get('subscription.Subscription Type')}: {SubscriptionType[data?.type]}
              </div>
            </Col>
            <Col span={12}>
              <div className="truncate">
                {intl.get('subscription.Subscription Cycle')}: {SubscriptionCycle[data?.cycle]}
              </div>
            </Col>
          </Row>
        </div>
        <div>
          {data?.status === 'ONGOING' || data?.status === 'PAUSED' ? (
            <Button type="primary" style={{ minWidth: 80 }} onClick={() => setVisible(true)}>
              {data?.status === 'ONGOING'
                ? intl.get('subscription.Pause')
                : intl.get('subscription.Subscription Cycle')}
            </Button>
          ) : null}
        </div>
      </div>
      <Modal
        visible={visible}
        className="rc-modal"
        title={
          data?.status === 'PAUSED'
            ? intl.get('subscription.Restart Subscription')
            : intl.get('subscription.Pause Subscription')
        }
        cancelText={intl.get('public.cancel')}
        okText={intl.get('public.confirm')}
        onCancel={() => setVisible(false)}
        onOk={handleChange}
      >
        <div>
          {data?.status === 'PAUSED'
            ? intl.get('public.Are you sure you want to restart this subscription?')
            : intl.get('public.Are you sure you want to pause this subscription?')}
        </div>
      </Modal>
    </Spin>
  )
}

export default BaseInfo
