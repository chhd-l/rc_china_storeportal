import React from 'react'
import { Button } from 'antd'

const AddressInfo: React.FC = () => {
  return (
    <div className="flex justify-start space-x-4">
      <span className="iconfont icon-a-xingzhuangjiehe2 primary-color text-xl"></span>
      <div className="flex-grow mx-4">
        <div className="mb-2">Kui Liu 1818282828</div>
        <div>Chongqing China</div>
      </div>
      <div>
        <Button type="primary">Edit</Button>
      </div>
    </div>
  )
}

export default AddressInfo
