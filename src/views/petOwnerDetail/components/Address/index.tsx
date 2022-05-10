import { Table } from 'antd'
import { StarFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Address } from '@/framework/types/customer'
import { getAddressList } from '@/framework/api/get-address'

const MyAddress = ({ id, customerId }: { id: string; customerId: string }) => {
  const [addressList, setAddressList] = useState<Address[]>([])

  const getAddresses = async () => {
    const res = await getAddressList({
      customerId,
    })
    setAddressList(res)
  }

  useEffect(() => {
    getAddresses()
  }, [])

  const columns = [
    {
      title: 'No.',
      key: 'no',
      render: (text: any, record: any, index: number) => `${index + 1}`,
    },
    {
      title: 'Receiver Name',
      dataIndex: 'receiverName',
      key: 'receiverName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'District',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Address',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'Postal Code',
      dataIndex: 'postcode',
      key: 'postcode',
    },
    {
      title: 'Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      className: 'text-center',
      render: (text: any, record: any) =>
        text ? <StarFilled style={{ color: 'rgba(239, 68, 68,1)', fontSize: '18px' }} /> : null,
    },
  ]
  return (
    <div id={id}>
      <div className="text-xl font-medium">My Address</div>
      <div className="mt-4">
        <Table dataSource={addressList} columns={columns} pagination={false} rowKey="id" className="rc-table" />
      </div>
    </div>
  )
}
export default MyAddress
