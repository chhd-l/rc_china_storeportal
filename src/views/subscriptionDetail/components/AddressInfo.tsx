import React from 'react'
import { Button } from 'antd'

const AddressInfo = ({ data, onEdit } : { data: any, onEdit: () => void }) => {
  return (
    <div className="flex justify-start space-x-4">
      <span className="iconfont icon-a-xingzhuangjiehe2 primary-color text-xl"></span>
      <div className="flex-grow mx-4">
        <div className="mb-2">{data?.address?.receiverName} {data?.address?.phone}</div>
        <div>
          {[
            data?.address?.postcode,
            data?.address?.detail,
            data?.address?.region,
            data?.address?.city,
            data?.address?.province,
            data?.address?.country
          ].filter(item => !!item).join(" ")}
        </div>
      </div>
      <div>
        <Button type="primary" onClick={onEdit}>Edit</Button>
      </div>
    </div>
  )
}

export default AddressInfo
