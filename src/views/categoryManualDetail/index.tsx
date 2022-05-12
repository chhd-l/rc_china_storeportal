import './index.less'
import { Button, Switch, Tag,Input,Space } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState } from 'react'
import { columns } from './modules/constant'
import { CategoryProductProps } from '@/framework/types/product'
import { useLocation, useParams } from 'react-router-dom'
import { AddCateType } from '@/framework/types/product'
import ManualSelection from './components/ManualSelection'
import { AudioOutlined } from '@ant-design/icons';
import { getESProducts,createShopCategoryGoodsRel } from '@/framework/api/get-product'

const { Search } = Input;
const CategoryDetail = () => {
  const location = useLocation()
  const params = useParams()
  const [addCateType, setAddCateType] = useState(AddCateType.ManualSelection)
  const [productsLsit, setProductsLsit] = useState([])
  const [manualSelectionVisible, setManualSelectionVisible] = useState<boolean>(false)
  const [cateInfos, setCateInfos] = useState({
    displayName:'',
    createdUser:'',
    productNum:'',
    type:''
  })

  useEffect(() => {
    const { id } = params
    if (id === 'add') {
      let type = (location.state as any)?.addCateType
      setAddCateType(type)
    }
  }, [])
  const handleManualVisible = (visible: boolean) => {
    setManualSelectionVisible(visible)
  }
  const hanleChangeVisble = (visible: boolean) => {
    console.info(visible)
  }
  const onSearch = () => {
    
  }
  return (
    <div className='category-detail  bg-gray-50 py-14 px-20 text-left'>
      <div className='bg-white mb-8 px-6 py-4'>
        <div className='flex justify-between'>
          <div className='font-bold text-lg'>
            {cateInfos.displayName} <EditOutlined />
          </div>
          <div>
            Activate the category make it visible
            <Switch
              className='ml-3'
              defaultChecked
              onChange={hanleChangeVisble}
            />
          </div>
        </div>
        <div className='text-gray-400 mt-4'>
          Created By:{' '}
          <span className='text-black mx-2'>
            {cateInfos.createdUser} | {cateInfos.type}
          </span>{' '}
          Product(s):{cateInfos.productNum}
        </div>
      </div>
      <div className='bg-white px-6 py-4'>
        <div className='flex justify-between'>
          <div className='search-title'>
            <div className="text-xl font-semibold list-title">Product List</div>
          </div>
          <Button
            type='primary'
            onClick={() => {
              setManualSelectionVisible(true)
            }}
            icon={<PlusOutlined />}
          >
            Add Products
          </Button>
        </div>
        <ProTable
          columns={columns}
          search={{
            optionRender: false,
            collapsed: false,
            className: 'my-searchs',
          }}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.info('cateInfos.productList')
            console.log('test sort', params, sorter, filter)
            return Promise.resolve({
              data: [],
              success: true,
            })
          }}
        />
      </div>
      <ManualSelection
        visible={manualSelectionVisible}
        handleVisible={handleManualVisible}
      />
    </div>
  )
}

export default CategoryDetail
