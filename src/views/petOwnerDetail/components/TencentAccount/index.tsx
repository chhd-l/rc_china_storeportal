import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { TencentAccount } from '@/framework/types/consumer'
import { getCustomAccount } from '@/framework/api/consumer'
import { handleReturnTime } from '@/utils/utils';

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
    render: (_text: string) => _text === '1' ? 'Followed' : '',
  },
  {
    title: 'Followed Time',
    dataIndex: 'followedTime',
    key: 'followedTime',
    render: (_text: string) => handleReturnTime(_text),
  },
]

const TencentAccounts = ({ id, consumerId }: { id: string; consumerId: string }) => {
  const [tencentAccountList, setTencentAccountList] = useState<TencentAccount[]>([])

  const getTencentAccount = async () => {
    const res = await getCustomAccount({ consumerId })
    setTencentAccountList(res)
  }

  useEffect(() => {
    getTencentAccount()
  }, [])

  return (
    <div id={id}>
      <div className="text-xl font-medium mb-4">Social Media Account</div>
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
