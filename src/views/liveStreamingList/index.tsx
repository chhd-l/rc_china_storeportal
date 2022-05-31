import React, { useEffect, useState } from 'react'
import { ContentContainer, DivideArea, InfoContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Button, Form, message, Modal, Pagination, Select, Spin, Tabs } from 'antd'
import Search from './components/Search'
import Table from './components/Table'
import { LiveStreaming } from '@/framework/types/liveStreaming'
import { liveStreamTabList } from '@/views/liveStreamingList/modules/constants'
import { getLiveStreamingList, syncLiveStreaming } from '@/framework/api/liveStreaming'
import { handleQueryParams } from '@/views/liveStreamingList/modules/handle-query-params'
import { initSearchParams, SearchParamsProps } from './modules/constants'
import { PageParamsProps } from '@/framework/types/common'
import { initPageParams } from '@/lib/constants'
import { getAccountList } from '@/framework/api/wechatSetting'

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
  const [miniProjList, setMiniProjList] = useState([])

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

  const syncLiveStreams = async (values: any) => {
    setSyncLoading(true)
    const res = await syncLiveStreaming(values.accountId)
    if (res) {
      message.success({ className: 'rc-message', content: 'Synchronize success' })
    }
    setSyncTipModalShow(false)
    setSyncLoading(false)
  }

  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: '12345678' },
    })
    setMiniProjList((res?.records || []).filter((item: any) => item.accountType === 'MiniProgram'))
  }

  useEffect(() => {
    getLiveStreamingLists()
  }, [searchParams, pageParams, activeKey])

  useEffect(() => {
    getAccountName()
  }, [])

  return (
    <ContentContainer>
      <SearchContainer>
        <Search
          query={(data: SearchParamsProps) => {
            setSearchParams(data)
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
          footer={null}
          destroyOnClose
        >
          <div>Please select a mini program to synchronize</div>
          <Form
            className="mt-lg"
            layout="horizontal"
            onFinish={async (values) => {
              await syncLiveStreams(values)
            }}
          >
            <Form.Item
              label="Mini Program"
              name="accountId"
              rules={[
                {
                  required: true,
                  message: 'Please select Mini Program!',
                },
              ]}
            >
              <Select placeholder="Select Mini Program">
                {miniProjList.map((el: any) => (
                  <Select.Option key={el.id}>{el.accountName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <div className="flex justify-end mt-lg -mb-lg">
                <Button className="mr-4 rounded-4" onClick={() => setSyncTipModalShow(false)}>
                  Cancel
                </Button>
                <Button className="rounded-4" type="primary" htmlType="submit" danger loading={syncLoading}>
                  Confirm
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </TableContainer>
    </ContentContainer>
  )
}
export default LiveStreamingList
