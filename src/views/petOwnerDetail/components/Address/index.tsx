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
      width: 80,
      render: (text: any, record: any, index: number) =>
      <div style={{ height: '74px' }} className={`w-full flex items-center justify-center ${text ? 'startOne' : ''}`}>{index + 1}</div>
    },
    {
      title: 'Receiver Name',
      dataIndex: 'receiverName',
      key: 'receiverName',
      width: 130,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
      width: 90,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 90,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'District',
      dataIndex: 'region',
      key: 'region',
      width: 100,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'detail',
      key: 'detail',
      width: 230,
      textWrap: 'word-break',
      ellipsis: true,
    },
    {
      title: 'Postal Code',
      dataIndex: 'postcode',
      key: 'postcode',
      width: 130,
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
