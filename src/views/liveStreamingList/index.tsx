import React, { useState } from 'react'
import { ContentContainer, InfoContainer, SearchContainer } from '@/components/ui'
import { Badge, Tabs } from 'antd'
import ProTable from '@ant-design/pro-table'

const LiveStreaming = () => {
  const [liveStreamingList, setLiveStreamingList] = useState([])
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
    },
    {
      title: 'Anchor Name',
      dataIndex: 'anchorName',
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
          search={{
            labelWidth: 'auto',
          }}
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
                  label: <span>All{renderBadge(99, activeKey === 'tab1')}</span>,
                },
                {
                  key: 'tab2',
                  label: <span>项目{renderBadge(30, activeKey === 'tab2')}</span>,
                },
                {
                  key: 'tab3',
                  label: <span>文章{renderBadge(30, activeKey === 'tab3')}</span>,
                },
              ],
              onChange: (key) => {
                setActiveKey(key as string)
              },
            },
          }}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
          }}
          // search={false}
          dateFormatter="string"
          // options={{
          //   setting: {
          //     draggable: true,
          //     checkable: true,
          //     checkedReset: false,
          //     extra: [<a key="confirm">确认</a>],
          //   },
          // }}
        />
      </InfoContainer>
    </ContentContainer>
  )
}
export default LiveStreaming
