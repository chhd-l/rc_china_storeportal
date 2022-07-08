import { Button, Alert, Switch, Input, Popconfirm, Modal } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import './index.less'
import { useEffect, useState, useRef } from 'react'
import { getShopCategories } from '@/framework/api/get-product'
const ShopCategories = () => {
  const getList = async () => {
    await getShopCategories({
      offset: 0,
      limit: 10,
      withTotal: true,
      sample: {},
    })
  }
  useEffect(() => {
    // getList()
  }, [])

  return (
    <div className='shop-categories bg-gray-50 py-14 px-6 text-left'>
      <div className='bg-white p-6 '>
        <div className='flex justify-between'>
          <div className='text-xl font-semibold'>Adjust Sequence</div>
        </div>
      </div>
    </div>
  )
}

export default ShopCategories
