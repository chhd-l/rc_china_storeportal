import ProTable from "@/components/common/ProTable"
import "./index.less"
import { mockList } from "./modules/mockdata"
import Mock from "mockjs"
import { Button } from "antd"
import { SyncOutlined } from "@ant-design/icons"
import { tableColumns } from "./modules/constant"
import { mockOptionsList } from "../qrCodeManageList/modules/mockdata"
import { ContentContainer } from "@/components/ui"
const TemplateMessage = () => {
  const handleDelete = (id: string) => {
    console.info("handleDelete", id)
  }
  const templateTitleList = Mock.mock(mockOptionsList).list

  const columns = tableColumns({ handleDelete, templateTitleList })
  return (
    <ContentContainer className="template-message">
      <ProTable
        toolBarRender={() => [
          <Button className="mt-8 " type="primary" ghost>
            + Add
          </Button>,
          <SyncOutlined className="mt-6 ml-2 mr-8 text-xl " />,
        ]}
        columns={columns}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log("test sort", params, sorter, filter)
          return Promise.resolve({
            data: Mock.mock(mockList).list,
            success: true,
          })
        }}
      />
    </ContentContainer>
  )
}

export default TemplateMessage
