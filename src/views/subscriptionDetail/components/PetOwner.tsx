import React from 'react'
import { Avatar, Button } from 'antd'

const PetOwner = ({ data } : { data: any }) => {
  return (
    <div className="flex items-center space-x-4">
      <div><Avatar size={48} src={data?.avatarUrl} /></div>
      <div className="flex-grow font-medium">{data?.nickName}</div>
      <div><Button type="primary" danger>Detail</Button></div>
    </div>
  )
}

export default PetOwner
