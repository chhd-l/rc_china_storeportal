import './index.less'
import { Button, Switch, Tag, Input } from 'antd'
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState, useRef } from 'react'
import { columns } from './modules/constant'
import { useParams } from 'react-router-dom'
import RuleBasedFilteringProps from './components/RuleBasedFiltering'
import { handlePageParams } from '@/utils/utils'
import { getESProducts, getFindShopCategoryGoodsPage, updateShopCategory } from '@/framework/api/get-product'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'

const CategoryDetail = () => {
  const ref = useRef<any>()
  const params = useParams()
  const [ruleBasedVisible, setRuleBasedVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [productList, setProductList] = useState('')
  const [editParams, setEditParams] = useState({})
  useEffect(() => {
    const { id } = params
  }, [])
  const handleRuleBaseVisible = (visible: boolean) => {
    ref?.current?.reload()
    setRuleBasedVisible(visible)
  }
  const handleSucces = (visible: boolean) => {
    ref?.current?.reload()
  }
  const [cateInfos, setCateInfos] = useState({
    total: null,
    categoryType: '',
    displayName: '',
    isDisplay: false,
    name: null,
    rank: null,
  })
  const getList = async (page: any) => {
    const { id } = params
    let res = await getFindShopCategoryGoodsPage({
      offset: page.offset,
      limit: page.limit,
      isNeedTotal: true,
      sample: {
        shopCategoryId: id,
        goodsName: page.goodsName,
      },
    })
    let meta = res?.findShopCategoryGoodsPage?.meta
    if (meta?.id) {
      setCateInfos({ ...meta, total: res?.findShopCategoryGoodsPage?.total })
    }
    let shopCategoryFilterRules =res?.findShopCategoryGoodsPage?.shopCategoryFilterRules
    if(shopCategoryFilterRules?.length>0){
      let obj = {
        'goodsCategoryId': shopCategoryFilterRules[0].value?.split(','),
        'brand': shopCategoryFilterRules[1].value,
        'attributeValueIds': shopCategoryFilterRules[2]?.value?.split(','),
        'startPrice': shopCategoryFilterRules[3]?.value,
        'endPrice': shopCategoryFilterRules[4]?.value,
      }
      setEditParams(obj)
      getProductList(obj)
    }
    return res
  }
  const getProductList = async (params: any) => {
    console.log(params)
    let data: any = {
      hasTotal: true,
      sample: {},
    }
    if (params.goodsCategoryId.length > 0 && params.goodsCategoryId[params.goodsCategoryId.length - 1] !== 'All Categories') {
      data.sample.goodsCategoryId = params.goodsCategoryId[params.goodsCategoryId.length - 1]
    }
    if (params.brand && params.brand !== 'All Brands') {
      data.sample.brand = params.brand
    }
    if (params.attributeValueIds) {
      data.sample.attributeValueIds = params.attributeValueIds
    }
    if (params.startPrice) {
      data.sample.startPrice = params.startPrice
    }
    if (params.endPrice) {
      data.sample.endPrice = params.endPrice
    }
    let res = await getESProducts(data)
    setProductList(res.records)
  }

  return (
    <ContentContainer>
      <div className='category-detail'>
        <div className='bg-white mb-8 px-6 py-4'>
          <div className='flex justify-between'>
            <div className='font-bold text-lg'>
              {
                show ? <div>
                    <Input.Group compact>
                      <Input style={{ width: '200px' }} defaultValue={cateInfos.displayName} onChange={(e) => {
                        setName(e.target.value)
                      }} />
                      <Button icon={<CheckOutlined />} onClick={() => {
                        const { id } = params
                        updateShopCategory({
                          id,
                          displayName: name,
                        }).then((res) => {
                          if (res) {
                            setShow(false)
                            ref.current.reload()
                          }
                        })
                      }} />
                      <Button icon={<CloseOutlined />} onClick={() => {
                        setName('')
                        setShow(false)
                      }} />
                    </Input.Group>
                  </div> :
                  <div className='edit-name'>
                    <span className='edit-display-name'>{cateInfos.displayName}</span>
                    <EditOutlined onClick={() => {
                      setShow(true)
                      setName(cateInfos.displayName)
                    }} style={{ fontSize: '16px', color: '#ee4d2d' }} />
                  </div>
              }
            </div>
            <div>
              <Switch
                className='ml-3'
                checked={cateInfos.isDisplay}
                disabled={!cateInfos?.total}
                onChange={(checked: boolean) => {
                  const { id } = params
                  updateShopCategory({
                    id,
                    isDisplay: checked,
                  }).then(() => {
                    ref.current.reload()
                  })
                }}
              />
            </div>
          </div>
          <div className='text-gray-400 mt-4'>
            Created By:{' '}
            <span className='text-black mx-2'>
            {cateInfos.name} {' | ' + cateInfos.categoryType}
          </span>{' '}
            Product(s): <span className='text-black mx-2'>{cateInfos.total}</span>
          </div>
        </div>
        <div className='bg-white px-6 py-4'>
          <div className='flex justify-between'>
            <div>
              <div>Product List</div>
              <div className='text-gray-400 py-2'>
                If your products meet the filtering rule criteria,they will
                automatically be added into your shop category
              </div>
              <div>
                Set Filtering Rules:
                {/*{cateInfos.rules.map((el) => (*/}
                {/*  <Tag className='ml-2'>{el.name}</Tag>*/}
                {/*))}*/}
              </div>
            </div>
            <Button
              type='primary'
              onClick={() => {
                handleRuleBaseVisible(true)
              }}
              icon={<EditOutlined />}
            >
              Edit Filtering Rules
            </Button>
          </div>
          <ProTable
            style={{ padding: 0 }}
            className='my-table'
            actionRef={ref}
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
              let tableData = await getList({ ...page, goodsName: params.goodsName })
              if (tableData === undefined && page.offset >= 10) {
                tableData = await getList({
                  offset: page.offset - 10,
                  limit: page.limit,
                  goodsName: params.goodsName,
                })
              }
              return Promise.resolve({
                data: tableData?.findShopCategoryGoodsPage?.records || [],
                total: tableData?.findShopCategoryGoodsPage.total,
                success: true,
              })
            }}
          />
        </div>
        <RuleBasedFilteringProps
          visible={ruleBasedVisible}
          handleVisible={handleRuleBaseVisible}
          handleSucces={handleSucces}
          productLists={productList}
          editParams={editParams}
        />
      </div>
    </ContentContainer>
  )
}

export default CategoryDetail
