import './index.less'
import { Button, Switch, Space, Input } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProColumns } from '@ant-design/pro-table'
import { useLocation, useParams } from 'react-router-dom'
import { ProductForCateProps } from '@/framework/types/product'
import ManualSelection from './components/ManualSelection'
import { getFindShopCategoryGoodsPage } from '@/framework/api/get-product'
import { formatMoney, handlePageParams } from '@/utils/utils'
import IconFont from '@/components/common/IconFont'

const { Search } = Input

const CategoryDetail = () => {
  const location = useLocation()
  const params = useParams()
  const [manualSelectionVisible, setManualSelectionVisible] = useState<boolean>(false)
  const [cateInfos, setCateInfos] = useState({
    categoryType: '',
    displayName: '',
    isDisplay: false,
    name: null,
    rank: null,
  })
  const setNum = (arr: any) => {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += Number(arr[i].stock)// 点开看 有两个值
    }
    return result
  }

  const getList = async (page: any) => {
    const { id } = params
    let res = await getFindShopCategoryGoodsPage({
      offset: page.offset,
      limit: page.limit,
      isNeedTotal: true,
      sample: {
        shopCategoryId: id,
      },
    })
    let meta = res?.findShopCategoryGoodsPage.meta
    if (meta?.id) {
      setCateInfos(meta)
    }
    return res
  }

  useEffect(() => {
    const { id } = params
  }, [])
  const handleManualVisible = (visible: boolean) => {
    setManualSelectionVisible(visible)
  }
  const hanleChangeVisble = (visible: boolean) => {
    console.info(visible)
  }
  const columns: ProColumns<any>[] = [
    {
      title: 'product Name',
      dataIndex: 'goodsName',
      hideInSearch: true,
      render:(_,record)=>{
        return(
          <span>{record.goodsName}</span>
        )
      }
    },
    {
      title: 'Price',
      dataIndex: 'marketingPrice',
      hideInSearch: true,
      render: (_, record) => {
        if (record.goodsVariants?.length <= 1) {
          return (
            <span>{formatMoney(record.goodsVariants[0]?.marketingPrice)}</span>
          )
        } else if (record.goodsVariants?.length > 1) {
          let arr = record.goodsVariants.sort((a: any, b: any) => {
            return a.marketingPrice - b.marketingPrice
          })
          return (
            <span>{formatMoney(arr[0]?.marketingPrice) + '-' + formatMoney(arr[arr.length - 1]?.marketingPrice)}</span>
          )
        }
      },
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      hideInSearch: true,
      render: (_, record) => {
        if (record.goodsVariants?.length > 0) {
          return (
            <span>{setNum(record.goodsVariants)}</span>
          )
        }
      },
    },
    {
      title: 'Actions',
      key: 'option',
      width: 180,
      valueType: 'option',
      render: (_, record) => {
        return (
          <Link to='' className='mr-4 text-xl' onClick={() => {

          }}>
            <IconFont type='icon-delete' />
          </Link>
        )
      },
    },
    {
      dataIndex: 'productName',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <Space direction='vertical' className='search-input'>
            <Search placeholder='Search Products' onSearch={() => {
              form.submit()
            }} size='large' style={{ width: 400 }} />
          </Space>
        )
      },
    },
  ]

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
              checked={cateInfos.isDisplay}
              onChange={hanleChangeVisble}
            />
          </div>
        </div>
        <div className='text-gray-400 mt-4'>
          Created By:{' '}
          <span className='text-black mx-2'>
            {cateInfos.name} | {cateInfos.categoryType}
          </span>{' '}
          Product(s):{}
        </div>
      </div>
      <div className='bg-white px-6 py-4'>
        <div className='flex justify-between'>
          <div className='search-title'>
            <div className='text-xl font-semibold list-title'>Product List</div>
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
          request={async (params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            console.log('test sort', params, sorter, filter)
            let page = handlePageParams({
              currentPage: params.current,
              pageSize: params.pageSize,
            })
            let tableData = await getList(page)
            if (tableData === undefined && page.offset >= 10) {
              tableData = await getList({
                offset: page.offset - 10,
                limit: page.limit,
              })
            }
            console.log(tableData,99)
            return Promise.resolve({
              data: tableData?.findShopCategoryGoodsPage?.records || [],
              total: tableData?.findShopCategoryGoodsPage.total,
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
