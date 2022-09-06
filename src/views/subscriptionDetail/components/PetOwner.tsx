import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button } from 'antd'
import intl from 'react-intl-universal'

const PetOwner = ({ data }: { data: any }) => {
  const navigator = useNavigate()
  const handleViewDetail = () => {
    sessionStorage.setItem(
      'cur-pet-owner',
      JSON.stringify({ id: data?.id, nickname: data?.nickName, phone: data?.phone, image: data?.avatarUrl }),
    )
    navigator('/petOwner/pet-owner-detail', { state: { id: data?.id } })
  }

  return (
    <div className="flex items-center space-x-4">
      <div>
        <Avatar size={48} src={data?.avatarUrl} />
      </div>
      <div className="flex-grow font-medium">{data?.nickName}</div>
      <div>
        <Button type="primary" style={{ minWidth: 80 }} onClick={handleViewDetail}>
          {intl.get('public.Detail')}
        </Button>
      </div>
    </div>
  )
}

export default PetOwner
