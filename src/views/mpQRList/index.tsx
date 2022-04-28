import ProTable from "@/components/common/ProTable"
import "./index.less"
import { mockList } from "./modules/mockdata"
import Mock from "mockjs"
import { Button } from "antd"
import { SyncOutlined } from "@ant-design/icons"
import { tableColumns } from "./modules/constant"
import { ContentContainer } from "@/components/ui"

const MpQrList = () => {
  const handleDelete = (id: string) => {
    console.info("handleDelete", id)
  }
  const columns = tableColumns({ handleDelete })
  return (
    <ContentContainer className="mp-qr-list">
      <ProTable
        toolBarRender={() => [
          <Button className="mt-8 text-white" type="primary" ghost>
            + Add
          </Button>,
          <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, sorter, filter)
          const datas = Mock.mock(mockList).list
          console.info("datas", datas)
          return Promise.resolve({
            data: datas,
            success: true,
          })
        }}
      />
    </ContentContainer>
  )
}

export default MpQrList
