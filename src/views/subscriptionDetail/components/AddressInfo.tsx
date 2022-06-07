import React from 'react'
import { Button } from 'antd'

const AddressInfo = ({ data, onEdit } : { data: any, onEdit: () => void }) => {
  return (
    <div className="flex justify-start space-x-4">
      <span className="iconfont icon-a-xingzhuangjiehe2 primary-color text-xl"></span>
      <div className="flex-grow mx-4">
        <div className="mb-2">{data?.address?.receiverName} {data?.address?.phone} {data?.address?.postCode}</div>
        <div>
          {[
            data?.address?.province,
            data?.address?.city,
            data?.address?.region,
            data?.address?.detail,
          ].filter(item => !!item).join(" ")}
        </div>
      </div>
      <div>
        <Button type="primary" style={{minWidth: 80}} onClick={onEdit}>Edit</Button>
      </div>
    </div>
  )
}

export default AddressInfo
