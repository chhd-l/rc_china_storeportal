import { ContentContainer } from '@/components/ui'
import ProTable, { ProColumns } from '@/components/common/ProTable'
import { handlePageParams } from '@/utils/utils'
import { CategoryBaseProps } from '@/framework/types/product'
import { getShopCategories } from '@/framework/api/get-product'
import { useEffect, useRef, useState } from 'react'
import { Col, Divider, Row,Tooltip } from 'antd';
import './index.less'
import wx from '@/assets/images/wx.png'

const PaymentSettings=() =>{
  const ref = useRef<any>()
  const getList = async (page: any) => {
    return await getShopCategories({
      offset: page.offset,
      limit: page.limit,
      isNeedTotal: true,
      sample: {
        storeId: '12345678',
      },
    })
  }
  const columns: ProColumns<CategoryBaseProps>[] = [
    {
      title: 'Provider',
      dataIndex: 'displayName',
      align:'center'
    },
    {
      title: 'Status',
      dataIndex: 'categoryType',
      align:'center'
    },
    {
      title: 'Transaction Fee',
      dataIndex: 'total',
      align:'center'
    },
  ]
  return(
    <ContentContainer>
      <div className='bg-white p-6 '>
        <div className="mb-10">
          <div className='text-xl font-semibold'>Supported Payment Method</div>
          <div className="text-gray-400 mt-1">A payment method provided by a payment service provider approved by Seller Center.</div>
        </div>
        <div>
          <Row>
            <Col span={8}>
              <img src={wx} alt='' />
            </Col>
            <Col span={8}/>
            <Col span={8}>
              <Tooltip title='Configure'>
                <a className='mr-4' onClick={(e) => {

                }} >
                  <span className='iconfont icon-group52' />
                </a></Tooltip>
            </Col>
          </Row>
        </div>
          <ProTable
            className='my-table'
            actionRef={ref}
            search={false}
            columns={columns}
            request={async (params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log('test sort', params, sorter, filter)
              let page = handlePageParams({
                currentPage: params.current,
                pageSize: params.pageSize,
              })
              let tableData = await getList(page)
              if (tableData === undefined && page.offset >= 10) {
                tableData = await getList({
                  offset: page.offset - 10,
                  limit: page.limit,
                })
              }

              return Promise.resolve({
                data: tableData?.records || [],
                total: tableData.total,
                success: true,
              })
            }}
            pagination={false}
          />
      </div>
    </ContentContainer>
  )
}
export default PaymentSettings