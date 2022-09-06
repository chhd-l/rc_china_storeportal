import { Button, DatePicker, Input, Select } from 'antd'
import React, { useState } from 'react'
import { initSearchParams, SearchParamsProps } from '../../modules/constants'
import intl from 'react-intl-universal'

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
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-row items-center">
          <div className="mr-2 w-24 text-right">{intl.get('wx.mini_program')}:</div>
          <Select
            className="w-60 rc-select"
            value={searchParams.accountName}
            placeholder={intl.get('public.select')}
            onChange={(value) => {
              setSearchParams({ ...searchParams, accountName: value })
            }}
          >
            {miniProjList.map((el) => (
              <Select.Option key={el.id} value={el.name}>
                {el.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-row items-center">
          <div className="mr-2 w-30 text-right">{intl.get('wx.livestream_id')}:</div>
          <Input
            className="rounded-4 w-60"
            type="number"
            placeholder={intl.get('public.input')}
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
          <div className="mr-2 w-40 text-right">{intl.get('wx.livestream_name')}:</div>
          <Input
            className="rounded-4 w-60"
            placeholder={intl.get('public.input')}
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
          <div className="mr-2 w-24 text-right">{intl.get('wx.anchor_name')}:</div>
          <Input
            className="rounded-4 w-60"
            placeholder={intl.get('public.input')}
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
          <div className="mr-2 w-30 text-right">{intl.get('wx.period')}:</div>
          <DatePicker.RangePicker
            className="rounded-4 w-60"
            value={pickValue}
            onChange={(date, dateString) => {
              console.log(date, dateString)
              setPickValue(date)
              setSearchParams({
                ...searchParams,
                startTime: dateString[0]?new Date(dateString[0]).toISOString():'',
                endTime: dateString[1]?new Date(dateString[1]).toISOString():'',
              })
            }}
          />
        </div>
      </div>
      <div className="mt-md flex">
        <Button
          className="w-20 mr-md rounded-4"
          type="primary"
          danger
          onClick={() => {
            query && query(searchParams)
          }}
        >
          {intl.get('public.search')}
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
          {intl.get('public.reset')}
        </Button>
      </div>
    </div>
  )
}

export default LiveStreamingSearch
