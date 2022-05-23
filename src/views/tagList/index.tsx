import Table from './components/Table'
import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { Divider, Pagination } from 'antd'
import { SearchParamsProps } from '@/framework/types/customer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'
import { PageParamsProps } from '@/framework/types/common'
import { getTags } from '@/framework/api/tag'
import './index.less'

const PetOwnerList = () => {
  const [petOwnerList, setPetOwnerList] = useState<any[]>([])
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)
  const [pageParams, setPageParams] = useState<PageParamsProps>({
    currentPage: 1,
    pageSize: 10,
  })
  const [total, setTotal] = useState(0)
  const { currentPage, pageSize } = pageParams

  const handleUpdate = (visible: boolean) => {
    getTagList()
  }
  const changePage = (page: any, pageSize: any) => {
    setPageParams({ currentPage: page, pageSize: pageSize })
  }

  const getTagList = async () => {
    // let params = handleQueryParams({ searchParams, pageParams })
    // console.log(params)
    const res = await getTags()
    setPetOwnerList(res.records)
    setTotal(res.total)
  }

  useEffect(() => {
    getTagList()
  }, [searchParams, pageParams])

  return (
    <ContentContainer>
      <SearchContainer>
        {/*<div className="text-xl font-medium">Tagging Setting</div>*/}
        {/*<Divider />*/}
        <Search
          query={(data: SearchParamsProps) => {
            console.log(data)
            setSearchParams(data)
          }}
        />
      </SearchContainer>
      <TableContainer>
        <Table petOwnerList={petOwnerList} handleUpdate={handleUpdate} />
        {
          petOwnerList.length > 0 ? <div className='flex flex-row justify-end mt-4'>
            <Pagination
              className='rc-pagination'
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={changePage}
              showSizeChanger={true}
            />
          </div> : null
        }

      </TableContainer>
    </ContentContainer>
  )
}
export default PetOwnerList
