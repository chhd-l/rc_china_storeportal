import { Avatar, Table, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
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
      width: 200,
      // align: "center",
      title: 'Profile Photo',
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => <Avatar size="large" icon={<img src={text} alt='' />} />,
    },
    {
      width: 200,
      // align: "center",
      title: 'WeChat Name',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      width: 200,
      // align: "center",
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      width: 200,
      // align: "center",
      title: 'Options',
      key: 'Options',
      render: (text: any, record: any) => (
        <Tooltip title="View Details">
          <span
            className="cursor-pointer iconfont icon-kjafg primary-color"
            onClick={() => {
              sessionStorage.setItem('cur-pet-owner', JSON.stringify(record))
              navigator('/petOwner/pet-owner-detail', { state: { id: record.id } })
            }}
          />
        </Tooltip>
      ),
    },
  ]
  return <Table dataSource={petOwnerList} columns={columns} rowKey="id" className="rc-table" pagination={false} />
}

export default Index
