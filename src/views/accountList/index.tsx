import Table from './components/Table'
import React, { useEffect, useState } from 'react'
import Search from '@/components/common/Search'
import { Account } from '@/framework/types/wechat'
import { formItems } from './modules/form'
import { ContentContainer, DivideArea, SearchContainer, TableContainer } from '@/components/ui'
import { getAccountList } from '@/framework/api/wechatSetting'

const AccountList = () => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [pages, setPages] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getAccounts()
  }, [])

  const getAccounts= async (offset = pages.page, limit = pages.limit, items = {}) => {
    const params = Object.assign({ sample: { ...items, storeId: '12345678' } }, {
      offset,
      limit
    })
    let res = await getAccountList(params)
    setAccountList(res.records)
    setTotal(res.total)
  };

  return (
    <ContentContainer>
      <SearchContainer>
        <Search state={true} query={getAccounts} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table getAccounts={getAccounts} accountList={accountList} pages={pages} setPages={setPages} total={total} />
      </TableContainer>
    </ContentContainer>
  )
}
export default AccountList
