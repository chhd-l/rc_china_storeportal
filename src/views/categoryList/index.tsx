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
import intl from 'react-intl-universal'

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
      withTotal: true,
      sample: {},
    })
  }

  const confirmDelete = async () => {
    setLoading(true)
    updateShopCategory({
      id: curAssetId,
      isDeleted: true,
    }).then(res => {
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
    }).then(res => {
      if (res) {
        setIsSwithVisible(false)
        ref.current.reload()
      }
    })
    setLoading(false)
  }

  useEffect(() => {}, [])

  const columns: ProColumns<CategoryBaseProps>[] = [
    {
      title: intl.get('product.category_name'),
      dataIndex: 'displayName',
      width: 300,
      render: (_, record, index) => {
        if (editClickIndex === index && show) {
          return (
            <Input.Group compact>
              <Input
                style={{ width: '200px' }}
                defaultValue={record.displayName}
                onChange={e => {
                  setName(e.target.value)
                }}
              />
              <Button
                icon={<CheckOutlined />}
                onClick={() => {
                  console.log(name)
                  updateShopCategory({
                    id: record.id,
                    displayName: name,
                    isDisplay: record.isDisplay ? record.isDisplay : false,
                  }).then(res => {
                    if (res) {
                      setShow(false)
                      ref.current.reload()
                    }
                  })
                }}
              />
              <Button
                icon={<CloseOutlined />}
                onClick={() => {
                  setName('')
                  setShow(false)
                }}
              />
            </Input.Group>
          )
        } else if (index === editIndex) {
          return (
            <div className='edit-name'>
              <span className='edit-display-name'>{record.displayName}</span>
              <span
                style={{ color: '#ee4d2d' }}
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
          return <span>{record.displayName}</span>
        }
      },
    },
    {
      title: intl.get('product.create_by'),
      dataIndex: 'categoryType',
      width: 300,
      render: (_, record) => (
        <div>
          <span>{record.name + ' | '}</span>
          <span> {record.categoryType === 'MANUAL' ? 'Manual Selection' : 'Rule-based Filtering'}</span>
        </div>
      ),
    },
    {
      title: intl.get('product.products'),
      dataIndex: 'total',
      render: (_, record) => <span>{record.total ? record.total : 0}</span>,
    },
    {
      title: intl.get('public.status'),
      dataIndex: 'isDisplay',
      render: (_, record) => (
        <Tooltip title={record?.total < 1 ? intl.get('category_cannot_active') : ''}>
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
      title: intl.get('public.action'),
      key: 'option',
      width: 180,
      valueType: 'option',
      render: (_, record) => {
        if (!record.total) {
          if (record.categoryType === 'MANUAL') {
            return [
              <Tooltip title={intl.get('product.add_products')}>
                <Link
                  to='/category/category-manual-detail'
                  state={{ id: record.id }}
                  className='mr-2 iconfont icon-jiahao text-xl'
                />
              </Tooltip>,
              <Tooltip title={intl.get('public.delete')}>
                <span
                  className='mr-2 text-xl iconfont icon-delete cursor-pointer primary-color'
                  onClick={() => {
                    setIsModalVisible(true)
                    setCurAssetId(record.id)
                  }}
                />
              </Tooltip>,
            ]
          } else {
            return [
              <Tooltip title={intl.get('set_filter_rule')}>
                <Link
                  className='mr-2 iconfont icon-group52 text-xl'
                  to='/category/category-detail'
                  state={{ id: record.id }}
                />
              </Tooltip>,
              <Tooltip title={intl.get('public.delete')}>
                <span
                  className='mr-2 text-xl iconfont icon-delete cursor-pointer primary-color'
                  onClick={() => {
                    setIsModalVisible(true)
                    setCurAssetId(record.id)
                  }}
                />
              </Tooltip>,
            ]
          }
        } else {
          if (record.categoryType === 'MANUAL') {
            return [
              <Tooltip title={intl.get('product.details')}>
                <Link
                  to='/category/category-manual-detail'
                  state={{ id: record.id }}
                  className='mr-2 iconfont icon-category-details text-xl'
                />
              </Tooltip>,
              <Tooltip title={intl.get('public.delete')}>
                <span
                  className='mr-2 text-xl iconfont icon-delete cursor-pointer primary-color'
                  onClick={() => {
                    setIsModalVisible(true)
                    setCurAssetId(record.id)
                  }}
                />
              </Tooltip>,
            ]
          } else {
            return [
              <Tooltip title={intl.get('product.details')}>
                <Link
                  to='/category/category-detail'
                  state={{ id: record.id }}
                  className='mr-2 iconfont icon-category-details text-xl'
                  onClick={e => {
                    e.stopPropagation()
                    navigator('/category/category-detail', {
                      state: { id: record.id },
                    })
                  }}
                />
              </Tooltip>,
              <Tooltip title={intl.get('public.delete')}>
                <span
                  className='mr-2 text-xl iconfont icon-delete cursor-pointer primary-color'
                  onClick={() => {
                    setIsModalVisible(true)
                    setCurAssetId(record.id)
                  }}
                />
              </Tooltip>,
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
            <div className='text-xl font-semibold'>{intl.get('product.my_shop_category')}</div>
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
                + {intl.get('product.add_category')}
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
                }, // ???????????????
                onMouseLeave: event => {
                  setEditIndex(undefined)
                },
              }
            }}
            request={async (params, sorter, filter) => {
              // ????????????????????? params ?????????????????????????????????
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
          title={intl.get('public.delete_item')}
          okText={intl.get('public.confirm')}
          cancelText={intl.get('public.cancel')}
          visible={isModalVisible}
          onOk={confirmDelete}
          confirmLoading={loading}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>{intl.get('public.are_you_sure_delete')}</p>
        </Modal>
        <Modal
          className='rc-modal'
          title={intl.get('public.notice')}
          okText={intl.get('public.confirm')}
          cancelText={intl.get('public.cancel')}
          visible={isSwithVisible}
          onOk={confirmSwitch}
          confirmLoading={loading}
          onCancel={() => setIsSwithVisible(false)}
        >
          <p>{intl.get(status ? 'public.are_you_sure_enable' : 'public.are_you_sure_disable')}</p>
        </Modal>
      </div>
    </ContentContainer>
  )
}

export default ShopCategories
