import React from 'react'
import { Avatar, Button } from 'antd'

const PetOwner: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <div><Avatar size={48} icon="people" /></div>
      <div className="flex-grow font-medium">Lihhfkdsf</div>
      <div><Button type="primary" danger>Detail</Button></div>
    </div>
  )
}

export default PetOwner
