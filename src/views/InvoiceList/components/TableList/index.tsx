import { ToTopOutlined } from '@ant-design/icons'
import TabPane from '@ant-design/pro-card/lib/components/TabPane'
import { Table, Tabs, Tooltip } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'
import { useState } from 'react'

const data = [
  {
    receiverName: 'xx',
    phone: '111111',
  },
  {
    receiverName: 'xx',
    phone: '111111',
  },
  {
    receiverName: 'xx',
    phone: '111111',
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
      dataIndex: 'receiverName',
      key: 'receiver',
    },
    {
      title: 'Order Amount',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Application Time',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Invoice Type',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Invoice Title',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email Address',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      render: () => {
        return (
          <Tooltip placement="top" title="Download">
            <ToTopOutlined />
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
