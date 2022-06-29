import './index.less'
import { Button, Switch, Tag, Input, Tooltip, Spin, Modal } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState, useRef } from 'react'
import { columns } from './modules/constant'
import RuleBasedFilteringProps from './components/RuleBasedFiltering'
import { handlePageParams } from '@/utils/utils'
import { getESProducts, getFindShopCategoryProductPage, updateShopCategory } from '@/framework/api/get-product'
import { ContentContainer } from '@/components/ui'
import { useLocation } from 'react-router'

const CategoryDetail = () => {
  const { state }: any = useLocation();
  const ref = useRef<any>()
  const [ruleBasedVisible, setRuleBasedVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [productList, setProductList] = useState('')
  const [isSwithVisible, setIsSwithVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [editParams, setEditParams] = useState({
    filterTags: [],
    filterTagsTwo: [],
  })
  useEffect(() => {
  }, [])
  const handleRuleBaseVisible = (visible: boolean) => {
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
    setLoading(true)
    let sample = {
      shopCategoryId: state.id,
      name: undefined,
    }
    if(page.name!==''){
      sample.name = page.name
    }
    let res = await getFindShopCategoryProductPage({
      offset: page.offset,
      limit: page.limit,
      isNeedTotal: true,
      sample
    })
    let meta = res?.shopCategoryProductFindPage?.meta
    if (meta?.id) {
      setCateInfos({ ...meta, total: res?.shopCategoryProductFindPage?.total })
    }
    let shopCategoryFilterRules = res?.shopCategoryProductFindPage?.shopCategoryFilterRules
    if (shopCategoryFilterRules?.length > 0) {
      let obj = {
        'productCategoryId': shopCategoryFilterRules[0].value?.split(','),
        'brand': shopCategoryFilterRules[1].value,
        'attributeValueIds': shopCategoryFilterRules[2].value !== '' ? shopCategoryFilterRules[2]?.value.split(',') : null,
        'startPrice': shopCategoryFilterRules[3]?.value ? parseFloat(shopCategoryFilterRules[3]?.value) : null,
        'endPrice': shopCategoryFilterRules[4]?.value ? parseFloat(shopCategoryFilterRules[4]?.value) : null,
        'filterTags': shopCategoryFilterRules[5]?.value !== '' ? shopCategoryFilterRules[5]?.value.split(',') : [],
        'filterTagsTwo': shopCategoryFilterRules[6]?.value !== '' ? shopCategoryFilterRules[6]?.value.split(',') : [],
      }
      setEditParams(obj)
      console.log(obj,888)
      getProductList(obj)
    }
    setLoading(false)
    return res
  }
  const getProductList = async (params: any) => {
    let data: any = {
      hasTotal: true,
      sample: {},
    }
    if (params.productCategoryId.length > 0 && params.productCategoryId[params.productCategoryId.length - 1] !== 'All Categories') {
      data.sample.productCategoryId = params.productCategoryId[params.productCategoryId.length - 1]
    }
    if (params.brand && params.brand !== 'All Brands') {
      data.sample.brand = params.brand
    }
    if (params.attributeValueIds) {
      data.sample.attributeRelations = [{attributeValueIds:params.attributeValueIds}]
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
  const confirmSwitch = async () => {
    setLoading(true)
    updateShopCategory({
      id: state.id,
      isDisplay: status,
    }).then((res) => {
      if (res) {
        setIsSwithVisible(false)
        setCateInfos({
          ...cateInfos,
          isDisplay:status
        })
        setLoading(false)
      }
    })

  }

  return (
    <ContentContainer>
      <Spin spinning={loading}>
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
                          updateShopCategory({
                            id:state.id,
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
                      <span style={{ color: '#ee4d2d' }}
                            className='iconfont icon-shop-cate-edit'
                            onClick={() => {
                              setShow(true)
                              setName(cateInfos.displayName)
                            }} />
                    </div>
                }
              </div>
              <div>
                <Tooltip title={!cateInfos?.total ? 'This category cannot be activated as it contains no product' : ''}>
                  <Switch
                    className='ml-3'
                    checked={cateInfos.isDisplay}
                    disabled={!cateInfos?.total}
                    onChange={(checked: boolean) => {
                      setStatus(checked)
                      setIsSwithVisible(true)
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='text-gray-400 mt-4'>
              Created By:{' '}
              <span className='text-black mx-2'>
            {cateInfos.name} {' | '} {cateInfos.categoryType === 'MANUAL' ? 'Manual Selection' : 'Rule-based Filtering'}
          </span>{' '}
              Product(s): <span className='text-black mx-2'>{cateInfos.total}</span>
            </div>
          </div>
          <div className='bg-white px-6 py-4'>
            <div className='flex justify-between' style={{ marginBottom: '10px' }}>
              <div>
                <div className='text-base font-semibold'>Product List</div>
                <div className='text-gray-400 py-2 text-xs'>
                  If your products meet the filtering rule criteria,they will
                  automatically be added into your shop category
                </div>
                <div>
                  Set Filtering Rules:
                  {editParams?.filterTags?.map((el: any) => (
                    <Tag className='ml-2' key={el}>
                      {el}
                    </Tag>
                  ))}
                  {editParams?.filterTagsTwo?.map((el: any) => (
                    <Tag className='ml-2 mt-2' key={el}>
                      {el}
                    </Tag>
                  ))}
                </div>
              </div>
              <Button
                type='primary'
                onClick={() => {
                  handleRuleBaseVisible(true)
                }}
                icon={<span style={{ color: '#fff',marginRight:'5px' }}
                  className='iconfont icon-shop-cate-edit' />}
              >
                Edit Filtering Rules
              </Button>
            </div>
            <ProTable
              loading={false}
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
                let page = handlePageParams({
                  currentPage: params.current,
                  pageSize: params.pageSize,
                })
                console.log(params)
                let tableData = await getList({ ...page, name: params.name })
                if (tableData === undefined && page.offset >= 10) {
                  tableData = await getList({
                    offset: page.offset - 10,
                    limit: page.limit,
                    name: params.name,
                  })
                }
                return Promise.resolve({
                  data: tableData?.shopCategoryProductFindPage?.records || [],
                  total: tableData?.shopCategoryProductFindPage?.total||0,
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
      </Spin>
      <Modal
        className='rc-modal'
        title='Notice'
        okText='Confirm'
        visible={isSwithVisible}
        onOk={confirmSwitch}
        confirmLoading={loading}
        onCancel={() => setIsSwithVisible(false)}
      >
        <p>{status ? 'Are you sure you want to enable the item ?' : 'Are you sure you want to disable the item ?'}</p>
      </Modal>
    </ContentContainer>
  )
}

export default CategoryDetail
