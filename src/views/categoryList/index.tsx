import { Button, Alert } from 'antd'
import { dataSource } from './modules/mockdata'
import Mock from 'mockjs'
import './index.less'
import AddCate from './components/AddCate'
import { EyeOutlined, SyncOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { columns } from './modules/constant'
import { useEffect, useState } from 'react'
import {
  createShopCategoryGoodsRel,
  getShopCategories,
  saveShopCategory,
  shopCategoryFilterRules,
  updateShopCategory,
} from '@/framework/api/get-product'
// import 'antd/dist/antd.css';
import comingsoon from "../../assets/images/comingsoon.png"
const ShopCategories = () => {
  const [addVisible, setAddvisible] = useState(false)
  const handleAddCate = (visible: boolean) => {
    setAddvisible(visible)
  }
  useEffect(() => {
    // getShopCategories({
    //   offset: 0,
    //   limit: 10,
    //   isNeedTotal: true,
    //   sample: {
    //     storeId: '12345678',
    //   },
    // })
    // createShopCategoryGoodsRel([{ shopCategoryId: '8', goodsId: 'ea63d308-f451-9899-47d3-14f4a83ff16b' }])
    // updateShopCategory({ id: '12316c9e-d151-909b-8256-4cfae4e70213', categoryType: 'RULE_BASED', isDisplay: true })
    // saveShopCategory({})
    // shopCategoryFilterRules({ id: '12316c9e-d151-909b-8256-4cfae4e70213' })
  }, [])
  return (
    <div className='shop-categories bg-gray-50 py-14 px-6 text-left'>
      <div className='bg-white p-6 '>
        <div className='flex justify-between'>
          <img src="comingsoon" alt="" />
          <div>My Shop Categories</div>
          <div>
            <Button className=' mr-4' icon={<EyeOutlined />}>
              Preview
            </Button>
            <Button className=' mr-4' icon={<SyncOutlined />}>
              Adjust Sequence
            </Button>
            <Button
              className=' mr-4'
              onClick={() => {
                handleAddCate(true)
              }}
              type='primary'
            >
              + Add Category
            </Button>
          </div>
        </div>
        <Alert
          className='my-6 alert'
          showIcon
          // icon={<InfoCircleTwoTone />}
          message='Your edits will be displayed in your Shop Page within 30 minutes'
          type='info'
        />
        <ProTable
          search={false}
          columns={columns}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log('test sort', params, sorter, filter)
            return Promise.resolve({
              data: Mock.mock(dataSource).array,
              success: true,
            })
          }}
        />
      </div>
      <AddCate visible={addVisible} handleVisible={handleAddCate} />
    </div>
  )
}

export default ShopCategories
