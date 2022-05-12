import { Alert, Button, Input, Modal, Switch } from 'antd'
import { Link } from 'react-router-dom'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import './index.less'
import AddCate from './components/AddCate'
import ProTable, { ProColumns } from '@/components/common/ProTable'
import { useEffect, useRef, useState } from 'react'
import { CategoryBaseProps } from '@/framework/types/product'
import { getShopCategories, updateShopCategory } from '@/framework/api/get-product'
import IconFont from '@/components/common/IconFont'
import { handlePageParams } from '@/utils/utils'
// import 'antd/dist/antd.css';
const ShopCategories = () => {
  const [addVisible, setAddvisible] = useState(false)
  const [editIndex, setEditIndex] = useState<number | undefined>()
  const [editClickIndex, setEditClickIndex] = useState<number | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [curAssetId, setCurAssetId] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [show, setShow] = useState(false)
  const ref = useRef<any>()
  const handleAddCate = (visible: boolean) => {
    setAddvisible(visible)
  }
  const handleUpdate = (visible: boolean) => {
    ref.current.reload()
  }
  const onRow = () => {
    console.log(1)
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
      render: (_, record, index) => {
        if (editClickIndex===index && show) {
          return (
            <Input.Group compact>
              <Input style={{ width: '200px' }} defaultValue={record.displayName} onChange={(e) => {
                setName(e.target.value)
              }} />
              <Button icon={<CheckOutlined />} onClick={() => {
                console.log(name)
                updateShopCategory({
                  ...record,
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
              <EditOutlined onClick={() => {
                setEditClickIndex(index)
                setEditIndex(index)
                setShow(true)
                setName(record.displayName)
              }} style={{ fontSize: '16px', color: '#ee4d2d' }} />
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
          checked={record.isDisplay}
          disabled={record.productNum < 1}
          onChange={(checked: boolean) => {
            updateShopCategory({
              ...record,
              isDisplay: checked,
            }).then(() => {
              ref.current.reload()
            })
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
        if (!record.productNum) {
          if (record.categoryType === 'MANUAL') {
            return [
              <Link to={`/category/category-manual-detail/${record.id}`} className='mr-4 text-xl'>
                <IconFont type='icon-jiahao' />
              </Link>,
              <Link to='' className='mr-4 text-xl' onClick={() => {
                setIsModalVisible(true)
                setCurAssetId(record.id)
              }}>
                <IconFont type='icon-delete' />
              </Link>,
            ]
          } else {
            return [
              <Link to={`/category/category-manual-detail/${record.id}`} className='mr-4 text-xl'>
                <IconFont type='icon-group52' />
              </Link>,
              <Link to='' className='mr-4 text-xl' onClick={() => {

                setIsModalVisible(true)
                setCurAssetId(record.id)
              }}>
                <IconFont type='icon-delete' />
              </Link>,
            ]
          }

        } else {
          return [
            <Link to={`/category/category-detail/${record.id}`} className='mr-4 text-xl'>
              <IconFont type='icon-group52' />
            </Link>,
            <Link to='' className='mr-4 text-xl' onClick={() => {
              setIsModalVisible(true)
              setCurAssetId(record.id)
            }}>
              <IconFont type='icon-delete' />
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
            {/*<Button className='flex items-center mr-4 text-red-400 border-red-400' icon={<EyeOutlined />}>*/}
            {/*  Preview*/}
            {/*</Button>*/}
            {/*<Link to='/category/category-list-sort'>*/}
            {/*  <Button className='flex items-center mr-4 text-red-400 border-red-400' icon={<SwapOutlined />}>*/}
            {/*    Adjust Sequence*/}
            {/*  </Button>*/}
            {/*</Link>*/}
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
    </div>
  )
}

export default ShopCategories
