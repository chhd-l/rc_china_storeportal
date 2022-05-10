import ProTable from "@/components/common/ProTable"
import "./index.less"
// import { mockList, mockOptionsList } from "./modules/mockdata"
// import Mock from "mockjs"
import { Button, Modal, Image } from "antd"
import { useState } from 'react'
import { ContentContainer } from "@/components/ui"
import { Link } from "react-router-dom"
import { getAccountList, getQrCodes } from '@/framework/api/wechatSetting'
import type { ProColumns } from "@ant-design/pro-table";
import IconFont from "@/components/common/IconFont"
// import { tableColumns } from "./modules/constant"

const typeValueEnum = {
  QR_SCENE : 'QR_SCENE',
  QR_STR_SCENE : 'QR_STR_SCENE',
  QR_LIMIT_SCENE : 'QR_LIMIT_SCENE',
  QR_LIMIT_STR_SCENE : 'QR_LIMIT_STR_SCENE'
};


type ColumnType ={
  officialAccount:string,
  type:string;
  expiredTime:string;
}

const QrCodeManage = () => {
  const [imgUrl, setImgUrl] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [list, setList] = useState<any>({})

  // const QRcodeTypeList = Mock.mock(mockOptionsList).list
  // const handlePreview = (img: string) => {
  //   setPreviewImage(img)
  //   console.log('img',img)
  // }

  const depy = (arr: any[]) => {
    if(!arr.length) return
    const lists: string[] = []
    arr.forEach((item) => {
      if(lists.indexOf(item.accountName) === -1 && item.accountType === 'MINi_PROGRAM')
      lists.push(item.accountName)
    })
    const val: any = {}
    lists.forEach((item: string) => {
      val[item] = item
    })
    setList(val)
  }

  const handleCancel = () => {
    setImgUrl('')
    setIsModalVisible(false)
  }

  // const columns = tableColumns({ handlePreview, QRcodeTypeList })

  const columns: ProColumns<ColumnType>[] = [
    {
      title: 'Official Account',
      dataIndex: "officialAccount",
      valueType: "select",
      valueEnum: list,
    },
    {
      title: "QR Code Name",
      dataIndex: "name",
    },
    {
      title: "QR Code Type",
      dataIndex: "type",
      valueType: "select",
      valueEnum: typeValueEnum,
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
          <Link to="/QrcodeManage/qrcode-manage-detail/add">
            <Button className="mt-8 text-white" type="primary" ghost>
              + Add
            </Button>
          </Link>,
          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          let res2 = await getAccountList({
            limit: 100,
            offset: 0,
            sample: {storeId: "12345678"},
          })
          console.log('res2',res2)
          depy(res2?.records || [])
          let res = await getQrCodes({
            offset: (params.current - 1) * 10,
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
