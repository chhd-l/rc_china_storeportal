import { Alert, Button, Input, Modal, Switch, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import './index.less'
import AddCate from './components/AddCate'
import ProTable, { ProColumns } from '@/components/common/ProTable'
import { ContentContainer } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'
import { CategoryBaseProps } from '@/framework/types/product'
import { getShopCategories, updateShopCategory } from '@/framework/api/get-product'
import { handlePageParams } from '@/utils/utils'
import { useAtom } from 'jotai'
import { userAtom } from '@/store/user.store'
import { useNavigate } from 'react-router-dom'
// import 'antd/dist/antd.css';
const ShopCategories = () => {
  const navigator = useNavigate()
  const [userInfo] = useAtom(userAtom)
  const [addVisible, setAddvisible] = useState(false)
  const [editIndex, setEditIndex] = useState<number | undefined>()
  const [editClickIndex, setEditClickIndex] = useState<number | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [curAssetId, setCurAssetId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSwithVisible, setIsSwithVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [show, setShow] = useState(false)
  const ref = useRef<any>()

  const handleAddCate = (visible: boolean) => {
    setAddvisible(visible)
  }

  const handleUpdate = (visible: boolean) => {
    ref.current.reload()
  }

  const getList = async (page: any) => {
    return await getShopCategories({
      offset: page.offset,
      limit: page.limit,
      isNeedTotal: true,
      sample: {
        storeId: '12345678',
      },
    })
  }

  const confirmDelete = async () => {
    setLoading(true)
    updateShopCategory({
      id: curAssetId,
      isDeleted: true,
    }).then((res) => {
      if (res) {
        setIsModalVisible(false)
        ref.current.reload()
      }
    })
    setLoading(false)
  }

  const confirmSwitch = async () => {
    setLoading(true)
    updateShopCategory({
      id: curAssetId,
      isDisplay: status,
    }).then((res) => {
      if (res) {
        setIsSwithVisible(false)
        ref.current.reload()
      }
    })
    setLoading(false)
  }

  useEffect(() => {
  }, [])

  const columns: ProColumns<CategoryBaseProps>[] = [
    {
      title: 'Category Name',
      dataIndex: 'displayName',
      width: 400,
      render: (_, record, index) => {
        if (editClickIndex === index && show) {
          return (
            <Input.Group compact>
              <Input style={{ width: '200px' }} defaultValue={record.displayName} onChange={(e) => {
                setName(e.target.value)
              }} />
              <Button icon={<CheckOutlined />} onClick={() => {
                console.log(name)
                updateShopCategory({
                  id: record.id,
                  displayName: name,
                  isDisplay: record.isDisplay ? record.isDisplay : false,
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
          )
        } else if (index === editIndex) {
          return (
            <div className='edit-name'>
              <span className='edit-display-name'>{record.displayName}</span>
              <span style={{ color: '#ee4d2d' }}
                    className='iconfont icon-shop-cate-edit'
                    onClick={() => {
                      setEditClickIndex(index)
                      setEditIndex(index)
                      setShow(true)
                      setName(record.displayName)
                    }}
              />
            </div>
          )
        } else {
          return (
            <span>{record.displayName}</span>
          )
        }
      },
    },
    {
      title: 'Created By',
      dataIndex: 'categoryType',
      render: (_, record) => (
        <div>
          <span>{record.name + ' | '}</span>
          <span> {record.categoryType === 'MANUAL' ? 'Manual Selection' : 'Rule-based Filtering'}</span>
        </div>
      ),
    },
    {
      title: 'Product(s)',
      dataIndex: 'total',
      render: (_, record) => (
        <span>{record.total ? record.total : 0}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isDisplay',
      render: (_, record) => (
        <Tooltip title={record?.total < 1 ? 'This category cannot be activated as it contains no product' : ''}>
          <Switch
            checked={record.isDisplay}
            disabled={record?.total < 1}
            onChange={(checked: boolean) => {
              setStatus(!record.isDisplay)
              setCurAssetId(record.id)
              setIsSwithVisible(true)
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Operation',
      key: 'option',
      width: 180,
      valueType: 'option',
      render: (_, record) => {
        if (!record.total) {
          if (record.categoryType === 'MANUAL') {
            return [
              <Tooltip title='Add Poducts'>
                <a className='mr-4' href='' onClick={(e) => {
                  e.stopPropagation()
                  navigator('/category/category-manual-detail', {
                    state: { id: record.id },
                  })
                }} >
                  <span className='iconfont icon-jiahao' />
                </a>
              </Tooltip>,
              <Tooltip title='Delete'>
                <Link to='' className='mr-4 text-xl' onClick={() => {
                  setIsModalVisible(true)
                  setCurAssetId(record.id)
                }}>
                  <span className='iconfont icon-delete' />
                </Link></Tooltip>,
            ]
          } else {
            return [
              <Tooltip title='Set Filtering Rules'>
                <a className='mr-4' href='' onClick={(e) => {
                  e.stopPropagation()
                  navigator('/category/category-detail', {
                    state: { id: record.id },
                  })
                }} >
                  <span className='iconfont icon-group52' />
                </a></Tooltip>,
              <Tooltip title='Delete'>
                <Link to='' className='mr-4 text-xl' onClick={() => {
                  setIsModalVisible(true)
                  setCurAssetId(record.id)
                }}>
                  <span className='iconfont icon-delete' />
                </Link></Tooltip>,
            ]
          }

        } else {
          if (record.categoryType === 'MANUAL') {
            return [
              <Tooltip title='Details'>
                <a className='mr-4' href='' onClick={(e) => {
                  e.stopPropagation()
                  navigator('/category/category-manual-detail', {
                    state: { id: record.id },
                  })
                }} >
                  <span className='iconfont icon-category-details' />
                </a></Tooltip>,
              <Tooltip title='Delete'>
                <Link to='' className='mr-4 text-xl' onClick={() => {
                  setIsModalVisible(true)
                  setCurAssetId(record.id)
                }}>
                  <span className='iconfont icon-delete mr-4' />
                </Link></Tooltip>,
            ]
          } else {
            return [
              <Tooltip title='Details'>
                <a className='mr-4' href='' onClick={(e) => {
                  e.stopPropagation()
                  navigator('/category/category-detail', {
                    state: { id: record.id },
                  })
                }} >
                  <span className='iconfont icon-category-details' />
                </a></Tooltip>,
              <Tooltip title='Delete'>
                <Link to='' className='mr-4 text-xl' onClick={() => {
                  setIsModalVisible(true)
                  setCurAssetId(record.id)
                }}>
                  <span className='iconfont icon-delete' />
                </Link></Tooltip>,
            ]
          }
        }
      },
    },
  ]
  return (
    <ContentContainer>
      <div className='shop-categories'>
        <div className='bg-white p-6 '>
          <div className='flex justify-between' style={{ marginBottom: '24px' }}>
            <div className='text-xl font-semibold'>My Shop Categories</div>
            <div className='flex'>
              {/*<Button className='flex items-center mr-4 text-red-400 border-red-400' icon={<EyeOutlined />}>*/}
              {/*  Preview*/}
              {/*</Button>*/}
              {/*<Link to='/category/category-list-sort'>*/}
              {/*  <Button className='flex items-center mr-4 text-red-400 border-red-400' icon={<SwapOutlined />}>*/}
              {/*    Adjust Sequence*/}
              {/*  </Button>*/}
              {/*</Link>*/}
              <Button
                className=''
                onClick={() => {
                  handleAddCate(true)
                }}
                type='primary'
              >
                + Add Category
              </Button>
            </div>
          </div>
          {/*<Alert*/}
          {/*  className='my-6 alert'*/}
          {/*  showIcon*/}
          {/*  // icon={<InfoCircleTwoTone />}*/}
          {/*  message='Your edits will be displayed in your Shop Page within 30 minutes'*/}
          {/*  type='info'*/}
          {/*/>*/}
          <ProTable
            className='my-table'
            actionRef={ref}
            search={false}
            columns={columns}
            onRow={(record, index) => {
              return {
                onMouseEnter: event => {
                  setEditIndex(index)
                }, // 鼠标移入行
                onMouseLeave: event => {
                  setEditIndex(undefined)
                },
              }
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

              return Promise.resolve({
                data: tableData?.records || [],
                total: tableData.total,
                success: true,
              })
            }}
            pagination={{
              showTotal: (total: number) => ``,
            }}
          />
        </div>
        <AddCate visible={addVisible} handleVisible={handleAddCate} handleUpdate={handleUpdate} />
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
      </div>
    </ContentContainer>
  )
}

export default ShopCategories
