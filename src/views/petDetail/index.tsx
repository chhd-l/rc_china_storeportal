import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { ContentContainer } from '@/components/ui'
import SuspensionBar from '@/components/common/SuspensionBar'
import { session } from '@/utils/global'

const PetDetail = () => {
  const location = useLocation()
  const navigator = useNavigate()
  const [pet, setPet] = useState({
    image: '',
    name: '',
    type: '',
    gender: '',
    breed: '',
    birthday: '',
    age: '',
    isSterilized: '',
  })

  useEffect(() => {
    const state: any = location.state
    console.log('222', state.pet)
    setPet(state.pet)
  }, [])

  return (
    <ContentContainer className="h-full">
      <div className="h-full bg-white p-8">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <Avatar shape="square" size={64} icon={pet?.image ? <img src={pet.image} alt={''} /> : <UserOutlined />} />
            <div className="mt-4">Profile Photo</div>
          </div>
          <div className="ml-4 flex flex-row flex-wrap">
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Pet Name:</div>
              <div className="text-gray-400">{pet.name}</div>
            </div>
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Pet Category:</div>
              <div className="text-gray-400">{pet.type}</div>
            </div>
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Gender:</div>
              <div className="text-gray-400">{pet.gender}</div>
            </div>
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Breed:</div>
              <div className="text-gray-400">{pet.breed}</div>
            </div>
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Birth Date:</div>
              <div className="text-gray-400">{pet.birthday}</div>
            </div>{' '}
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Age:</div>
              <div className="text-gray-400">{pet.age} months</div>
            </div>
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Sterillized Status:</div>
              <div className="text-gray-400">{pet.isSterilized ? 'Sterilized' : 'Unsterilized'}</div>
            </div>
          </div>
        </div>
      </div>
      <SuspensionBar
        backEvent={() => {
          navigator('/petOwner/pet-owner-detail', { state: { id: session.get('cur-pet-owner')?.id } })
        }}
      />
    </ContentContainer>
  )
}
export default PetDetail
