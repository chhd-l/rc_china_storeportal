import ProTable from '@/components/common/ProTable'
import { ContentContainer } from '@/components/ui'
import { detailTag, removeConsumerTag, updateTag } from '@/framework/api/tag'
import { handlePageParams } from '@/utils/utils'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { ProColumns } from '@ant-design/pro-table'
import { Avatar, Button, Divider, Input, message, Modal, Spin, Switch, Tooltip } from 'antd'
import { useEffect, useRef, useState } from 'react'
import intl from 'react-intl-universal'
import { useLocation } from 'react-router'
import EditTagsModal from './components/EditTagsModal'
import './index.less'

const EditTags = () => {
  const { state }: any = useLocation()
  const [isSwithVisible, setIsSwithVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [consumerId, setConsumerId] = useState<any>('')
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [manualSelectionVisible, setManualSelectionVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cateInfos, setCateInfos] = useState({
    isEnabled: false,
    name: '',
    total: 0,
  })
  const ref = useRef<any>()
  const confirmDelete = async () => {
    setLoading(true)
    let res = await removeConsumerTag({
      consumerId: consumerId,
      tagId: state.id,
    })
    if (res) {
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      setIsModalVisible(false)
      ref.current.reload()
    }
    setLoading(false)
  }

  const getList = async (page: any) => {
    setLoading(true)
    let res = await detailTag({
      offset: page.offset,
      limit: page.limit,
      withTotal: true,
      sample: {
        tagId: state.id,
      },
    })
    console.log(res)
    if (res?.meta?.length > 0) {
      setCateInfos({
        isEnabled: res?.meta[0].isEnabled,
        name: res?.meta[0].name,
        total: res?.total,
      })
    }
    setLoading(false)
    return res
  }
  const confirmSwitch = async () => {
    setLoading(true)
    updateTag({
      id: state.id,
      isEnabled: status,
    }).then(() => {
      setIsSwithVisible(false)
      setCateInfos({
        ...cateInfos,
        isEnabled: status,
      })
      setLoading(false)
    })
  }

  useEffect(() => {}, [])
  const handleManualVisible = (visible: boolean) => {
    setManualSelectionVisible(visible)
  }
  const handleUpdate = (visible: boolean) => {
    ref.current.reload()
  }
  const columns: ProColumns<any>[] = [
    {
      title: intl.get('tag.Profile Photo'),
      dataIndex: 'image',
      key: 'image',
      render: (text: any, record: any) => (
        <Avatar size="large" icon={<img src={record?.consumer?.avatarUrl} alt="" />} />
      ),
    },
    {
      title: intl.get('tag.WeChat Name'),
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text: any, record: any) => record?.consumer?.nickName || '',
    },
    {
      title: intl.get('tag.Phone Number'),
      dataIndex: 'phone',
      key: 'phone',
      render: (text: any, record: any) => record?.consumer?.phone || '',
    },
    state.type && {
      title: intl.get('tag.Options'),
      key: 'Options',
      render: (text: any, record: any) => (
        <>
          <Tooltip title={intl.get('public.delete')}>
            <span
              className="cursor-pointer ml-2 iconfont icon-delete text-red-500 text-xl"
              onClick={() => {
                setConsumerId(record.consumer.id)
                setIsModalVisible(true)
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ]

  // @ts-ignore
  return (
    <ContentContainer>
      <Spin spinning={loading}>
        <div className="category-detail">
          <div className="bg-white px-6 py-4">
            <div className="flex justify-between">
              <div className="font-bold text-lg">
                {show ? (
                  <div>
                    <Input.Group compact>
                      <Input
                        style={{ width: '200px' }}
                        defaultValue={cateInfos.name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                      <Button
                        icon={<CheckOutlined />}
                        onClick={() => {
                          updateTag({
                            id: state.id,
                            name,
                          }).then((res) => {
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
                  </div>
                ) : (
                  <div className="edit-name flex items-center">
                    <span className="edit-display-name">{cateInfos.name}</span>
                    {state.type && (
                      <span
                        style={{ color: '#ee4d2d' }}
                        className="iconfont icon-shop-cate-edit"
                        onClick={() => {
                          setShow(true)
                          setName(cateInfos.name)
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
              <div>
                <Switch
                  className="ml-3"
                  checked={cateInfos.isEnabled}
                  disabled={!state.type}
                  onChange={(checked: boolean) => {
                    setIsSwithVisible(true)
                    setStatus(checked)
                  }}
                />
              </div>
            </div>
            <Divider />
          </div>
          <div className="bg-white px-6 py-4">
            <div className="flex justify-between">
              <div className="search-title">
                <div className="text-xl list-title">{intl.get('tag.Pet Owner List')}</div>
              </div>
              {state.type && (
                <Button
                  type="primary"
                  onClick={() => {
                    setManualSelectionVisible(true)
                  }}
                >
                  + {intl.get('tag.Add New Pet Owner')}
                </Button>
              )}
            </div>
            <ProTable
              loading={false}
              className="set-delete-box"
              actionRef={ref}
              columns={columns}
              toolBarRender={false}
              pagination={{
                showTotal: (total: number) => ``,
              }}
              search={false}
              request={async (params, sorter, filter) => {
                // ????????????????????? params ?????????????????????????????????
                console.log('test sort', params, sorter, filter)
                let page = handlePageParams({
                  currentPage: params.current,
                  pageSize: params.pageSize,
                })
                let tableData: any = await getList({ ...page, productName: params.productName })
                if (tableData === undefined && page.offset >= 10) {
                  tableData = await getList({
                    offset: page.offset - 10,
                    limit: page.limit,
                    productName: params.productName,
                  })
                }
                console.log(tableData, 99)
                return Promise.resolve({
                  data: tableData?.records || [],
                  total: tableData?.total || 0,
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
            className="rc-modal"
            title={intl.get('public.delete_item')}
            okText={intl.get('public.confirm')}
            visible={isModalVisible}
            onOk={confirmDelete}
            confirmLoading={loading}
            onCancel={() => setIsModalVisible(false)}
          >
            <p>Are you sure you want to delete the item?</p>
          </Modal>
          <Modal
            className="rc-modal"
            title={intl.get('public.notice')}
            okText={intl.get('public.confirm')}
            visible={isSwithVisible}
            onOk={confirmSwitch}
            confirmLoading={loading}
            onCancel={() => setIsSwithVisible(false)}
          >
            <p>
              {status ? 'Are you sure you want to enable the item ?' : 'Are you sure you want to disable the item ?'}
            </p>
          </Modal>
        </div>
      </Spin>
    </ContentContainer>
  )
}

export default EditTags
