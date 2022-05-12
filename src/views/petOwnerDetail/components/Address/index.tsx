import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { Address } from '@/framework/types/customer'
import { getAddressList } from '@/framework/api/get-address'
import './Style.less'

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
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (text: any, record: any, index: number) =>
      <div style={{ height: '74px' }} className={`w-full flex items-center justify-center ${text ? 'startOne' : ''}`}>{index + 1}</div>
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
  ]
  return (
    <div id={id}>
      <div className="text-xl font-medium">My Address</div>
      <div className="mt-4">
        <Table dataSource={addressList} columns={columns} pagination={false} rowKey="id" className="rc-table Address" />
      </div>
    </div>
  )
}
export default MyAddress
