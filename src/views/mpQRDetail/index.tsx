import ProForm from "@ant-design/pro-form"
import "./index.less"
import ProFormItem from "@/components/common/ProFormItem"
import { useFormItems } from "./modules/constant"
import { mockList } from "../mpQRList/modules/mockdata"
import Mock from "mockjs"
import { ContentContainer, InfoContainer } from "@/components/ui"
const mockData = Mock.mock(mockList).list[0]
const MpQrDetail = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const formItemList = useFormItems()
  return (
    <ContentContainer className="mp-qr-detail">
      <InfoContainer title="Add New QR Code">
        <ProForm
          {...layout}
          className="w-1/2 "
          layout="horizontal"
          onFinish={async (values) => {
            console.info(values)
          }}
          initialValues={mockData}
        >
          {formItemList.map((item, idx) => {
            console.info("item", item)
            return <ProFormItem key={idx} {...item} />
          })}
          {/* <input type="color" name="bgColor" /> */}
        </ProForm>
      </InfoContainer>
    </ContentContainer>
  )
}

export default MpQrDetail
