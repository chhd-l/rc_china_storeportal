import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { TencentAccount } from '@/framework/types/customer'
import { getCustomAccount } from '@/framework/api/customer'

const columns = [
  {
    title: 'UnionId',
    dataIndex: 'unionId',
    key: 'unionId',
  },
  {
    title: 'OpenId',
    dataIndex: 'openId',
    key: 'openId',
  },
  {
    title: 'UserType',
    dataIndex: 'userType',
    key: 'userType',
  },
  {
    title: 'Follow Status',
    dataIndex: 'followStatus',
    key: 'followStatus',
  },
  {
    title: 'Followed Time',
    dataIndex: 'followedTime',
    key: 'followedTime',
  },
  {
    title: 'Unfollowed Time',
    dataIndex: 'unfollowedTime',
    key: 'unfollowedTime',
  },
]

const TencentAccounts = ({ id, customerId }: { id: string; customerId: string }) => {
  const [tencentAccountList, setTencentAccountList] = useState<TencentAccount[]>([])

  const getTencentAccount = async () => {
    const res = await getCustomAccount({ customerId: customerId || 'e5edfa8c-ff05-cee0-45af-5c9e69d1b162' })
    setTencentAccountList([res])
  }

  useEffect(() => {
    getTencentAccount()
  }, [])

  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium mb-2">Tencent Account</div>
      <Table
        dataSource={tencentAccountList}
        columns={columns}
        pagination={false}
        rowKey="unionId"
        className="rc-table"
      />
    </div>
  )
}

export default TencentAccounts
