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
  body: any
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
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: 'Order Amount',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render: (text: string) => '￥' + text,
    },
    {
      title: 'Application Time',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: 'Invoice Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Invoice Title',
      dataIndex: 'purchaserName',
      key: 'purchaserName',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (statu: string) => {
        switch (statu) {
          case 'NOT_INVOICED':
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#3A8FF3] bg-[#e8f3fd]">
                Not invoiced
              </div>
            )
          case 'DELIVERY_STATE':
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#1EC559] bg-[#eaf9ef]">Invoiced</div>
            )
          case 'PRINT_STATE':
            return (
              <div className="inline-block text-[10px] py-[2px] px-[15px] text-[#F3A93A] bg-[#fffbdc]">Invoicing</div>
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
        activeKey={body?.invoiceStatus || ''}
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
          } else {
            delete body.invoiceStatus
            setBody(body)
            getList(body)
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
