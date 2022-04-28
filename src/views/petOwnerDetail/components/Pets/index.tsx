import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Pet } from '@/framework/types/customer'
import { useEffect, useState } from 'react'
import { getPetList } from '@/framework/api/get-pet'

const PetInformation = ({ id, customerId }: { customerId: string; id: string }) => {
  const navigator = useNavigate()
  const [pets, setPets] = useState([])

  const queryPetList = async () => {
    const res = await getPetList({ customerId })
    setPets(res)
  }

  useEffect(() => {
    if (customerId) {
      queryPetList()
    }
  }, [customerId])

  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">Pet Information</div>
      <div className="px-2 py-4 flex flex-row flex-wrap">
        {pets.map((item: Pet) => (
          <div className="flex justify-between items-center border p-4 mr-4 mt-4 w-1/3" key={item.id}>
            <div className="flex flex-row">
              <Avatar shape="square" size="large" icon={<UserOutlined />} />
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
    </div>
  )
}
export default PetInformation
