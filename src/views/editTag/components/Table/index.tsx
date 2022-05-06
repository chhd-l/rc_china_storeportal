import { Avatar, Button, Table, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { Customer } from '@/framework/types/customer'

interface PetOwnerTableProps {
  petOwnerList: Customer[]
}

const Index = ({ petOwnerList }: PetOwnerTableProps) => {
  const navigator = useNavigate()
  const columns = [
    {
      title: 'Profile Photo',
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => <Avatar size="large" icon={<img src={text} alt='' />} />,
    },
    {
      title: 'WeChat Name',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Options',
      key: 'Options',
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Delete">
            <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl" onClick={() => {}} />
          </Tooltip>
        </>
      ),
    },
  ]
  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="text-base font-medium">Pet Owner List</div>
        <Button
          danger
          onClick={() => {
            navigator('/account/add-account')
          }}
        >
          + Add New Pet Owner
        </Button>
      </div>
      <Table dataSource={petOwnerList} columns={columns} rowKey="id" className="rc-table" pagination={false} />
    </>
  )
}

export default Index
