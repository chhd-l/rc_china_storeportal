import Table from './components/Table'
import React, { useEffect, useState } from 'react'
import Search from '@/components/common/Search'
import { Account } from '@/framework/types/wechat'
import { formItems } from './modules/form'
import { ContentContainer, DivideArea, SearchContainer, TableContainer } from '@/components/ui'
import { getAccountList } from '@/framework/api/wechatSetting'
import "./index.less"

const AccountList = () => {
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [pages, setPages] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getAccounts()
  }, [])

  const getAccounts= async (offset = pages.page, limit = pages.limit, items = {}) => {
    console.log('offset',offset)
    const params = Object.assign({ sample: { ...items, storeId: '12345678' } }, {
      offset: offset - 1,
      limit
    })
    setLoading(true);
    let res = await getAccountList(params)
    setAccountList(res.records)
    setTotal(res.total)
    setLoading(false)
  };

  return (
    <ContentContainer className='account-list'>
      <SearchContainer>
        <Search state={true} pages={pages} query={getAccounts} formItems={formItems} />
      </SearchContainer>
      <DivideArea />
      <TableContainer>
        <Table getAccounts={getAccounts} accountList={accountList} pages={pages} setPages={setPages} total={total} loading={loading} setLoading={setLoading} />
      </TableContainer>
    </ContentContainer>
  )
}
export default AccountList
