import { Button, DatePicker, Input } from 'antd'
import React, { useState } from 'react'
import { SearchParamsProps } from '@/framework/types/consumer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)
  const [pickValue, setPickValue] = useState<any>(undefined)

  const updateSearchParams = (value: any, name: string) => {
    setSearchParams({
      ...searchParams,
      [name]: value,
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center">
          <div className="mr-2 w-24 text-left">WeChat Name:</div>
          <Input
            className="w-64 rounded-4"
            placeholder="Enter WeChat name"
            value={searchParams.name}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'name')
            }}
            onPressEnter={() => {
              query && query(searchParams)
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 w-28 text-right">Phone Number:</div>
          <Input
            className="w-64 rounded-4"
            placeholder="Enter phone number"
            value={searchParams.phone}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'phone')
            }}
            onPressEnter={() => {
              query && query(searchParams)
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 w-24 text-right">Login Time:</div>
          <DatePicker.RangePicker
            className="w-64 rounded-4"
            value={pickValue}
            onChange={(date, dateString) => {
              console.log(date, dateString)
              setPickValue(date)
              setSearchParams({ ...searchParams, loginStartTime: dateString[0], loginEndTime: dateString[1] })
              query && query(searchParams)
            }}
          />
        </div>
      </div>
      <div className="mt-5 flex">
        <Button
          className="w-20 mr-md rounded-4"
          type="primary"
          danger
          onClick={() => {
            query && query(searchParams)
          }}
        >
          Search
        </Button>
        <Button
          className="w-20 rounded-4"
          onClick={(e) => {
            console.log(1111)
            setPickValue(['', ''])
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
