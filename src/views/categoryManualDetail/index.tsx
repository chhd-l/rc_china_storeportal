import './index.less'
import { Button, Switch, Space, Input, Checkbox, Modal,Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ProColumns } from '@ant-design/pro-table'
import { useParams } from 'react-router-dom'
import ManualSelection from './components/ManualSelection'
import { detleShopCateRel, getFindShopCategoryGoodsPage, updateShopCategory } from '@/framework/api/get-product'
import { ContentContainer, SearchContainer, TableContainer } from '@/components/ui'
import { formatMoney, handlePageParams } from '@/utils/utils'
import IconFont from '@/components/common/IconFont'

const { Search } = Input

const CategoryDetail = () => {
  const params = useParams()
  const [keyList, setKeyList] = useState([])
  const [checkLenght, setCheckLenght] = useState(0)
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [curAssetId, setCurAssetId] = useState<any>('')
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [manualSelectionVisible, setManualSelectionVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cateInfos, setCateInfos] = useState({
    total: null,
    categoryType: '',
    displayName: '',
    isDisplay: false,
    name: null,
    rank: null,
  })
  const ref = useRef<any>()
  const onCheckAllChange = (e: any) => {
    if (checkAll) {
      setSelectedRowKeys([])
    } else if (indeterminate) {
      console.log(keyList)
      setSelectedRowKeys(keyList)
    }
    setCheckAll(!checkAll)
    setIndeterminate(false)
  }
  const setListKey = (data: any) => {
    setKeyList(data.map((item: { shopCategoryGoodsRelationId: any }) => item.shopCategoryGoodsRelationId))
  }
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys)
  }
  const confirmDelete = async () => {
    setLoading(true)
    detleShopCateRel(curAssetId).then((res) => {
      if (res) {
        setIsModalVisible(false)
        setSelectedRowKeys([])
        ref?.current?.reload()
      }
    })
    setLoading(false)
  }

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
        goodsName: page.goodsName,
      },
    })
    let meta = res?.findShopCategoryGoodsPage?.meta
    if (meta?.id) {
      setCateInfos({ ...meta, total: res?.findShopCategoryGoodsPage?.total })
    }
    setCheckLenght(res?.findShopCategoryGoodsPage?.records.length)
    return res
  }

  useEffect(() => {
    const { id } = params
  }, [])
  const handleManualVisible = (visible: boolean) => {
    setManualSelectionVisible(visible)
  }
  const handleUpdate = (visible: boolean) => {
    ref.current.reload()
  }
  const columns: ProColumns<any>[] = [
    {
      title: 'Product Name',
      dataIndex: 'goodsName',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className='flex al-cneter'>
            <img src={record.goodsVariants[0]?.defaultImage} alt='' style={{ width: '50px', marginRight: '10px' }} />
            <div>
              <div>{record.goodsName}</div>
            </div>
          </div>
        )
      },
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
            setCurAssetId(record.shopCategoryGoodsRelationId)
            setIsModalVisible(true)
          }}>
            <IconFont type='icon-delete' />
          </Link>
        )
      },
    },
    {
      dataIndex: 'goodsName',
      hideInTable: true,
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

  // @ts-ignore
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
              <Tooltip title={!cateInfos?.total?'This category cannot be activated as it contains no product':''}>
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
              </Tooltip>
            </div>
          </div>
          <div className='text-gray-400 mt-4'>
            Created By:{' '}
            <span className='text-black mx-2'>
            {cateInfos.name} {' | ' + cateInfos.categoryType} {cateInfos.categoryType==='MANUAL'?' Selection':' Filtering'}
          </span>{' '}
            Product(s): <span className='text-black mx-2'>{cateInfos.total}</span>
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
            >
              + Add Category
            </Button>
          </div>
          <ProTable
            cardBordered
            className='set-delete-box'
            actionRef={ref}
            columns={columns}
            toolBarRender={false}
            rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
            rowKey='shopCategoryGoodsRelationId'
            tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
              console.log(selectedRowKeys, selectedRows, checkLenght)
              if (selectedRows.length === checkLenght) {
                setCheckAll(true)
                setIndeterminate(false)
              } else {
                setCheckAll(false)
              }
              if (selectedRows.length && selectedRows.length < checkLenght) {
                setIndeterminate(true)
              }
              return (
                <span>
                  <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} />
          </span>
              )
            }}
            tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
              return (
                <Space size={16}>
                  <span>{selectedRowKeys.length}products selected</span>
                  <Button onClick={()=>{
                    if(selectedRows.length>0){

                      setCurAssetId(selectedRowKeys)
                      setIsModalVisible(true)
                      // detleShopCateRel(selectedRowKeys).then((res) => {
                      //   if (res) {
                      //
                      //     setIsModalVisible(false)
                      //     ref.current.reload()
                      //   }
                      // })
                    }
                  }}>Delete</Button>
                </Space>
              )
            }}
            pagination={{
              showTotal: (total: number) => ``,
            }}
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
              if (tableData?.findShopCategoryGoodsPage?.records && tableData?.findShopCategoryGoodsPage?.records.length > 0) {
                setListKey(tableData?.findShopCategoryGoodsPage?.records)
              }
              console.log(tableData, 99)
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
          handleUpdate={handleUpdate}
        />
        <Modal
          className='rc-modal'
          title='Delete Item'
          okText='Confirm'
          visible={isModalVisible}
          onOk={confirmDelete}
          confirmLoading={loading}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Are you sure you want to delete the item?</p>
        </Modal>
      </div>
    </ContentContainer>
  )
}

export default CategoryDetail
