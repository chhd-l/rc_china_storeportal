import { ContentContainer } from '@/components/ui'
import KeyMetrics from './components/KeyMetrics'
import VouchersListHead from './components/VouchersListHead'
import VouchersList from './components/VouchersList'
import { Tooltip, Image, Typography } from 'antd'
import './Style.less'
const { Title } = Typography

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

const Vouchers = () => {
  const columns = [
    {
      title: 'Voucher Name',
      dataIndex: 'VoucherName',
      render: (text: any, recout: any) => {
        return (
          <div className="flex">
            <div>
              <Image
                width={100}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                preview={false}
              />
            </div>
            <div className="pl-2">
              <Title className="mb-0" level={5}>
                Select Products
              </Title>
              <span className="text-gray-400 text-xs">SPU: 3566</span>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Promotion Period',
      dataIndex: 'PromotionPeriod',
      valueType: 'dateRange',
      hideInTable: true,
      fieldProps: () => ({
        placeholder: ['Start time', 'End Time'],
        separator: <div className="flex items-center justify-center w-full h-full">to</div>,
      }),
    },
    {
      title: 'Voucher Type',
      dataIndex: 'VoucherType',
      hideInSearch: true,
      render: () => (
        <div>
          <div>Shop Voucher</div>
          <div className="text-gray-400 text-xs">(all products)</div>
        </div>
      ),
    },
    {
      title: 'Discount Amount',
      dataIndex: 'Price',
      hideInSearch: true,
    },
    {
      title: 'Usage Limit',
      dataIndex: 'Stock',
      hideInSearch: true,
    },
    {
      title: 'Usage',
      dataIndex: 'Usages',
      hideInSearch: true,
    },
    {
      title: 'Status Claiming Period',
      dataIndex: 'StatusClaimingPeriod',
      hideInSearch: true,
      render: () => {
        return (
          <div>
            <span className="Upcoming">Upcoming</span>
            <span className="Ongoing">Ongoing</span>
            <span className="Expired">Expired</span>
            <div className="text-gray-400">2020/12/23 15:38 - 2020/12/24 14:23</div>
          </div>
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
      hideInSearch: true,
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Edit">
            <span className="cursor-pointer iconfont icon-a-Group437 text-red-500 text-xl" />
          </Tooltip>
          <Tooltip title="Details">
            <span className="cursor-pointer ml-2 iconfont icon-kjafg text-red-500 text-xl" />
          </Tooltip>
          <Tooltip title="Orders">
            <span className="cursor-pointer ml-2 iconfont icon-dingdan text-red-500 text-xl" />
          </Tooltip>
          <Tooltip title="End">
            <span className="cursor-pointer ml-2 iconfont icon-xingzhuangjiehe text-red-500 text-xl" />
          </Tooltip>
          <Tooltip title="Delete">
            <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl" />
          </Tooltip>
        </>
      ),
    },
  ]

  const getList = (param: any) => {
    console.log('param', param)
    return Promise.resolve({
      data: dataSource,
      success: true,
      total: 10,
    })
  }

  return (
    <ContentContainer className="Vouchers">
      <KeyMetrics />
      <VouchersListHead />
      <VouchersList columns={columns} getList={getList} />
    </ContentContainer>
  )
}

export default Vouchers
