import { ContentContainer } from '@/components/ui'
import { UserOutlined } from '@ant-design/icons'
import ProTable, { ActionType } from '@ant-design/pro-table'
import { Tooltip, Typography, Image, Avatar, Form, DatePicker, Button } from 'antd'
import { useRef } from 'react'
const { Title } = Typography
const { RangePicker } = DatePicker

const dataSource = [
  {
    id: '1',
    VoucherName: '胡彦斌',
    Price: '$300',
    Stock: 32,
    Usages: 0,
    Brand: '西湖区湖底公园1号',
  },
  {
    id: '2',
    Products: 'xxxx',
    Price: '$300',
    Stock: 312,
    Usages: 0,
    Brand: '西湖区湖底公园1号',
  },
]

const Orders = () => {
    const ref = useRef<ActionType>();

  const columns = [
    {
      title: 'Product(s)',
      dataIndex: 'VoucherName',
      hideInSearch: true,
      render: (text: any, recout: any) => {
        return (
          <div className="flex flex-col">
            <div className="flex">
              <div>
                <Image
                  width={100}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  preview={false}
                />
              </div>
              <div className="pl-2 pt-4">
                <Title className="mb-0" level={5}>
                  Select Products
                </Title>
                <span className="text-gray-400 text-xs">SPU: 3566</span>
              </div>
            </div>
            <div className="flex">
              <div>
                <Image
                  width={100}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  preview={false}
                />
              </div>
              <div className="pl-2 pt-4">
                <Title className="mb-0" level={5}>
                  Select Products
                </Title>
                <span className="text-gray-400 text-xs">SPU: 3566</span>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Order Total',
      dataIndex: 'Price',
      hideInSearch: true,
    },
    {
      title: 'Order Status',
      dataIndex: 'Stock',
      hideInSearch: true,
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      hideInSearch: true,
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span className="cursor-pointer ml-2 iconfont icon-kjafg text-red-500 text-base" />
        </Tooltip>
      ),
    },
    {
      title: '',
      dataIndex: 'xxx',
      hideInSearch: true,
      render: (text: any, record: any) => (
        <div className="flex h-8 justify-between">
          <div className="w-20 flex items-center">
            <Avatar size="small" icon={<UserOutlined />} />
            <div className="ml-2 h-full flex items-center">xxxx</div>
          </div>
          <div className="flex items-center">orderId: 121e2e122e21e12e21e211e2ee21</div>
        </div>
      ),
    },
  ]

  return (
    <ContentContainer className="bg-white p-4 mt-10">
      <Title className="mb-8" level={4}>
        Orders
      </Title>
      <div className="flex items-center justify-end pb-4 pr-10">
        <Form.Item label="Order Time Date" className="m-0 mr-3">
          <RangePicker />
        </Form.Item>
        <Button type="primary" onClick={() => ref.current?.reload()}>
          Search
        </Button>
      </div>
      <ProTable
        actionRef={ref}
        className="OrdersProTable mt-20"
        search={false}
        options={false}
        pagination={{
            hideOnSinglePage: false,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => <></>,
            defaultPageSize: 10,
        }}
        columns={columns}
        request={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true)
            }, 1000)
          }).then(() => {
            return {
              success: true,
              data: dataSource,
            }
          })
        }}
      />
    </ContentContainer>
  )
}

export default Orders
