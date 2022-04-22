import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const PetDetail = () => {
  const location = useLocation()
  const [pet, setPet] = useState({
    name:'',
    type:'',
    gender:'',
    breed:'',
    birthday:'',
    age:'',
    isSterilized:''
  })

  useEffect(() => {
    const state: any = location.state
    console.log('222', state.pet)
    setPet(state.pet)
  }, [])

  return (
    <>
      <div className="bg-gray1 p-4 flex flex-row">
        <div className="bg-white p-4 flex items-center">
          <div className="flex flex-col items-center">
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
            <div>Profile Photo</div>
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
              <div className="text-gray-400">{pet.age}</div>
            </div>
            <div className="w-1/2 flex flex-row mb-4">
              <div className="w-1/2 text-right mr-2">Sterillized Status:</div>
              <div className="text-gray-400">{pet.isSterilized}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PetDetail
