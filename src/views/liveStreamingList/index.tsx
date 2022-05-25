import React, { useState } from 'react'
import { ContentContainer, InfoContainer, SearchContainer } from '@/components/ui'
import { Badge, Tabs } from 'antd'
import ProTable from '@ant-design/pro-table'
import './index.less'

const LiveStreaming = () => {
  const [liveStreamingList, setLiveStreamingList] = useState([
    {
      liveStreamingId: '3456789046',
      liveStreamingName: 'Pet Food Sales',
      period: '2020/12/23 15:38 - 2020/12/24 14:23',
      anchorName: 'Silva',
      status: 'Upcoming',
    },
  ])
  const [activeKey, setActiveKey] = useState('All')
  const columns = [
    {
      title: 'Live Streaming ID',
      dataIndex: 'liveStreamingId',
    },
    {
      title: 'Live Streaming Name',
      dataIndex: 'liveStreamingName',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      hideInSearch: true,
    },
    {
      title: 'Anchor Name',
      dataIndex: 'anchorName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInSearch: true,
    },
    {
      title: 'Period',
      valueType: 'dateTimeRange',
      search: {
        transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
      },
      hideInTable: true,
    },
    {
      title: 'Actions',
      hideInSearch: true,
      render: () => [<span className="iconfont" />],
    },
  ]

  const renderBadge = (count: number, active = false) => {
    return (
      <Badge
        count={0}
        style={{
          marginTop: -2,
          marginLeft: 4,
          color: active ? '#1890FF' : '#999',
          backgroundColor: active ? '#E6F7FF' : '#eee',
        }}
      />
    )
  }

  return (
    <ContentContainer>
      <InfoContainer>
        <Tabs activeKey={'0'}>
          {[{ label: 'Live Streaming List', key: '0' }].map((item) => (
            <Tabs.TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
        <ProTable
          className="live-streaming-pro-table"
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log(params, sorter, filter)
            return Promise.resolve({
              data: liveStreamingList,
              success: true,
            })
          }}
          toolbar={{
            menu: {
              type: 'tab',
              activeKey: activeKey,
              items: [
                {
                  key: 'All',
                  label: <span>All</span>,
                },
                {
                  key: 'Ongoing',
                  label: <span>Ongoing</span>,
                },
                {
                  key: 'Upcoming',
                  label: <span>Upcoming</span>,
                },
                {
                  key: 'Expired',
                  label: <span>Expired</span>,
                },
              ],
              onChange: (key) => {
                setActiveKey(key as string)
              },
            },
            settings: [],
          }}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
          }}
          search={{
            searchText: 'Search',
            resetText: 'Reset',
            defaultCollapsed: false,
            collapseRender: () => '',
            labelWidth: 120,
          }}
          dateFormatter="string"
        />
      </InfoContainer>
    </ContentContainer>
  )
}
export default LiveStreaming
