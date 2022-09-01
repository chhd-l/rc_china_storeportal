import TabPane from '@ant-design/pro-card/lib/components/TabPane'
import { Table, Tabs, Tooltip } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { useState } from 'react'

const data = [
  {
    OrderNumber: 'O20220831095702726',
    OrderAmount: '￥55.00',
    ApplicationTime: '2020/12/23 15:38',
    InvoiceType: 'Value-added Tax Invoice',
    InvoiceTitle: 'wangqiuqiu',
    EmailAddress: '887898778@qq.com',
    Status: 'NotInvoiced',
  },
  {
    OrderNumber: 'O20220829091004740',
    OrderAmount: '￥90.00',
    ApplicationTime: '2020/12/23 17:08',
    InvoiceType: 'Value-added Tax Invoice',
    InvoiceTitle: 'wangqiuqiu',
    EmailAddress: '1872391012@qq.com',
    Status: 'Invoiced',
  },
  {
    OrderNumber: 'O2022082609551674',
    OrderAmount: '￥65.00',
    ApplicationTime: '2020/12/23 21:07',
    InvoiceType: 'Value-added Tax Invoice',
    InvoiceTitle: 'wangqiuqiu',
    EmailAddress: '99837468@qq.com',
    Status: 'Invoicing',
  },
]

const TableList = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  })

  const columns: any[] = [
    {
      title: 'Order Number',
      dataIndex: 'OrderNumber',
      key: 'OrderNumber',
    },
    {
      title: 'Order Amount',
      dataIndex: 'OrderAmount',
      key: 'OrderAmount',
    },
    {
      title: 'Application Time',
      dataIndex: 'ApplicationTime',
      key: 'ApplicationTime',
    },
    {
      title: 'Invoice Type',
      dataIndex: 'InvoiceType',
      key: 'InvoiceType',
    },
    {
      title: 'Invoice Title',
      dataIndex: 'InvoiceTitle',
      key: 'InvoiceTitle',
    },
    {
      title: 'Email Address',
      dataIndex: 'EmailAddress',
      key: 'EmailAddress',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (statu: string) => {
        switch (statu) {
          case 'NotInvoiced':
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#3A8FF3] bg-[#e8f3fd]">
                Not invoiced
              </div>
            )
          case 'Invoiced':
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#1EC559] bg-[#eaf9ef]">Invoiced</div>
            )
          case 'Invoicing':
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#F3A93A] bg-[#fffbdc]">Invoiced</div>
            )

          default:
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#EE4D2D] bg-[#fef1ef]">
                Invoice failed
              </div>
            )
        }
      },
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      render: () => {
        return (
          <Tooltip placement="top" title="Download">
            <span className="iconfont icon-invoice-down text-xl text-[#EE4D2D]" />
          </Tooltip>
        )
      },
    },
  ]

  return (
    <div className="bg-white px-[24px] pb-[24px]">
      <Tabs defaultActiveKey="" onChange={(key) => null}>
        <TabPane tab="All" key="" />
        <TabPane tab="Not invoiced" key="Ongoing" />
        <TabPane tab="Invoiced" key="Upcoming" />
        <TabPane tab="Invoicing" key="Expired" />
        <TabPane tab="Invoice failed" key="InvoiceFailed" />
      </Tabs>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
        }}
        onChange={(newPagination) => {
          delete newPagination.showSizeChanger
          console.log('newPagination', newPagination)
          setPagination(newPagination)
        }}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            setSelectedRows(selectedRows)
          },
        }}
      />
    </div>
  )
}

export default TableList
