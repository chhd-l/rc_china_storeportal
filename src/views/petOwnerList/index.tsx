import Table from './components/Table'
import React, { useEffect, useState } from 'react'
import { Customer } from '@/framework/types/customer'
import Search from './components/Search'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Divider, Pagination, Spin } from 'antd'
import { getPetOwnerList } from '@/framework/api/customer'
import { SearchParamsProps } from '@/framework/types/customer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'
import { handleQueryParams } from '@/views/petOwnerList/modules/handle-query-params'
import { PageParamsProps } from '@/framework/types/common'

const PetOwnerList = () => {
  const [petOwnerList, setPetOwnerList] = useState<Customer[]>([])
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)
  const [pageParams, setPageParams] = useState<PageParamsProps>({
    currentPage: 1,
    pageSize: 10,
  })
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams
  const [loading, setLoading] = useState(false)

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
  }

  const getCustomers = async () => {
    setLoading(true)
    let params = handleQueryParams({ searchParams, pageParams })
    console.log(params)
    const res = await getPetOwnerList(params)
    setPetOwnerList(res.records)
    setTotal(res.total)
    setLoading(false)
  }

  useEffect(() => {
    getCustomers()
  }, [searchParams, pageParams])

  return (
    <ContentContainer>
      <SearchContainer>
        <div className="text-xl font-medium">My Pet Owner</div>
        <Divider />
        <Search
          query={(data: SearchParamsProps) => {
            setSearchParams(data)
          }}
        />
      </SearchContainer>
      <TableContainer>
        {loading ? (
          <div className="flex justify-center items-center h-80">
            <Spin />
          </div>
        ) : (
          <Table petOwnerList={petOwnerList} />
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
      </TableContainer>
    </ContentContainer>
  )
}
export default PetOwnerList
