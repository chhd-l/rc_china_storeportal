import React from 'react'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Tabs, Pagination } from 'antd'
import Search from './components/Search'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'

const subscriptionList: React.FC<{}> = ({}) => {

  return (
    <ContentContainer>
      <SearchContainer>
        <Tabs>
          <Tabs.TabPane key="1" tab="All" />
          <Tabs.TabPane key="2" tab="Ongoing" />
          <Tabs.TabPane key="3" tab="Paused" />
          <Tabs.TabPane key="4" tab="Completed" />
        </Tabs>
        <Search />
      </SearchContainer>
      <TableContainer className="py-0 pb-5">
        <div className="mb-4 text-left text-xl font-bold">0 Subscriptions</div>
        <TableHeader />
        <TableRow />
        <div className="flex flex-row justify-end mt-4">
          <Pagination
            className="rc-pagination"
          />
        </div>
      </TableContainer>
    </ContentContainer>
  )
}

export default subscriptionList
