import ProTable from "@/components/common/ProTable"
import "./index.less"
// import { mockList, mockOptionsList } from "./modules/mockdata"
// import Mock from "mockjs"
import { Button, Modal, Image } from "antd"
import { SyncOutlined } from "@ant-design/icons"
import { useState } from 'react'
import { ContentContainer } from "@/components/ui"
import { Link } from "react-router-dom"
import { getQrCodes } from '@/framework/api/wechatSetting'
import IconFont from "@/components/common/IconFont"
// import { tableColumns } from "./modules/constant"

const QrCodeManage = () => {
  const [imgUrl, setImgUrl] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)

  // const QRcodeTypeList = Mock.mock(mockOptionsList).list
  // const handlePreview = (img: string) => {
  //   setPreviewImage(img)
  //   console.log('img',img)
  // }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // const columns = tableColumns({ handlePreview, QRcodeTypeList })

  const columns = [
    {
      title: 'Official Account',
      dataIndex: "officialAccount",
    },
    {
      title: "QR Code Name",
      dataIndex: "name",
    },
    {
      title: "QR Code Type",
      dataIndex: "type",
    },
    {
      title: "Expired Time",
      dataIndex: "expiredTime",
      hideInSearch: true,
    },
    {
      title: "Action",
      hideInSearch: true,
      render: (text: any, record: any) => (
        <Link to='' onClick={() => {
        console.log(' record.ticket', record.ticket)
          setImgUrl(record.ticket)
          setIsModalVisible(true)
          }}>
          <IconFont type='icon-Frame-1' />
        </Link>
      )
    }
  ]

  return (
    <ContentContainer className="qr-code-manage">
      <ProTable
        columns={columns}
        search= {{
          labelWidth: 136
        }}
        rowKey='id'
        toolBarRender={() => [
          <Link to="/qrcode-manage/add">
            <Button className="mt-8 text-white" type="primary" ghost>
              + Add
            </Button>
          </Link>,
          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, columns)
          let res = await getQrCodes({
            offset: params.current - 1,
            limit: params.pageSize,
            accountId: "000001",
            sample: {
              name: params.name,
              accountPrincipal: params.officialAccount,
              type: params.type
            }
          })
          return Promise.resolve({
            data: res.records,
            success: true,
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
              src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${imgUrl}`}
              width='100%'
              height='100%'
              preview={false}
            />
          </Modal>
        ) : null
      }
    </ContentContainer>
  )
}

export default QrCodeManage
