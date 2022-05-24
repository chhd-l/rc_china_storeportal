import { ContentContainer } from '@/components/ui'
import KeyMetrics from './components/KeyMetrics'
import VouchersListHead from './components/VouchersListHead'
import VouchersList from './components/VouchersList'
import { Tooltip, Image, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Style.less'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { deleteVoucher, endVoucher, getVouchers } from '@/framework/api/voucher'
import moment from 'moment'
const { Title } = Typography

const Vouchers = () => {
  const navigator = useNavigate()

  const columns = [
    {
      title: 'Voucher Name',
      dataIndex: 'voucherName',
      render: (text: any, recout: any) => {
        return (
          <div className="flex">
            <div>
              <Image
                width={100}
                src={recout.voucherDefaultImage}
                preview={false}
              />
            </div>
            <div className="pl-2">
              <Title className="mb-0" level={5}>
                {text}
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
      dataIndex: 'voucherType',
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
      render: (text: any, record: any) => '￥' + (record.discountType === 'PERCENTAGE' ? record.discountValue : record.minimumBasketPrice),
    },
    {
      title: 'Usage Limit',
      dataIndex: 'usageQuantity',
      hideInSearch: true,
    },
    {
      title: (
        <div className="flex items-center">
          Usage
          <Tooltip title="Number of vouchers that have been used (excluding cancelled orders)">
            <QuestionCircleOutlined className="ml-2 text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'usage',
      hideInSearch: true,
    },
    {
      title: () => <div>
        <div>Status</div>
        <div>Claiming Period</div>
      </div>,
      dataIndex: 'voucherStatus',
      hideInSearch: true,
      render: (text: any, record: any) => {
        return (
          <div>
            {text === 'Upcoming' && <span className="Upcoming">Upcoming</span>}
            {text === 'Ongoing' && <span className="Ongoing">Ongoing</span>}
            {text === 'Expired' && <span className="Expired">Expired</span>}
            <div className="text-gray-400">{moment(record.voucherUsageBeginningOfTime).format('YYYY/MM/DD HH:mm')} -</div>
            <div className="text-gray-400">{moment(record.voucherUsageEndOfTime).format('YYYY/MM/DD HH:mm')}</div>
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
          {(record.voucherStatus === 'Upcoming') && (
            <Tooltip title="Edit">
              <span
                className="cursor-pointer iconfont icon-a-Group437 text-red-500 text-xl"
                onClick={() => {
                  navigator('/marketingCentre/vouchers/voucherDetails', {state: record})
                }}
              />
            </Tooltip>
          )}
          {record.voucherStatus === 'Expired' && (
            <Tooltip title="Details">
              <span className="cursor-pointer ml-2 iconfont icon-kjafg text-red-500 text-base" onClick={() => {
                  navigator('/marketingCentre/vouchers/voucherDetails', {state: record})
                }}/>
            </Tooltip>
          )}
          <Tooltip title="Orders">
            <span
              className="cursor-pointer ml-2 iconfont icon-dingdan text-red-500 text-xl"
              onClick={() => {
                navigator('/marketingCentre/vouchers/orderswithVoucher')
              }}
            />
          </Tooltip>
          {record.voucherStatus === 'Ongoing' && (
            <Tooltip title="End">
              <span className="cursor-pointer ml-2 iconfont icon-lianxi2hebing-15 text-red-500 text-xl" onClick={()=>endActivityVoucher()}/>
            </Tooltip>
          )}
          {record.voucherStatus === 'Upcoming' && (
            <Tooltip title="Delete">
              <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl" onClick={()=>delVoucher()}/>
            </Tooltip>
          )}
        </>
      ),
    },
  ]

  const getList = async (param: any) => {
    const item: any = {}
    item.offset = (param.current - 1) * 10
    item.limit = param.pageSize
    delete param.current
    delete param.pageSize
    if(param.PromotionPeriod) {
      param.voucherUsageBeginningOfTime = moment(param.PromotionPeriod[0]).utc()
      param.voucherUsageEndOfTime = moment(param.PromotionPeriod[1]).utc()
      delete param.PromotionPeriod
    }
    item.sample = {...param}
    const res = await getVouchers(item)
    return Promise.resolve({
      data: res.records,
      success: true,
      total: res.total,
    })
  }

  const delVoucher=async ()=>{
    const res=await deleteVoucher()
    console.log('delete voucher',res)
  }

  const endActivityVoucher=async()=>{
    const res=await endVoucher()
    console.log('end voucher',res)
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
