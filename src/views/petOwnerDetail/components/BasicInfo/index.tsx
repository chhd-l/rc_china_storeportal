import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Customer } from '@/framework/types/customer'
import { useEffect, useState } from 'react'

const BasicInformation = ({ id }: { id: string }) => {
  const [basicInformation, setBasicInformation] = useState<Customer>({
    id: '',
    nickname: '',
    phone: '',
    loginTime: '',
    image:''
  })
  const { nickname, phone, loginTime,image } = basicInformation

  useEffect(() => {
    setBasicInformation(JSON.parse(sessionStorage.getItem('cur-pet-owner') || ''))
  }, [])

  return (
    <div id={id}>
      <div className="py-4 px-2 border-b text-xl font-medium">Basic Information</div>
      <div className="px-2 py-4 flex flex-row items-center justify-around">
        <div>
          <Avatar shape="square" size={64} icon={<img src={image} alt={''}/>} />
          {/*<div className="mt-4">Profile Photo</div>*/}
        </div>
        <div className="mx-10">
          <span className="font-medium">WeChat Name:</span>
          <span className="ml-4">{nickname}</span>
        </div>
        <div className="mr-10">
          <span className="font-medium">Phone Number:</span>
          <span className="ml-4">{phone}</span>
        </div>
        <div>
          <span className="font-medium">Login Time:</span>
          <span className="ml-4">{loginTime}</span>
        </div>
      </div>
    </div>
  )
}
export default BasicInformation
