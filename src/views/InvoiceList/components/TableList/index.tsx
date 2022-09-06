import TabPane from '@ant-design/pro-card/lib/components/TabPane'
import { Button, Table, Tabs, Tooltip } from 'antd'
import { TablePaginationConfig } from 'antd/es/table'

const TableList = ({
  loading,
  data,
  body,
  setBody,
  getList,
  setSelectedRowKeys,
  setSelectedRows,
  selectedRowKeys,
  pagination,
  setPagination,
}: {
  loading: boolean
  data: any[]
  body: Object
  getList: Function
  setBody: Function
  setSelectedRowKeys: Function
  setSelectedRows: Function
  selectedRowKeys: React.Key[]
  pagination: TablePaginationConfig
  setPagination: Function
}) => {
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
      <Tabs
        defaultActiveKey=""
        onChange={(key) => {
          if (key) {
            setBody({
              ...body,
              invoiceStatus: key,
            })
            getList({
              ...body,
              invoiceStatus: key,
            })
          }
        }}
      >
        <TabPane tab="All" key="" />
        <TabPane tab="Not invoiced" key="NOT_INVOICED" />
        <TabPane tab="Invoiced" key="DELIVERY_STATE" />
        <TabPane tab="Invoicing" key="PRINT_STATE" />
        <TabPane tab="Invoice failed" key="FAIL_STATE" />
      </Tabs>
      <div className="flex justify-end my-[20px]">
        <Button>Download</Button>
      </div>
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
