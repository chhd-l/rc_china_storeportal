import React from 'react'
import { Button, Row, Col, Modal, Spin } from 'antd'
import { SubscriptionStatus, SubscriptionCycle, SubscriptionType } from '@/framework/constants/subscription'
import { handleReturnTime } from '@/utils/utils'
import moment from 'moment'

const BaseInfo = ({ data, onChange }: { data: any, onChange: () => Promise<boolean> }) => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleChange = async () => {
    setVisible(false);
    setLoading(true);
    await onChange();
    setLoading(false);
  }
  return (
    <Spin spinning={loading}>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-dingdan primary-color text-xl"></span>
        <div className="flex-grow mx-4">
          <Row gutter={[10, 10]}>
            <Col span={24}><span className="primary-color font-medium">{SubscriptionStatus[data?.status]}</span></Col>
            <Col span={12}><div className="truncate">Subscription ID: {data?.no}</div></Col>
            <Col span={12}><div className="truncate">Subscription Time: {handleReturnTime(data?.createdAt)}</div></Col>
            <Col span={12}><div className="truncate">Subscription Type: {SubscriptionType[data?.type]}</div></Col>
            <Col span={12}><div className="truncate">Subscription Cycle: {SubscriptionCycle[data?.cycle]}</div></Col>
          </Row>
        </div>
        <div>
          {data?.status === "ONGOING" || data?.status === "PAUSED" ? <Button type="primary" style={{minWidth: 80}} onClick={() => setVisible(true)}>{data?.status === "ONGOING" ? "Pause" : "Restart"}</Button> : null}
        </div>
      </div>
      <Modal
        visible={visible}
        className="rc-modal"
        title={data?.status === "PAUSED" ? "Restart Subscription" : "Pause Subscription"}
        cancelText="Cancel"
        okText="Confirm"
        onCancel={() => setVisible(false)}
        onOk={handleChange}
      >
        <div>{data?.status === "PAUSED" ?  "Are you sure you want to restart this subscription?" : "Are you sure you want to pause this subscription?"}</div>
      </Modal>
    </Spin>
  )
}

export default BaseInfo
