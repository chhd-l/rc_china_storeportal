import React from 'react'
import { useNavigate } from "react-router-dom"
import { Avatar, Button } from 'antd'

const PetOwner = ({ data } : { data: any }) => {
  const navigator = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      <div><Avatar size={48} src={data?.avatarUrl} /></div>
      <div className="flex-grow font-medium">{data?.nickName}</div>
      <div><Button type="primary" style={{minWidth: 80}} onClick={() => navigator('/petOwner/pet-owner-detail', { state: { id: data?.id } })}>Detail</Button></div>
    </div>
  )
}

export default PetOwner
