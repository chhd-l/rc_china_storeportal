import React from 'react'
import { Table, Tabs, Row, Col, Calendar, Popover, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { orderStatusType } from '@/framework/constants/order'
import { ColumnProps } from 'antd/es/table'
import moment, { Moment } from 'moment'


const SubscriptionOrders = ({ planningList, completedList, nextDeliveryDate, onChangeDate } : { planningList: any[], completedList: any[], nextDeliveryDate: string, onChangeDate: (date: string) => void }) => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const navigator = useNavigate()
  const columns_tostart: ColumnProps<any>[] = [
    {
      title: 'SEQ',
      dataIndex: 'sequence',
      className: "table-cell-align-top",
      key: 'no',
    },
    {
      title: <Row gutter={16} align="top"><Col span={20}>Product Name</Col><Col span={4}>Quantity</Col></Row>,
      dataIndex: 'pic',
      className: "table-cell-align-top",
      key: 'p',
      render: (text: any, record: any) => (
        <div>
          {(record?.lineItems ?? []).map((item: any, idx: number) => (
            <Row key={idx} gutter={16} className={`${(record?.lineItems ?? []).length > 1 && idx < (record?.lineItems ?? []).length - 1 ? "mb-2 border-b pb-2" : ""}`}>
              <Col span={20}>
                <div className="flex flex-row items-center">
                  <img className="w-10 h-10 mr-2" src={item?.pic || ""} alt="" />
                  <div>
                    <div className="w-80 truncate">{item?.skuName ?? ""}</div>
                    <span className="text-gray-400 text-sm">{item?.skuNo}</span>
                  </div>
                </div>
              </Col>
              <Col span={4} className="items-start text-left">
                x {item?.num}
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
      className: "table-cell-align-top",
      render: (text: any) => text ? moment(text).format('YYYY/MM/DD HH:mm') : ""
    },
    {
      title: 'Actions',
      key: 'ac',
      className: "table-cell-align-top",
      render: (text: any, record: any) => (
        <Popover
          trigger="click"
          visible={visible}
          onVisibleChange={(v: boolean) => setVisible(v)}
          content={
            <div style={{width:300}}>
              <Calendar
                fullscreen={false}
                defaultValue={nextDeliveryDate ? moment(nextDeliveryDate) : undefined}
                disabledDate={(current) => current < moment().endOf('day')}
                onChange={(date: Moment) => {
                  setVisible(false);
                  onChangeDate(date.utc().format())
                }}
              />
            </div>
          }
        >
          <Tooltip title="Select Date">
            <span className="iconfont primary-color icon-rili text-lx"></span>
          </Tooltip>
        </Popover>
      )
    }
  ];
  const columns_completed: ColumnProps<any>[] = [
    {
      title: 'SEQ',
      dataIndex: 'sequence',
      className: "table-cell-align-top",
      key: 'no',
    },
    {
      title: 'Order ID',
      dataIndex: 'tradeId',
      className: "table-cell-align-top",
      key: 'tradeId',
      render: (text: string, record: any) => <Link to="/order/order-detail" state={{id: record?.tradeId,status: record?.tradeState?.orderState}}>{text}</Link>
    },
    {
      title: <Row gutter={16} align="top"><Col span={20}>Product Name</Col><Col span={4}>Quantity</Col></Row>,
      dataIndex: 'pic',
      className: "table-cell-align-top",
      key: 'p',
      render: (text: any, record: any) => (
        <div>
          {(record?.lineItems ?? []).map((item: any, idx: number) => (
            <Row key={idx} gutter={16} className={`${(record?.lineItems ?? []).length > 1 && idx < (record?.lineItems ?? []).length - 1 ? "mb-2 border-b pb-2" : ""}`}>
              <Col span={20}>
                <div className="flex flex-row items-center">
                  <img className="w-10 h-10 mr-2" src={item?.pic || ""} alt="" />
                  <div>
                    <div className="w-80 truncate">{item?.skuName ?? ""}</div>
                    <span className="text-gray-400 text-sm">{item?.skuNo}</span>
                  </div>
                </div>
              </Col>
              <Col span={4} className="items-start text-left">
                x {item?.num}
              </Col>
            </Row>
          ))}
        </div>
      )
    },
    {
      title: 'Shipment date',
      dataIndex: 'shipmentDate',
      className: "table-cell-align-top",
      key: 'shi',
      render: (text: any) => text ? moment(text).format('YYYY/MM/DD HH:mm') : ""
    },
    {
      title: 'Order status',
      dataIndex: 'ors',
      className: "table-cell-align-top",
      key: 'ors',
      render: (text: any, record: any) => orderStatusType[record?.tradeState?.orderState]
    },
    {
      title: 'Actions',
      dataIndex: 'ac',
      className: "table-cell-align-top",
      key: 'ac',
      render: (text: any, record: any) => <Link to="/order/order-detail" state={{id: record?.tradeId,status: record?.tradeState?.orderState}} className="cursor-pointer iconfont icon-kjafg primary-color" />
    }
  ];
  return (
    <div>
      <div className="flex justify-start space-x-4">
        <span className="iconfont icon-bianzu-1 primary-color text-lg" />
        <div>Subscription Information</div>
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
