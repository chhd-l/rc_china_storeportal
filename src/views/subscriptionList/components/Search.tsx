import React, { useState } from 'react'
import { DatePicker, Button, Input, Select } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const Option = Select.Option

const Search = () => {
  const inputRef = React.useRef<any>(null);
  const [type, setType] = useState<string>('1')

  return (
    <div>
      <div className="flex flex-row items-center justify-end space-x-4">
        <div className="w-auto mr-3">Subscription Creation Date</div>
        <DatePicker.RangePicker
          style={{ width: '300px' }}
        />
        <Button className="ml-3">Export</Button>
        <Button className="ml-3" icon={<MenuOutlined style={{ color: '#979797' }} />} />
      </div>
      <div className="flex flex-row items-center mt-4 text-left">
        <Input.Group compact>
          <Select
            getPopupContainer={(trigger: any) => trigger.parentNode}
            value={type}
            onChange={(val) => setType(val)}
            style={{ width: '20%' }}
          >
            <Option value="1">Subscription ID</Option>
            <Option value="2">Subscription Type</Option>
            <Option value="3">Subscription Cycle</Option>
            <Option value="4">Order ID</Option>
            <Option value="5">Phone Number</Option>
            <Option value="6">Wechat Name</Option>
            <Option value="7">Product Name</Option>
          </Select>
          {type === "2" ? <Select style={{ width: '80%' }}>
            <Option val="1">Autoship</Option>
            <Option val="2">Product Contract</Option>
          </Select> : type === "3" ? <Select style={{ width: '80%' }}>
            <Option val="1">Quarter</Option>
            <Option val="2">Half year</Option>
            <Option val="3">One year</Option>
          </Select> : <Input
            style={{ width: '80%' }}
            ref={inputRef}
            placeholder={'Input '}
            onPressEnter={() => {
              inputRef.current!.blur()
            }}
          />}
        </Input.Group>
        <Button
          className="w-32 mx-3 btn-primary"
          type="primary"
          danger
        >
          Search
        </Button>
        <Button
          className="w-32"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default Search
