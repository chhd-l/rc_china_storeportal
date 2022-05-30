import React, { useEffect, useState } from 'react'
import { ContentContainer, DivideArea, SearchContainer, TableContainer } from '@/components/ui'
import { Button, Modal, Pagination, Spin, Tabs } from 'antd'
import Search from './components/Search'
import Table from './components/Table'
import { LiveStreaming } from '@/framework/types/liveStreaming'
import { liveStreamTabList } from '@/views/liveStreamingList/modules/constants'
import { getLiveStreamingList, syncLiveStreaming } from '@/framework/api/liveStreaming'
import { handleQueryParams } from '@/views/liveStreamingList/modules/handle-query-params'
import { initSearchParams, SearchParamsProps } from './modules/constants'
import { PageParamsProps } from '@/framework/types/common'
import { initPageParams } from '@/lib/constants'

const LiveStreamingList = () => {
  const [liveStreamingList, setLiveStreamingList] = useState<LiveStreaming[]>([])
  const [activeKey, setActiveKey] = useState('')
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [loading, setLoading] = useState(false)
  const [syncTipModalShow, setSyncTipModalShow] = useState(false)
  const [syncLoading, setSyncLoading] = useState(false)

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
  }

  const getLiveStreamingLists = async () => {
    setLoading(true)
    const params = handleQueryParams({ searchParams, pageParams, activeKey })
    const res = await getLiveStreamingList(params)
    setLiveStreamingList(res.records)
    setTotal(res.total)
    setLoading(false)
  }

  const syncLiveStreams = async () => {
    setSyncLoading(true)
    await syncLiveStreaming()
    setSyncTipModalShow(false)
    setSyncLoading(false)
  }

  useEffect(() => {
    getLiveStreamingLists()
  }, [searchParams, pageParams, activeKey])

  return (
    <ContentContainer>
      <SearchContainer>
        <Search
          query={(data: SearchParamsProps) => {
            setSearchParams(data)
          }}
        />
      </SearchContainer>
      <DivideArea />
      <TableContainer className="pt-md">
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key)
          }}
          tabBarExtraContent={
            <Button className="flex items-center" onClick={() => setSyncTipModalShow(true)}>
              <span className="iconfont icon-bianzu2 mr-2" />
              Synchronize
            </Button>
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
          visible={syncTipModalShow}
          className="rc-modal"
          title="Synchronize Live Streaming"
          closable={false}
          width={400}
          onCancel={() => setSyncTipModalShow(false)}
          onOk={() => syncLiveStreams()}
          okText="Confirm"
          confirmLoading={syncLoading}
        >
          <div>Are you sure you want yo sync ?</div>
        </Modal>
      </TableContainer>
    </ContentContainer>
  )
}
export default LiveStreamingList
