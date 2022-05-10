import { Button, Alert, Switch } from 'antd'
import { Link } from 'react-router-dom'
import { dataSource } from './modules/mockdata'
import Mock from 'mockjs'
import './index.less'
import AddCate from './components/AddCate'
import { EyeOutlined, SwapOutlined } from '@ant-design/icons'
import ProTable, { ProColumns } from '@/components/common/ProTable'
import { useEffect, useState, useRef } from 'react'
import { CategoryBaseProps } from '@/framework/types/product'
import {
  detleShopCateRel,
  createShopCategoryGoodsRel,
  getShopCategories,
  saveShopCategory,
  shopCategoryFilterRules,
  updateShopCategory,
} from '@/framework/api/get-product'
import IconFont from '@/components/common/IconFont'
// import 'antd/dist/antd.css';
const ShopCategories = () => {
  const [addVisible, setAddvisible] = useState(false)
  const handleAddCate = (visible: boolean) => {
    setAddvisible(visible)
  }
  const ref = useRef<any>()


  useEffect(() => {
    // createShopCategoryGoodsRel([{ shopCategoryId: '8', goodsId: 'ea63d308-f451-9899-47d3-14f4a83ff16b' }])
    // updateShopCategory({ id: '12316c9e-d151-909b-8256-4cfae4e70213', categoryType: 'RULE_BASED', isDisplay: true })
    // saveShopCategory({})
    // shopCategoryFilterRules({ id: '12316c9e-d151-909b-8256-4cfae4e70213' })
  }, [])

  const columns: ProColumns<CategoryBaseProps>[] = [
    {
      title: 'Category Display Name',
      dataIndex: 'displayName',
    },
    {
      title: 'Created By',
      dataIndex: 'categoryType',
      render: (_, record) => (
        <span>{'Seller | ' + record.categoryType}</span>
      ),
    },
    {
      title: 'Product(s)',
      dataIndex: 'productNum',
    },
    {
      title: 'Display On/Off',
      dataIndex: 'isDisplay',
      render: (_, record) => (
        <Switch
          defaultChecked={record.isDisplay}
          disabled={record.productNum < 1}
          onChange={(checked: boolean) => {
            console.log(`switch to ${checked}`)
          }}
        />
      ),
    },
    {
      title: 'Operation',
      key: 'option',
      width: 180,
      valueType: 'option',
      render: (_, record) => {
        if (record.productNum <= 0) {
          return [
            <Link to={`/category/${record.id}`} className='mr-4 text-xl'>
              <IconFont type='icon-jiahao' />
            </Link>,
            // <a className=" mr-4">
            //   <SettingOutlined />
            // </a>,
            <Link to='' className='mr-4 text-xl'>
              <IconFont type='icon-delete' onClick={()=>{
                detleShopCateRel([record.id])
              }}/>
            </Link>,
          ]
        } else {
          return [
            <Link to={`/category/category-detail/${record.id}`} className='mr-4 text-xl'>
              <IconFont type='icon-group52' />
            </Link>,
            <Link to='' className='mr-4 text-xl'>
              <IconFont type='icon-delete' onClick={()=>{
                detleShopCateRel([record.id])
              }}/>
            </Link>,
          ]
        }
      },
    },
  ]
  return (
    <div className='shop-categories bg-gray-50 py-14 px-6 text-left'>
      <div className='bg-white p-6 '>
        <div className='flex justify-between'>
          <div className='text-xl font-semibold'>My Shop Categories</div>
          <div className='flex'>
            <Button className='flex items-center mr-4 text-red-400 border-red-400' icon={<EyeOutlined />}>
              Preview
            </Button>
            <Button className='flex items-center mr-4 text-red-400 border-red-400' icon={<SwapOutlined />}>
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
          actionRef={ref}
          search={false}
          columns={columns}
          request={async (params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log('test sort', params, sorter, filter)
            let tableData = await getShopCategories({
              offset: 0,
              limit: 10,
              isNeedTotal: true,
              sample: {
                storeId: '12345678',
              },
            })
            return Promise.resolve({
              data: tableData?.records || [],
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
