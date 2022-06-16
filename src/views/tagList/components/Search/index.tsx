import { Button, DatePicker, Input,Row,Col } from 'antd'
import React, { useState } from 'react'
import { SearchParamsProps } from '@/framework/types/consumer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)

  return (
    <div>
      <Row>
        <Col span={12}>
          <div className="flex flex-row items-center">
            <div className="w-32 mr-2 text-left">Tagging Name:</div>
            <Input
              placeholder="Enter tagging name"
              value={searchParams.name}
              onChange={(e) => {
                setSearchParams({
                  ...searchParams,
                  name: e.target.value,
                })
              }}
              onPressEnter={(e)=>{
                query && query(searchParams)
              }}
            />
          </div>
        </Col>
      </Row>
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
