import ProTable from "@/components/common/ProTable"
import "./index.less"
import { mockList } from "./modules/mockdata"
import Mock from "mockjs"
import { Button } from "antd"
import { SyncOutlined } from "@ant-design/icons"
// import { tableColumns } from "./modules/constant"
import { ContentContainer } from "@/components/ui"
import { getAppQrCodes } from '@/framework/api/wechatSetting'
import { Link } from "react-router-dom"
import IconFont from "@/components/common/IconFont"
import { EyeOutlined } from '@ant-design/icons';

const MpQrList = () => {

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
          <Link className="ml-3" to='' onClick={() => {}}>
            <IconFont type='icon-delete' />
          </Link>
          <Link className="ml-3" to='' onClick={() => {}}>
            <IconFont type='icon-Frame-1' />
          </Link>
        </div>
      )
    }
  ]

  return (
    <ContentContainer className="mp-qr-list">
      <ProTable
        columns={columns}
        search= {{
          labelWidth: 136
        }}
        toolBarRender={() => [
          <Button className="mt-8 text-white" type="primary" ghost>
            + Add
          </Button>,
          // <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        request={async async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('params',params)
          let res = await getAppQrCodes({
            offset: params.current - 1,
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
          })
        }}
      />
    </ContentContainer>
  )
}

export default MpQrList
