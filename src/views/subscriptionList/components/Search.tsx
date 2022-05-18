import React from 'react'
import { DatePicker, Button, Input, Select } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const Search = () => {
  const inputRef = React.useRef<any>(null);

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
            style={{ width: '20%' }}
          >
            <Select.Option value="1">
              All
            </Select.Option>
          </Select>
          <Input
            style={{ width: '80%' }}
            ref={inputRef}
            placeholder={'Input '}
            onPressEnter={() => {
              inputRef.current!.blur()
            }}
          />
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
