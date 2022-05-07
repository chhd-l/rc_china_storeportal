import Table from './components/Table'
import React, { useEffect, useState } from 'react'
import { Customer } from '@/framework/types/customer'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Divider, Pagination } from 'antd'
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

  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
  }

  const getCustomers = async () => {
    let params = handleQueryParams({ searchParams, pageParams })
    console.log(params)
    const res = await getPetOwnerList(params)
    setPetOwnerList(res.records)
    setTotal(res.total)
  }

  useEffect(() => {
    getCustomers()
  }, [searchParams, pageParams])

  return (
    <ContentContainer>
      <SearchContainer>
        <div className="text-xl font-medium">Tagging Setting</div>
        <Divider />
      </SearchContainer>
      <TableContainer>
        <Table petOwnerList={petOwnerList} />
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
      </TableContainer>
    </ContentContainer>
  )
}
export default PetOwnerList
