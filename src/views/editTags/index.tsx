import './index.less'
import { Button, Switch, Input, Modal,Tooltip,Divider,Avatar,message } from 'antd'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState, useRef } from 'react'
import { ProColumns } from '@ant-design/pro-table'
import { useParams } from 'react-router-dom'
import EditTagsModal from './components/EditTagsModal'
import { updateShopCategory } from '@/framework/api/get-product'
import { ContentContainer } from '@/components/ui'
import { handlePageParams } from '@/utils/utils'
import { detailTag, removeCustomerTag, updateTag } from '@/framework/api/tag'


const EditTags = () => {
  const params = useParams()
  const [customerId, setCustomerId] = useState<any>('')
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [manualSelectionVisible, setManualSelectionVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cateInfos, setCateInfos] = useState({
    isEnabled: false,
    name: '',
    total:0
  })
  const ref = useRef<any>()
  const confirmDelete = async () => {
    const { id } = params
    setLoading(true)
   let res = await removeCustomerTag({
      customerId:customerId,
      tagId: id,
      operator: "zz",
      storeId:"12345678"
    })
    if(res.removeCustomerTag){
      message.success('Operate success')
      setIsModalVisible(false)
      ref.current.reload()
    }
    setLoading(false)
  }

  const getList = async (page: any) => {
    const { id } = params
     let res = await detailTag({
        offset: 0,
        limit: 10,
        isNeedTotal: true,
        sample:{
          tagId:id
        }
      })
    console.log(res)
    if(res?.findTagCustomerPage?.meta?.length>0){
      setCateInfos({
        isEnabled: res?.findTagCustomerPage?.meta[0].isEnabled,
        name: res?.findTagCustomerPage?.meta[0].name,
        total:res?.findTagCustomerPage.total
      })
    }
    return res?.findTagCustomerPage
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
      title: 'Profile Photo',
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => <Avatar size="large" icon={<img src={record?.customer?.avatarUrl} alt='' />} />,
    },
    {
      title: 'WeChat Name',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text: any, record: any) => record?.customer?.nickName||''
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: any, record: any) => record?.customer?.phone||''
    },
    {
      title: 'Options',
      key: 'Options',
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Delete">
            <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl" onClick={() => {
              setCustomerId(record.customer.id)
              setIsModalVisible(true)
            }} />
          </Tooltip>
        </>
      ),
    },
  ]

  // @ts-ignore
  return (
    <ContentContainer>
      <div className='category-detail'>
        <div className='bg-white px-6 py-4'>
          <div className='flex justify-between'>
            <div className='font-bold text-lg'>
              {
                show ? <div>
                    <Input.Group compact>
                      <Input style={{ width: '200px' }} defaultValue={cateInfos.name} onChange={(e) => {
                        setName(e.target.value)
                      }} />
                      <Button icon={<CheckOutlined />} onClick={() => {
                        const { id } = params
                        updateTag({
                          id,
                          name,
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
                  <div className='edit-name flex items-center'>
                    <span className='edit-display-name'>{cateInfos.name}</span>
                    <EditOutlined onClick={() => {
                      setShow(true)
                      setName(cateInfos.name)
                    }} style={{ fontSize: '16px', color: '#ee4d2d' }} />
                  </div>
              }
            </div>
            <div>
              <Tooltip title={!cateInfos?.total?'This category cannot be activated as it contains no product':''}>
              <Switch
                className='ml-3'
                checked={cateInfos.isEnabled}
                disabled={!cateInfos?.total}
                onChange={(checked: boolean) => {
                  const { id } = params
                  updateTag({
                    id,
                    isEnabled: checked,
                  }).then(() => {
                    ref.current.reload()
                  })
                }}
              />
              </Tooltip>
            </div>
          </div>
          <Divider />
        </div>
        <div className='bg-white px-6 py-4'>
          <div className='flex justify-between'>
            <div className='search-title'>
              <div className='text-xl font-semibold list-title'>Pet Owner List</div>
            </div>
            <Button
              type='primary'
              onClick={() => {
                setManualSelectionVisible(true)
              }}
            >
              + Add New Pet Owner
            </Button>
          </div>
          <ProTable
            className='set-delete-box'
            actionRef={ref}
            columns={columns}
            toolBarRender={false}
            pagination={{
              showTotal: (total: number) => ``,
            }}
            search={false}
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
              console.log(tableData, 99)
              return Promise.resolve({
                data: tableData?.records||[],
                total: tableData?.total||0,
                success: true,
              })
            }}
          />
        </div>
        <EditTagsModal
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

export default EditTags
