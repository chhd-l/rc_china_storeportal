import { Button, DatePicker,Dropdown, Input, Select, Space } from 'antd'
import React, { useState } from 'react'
import { searchTypeList, initSearchParams } from '../../modules/constants'
import { MenuOutlined } from '@ant-design/icons'
import { OrderSearchParamsProps } from '@/framework/types/order'
import LatestReports from "../LatestReports/index"

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<OrderSearchParamsProps>(initSearchParams)

  return (
    <div>
      <div className="flex flex-row items-center justify-end">
        <div className="w-auto mr-3">Order Creation Date</div>
        <DatePicker.RangePicker
          style={{ width: '300px' }}
          onChange={(date, dateString) => {
            console.log(date, dateString)
            setSearchParams({ ...searchParams, startTime: dateString[0], endTime: dateString[1] })
          }}
        />
        <Space direction="vertical">
          <Dropdown overlay={LatestReports} >
             <Button className="ml-3">Export</Button>
          </Dropdown>
        </Space>
        <Button
          className="ml-3"
          icon={<MenuOutlined style={{ color: "#979797" }} />}
        />
      </div>
      <div className="flex flex-row items-center mt-3 text-left">
        <Input.Group compact>
          <Select
            onChange={(value, a) => {
              setSearchParams({ ...searchParams, searchType: value });
            }}
            getPopupContainer={(trigger: any) => trigger.parentNode}
            value={searchParams.searchType}
            style={{ width: "20%" }}
          >
            {searchTypeList.map((item) => (
              <Select.Option value={item.key} key={item.key}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <Input
            style={{ width: '80%' }}
            value={searchParams.searchTypeValue}
            onChange={(e) => {
              setSearchParams({
                ...searchParams,
                searchTypeValue: e.target.value,
              })
            }}
            placeholder={'Input ' + searchTypeList.filter((item) => item.key === searchParams.searchType)[0].label}
          />
        </Input.Group>
        <Button
          className="w-32 mx-3 btn-primary"
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
          className="w-32"
          // danger
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
