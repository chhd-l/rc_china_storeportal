import ProTable from '@/components/common/ProTable'
import './index.less'
// import { mockList } from "./modules/mockdata"
// import Mock from "mockjs"
import { Button, Image, Modal, Tooltip } from 'antd'
// import { SyncOutlined } from "@ant-design/icons"
// import { tableColumns } from "./modules/constant"
import { ContentContainer } from '@/components/ui'
import { getAccountList, getAppQrCodes, upsertAppQrCodes } from '@/framework/api/wechatSetting'
import { ProColumns } from '@ant-design/pro-table'
import { Link } from 'react-router-dom'
import { EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { useRef, useState } from 'react'
import intl from 'react-intl-universal'

const MpQrList = () => {
  const navigator = useNavigate()
  const formRef = useRef<any>()
  const [imgUrl, setImgUrl] = useState('')
  const [ID, setID] = useState('')
  const [list, setList] = useState<any>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [DeleteModal, setDeleteModal] = useState(false)

  const handleCancel = () => {
    setImgUrl('')
    setIsModalVisible(false)
    setDeleteModal(false)
  }

  const handleOk = async (id: string) => {
    const items = {
      id: id,
      isDeleted: true,
    }
    await upsertAppQrCodes(items)
    formRef?.current!.submit()
    setDeleteModal(false)
  }

  const depy = (arr: any[]) => {
    if (!arr.length) return
    const lists: any = {}
    arr.forEach(item => {
      if (item.type === 'WxMiniProgram' || item.type === 'AliMiniProgram') {
        lists[item.id] = { text: item.name, status: 'Success' }
      }
    })
    setList(lists)
  }

  const columns: ProColumns[] = [
    {
      title: intl.get('wx.mini_program'),
      dataIndex: 'accountName',
      valueType: 'select',
      valueEnum: list,
    },
    {
      title: intl.get('wx.qr_code_type'),
      dataIndex: 'qrType',
      valueType: 'select',
      valueEnum: {
        QR_CODE: 'Normal',
        SUN_CODE: 'Sun Code',
      },
    },
    {
      title: intl.get('wx.mini_program_path'),
      dataIndex: 'appInternalPath',
      hideInSearch: true,
    },
    {
      title: intl.get('public.action'),
      hideInSearch: true,
      render: (text: any, record: any) => (
        <div className='flex items-center'>
          <Tooltip title={intl.get('public.view_details')}>
            <span
              className='text-red-400 cursor-pointer'
              onClick={() => {
                console.log('11111', 11111)
                navigator(`/mpqr/mpqr-detail`, { state: record })
              }}
            >
              <EyeOutlined />
            </span>
          </Tooltip>
          <Tooltip title={intl.get('public.delete')}>
            <Link
              className='ml-3'
              to=''
              onClick={async () => {
                setID(record.id)
                setDeleteModal(true)
              }}
            >
              <span className='iconfont icon-delete' />
            </Link>
          </Tooltip>
          <Tooltip title={intl.get('wx.view_qr_code')}>
            <Link
              className='ml-3'
              to=''
              onClick={() => {
                setImgUrl(record.imgUrl)
                setIsModalVisible(true)
              }}
            >
              <span className='iconfont icon-Frame-1' />
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ]

  return (
    <ContentContainer className='mp-qr-list'>
      <ProTable
        formRef={formRef}
        columns={columns}
        search={{
          labelWidth: 'auto',
          searchText: intl.get('public.search'),
          optionRender: (searchConfig, formProps, dom) => {
            return dom
              .map((item: any) => {
                return <Button {...item.props} loading={false} />
              })
              .reverse()
          },
        }}
        pagination={{
          showQuickJumper: false,
        }}
        toolBarRender={() => [
          <Button
            className='mt-8 text-white'
            type='primary'
            ghost
            onClick={() => {
              navigator('/mpqr/mpqr-add')
            }}
          >
            + {intl.get('public.add')}
          </Button>,
          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        request={async params => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          let val = await getAccountList({
            limit: 100,
            offset: 0,
            sample: { storeId: '12345678' },
          })
          depy(val?.records || [])
          const param: any = {}
          if (params.accountName) param.accountId = params.accountName
          if (params.qrType) param.qrType = params.qrType
          //if(params.key) param.key = params.key
          let res = await getAppQrCodes({
            offset: (params.current - 1) * 10,
            limit: params.pageSize,
            withTotal: true,
            sample: param,
          })
          // const datas = Mock.mock(mockList).list
          return Promise.resolve({
            data: res.records,
            success: true,
            total: res.total,
          })
        }}
      />
      {imgUrl ? (
        <Modal visible={isModalVisible} closable={false} onCancel={handleCancel} footer={null}>
          <Image src={imgUrl} width='100%' height='100%' preview={false} />
        </Modal>
      ) : null}
      <Modal
        className='acconutModal'
        title={intl.get('public.delete_item')}
        visible={DeleteModal}
        onOk={() => handleOk(ID)}
        onCancel={handleCancel}
        okText={intl.get('public.confirm')}
        cancelText={intl.get('public.cancel')}
        // mask={false}
      >
        <div>{intl.get('public.are_you_sure_delete')}</div>
      </Modal>
    </ContentContainer>
  )
}

export default MpQrList
