import './index.less'
import { Button, Switch, Input, Modal,Tooltip,Divider,Avatar } from 'antd'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'
import ProTable from '@/components/common/ProTable'
import { useEffect, useState, useRef } from 'react'
import { ProColumns } from '@ant-design/pro-table'
import { useParams } from 'react-router-dom'
import EditTagsModal from './components/EditTagsModal'
import { updateShopCategory } from '@/framework/api/get-product'
import { ContentContainer } from '@/components/ui'
import { handlePageParams } from '@/utils/utils'


const EditTags = () => {
  const params = useParams()
  const [curAssetId, setCurAssetId] = useState<any>('')
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
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
  const confirmDelete = async () => {

  }

  const getList = async (page: any) => {
    const { id } = params
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
      render: (text: any, record: any) => <Avatar size="large" icon={<img src={text} alt='' />} />,
    },
    {
      title: 'WeChat Name',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Options',
      key: 'Options',
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Delete">
            <span className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl" onClick={() => {}} />
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
            cardBordered
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
                data: [],
                total: 0,
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
