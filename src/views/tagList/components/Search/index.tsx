import { Button, DatePicker, Input } from 'antd'
import React, { useState } from 'react'
import { SearchParamsProps } from '@/framework/types/customer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)

  return (
    <div>
      <div className="flex flex-row items-center">
        <div className="w-28 mr-2 text-left">Tagging Name:</div>
        <Input
          className="w-full"
          placeholder="Enter tagging name"
          value={searchParams.name}
          onChange={(e) => {
            setSearchParams({
              ...searchParams,
              name: e.target.value,
            })
          }}
        />
      </div>
      <div className="mt-5 flex">
        <Button
          className="w-20 mr-8"
          type="primary"
          danger
          onClick={() => {
            query && query(searchParams)
          }}
        >
          Search
        </Button>
        <Button
          className="w-20"
          danger
          onClick={(e) => {
            setSearchParams(initSearchParams)
            query && query(initSearchParams)
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default OrderSearch
