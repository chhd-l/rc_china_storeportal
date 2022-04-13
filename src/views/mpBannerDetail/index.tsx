import ProForm from "@ant-design/pro-form"
import "./index.less"
import Mock from "mockjs"
import ProFormItem from "@/components/common/ProFormItem"
import { useFormItems } from "./modules/constant"
import { mockList } from "../mpBannerList/modules/mockdata"
const mockData = Mock.mock(mockList).list[0]
console.info("mockData", mockData)
mockData.img = [{ url: mockData.img }] //单独处理图片数据
const MpBannerDetail = () => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  const formItemList = useFormItems()
  return (
    <div className="mp-banner-detail  bg-gray-50 py-14 px-6 text-left">
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
        </ProForm>
      </div>
    </div>
  )
}

export default MpBannerDetail
