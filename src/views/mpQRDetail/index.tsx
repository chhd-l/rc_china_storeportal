import ProForm from "@ant-design/pro-form"
import "./index.less"
import ProFormItem from "@/components/common/ProFormItem"
import { useFormItems } from "./modules/constant"
import { mockList } from "../mpQRList/modules/mockdata"
import Mock from "mockjs"
const mockData = Mock.mock(mockList).list[0]
const MpQrDetail = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }
  const formItemList = useFormItems()
  return (
    <div className="mp-qr-detail bg-gray-50 py-14 px-6 text-left">
      <div className="bg-white p-4">
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
      </div>
    </div>
  )
}

export default MpQrDetail
