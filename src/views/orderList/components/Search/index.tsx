import { Button, DatePicker, Dropdown, Input, Select, Space } from 'antd'
import React, { useState } from 'react'
import { searchTypeList, initSearchParams, orderTypeList } from '../../modules/constants'
import { MenuOutlined } from '@ant-design/icons'
import { OrderSearchParamsProps } from '@/framework/types/order'
import LatestReports from '../LatestReports/index'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<OrderSearchParamsProps>(initSearchParams)
  const inputRef = React.useRef<any>(null)
  const [pickValue, setPickValue] = useState<any>(undefined)

  return (
    <div>
      <div className="flex flex-row items-center justify-end">
        <div className="w-auto mr-3">Order Creation Date</div>
        <DatePicker.RangePicker
          className="w-64 rounded-4"
          value={pickValue}
          onChange={(date, dateString) => {
            console.log(date, dateString)
            setPickValue(date)
            setSearchParams({ ...searchParams, startTime: dateString[0], endTime: dateString[1] })
          }}
        />
        <Space direction="vertical">
          <Dropdown overlay={LatestReports} placement="bottom">
            <Button className="ml-3 rounded-4">Export</Button>
          </Dropdown>
        </Space>
        <Button className="ml-3 rounded-4" icon={<MenuOutlined style={{ color: '#979797' }} />} />
      </div>
      <div className="flex flex-row items-center mt-4 text-left">
        <Input.Group compact>
          <Select
            onChange={(value, a) => {
              setSearchParams({ ...searchParams, searchType: value })
            }}
            getPopupContainer={(trigger: any) => trigger.parentNode}
            value={searchParams.searchType}
            className="rc-select w-1/5"
          >
            {searchTypeList.map((item, idx) => (
              <Select.Option value={item.key} key={idx}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          {searchParams.searchType === 'isSubscription' ? (
            <Select
              onChange={(value, a) => {
                setSearchParams({ ...searchParams, searchTypeValue: value })
              }}
              placeholder="Please select order type"
              className="rc-select w-4/5 -ml-1"
            >
              {orderTypeList.map((item, idx) => (
                <Select.Option value={item.key} key={idx}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <Input
              className="rounded-4 w-4/5 -ml-1"
              ref={inputRef}
              value={searchParams.searchTypeValue}
              onChange={(e) => {
                setSearchParams({
                  ...searchParams,
                  searchTypeValue: e.target.value,
                })
              }}
              placeholder={'Input ' + searchTypeList.filter((item) => item.key === searchParams.searchType)[0].label}
              onPressEnter={() => {
                inputRef.current!.blur()
                query && query(searchParams)
              }}
            />
          )}
        </Input.Group>
        <Button
          className="w-32 mx-3 btn-primary rounded-4"
          type="primary"
          danger
          onClick={() => {
            console.log('searchParams', searchParams)
            query && query(searchParams)
          }}
        >
          Search
        </Button>
        <Button
          className="w-32 rounded-4"
          onClick={(e) => {
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
