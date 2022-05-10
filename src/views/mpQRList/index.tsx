import ProTable from "@/components/common/ProTable"
import "./index.less"
// import { mockList } from "./modules/mockdata"
// import Mock from "mockjs"
import { Button, Image, Modal } from "antd"
// import { SyncOutlined } from "@ant-design/icons"
// import { tableColumns } from "./modules/constant"
import { ContentContainer } from "@/components/ui"
import { getAppQrCodes, upsertAppQrCodes } from '@/framework/api/wechatSetting'
import { Link } from "react-router-dom"
import IconFont from "@/components/common/IconFont"
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";
import { useRef, useState } from "react"

const MpQrList = () => {
  const navigator = useNavigate();
  const formRef = useRef<any>();
  const [imgUrl, setImgUrl] = useState("")
  const [ID, setID] = useState('')
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

  // const createAppQrCode=async ()=>{
  //   await upsertAppQrCodes({})
  // }
  const columns = [
    {
      title: 'Channel',
      dataIndex: "accountId",
    },
    {
      title: "Scenario",
      dataIndex: "scenarioId",
    },
    {
      title: "QR Code Key Value",
      dataIndex: "type",
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
          <Link to='' onClick={() => {}}>
          <EyeOutlined />
          </Link>
          <Link className="ml-3" to='' onClick={async() => {
            setID(record.id)
            setDeleteModal(true)
          }}>
            <IconFont type='icon-delete' />
          </Link>
          <Link className="ml-3" to='' onClick={() => {
            setImgUrl(record.imgUrl)
            setIsModalVisible(true)
          }}>
            <IconFont type='icon-Frame-1' />
          </Link>
        </div>
      )
    }
  ]

  return (
    <ContentContainer className="mp-qr-list">
      <ProTable
        formRef={formRef}
        columns={columns}
        search= {{
          labelWidth: 136,
          searchText: 'Search'
        }}
        pagination={{
          showQuickJumper: false
        }}
        toolBarRender={() => [
          <Button className="mt-8 text-white" type="primary" ghost onClick={() => {
            navigator('/mpqr/mpqr-detail/add')
          }}>
            + Add
          </Button>,
          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('params',params)
          let res = await getAppQrCodes({
            offset: (params.current - 1) * 10,
            limit: params.pageSize,
            isNeedTotal: true,
            sample: {
              name: params.name,
              accountPrincipal: params.officialAccount,
              type: params.type
            }
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
