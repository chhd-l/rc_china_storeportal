import React, { useState } from 'react'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Tabs, Pagination, Modal } from 'antd'
import Search from './components/Search'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

type THandleTips = {
  visible: boolean
  title: string
  content: string
}

const SubscriptionList: React.FC<{}> = ({}) => {
  const [tipObj, setTipObj] = useState<THandleTips>({ visible: false, title: 'Pause Subscription', content: 'Are you sure you want to pause the subscription' })

  return (
    <ContentContainer>
      <SearchContainer className="pt-0">
        <Tabs>
          <Tabs.TabPane key="1" tab="All" />
          <Tabs.TabPane key="2" tab="Ongoing" />
          <Tabs.TabPane key="3" tab="Paused" />
          <Tabs.TabPane key="4" tab="Completed" />
        </Tabs>
        <Search />
      </SearchContainer>
      <TableContainer className="py-0 pb-5">
        <div className="mb-4 text-left text-xl font-bold">1 Subscriptions</div>
        <TableHeader />
        <TableRow handlePauseOrRestart={(tips: THandleTips) => setTipObj(tips)} />
        <div className="flex flex-row justify-end mt-4">
          <Pagination
            className="rc-pagination"
          />
        </div>
      </TableContainer>
      <Modal
        visible={tipObj.visible}
        className="rc-modal"
        title={tipObj.title}
        cancelText="Cancel"
        okText="Confirm"
        onCancel={() => setTipObj(Object.assign({}, tipObj, { visible: false }))}
        onOk={() => setTipObj(Object.assign({}, tipObj, { visible: false }))}
      >
        <div>{tipObj.content}</div>
      </Modal>
    </ContentContainer>
  )
}

export default SubscriptionList
