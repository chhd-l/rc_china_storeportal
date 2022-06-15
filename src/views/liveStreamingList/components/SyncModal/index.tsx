import { message, Modal, Pagination, Spin, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { LiveStreaming } from '@/framework/types/liveStreaming'
import moment from 'moment'
import { getLiveStreamingOnlineList, syncPartLiveStreaming } from '@/framework/api/liveStreaming'
import { handlePageParams } from '@/utils/utils'
import { PageParamsProps } from '@/framework/types/common'
import { initPageParams } from '@/lib/constants'
import _ from 'lodash'

const SyncModal = ({
  syncTipModalShow,
  closeSyncModal,
  syncSuccess,
}: {
  syncTipModalShow: boolean
  closeSyncModal: Function
  syncSuccess: Function
}) => {
  const [liveStreamingList, setLiveStreamingList] = useState<LiveStreaming[]>([])
  const [syncLoading, setSyncLoading] = useState(false)
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const columns = [
    {
      title: 'Live Streaming ID',
      dataIndex: 'roomId',
    },
    {
      title: 'Live Streaming Name',
      dataIndex: 'name',
    },
    {
      title: 'Live Streaming Period',
      dataIndex: 'period',
      render: (text: any, record: any) => (
        <span className="text-gray-400">
          {moment(record.startTime).format('YYYY/MM/DD HH:mm')} - <br />
          {moment(record.endTime).format('YYYY/MM/DD HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'liveStatus',
      render: (text: any, record: any) => (
        <span
          className={`${
            text === 101
              ? 'bg-ongoingBg text-ongoingText'
              : text === 102
              ? 'bg-upcomingBg text-theme-red'
              : 'bg-expiredBg'
          } w-20 h-6 flex items-center justify-center`}
        >
          {text === 101 ? 'Ongoing' : text === 102 ? 'Upcoming' : 'Expired'}
        </span>
      ),
    },
  ]

  const getLiveStreamingLists = async (queryPageParams = pageParams) => {
    setLoading(true)
    const res = await getLiveStreamingOnlineList({ ...handlePageParams(queryPageParams) })
    setLiveStreamingList(res.records)
    setTotal(res.total)
    setLoading(false)
  }

  const syncPartLiveStreams = async () => {
    if (selectedRows.length == 0) {
      message.warning({ className: 'rc-message', content: 'Please select at least one follower' })
      return
    }
    setSyncLoading(true)
    const liveStreamingInput = selectedRows.map((item) => {
      return _.omit(item, ['id', 'createdAt', 'accountPrincipal','accountName'])
    })
    const res = await syncPartLiveStreaming(liveStreamingInput)
    if (res) {
      message.success({ className: 'rc-message', content: 'Synchronize success' })
      syncSuccess && syncSuccess()
    }
    setSyncLoading(false)
  }

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
    getLiveStreamingLists({ currentPage: page, pageSize: pageSize })
  }

  useEffect(() => {
    getLiveStreamingLists()
  }, [])

  return (
    <>
      <Modal
        visible={syncTipModalShow}
        width={920}
        className="rc-modal"
        title="Synchronize Live Streaming"
        closable={false}
        onCancel={() => closeSyncModal && closeSyncModal()}
        onOk={() => syncPartLiveStreams()}
        okText="Confirm"
        confirmLoading={syncLoading}
        destroyOnClose
      >
        <div className="mb-md">Please select the live Streaming you want to Synchronize</div>
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin />
          </div>
        ) : (
          <>
            <Table
              dataSource={liveStreamingList}
              columns={columns}
              rowKey="roomId"
              className="rc-table"
              pagination={false}
              rowSelection={{
                selectedRowKeys: selectedRowKeys,
                onChange: (selectedRowKeys, selectedRows) => {
                  setSelectedRowKeys(selectedRowKeys)
                  setSelectedRows(selectedRows)
                },
              }}
            />
            {total > 0 && (
              <div className="flex flex-row justify-end mt-md -mb-6">
                <Pagination
                  className="rc-pagination"
                  current={currentPage}
                  total={total}
                  pageSize={pageSize}
                  onChange={changePage}
                  showSizeChanger={true}
                />
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export default SyncModal
