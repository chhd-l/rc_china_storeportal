import { Button, DatePicker, Input } from 'antd'
import React, { useState } from 'react'
import { SearchParamsProps } from '@/framework/types/customer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)

  const updateSearchParams = (value: any, name: string) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-row items-center">
          <div className="w-auto mr-2">WeChat Name:</div>
          <Input
            style={{ width: '200px' }}
            placeholder="Enter WeChat name"
            value={searchParams.name}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'name')
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="w-auto mr-2 ml-4">Phone Number:</div>
          <Input
            style={{ width: '200px' }}
            placeholder="Enter phone number"
            value={searchParams.phone}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'phone')
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 ml-4">Login Time:</div>
          <DatePicker
            className="rc-date-picker"
            style={{ width: '200px' }}
            onChange={(date, dateString) => {
              updateSearchParams(dateString, 'loginStartTime')
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 ml-4">To:</div>
          <DatePicker
            className="rc-date-picker"
            style={{ width: '200px' }}
            onChange={(date, dateString) => {
              updateSearchParams(dateString, 'loginEndTime')
            }}
          />
        </div>
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
            query &&query(initSearchParams)
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default OrderSearch
