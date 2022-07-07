import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Empty } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Pet } from '@/framework/types/consumer'
import React, { useEffect, useState } from 'react'
import { getPetList } from '@/framework/api/pet'
import './index.less'

const PetInformation = ({ id, consumerId }: { consumerId: string; id: string }) => {
  const navigator = useNavigate()
  const [pets, setPets] = useState([])

  const queryPetList = async () => {
    const res = await getPetList({ consumerId })
    setPets(res)
  }

  useEffect(() => {
    if (consumerId) {
      queryPetList()
    }
  }, [consumerId])

  return (
    <div id={id} className="pet-information">
      <div className="py-4 px-2 border-b text-xl font-medium">Pet Information</div>
      {pets.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {pets.map((item: Pet, index) => (
            <div
              className={`flex justify-between items-center border rounded-4 p-4 mt-4 justify-items-stretch w-full`}
              key={item.id}
            >
              <div className="flex flex-row">
                <Avatar shape="square" icon={item?.image ? <img src={item.image} alt={''} /> : <UserOutlined />} />
                <div className="ml-4">
                  <div>{item.name}</div>
                  <div className="flex flex-row">
                    <div className="flex flex-col mr-4">
                      <span className="text-gray-400">Age</span>
                      <span>{item.age} months</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400">Breed</span>
                      <span>{item.breed}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="rounded-4"
                type="primary"
                danger
                onClick={() => {
                  navigator('/petOwner/pet-detail', { state: { pet: item } })
                }}
              >
                Details
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  )
}
export default PetInformation
