import { Button, DatePicker, Input, Select } from 'antd'
import React, { useState } from 'react'
import { initSearchParams, SearchParamsProps } from '../../modules/constants'

const LiveStreamingSearch = ({ query, miniProjList }: { query: Function; miniProjList: any[] }) => {
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
          <div className="mr-2 w-24 text-right">Mini Program:</div>
          <Select
            style={{ width: '240px' }}
            // defaultValue={searchParams.accountName}
            value={searchParams.accountName}
            placeholder="Select mini program"
            onChange={(value) => {
              setSearchParams({ ...searchParams, accountName: value })
            }}
          >
            {miniProjList.map((el) => (
              <Select.Option key={el.id} value={el.accountName}>
                {el.accountName}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 w-30 text-right">Live Streaming ID:</div>
          <Input
            style={{ width: '240px' }}
            type="number"
            placeholder="Enter live streaming ID"
            value={searchParams.roomId}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'roomId')
            }}
            onPressEnter={() => {
              query && query(searchParams)
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 w-40 text-right">Live Streaming Name:</div>
          <Input
            style={{ width: '240px' }}
            placeholder="Enter live streaming name"
            value={searchParams.name}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'name')
            }}
            onPressEnter={() => {
              query && query(searchParams)
            }}
          />
        </div>
      </div>
      <div className="flex flex-row items-center mt-md">
        <div className="flex flex-row items-center">
          <div className="mr-2 w-24 text-right">Anchor Name:</div>
          <Input
            style={{ width: '240px' }}
            placeholder="Input anchor name"
            value={searchParams.anchorName}
            onChange={(e) => {
              updateSearchParams(e.target.value, 'anchorName')
            }}
            onPressEnter={() => {
              query && query(searchParams)
            }}
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 w-36 ml-1 text-right">Period:</div>
          <DatePicker.RangePicker
            style={{ width: '240px' }}
            value={pickValue}
            onChange={(date, dateString) => {
              console.log(date, dateString)
              setPickValue(date)
              setSearchParams({
                ...searchParams,
                startTime: new Date(dateString[0]).toISOString(),
                endTime: new Date(dateString[1]).toISOString(),
              })
              // query && query(searchParams)
            }}
          />
        </div>
      </div>
      <div className="mt-md flex">
        <Button
          className="w-20 mr-md"
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

export default LiveStreamingSearch
