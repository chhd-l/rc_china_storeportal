import React, { useState } from 'react'
import { DatePicker, Button, Input, Select } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { SubscriptionType, SubscriptionCycle } from '../modules/constants'
import moment, { Moment } from 'moment'

const Option = Select.Option

type RangeValue = [Moment | null, Moment | null] | null

type TParam = {
  sample: any
  where: any
}

interface IProps {
  onSearch: (param: TParam) => void
}

const Search = (props: IProps) => {
  const inputRef = React.useRef<any>(null);
  const [dates, setDates] = useState<RangeValue>(null)
  const [type, setType] = useState<string>('idLike');
  const [val, setVal] = useState<string | undefined>(undefined);

  const handleSelectDate = (date: any) => {
    setDates(date)
  }

  const handleSelectType = (val: string) => {
    setType(val)
    setVal(undefined)
  }

  const handleReset = () => {
    setType("idLike")
    setVal(undefined)
    setDates(null)
    props.onSearch({sample: undefined, where: undefined})
  }

  const handleSearch = () => {
    props.onSearch({
      sample: type === "type" || type === "cycle" ? { [type]: val } : undefined,
      where: dates || (type !== "type" && type !== "cycle") ? {
        createdAtBiggerThan: dates && dates[0] ? dates[0].utc().startOf('day').format() : undefined,
        createdAtLessThan: dates && dates[1] ? dates[1].utc().endOf('day').format() : undefined,
        [type]: type !== "type" && type !== "cycle" ? val : undefined,
      } : undefined
    })
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-end space-x-4">
        <div className="w-auto mr-3">Subscription Creation Date</div>
        <DatePicker.RangePicker
          style={{ width: '300px' }}
          value={dates}
          onChange={handleSelectDate}
        />
        <Button className="ml-3">Export</Button>
        <Button className="ml-3" icon={<MenuOutlined style={{ color: '#979797' }} />} />
      </div>
      <div className="flex flex-row items-center mt-4 text-left">
        <Input.Group compact>
          <Select
            getPopupContainer={(trigger: any) => trigger.parentNode}
            value={type}
            onChange={handleSelectType}
            style={{ width: '20%' }}
          >
            <Option value="idLike">Subscription ID</Option>
            <Option value="type">Subscription Type</Option>
            <Option value="cycle">Subscription Cycle</Option>
            <Option value="orderIdLike">Order ID</Option>
            <Option value="phoneLike">Phone Number</Option>
            <Option value="wechatNameLike">Wechat Name</Option>
            <Option value="productNameLike">Product Name</Option>
          </Select>
          {type === "type" ? <Select key="subscription-type" placeholder="Select" value={val} onChange={(val) => setVal(val)} style={{ width: '80%' }}>
            {Object.keys(SubscriptionType).map((key: string, idx: number) => (
              <Option value={key} key={idx}>{SubscriptionType[key]}</Option>
            ))}
          </Select> : type === "cycle" ? <Select key="subscription-cycle" placeholder="Select" value={val} onChange={(val) => setVal(val)} style={{ width: '80%' }}>
            {Object.keys(SubscriptionCycle).map((key: string, idx: number) => (
              <Option value={key} key={idx}>{SubscriptionCycle[key]}</Option>
            ))}
          </Select> : <Input
            style={{ width: '80%' }}
            ref={inputRef}
            value={val}
            placeholder={'Input '}
            onChange={(e) => setVal(e.target.value)}
            onPressEnter={() => {
              inputRef.current!.blur()
            }}
          />}
        </Input.Group>
        <Button
          className="w-32 mx-3 btn-primary"
          type="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          className="w-32"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Search
