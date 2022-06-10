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
import moment from "moment"
// import { tableColumns } from "./modules/constant"

const typeValueEnum = {
  QR_SCENE : 'Temporary integer parameter',
  QR_STR_SCENE : 'Temporary string parameter',
  QR_LIMIT_SCENE : 'Permanent integer parameter',
  QR_LIMIT_STR_SCENE : 'Permanent string parameter'
};

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
      if(lists.indexOf(item.accountName) === -1 && item.accountType === 'ServiceAccount')
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

  const columns: ProColumns[] = [
    {
      title: 'Wechat Account',
      dataIndex: "accountName",
      valueType: "select",
      fieldProps: {style: {width: '80%'}},
      valueEnum: list,
    },
    {
      title: "QR Code Name",
      dataIndex: "name",
      fieldProps: {style: {width: '80%'}},
    },
    {
      title: "QR Code Type",
      dataIndex: "type",
      valueType: "select",
      fieldProps: {style: {width: '80%'}},
      valueEnum: typeValueEnum,
    },
    {
      title: "Expired Time",
      dataIndex: "expiredTime",
      hideInSearch: true,
      render: (text: any) => text === '-' || !text ? '-' : moment(text).format('YYYY-MM-DD')
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
          <span className='iconfont icon-Frame-1' />
        </Link>
      )
    }
  ]

  return (
    <ContentContainer className="qr-code-manage">
      <ProTable
        columns={columns}
        search= {{
          labelWidth: 'auto',
          searchText: 'Search',
          span: 8,
          optionRender: (searchConfig,formProps,dom) => {
            return dom.map((item: any) => {
              return (
                <Button {...item.props} loading={false} />
              )
            }).reverse()
          }
        }}
        rowKey='id'
        toolBarRender={() => [
          <Link to="/QrcodeManage/qrcode-manage-add">
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
          depy(res2?.records || [])
          const item: any = {
            offset: (params.current - 1) * 10,
            limit: params.pageSize,
            accountId: "000001",
          }
          const param: any = {}
          if(params.name) param.name = params.name
          if(params.accountName) param.accountName = params.accountName
          if(params.type) param.type = params.type
          if(JSON.stringify(param) !== '{}') {
            item.sample = param
          }
          let res = await getQrCodes(item)
          return Promise.resolve({
            data: res.records,
            success: true,
            total: res.total
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
