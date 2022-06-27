import React, { useEffect, useState } from 'react'
import { ContentContainer, DivideArea, SearchContainer, TableContainer } from '@/components/ui'
import { Button, message, Modal, Pagination, Spin, Tabs } from 'antd'
import Search from './components/Search'
import Table from './components/Table'
import { WxLiveStreaming } from '@/framework/types/liveStreaming'
import { liveStreamTabList } from '@/views/liveStreamingList/modules/constants'
import { getLiveStreamingList, syncLiveStreaming } from '@/framework/api/liveStreaming'
import { handleQueryParams } from '@/views/liveStreamingList/modules/handle-query-params'
import { initSearchParams, SearchParamsProps } from './modules/constants'
import { PageParamsProps } from '@/framework/types/common'
import { initPageParams } from '@/lib/constants'
import { getAccountList } from '@/framework/api/wechatSetting'
import SyncModal from '@/views/liveStreamingList/components/SyncModal'

const LiveStreamingList = () => {
  const [liveStreamingList, setLiveStreamingList] = useState<WxLiveStreaming[]>([])
  const [activeKey, setActiveKey] = useState('')
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [loading, setLoading] = useState(false)
  const [syncTipModalShow, setSyncTipModalShow] = useState(false)
  const [miniProjList, setMiniProjList] = useState([])
  const [showSyncAllModal, setShowSyncAllModal] = useState(false)
  const [syncAllLoading, setSyncAllLoading] = useState(false)

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
  }

  const getLiveStreamingLists = async (searchQueryParams = searchParams) => {
    setLoading(true)
    const params = handleQueryParams({ searchParams: searchQueryParams, pageParams, activeKey })
    const res = await getLiveStreamingList(params)
    setLiveStreamingList(res.records)
    setTotal(res.total)
    setLoading(false)
  }

  const syncLiveStreams = async () => {
    setSyncAllLoading(true)
    const res = await syncLiveStreaming('000001')
    if (res) {
      message.success({ className: 'rc-message', content: 'Synchronize success' })
      await getLiveStreamingLists()
    }
    setSyncAllLoading(false)
    setShowSyncAllModal(false)
  }

  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: '12345678' },
    })
    setMiniProjList((res?.records || []).filter((item: any) => item.type === 'MiniProgram'))
  }

  useEffect(() => {
    getLiveStreamingLists()
  }, [pageParams, activeKey])

  useEffect(() => {
    getAccountName()
  }, [])

  return (
    <ContentContainer>
      <SearchContainer>
        <Search
          query={async (data: SearchParamsProps) => {
            setSearchParams(data)
            setPageParams({ ...pageParams, currentPage: 1 })
            await getLiveStreamingLists(data)
          }}
          miniProjList={miniProjList}
        />
      </SearchContainer>
      <DivideArea />
      <TableContainer className="pt-md">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key)
            setPageParams({ ...pageParams, currentPage: 1 })
          }}
          tabBarExtraContent={
            <div className="flex flex-row">
              <Button className="flex items-center rounded-4 mr-md" onClick={() => setShowSyncAllModal(true)}>
                <span className="iconfont icon-bianzu2 mr-2" />
                Synchronize All
              </Button>
              <Button className="flex items-center rounded-4" onClick={() => setSyncTipModalShow(true)}>
                <span className="iconfont icon-bianzu2 mr-2" />
                Partial Sync
              </Button>
            </div>
          }
        >
          {liveStreamTabList.map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin />
          </div>
        ) : (
          <Table liveStreamingList={liveStreamingList} />
        )}
        {total > 0 && (
          <div className="flex flex-row justify-end mt-4">
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
        <Modal
          visible={showSyncAllModal}
          className="rc-modal"
          title="Synchronize Live Streaming"
          closable={false}
          width={400}
          onCancel={() => setShowSyncAllModal(false)}
          onOk={() => syncLiveStreams()}
          okText="Confirm"
          confirmLoading={syncAllLoading}
        >
          <div>Are you sure you want to synchronize ?</div>
        </Modal>
        {syncTipModalShow ? (
          <SyncModal
            closeSyncModal={() => setSyncTipModalShow(false)}
            syncTipModalShow={syncTipModalShow}
            syncSuccess={async () => {
              setSyncTipModalShow(false)
              await getLiveStreamingLists()
            }}
          />
        ) : null}
      </TableContainer>
    </ContentContainer>
  )
}
export default LiveStreamingList
