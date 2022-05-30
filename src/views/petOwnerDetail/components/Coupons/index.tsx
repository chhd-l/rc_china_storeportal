import { Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { CouponCode } from '@/framework/types/customer'
import { getCustomerVouchers } from '@/framework/api/voucher'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
interface CouponInfoProps {
  customerId: string;
  id: string;
}

const CouponInformation = ({ id, customerId }: CouponInfoProps) => {
  const [couponCodeList, setCouponCodeList] = useState<any>([])
  const navigator = useNavigate()
  useEffect(() => {
    if (customerId !== '') {
      getList()
    }
  }, [customerId])
  const getList = async () => {
    let res = await getCustomerVouchers({ customerId })
    if (res.consumerVoucherDetailList?.length > 0) {
      setCouponCodeList(res.consumerVoucherDetailList)
    }
  }
  const columns = [
    {
      title: 'Voucher Name',
      dataIndex: 'voucherName'
    },
    {
      title: 'Voucher Code',
      dataIndex: 'voucherCode'
    },
    {
      title: 'Voucher Value',
      dataIndex: 'couponValue',
      key: 'couponValue',
      render: (text: any, record: any) => {
        return(
          <span>{
            record.discountType==='PERCENTAGE'?record.discountValue+'%OFF':record.minimumBasketPrice?'￥'+record.minimumBasketPrice:''
          }</span>
        )
      }
    },
    {
      title: 'Period',
      render: (text: any, record: any) => {
        return (
          <div>
            {text === 'Upcoming' && <span className="Upcoming">Upcoming</span>}
            {text === 'Ongoing' && <span className="Ongoing">Ongoing</span>}
            {text === 'Expired' && <span className="Expired">Expired</span>}
            <div className="text-gray-400">
              {moment(record.voucherUsageBeginningOfTime).format('YYYY/MM/DD HH:mm')} -
            </div>
            <div className="text-gray-400">{moment(record.voucherUsageEndOfTime).format('YYYY/MM/DD HH:mm')}</div>
          </div>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'voucherStatus',
    },
    {
      title: 'Options',
      dataIndex: 'Options',
      key: 'Options',
      className: 'text-center',
      render: (text: any, record: any) => (
        <Tooltip title='View Details'>
          <span
            className='cursor-pointer iconfont icon-kjafg primary-color text-xl'
            onClick={() => {
              navigator('/marketingCenter/vouchers/voucherDetails', { state: record })
            }}
          />
        </Tooltip>
      ),
    },
  ]
  return (
    <div id={id}>
      <div className='py-4 px-2 border-b text-xl font-medium'>
        Voucher Information
      </div>
      <div className='py-4'>
        <Table
          dataSource={couponCodeList}
          columns={columns}
          pagination={false}
          rowKey='id'
          className='rc-table'
        />
      </div>
    </div>
  )
}
export default CouponInformation
