import Frame from '@/assets/images/Frame.png'
import { orderStatusType } from '@/framework/constants/order'
import { Col, DatePicker, Row, Table, Tabs, Tooltip } from 'antd'
import { ColumnProps } from 'antd/es/table'
import moment, { Moment } from 'moment'
import React from 'react'
import intl from 'react-intl-universal'
import { Link } from 'react-router-dom'

const SubscriptionOrders = ({
  planningList,
  completedList,
  nextDeliveryDate,
  status,
  onChangeDate,
}: {
  planningList: any[]
  completedList: any[]
  nextDeliveryDate: string
  status: string
  onChangeDate: (date: string) => Promise<boolean>
}) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const columns_tostart: ColumnProps<any>[] = [
    {
      title: intl.get('subscription.SEQ'),
      dataIndex: 'sequence',
      key: 'no',
    },
    {
      title: (
        <Row gutter={16} align="middle">
          <Col span={18}>{intl.get('subscription.Product Name')}</Col>
          <Col span={6}>{intl.get('subscription.Quantity')}</Col>
        </Row>
      ),
      dataIndex: 'pic',
      key: 'p',
      render: (text: any, record: any) => (
        <div>
          {(record?.lineItems ?? []).map((item: any, idx: number) => (
            <Row
              key={idx}
              gutter={16}
              className={`${
                (record?.lineItems ?? []).length > 1 && idx < (record?.lineItems ?? []).length - 1
                  ? 'mb-2 border-b pb-2'
                  : ''
              }`}
            >
              <Col span={18}>
                <div className="flex flex-row items-center">
                  <img className="w-10 h-10 mr-2" src={item?.pic || ''} alt="" />
                  <div className="mr-2">
                    <div className="truncate">{item?.skuName ?? ''}</div>
                    <span className="text-gray-400 text-sm">{item?.skuNo}</span>
                  </div>
                  {item?.isGift ? (
                    <span className="ml16">
                      <img className="w-10" src={Frame} alt="" />
                    </span>
                  ) : null}
                </div>
              </Col>
              <Col span={6} className="items-start text-left">
                x {item?.num}
              </Col>
            </Row>
          ))}
        </div>
      ),
    },
    {
      title: '',
      width: '5%',
    },
    {
      title: intl.get('subscription.Shipment date'),
      dataIndex: 'shipmentDate',
      key: 'shi',
      render: (text: any) => (status === 'ONGOING' ? <div>{text ? moment(text).format('YYYY-MM-DD') : ''}</div> : null),
    },
    {
      title: intl.get('subscription.Actions'),
      key: 'ac',
      render: (text: any, record: any) => (
        <div className="space-x-2 subscription-order-action">
          {status === 'ONGOING' ? (
            <Tooltip title="Select Date">
              <DatePicker
                bordered={false}
                className="change-next-date cursor-pointer iconfont primary-color text-lg icon-rili"
                disabledDate={(current) => current < moment().startOf('day')}
                defaultValue={nextDeliveryDate ? moment(nextDeliveryDate) : undefined}
                onChange={(date: Moment | null) => {
                  if (date) {
                    setLoading(true)
                    onChangeDate(date.utc().format()).then(() => setLoading(false))
                  }
                }}
              />
            </Tooltip>
          ) : null}
          {record.orderId ? (
            <Tooltip title={intl.get('subscription.View Order Detail')}>
              <Link
                to="/order/order-detail"
                state={{ id: record?.orderId, status: record?.orderState?.orderState }}
                className="cursor-pointer iconfont icon-kjafg primary-color"
              />
            </Tooltip>
          ) : null}
        </div>
      ),
    },
  ]
  const columns_completed: ColumnProps<any>[] = [
    {
      title: intl.get('subscription.SEQ'),
      dataIndex: 'sequence',
      key: 'no',
      width: 45,
    },
    {
      title: intl.get('subscription.Order ID'),
      dataIndex: 'orderId',
      key: 'orderId',
      width: '20%',
      render: (text: string, record: any) => (
        <Link to="/order/order-detail" state={{ id: record?.orderId, status: record?.orderState?.orderState }}>
          {text}
        </Link>
      ),
    },
    {
      title: (
        <Row gutter={16} align="middle">
          <Col span={18}>{intl.get('subscription.Product Name')}</Col>
          <Col span={6}>{intl.get('subscription.Quantity')}</Col>
        </Row>
      ),
      dataIndex: 'pic',
      width: '40%',
      key: 'p',
      render: (text: any, record: any) => (
        <div>
          {(record?.lineItems ?? []).map((item: any, idx: number) => (
            <Row
              key={idx}
              gutter={16}
              className={`${
                (record?.lineItems ?? []).length > 1 && idx < (record?.lineItems ?? []).length - 1
                  ? 'mb-2 border-b pb-2'
                  : ''
              }`}
            >
              <Col span={18}>
                <div className="flex flex-row items-center">
                  <img className="w-10 h-10 mr-2" src={item?.pic || ''} alt="" />
                  <div className="flex-grow w-0">
                    <div className="truncate">{item?.skuName ?? ''}</div>
                    <span className="text-gray-400 text-sm">{item?.skuNo}</span>
                  </div>
                </div>
              </Col>
              <Col span={6} className="items-start text-left">
                x {item?.num}
              </Col>
            </Row>
          ))}
        </div>
      ),
    },
    {
      title: '',
      width: '2%',
    },
    {
      title: intl.get('subscription.Shipment date'),
      dataIndex: 'shipmentDate',
      key: 'shi',
      render: (text: any) => <div>{text ? moment(text).format('YYYY-MM-DD') : ''}</div>,
    },
    {
      title: intl.get('subscription.Order status'),
      dataIndex: 'ors',
      key: 'ors',
      render: (text: any, record: any) => orderStatusType[record?.orderState?.orderState],
    },
    {
      title: intl.get('subscription.Actions'),
      dataIndex: 'ac',
      key: 'ac',
      width: 65,
      render: (text: any, record: any) => (
        <Tooltip title={intl.get('subscription.View Order Detail')}>
          <Link
            to="/order/order-detail"
            state={{ id: record?.orderId, status: record?.orderState?.orderState }}
            className="cursor-pointer iconfont icon-kjafg primary-color"
          />
        </Tooltip>
      ),
    },
  ]
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <div>Subscription Information</div>
      </div>
      <div className="mt-4">
        <Tabs type="card">
          {status !== 'COMPLETED' ? (
            <Tabs.TabPane tab={intl.get('subscription.To start')} key="1">
              <Table
                size="small"
                loading={loading}
                columns={columns_tostart}
                dataSource={planningList}
                pagination={false}
                className="rc-table"
              />
            </Tabs.TabPane>
          ) : null}
          <Tabs.TabPane tab={intl.get('subscription.Completed')} key="2">
            <Table
              size="small"
              columns={columns_completed}
              dataSource={completedList}
              pagination={false}
              className="rc-table"
              scroll={{ y: 200 }}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default SubscriptionOrders
