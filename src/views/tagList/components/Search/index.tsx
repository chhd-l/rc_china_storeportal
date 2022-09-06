import { SearchParamsProps } from '@/framework/types/consumer'
import { initSearchParams } from '@/views/petOwnerList/modules/constants'
import { Button, Col, Input, Row } from 'antd'
import { useState } from 'react'
import intl from 'react-intl-universal'

const OrderSearch = ({ query }: { query: Function }) => {
  const [searchParams, setSearchParams] = useState<SearchParamsProps>(initSearchParams)

  return (
    <div>
      <Row>
        <Col span={12}>
          <div className="flex flex-row items-center">
            <div className="w-32 mr-2 text-left">{intl.get('tag.Tagging Name:')}</div>
            <Input
              placeholder="Enter tagging name"
              value={searchParams.name}
              onChange={(e) => {
                setSearchParams({
                  ...searchParams,
                  name: e.target.value,
                })
              }}
              onPressEnter={(e) => {
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
          {intl.get('public.search')}
        </Button>
        <Button
          className="w-20"
          onClick={(e) => {
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

export default OrderSearch
