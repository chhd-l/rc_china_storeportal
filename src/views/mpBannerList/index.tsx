import ProTable from '@/components/common/ProTable'
import './index.less'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { useState, useRef, useEffect } from 'react'
import { tableColumns } from './modules/constant'
import { ContentContainer } from '@/components/ui'
import { bannerDeleteById, bannerUpdate, getBannerFindPage } from '@/framework/api/banner'
import { handlePageParams } from '@/utils/utils'
import { useNavigate } from 'react-router-dom'
import { getAccountList } from '@/framework/api/wechatSetting'

const MpBannerList = () => {
  const ref = useRef<any>()
  const navigator = useNavigate()
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [list, setList] = useState<any>([])
  const [curAssetId, setCurAssetId] = useState('')
  const [isSwithVisible, setIsSwithVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const handlePreview = (img: string) => {
    setPreviewImage(img)
  }
  const changeStatus = (checked: boolean, id: string) => {
    console.log(checked, id)
    setStatus(checked)
    setCurAssetId(id)
    setIsSwithVisible(true)
  }
  const handleDelete = (id: string) => {
    setCurAssetId(id)
    setIsModalVisible(true)
  }
  const confirmDelete = async () => {
    setLoading(true)
    bannerDeleteById(curAssetId).then(res => {
      if (res) {
        setIsModalVisible(false)
        ref.current.reload()
      }
    })
    setLoading(false)
  }
  const confirmSwitch = async () => {
    setLoading(true)
    bannerUpdate({
      id: curAssetId,
      isActive: status,
    }).then(res => {
      if (res) {
        setIsSwithVisible(false)
        ref.current.reload()
      }
    })
    setLoading(false)
  }

  const getList = async (params: any) => {
    let res = await getBannerFindPage(params)
    console.log(res)
    return res?.bannerFindPage
  }
  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: '12345678' },
    })
    depy(res?.records || [])
  }
  const depy = (arr: any[]) => {
    if (!arr.length) return
    const lists: any[] = []
    arr.forEach(item => {
      if ((item.type === 'WxMiniProgram' || item.type === 'AliMiniProgram') && item.isActive)
        lists.push({
          label: item.name,
          value: item.id,
        })
    })
    console.log(lists)
    setList(lists)
  }

  useEffect(() => {
    getAccountName()
  }, [])

  const columns = tableColumns({
    handlePreview,
    changeStatus,
    handleDelete,
    navigator,
    list,
  })
  return (
    <ContentContainer className='mp-banner-list'>
      <ProTable
        actionRef={ref}
        toolBarRender={() => [
          <Link to={`/mpbanner/mpbanner-add`} className='mr-4'>
            <Button className='mt-8 text-white' type='primary' ghost>
              + Add
            </Button>
          </Link>,

          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        search={{
          labelWidth: 'auto',
          searchText: 'Search',
          optionRender: (searchConfig, formProps, dom) => {
            return dom
              .map((item: any) => {
                return <Button {...item.props} loading={false} />
              })
              .reverse()
          },
        }}
        columns={columns}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('test sort', params, sorter, filter)
          let page = handlePageParams({
            currentPage: params.current,
            pageSize: params.pageSize,
          })
          let data: any = {
            ...page,
            withTotal: true,
            sample: {},
            where: {},
          }
          if (params.name) {
            data.where.nameFuzzy = params.name
          }
          if (params.clickType) {
            data.sample.clickType = params.clickType
          }
          if (params.accountName) {
            data.where.accountNameFuzzy = list.find((item: { value: any }) => item.value === params.accountName).label
          }
          if (params.isActive) {
            data.sample.isActive = params.isActive === 'true'
          }
          let tableData = await getList(data)
          if (tableData === undefined && page.offset >= 10) {
            tableData = await getList({
              ...data,
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
      <Modal
        visible={!!previewImage}
        // title={previewTitle}
        footer={null}
        onCancel={() => {
          setPreviewImage('')
        }}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
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
    </ContentContainer>
  )
}

export default MpBannerList
