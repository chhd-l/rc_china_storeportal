import { FormItemType } from "@/framework/types/common"
import {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form"

import "./index.less"
export type ProFormItemProps = {
  type: FormItemType
}
const ProFormItem = ({ type, ...filed }: ProFormItemProps) => {
  return (
    <div className="pro-form-item">
      {(() => {
        switch (type) {
          case FormItemType.Select:
            return <ProFormSelect {...filed} />
          case FormItemType.Digit:
            return <ProFormDigit {...filed} />
          case FormItemType.Input:
            return <ProFormText {...filed} />
          case FormItemType.Upload:
            return <ProFormUploadButton {...filed} />
          default:
            return null
        }
      })()}
    </div>
  )
}

export default ProFormItem
