import { Avatar, Button, Switch, Table, Tooltip } from 'antd'
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
      title: 'Tagging Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pet Owner(s)',
      dataIndex: 'customerCount',
      key: 'customerCount',
    },
    {
      title: 'Tagging Status',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      render: (text: any) => <Switch checked={text} onChange={() => {}} />,
    },
    {
      title: 'Options',
      key: 'Options',
      render: (text: any, record: any) => (
        <>
          <Tooltip title="View Details">
            <span
              className="cursor-pointer iconfont icon-kjafg primary-color"
              onClick={() => {
                // navigator('/petOwner/edit-tag', { state: { id: record.id } })
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl" onClick={() => {}} />
          </Tooltip>
        </>
      ),
    },
  ]
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          danger
          onClick={() => {
            // navigator('/account/add-account')
          }}
        >
          + Add New Tag
        </Button>
      </div>
      <Table dataSource={petOwnerList} columns={columns} rowKey="id" className="rc-table" pagination={false} />
    </>
  )
}

export default Index
