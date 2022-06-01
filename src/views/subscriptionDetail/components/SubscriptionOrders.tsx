import React from 'react'
import { Table, Tabs, Row, Col, Calendar, Popover } from 'antd'
import { ColumnProps } from 'antd/es/table'
import moment from 'moment'


const SubscriptionOrders = ({ planningList, completedList, onChangeDate } : { planningList: any[], completedList: any[], onChangeDate: (date: string) => void }) => {
  const columns_tostart: ColumnProps<any>[] = [
    {
      title: 'Sequence',
      dataIndex: 'sequence',
      key: 'no',
    },
    {
      title: 'Product Name',
      dataIndex: 'pic',
      key: 'p',
      render: (text: any, record: any) => (
        <div>
          {(record?.lineItem ?? []).map((item: any, idx: number) => (
            <Row key={idx} className={`${(record?.lineItem ?? []).length > 1 && idx < (record?.lineItem ?? []).length - 1 ? "border-b h-20 pb-2" : ""}`}>
              <Col span={6}>
                <img className="w-16 h-16 order-img" src={item?.pic || ""} alt="" />
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={20}>
                    <span>{item?.skuName ?? ""}</span>
                    <br />
                    <span className="text-gray-400 text-sm">{item?.skuNo}</span>
                  </Col>
                  <Col span={4} className="items-start text-left">
                    x {item?.num}
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </div>
      )
    },
    {
      title: 'Shipment date',
      dataIndex: 'shipmentDate',
      key: 'shi',
      render: (text: any) => text ? moment(text).format('YYYY/MM/DD HH:mm') : ""
    },
    {
      title: 'Actions',
      key: 'ac',
      render: (text: any, record: any) => (
        <Popover trigger="click" content={<Calendar fullscreen={false} disabledDate={(current) => current < moment().endOf('day')} />}>
          <span className="iconfont primary-color icon-rili text-lx"></span>
        </Popover>
      )
    }
  ];
  const columns_completed: ColumnProps<any>[] = [
    {
      title: 'Sequency',
      dataIndex: 'sequence',
      key: 'no',
    },
    {
      title: 'Order ID',
      dataIndex: 'or',
      key: 'or'
    },
    {
      title: 'Product Name',
      dataIndex: 'pic',
      key: 'p',
      render: (text: any, record: any) => (
        <div>
          {(record?.lineItem ?? []).map((item: any, idx: number) => (
            <Row key={idx} className={`${(record?.lineItem ?? []).length > 1 && idx < (record?.lineItem ?? []).length - 1 ? "border-b h-20 pb-2" : ""}`}>
              <Col span={6}>
                <img className="w-16 h-16 order-img" src={item?.pic || ""} alt="" />
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={20}>
                    <span>{item?.skuName ?? ""}</span>
                    <br />
                    <span className="text-gray-400 text-sm">{item?.skuNo}</span>
                  </Col>
                  <Col span={4} className="items-start text-left">
                    x {item?.num}
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </div>
      )
    },
    {
      title: 'Shipment date',
      dataIndex: 'shipmentDate',
      key: 'shi',
      render: (text: any) => moment(text).format('YYYY/MM/DD HH:mm')
    },
    {
      title: 'Order status',
      dataIndex: 'ors',
      key: 'ors'
    },
    {
      title: 'Actions',
      dataIndex: 'ac',
      key: 'ac'
    }
  ];
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <div>Subscription information</div>
      </div>
      <div className="mt-4">
        <Tabs type="card">
          <Tabs.TabPane tab="To start" key="1">
            <Table size="small" columns={columns_tostart} dataSource={planningList} pagination={false} className="rc-table" />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Completed" key="2">
            <Table size="small" columns={columns_completed} dataSource={completedList} pagination={false} className="rc-table" />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default SubscriptionOrders
