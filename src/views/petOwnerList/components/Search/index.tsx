import { Button, DatePicker, Input } from 'antd'
import React, { useState } from 'react'
import { SearchParamsProps } from '@/framework/types/customer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)
  const [pickValue,setPickValue]=useState<any>(undefined)

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
            style={{ width: '200px' }}
            placeholder="Enter WeChat name"
            value={searchParams.name}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'name')
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 ml-4 w-28">Phone Number:</div>
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
          <div className="mr-2 ml-4 w-24">Login Time:</div>
          <DatePicker.RangePicker
            style={{ width: '300px' }}
            value={pickValue}
            onChange={(date, dateString) => {
              console.log(date, dateString)
              setSearchParams({ ...searchParams, loginStartTime: dateString[0], loginEndTime: dateString[1] })
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
          // danger
          onClick={(e) => {
            console.log(1111)
            setPickValue(null)
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
