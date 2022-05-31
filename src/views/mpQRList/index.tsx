import ProTable from "@/components/common/ProTable"
import "./index.less"
// import { mockList } from "./modules/mockdata"
// import Mock from "mockjs"
import { Button, Image, Modal, Tooltip } from "antd"
// import { SyncOutlined } from "@ant-design/icons"
// import { tableColumns } from "./modules/constant"
import { ContentContainer } from "@/components/ui"
import { getAccountList, getAppQrCodes, upsertAppQrCodes } from '@/framework/api/wechatSetting'
import type { ProColumns } from "@ant-design/pro-table";
import { Link } from "react-router-dom"
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { useRef, useState } from "react"

const MpQrList = () => {
  const navigator = useNavigate();
  const formRef = useRef<any>();
  const [imgUrl, setImgUrl] = useState("")
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
      operator: 'zz'
    }
    await upsertAppQrCodes(items)
    formRef?.current!.submit()
    setDeleteModal(false)
  }

  const depy = (arr: any[]) => {
    if(!arr.length) return
    const lists: any = {}
    arr.forEach((item) => {
      if(item.accountType === 'MiniProgram') {
        lists[item.id] = { text: item.accountName, status: "Success"}
      }
    })
    setList(lists)
  }

  const columns: ProColumns[] = [
    {
      title: 'Mini Program',
      dataIndex: "accountName",
      valueType: "select",
      valueEnum: list,
    },
    {
      title: "Scenario",
      dataIndex: "scenarioId",
      valueType: "select",
      valueEnum: {
        Normal: 'Normal'
      },
    },
    {
      title: "QR Code Key Value",
      dataIndex: "key",
    },
    {
      title: "Mini Program Path",
      dataIndex: "appInternalPath",
      hideInSearch: true,
    },
    {
      title: "Action",
      hideInSearch: true,
      render: (text: any, record: any) => (
        <div className="flex items-center">
          <Tooltip title='View Details'>
            <span className="text-red-400 cursor-pointer" onClick={() => {
              console.log('11111', 11111)
              navigator(`/mpqr/mpqr-detail`, { state: record })
            }}>
              <EyeOutlined />
            </span>
          </Tooltip>
          <Tooltip title='Delete'>
            <Link className="ml-3" to='' onClick={async () => {
              setID(record.id)
              setDeleteModal(true)
            }}>
              <span className='iconfont icon-delete' />
            </Link>
          </Tooltip>
          <Tooltip title='View QR Code'>
            <Link className="ml-3" to='' onClick={() => {
              setImgUrl(record.imgUrl)
              setIsModalVisible(true)
            }}>
              <span className='iconfont icon-Frame-1' />
            </Link>
          </Tooltip>
        </div>
      )
    }
  ]

  return (
    <ContentContainer className="mp-qr-list">
      <ProTable
        formRef={formRef}
        columns={columns}
        search={{
          labelWidth: 'auto',
          searchText: 'Search',
          optionRender: (searchConfig,formProps,dom) => {
            return dom.map((item: any) => {
              return (
                <Button {...item.props} loading={false} />
              )
            })
          }
        }}
        pagination={{
          showQuickJumper: false
        }}
        toolBarRender={() => [
          <Button className="mt-8 text-white" type="primary" ghost onClick={() => {
            navigator('/mpqr/mpqr-add')
          }}>
            + Add
          </Button>,
          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          let val = await getAccountList({
            limit: 100,
            offset: 0,
            sample: {storeId: "12345678"},
          })
          depy(val?.records || [])
          const param: any = {}
          if(params.accountPrincipal) param.accountId = params.accountPrincipal
          if(params.scenarioId) param.scenarioId = params.scenarioId
          if(params.key) param.key = params.key
          let res = await getAppQrCodes({
            offset: (params.current - 1) * 10,
            limit: params.pageSize,
            isNeedTotal: true,
            sample: param
          })
          // const datas = Mock.mock(mockList).list
          return Promise.resolve({
            data: res.records,
            success: true,
            total: res.total,
          })
        }}
      />
      {
        imgUrl ? (
          <Modal
            visible={isModalVisible}
            closable={false}
            onCancel={handleCancel}
            footer={null}
          >
            <Image
              src={imgUrl}
              width='100%'
              height='100%'
              preview={false}
            />
          </Modal>
        ) : null
      }
      <Modal
        className="acconutModal"
        title='Delete Item'
        visible={DeleteModal}
        onOk={() => handleOk(ID)}
        onCancel={handleCancel}
        okText='Confirm'
      // mask={false}
      >
        <div>Are you sure you want to delete the item ?</div>
      </Modal>
    </ContentContainer>
  )
}

export default MpQrList
