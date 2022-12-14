import { ContentContainer } from '@/components/ui'
import ProTable from '@ant-design/pro-table'
import { Button, message, Modal } from 'antd'
import { Tooltip, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { deleteVoucher, endVoucher, getVouchers } from '@/framework/api/voucher'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { ActionType } from '@ant-design/pro-table'
import intl from 'react-intl-universal'

const VouchersList = ({ voucherStatus }: { voucherStatus: string }) => {
  const navigator = useNavigate()
  const ref = useRef<ActionType>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [voucherId, setVoucherId] = useState({
    id: '',
    statu: '',
  })

  const columns = [
    {
      title: 'Voucher Name',
      dataIndex: 'voucherName',
      width: 150,
      render: (text: any, recout: any) => {
        return (
          <div className="flex">
            <div className="border border-gray-200 flex items-center" style={{ height: '81px' }}>
              {recout.voucherDefaultImage ? (
                <Image width={80} src={recout.voucherDefaultImage} preview={false} />
              ) : recout.discountType === 'PERCENTAGE' ? (
                <div className="h-full flex items-center text-center text-red-600" style={{ width: '80px' }}>
                  {recout.discountValue && (
                    <span className="text-3xl font-medium flex-1">
                      {(100 - recout.discountValue) / 10}
                      <span className="text-sm">折</span>
                    </span>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center text-center text-red-600" style={{ width: '80px' }}>
                  {recout.discountValue && (
                    <span className="text-3xl font-medium flex-1">
                      <span className="text-sm">￥</span>
                      {recout.discountValue}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="pl-2 w-56">
              <div>{text}</div>
              <div className="text-gray-400 text-xs truncate">{recout.voucherDescription}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Valid Period',
      dataIndex: 'Period',
      valueType: 'dateRange',
      hideInTable: true,
      fieldProps: () => ({
        placeholder: ['Start time', 'End Time'],
        showTime: { format: 'HH:mm' },
        format: 'YYYY-MM-DD HH:mm',
      }),
    },
    {
      title: 'Voucher Type',
      dataIndex: 'voucherType',
      hideInSearch: true,
      render: (text: any, record: any) => (
        <div>
          <div>{text === 'SHOP_VOUCHER' ? 'Shop Voucher' : 'Product Voucher'}</div>
          <div className="text-gray-400 text-xs">
            (
            {record.applicationProducts
              ? record.applicationProducts + ' ' + intl.get('voucher.orders.Products')
              : intl.get('voucher.orders.All Products')}
            )
          </div>
        </div>
      ),
    },
    {
      title: 'Discount Amount',
      dataIndex: 'Price',
      hideInSearch: true,
      render: (text: any, record: any) =>
        record.discountType === 'PERCENTAGE' ? record.discountValue + '%OFF' : '￥' + record.discountValue,
    },
    {
      title: 'Usage Limit',
      dataIndex: 'usageQuantity',
      hideInSearch: true,
      render: (text: any) => text || '-',
    },
    {
      title: (
        <div className="flex items-center">
          Usage
          <Tooltip
            overlayStyle={{ fontSize: '12px' }}
            title="Number of vouchers that have been used (excluding cancelled orders)"
          >
            <QuestionCircleOutlined className="ml-2 text-gray-400" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'usage',
      hideInSearch: true,
    },
    {
      title: () => (
        <div>
          <div>{intl.get('voucher.list.Status')}</div>
          <div>{intl.get('voucher.list.Valid Period')}</div>
        </div>
      ),
      dataIndex: 'voucherStatus',
      hideInSearch: true,
      render: (text: any, record: any) => {
        return (
          <div>
            {text === 'Upcoming' && <span className="Upcoming">{intl.get('voucher.list.Upcoming')}</span>}
            {text === 'Ongoing' && <span className="Ongoing">{intl.get('voucher.list.Ongoing')}</span>}
            {text === 'Expired' && <span className="Expired">{intl.get('voucher.list.Expired')}</span>}
            <div className="text-gray-400">
              {moment(record.voucherUsageBeginningOfTime).format('YYYY-MM-DD HH:mm')} -
            </div>
            <div className="text-gray-400">{moment(record.voucherUsageEndOfTime).format('YYYY-MM-DD HH:mm')}</div>
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
          {record.voucherStatus === 'Upcoming' && (
            <Tooltip title="Edit">
              <span
                className="cursor-pointer ml-2 iconfont icon-a-Group437 text-red-500 text-xl"
                onClick={() => {
                  navigator('/marketingCenter/vouchers/voucherDetails', { state: record })
                }}
              />
            </Tooltip>
          )}
          {(record.voucherStatus === 'Expired' || record.voucherStatus === 'Ongoing') && (
            <Tooltip title="Details">
              <span
                className="cursor-pointer ml-2 iconfont icon-kjafg text-red-500 text-base"
                onClick={() => {
                  navigator('/marketingCenter/vouchers/voucherDetails', { state: { ...record, Edit: true } })
                }}
              />
            </Tooltip>
          )}
          <Tooltip title="Orders">
            <span
              className="cursor-pointer ml-2 iconfont icon-dingdan text-red-500 text-xl"
              onClick={() => {
                navigator('/marketingCenter/vouchers/orderswithVoucher', { state: record })
              }}
            />
          </Tooltip>
          {record.voucherStatus === 'Ongoing' && (
            <Tooltip title="End">
              <span
                className="cursor-pointer ml-2 iconfont icon-lianxi2hebing-15 text-red-500 text-base"
                onClick={() => {
                  setVoucherId({
                    id: record.id,
                    statu: 'End',
                  })
                  setIsModalVisible(true)
                }}
              />
            </Tooltip>
          )}
          {record.voucherStatus !== 'Ongoing' && record.voucherStatus !== 'Expired' && (
            <Tooltip title="Delete">
              <span
                className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl"
                onClick={async () => {
                  setVoucherId({
                    id: record.id,
                    statu: 'Delete',
                  })
                  setIsModalVisible(true)
                }}
              />
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
    if (param.Period) {
      param.voucherUsageBeginningOfTime = moment(param.Period[0]).utc()
      param.voucherUsageEndOfTime = moment(param.Period[1]).utc()
      delete param.Period
    }
    item.sample = { ...param }
    voucherStatus && (item.sample.voucherStatus = voucherStatus)
    const res = await getVouchers(item)
    return Promise.resolve({
      data: res.records,
      success: true,
      total: res.total,
    })
  }

  const confirmDelete = async () => {
    setLoading(true)
    let res = null
    if (voucherId.statu === 'Delete') {
      res = await deleteVoucher(voucherId.id)
    } else {
      res = await endVoucher(voucherId.id)
    }
    if (res) {
      setIsModalVisible(false)
      message.success({ className: 'rc-message', content: 'Operation success' })
      ref.current?.reload()
    }
    setLoading(false)
  }

  useEffect(() => {
    ref.current?.reloadAndRest!()
  }, [voucherStatus])

  return (
    <ContentContainer className="bg-white pt-0 VouchersList">
      <ProTable
        columns={columns}
        actionRef={ref}
        options={false}
        revalidateOnFocus={false}
        tableClassName="rc-table"
        className="VouchersListTable"
        rowKey="id"
        pagination={{
          hideOnSinglePage: false,
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
          showTotal: () => <></>,
        }}
        search={{
          labelWidth: 'auto',
          searchText: 'Search',
          optionRender: (searchConfig, formProps, dom) => {
            return dom
              .map((item: any) => {
                return <Button {...item.props} loading={false} />
              })
              .reverse()
          },
        }}
        request={(parma) => getList(parma)}
      />
      <Modal
        key="assetDelete"
        className="rc-modal"
        title={`${voucherId.statu} Item`}
        okText="Confirm"
        visible={isModalVisible}
        onOk={confirmDelete}
        confirmLoading={loading}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          {intl.get('voucher.list.Are you sure you want to')}{' '}
          {voucherId.statu === 'Delete' ? voucherId.statu.toLowerCase() : voucherId.statu}{' '}
          {intl.get('voucher.list.the item?')}
        </p>
      </Modal>
    </ContentContainer>
  )
}

export default VouchersList
