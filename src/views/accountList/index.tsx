import Table from './components/Table'
import React, { useEffect, useState } from 'react'
import Search from '@/components/common/Search'
import { Account } from '@/framework/types/wechat'
import { formItems } from './modules/form'
import { ContentContainer, DivideArea, SearchContainer, TableContainer } from '@/components/ui'
import { getAccountList } from '@/framework/api/wechatSetting'
import { initPageParams } from '@/lib/constants'
import { handlePageParams } from '@/utils/utils'
import { PageParamsProps } from '@/framework/types/common'

const AccountList = () => {
  const [accountList, setAccountList] = useState<Account[]>([])
  const [pageParams, setPageParams] = useState<PageParamsProps>(initPageParams)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getAccounts()
  }, [])

  const getAccounts = async (items = {}) => {
    const params = Object.assign({ sample: { ...items, storeId: '12345678' } }, handlePageParams(pageParams))
    let res = await getAccountList(params)
    setAccountList(res.records)
    setTotal(res.total)
  }

  const setPages = ({ page, pageSize }: { page: number; pageSize: number }) => {
    setPageParams({ pageSize: pageSize, currentPage: page })
  }

  return (
    <ContentContainer>
      <SearchContainer>
        <Search query={getAccounts} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table
          getAccounts={getAccounts}
          accountList={accountList}
          pages={{ page: pageParams.currentPage, limit: pageParams.pageSize, total: total }}
          setPages={setPages}
        />
      </TableContainer>
    </ContentContainer>
  )
}
export default AccountList
