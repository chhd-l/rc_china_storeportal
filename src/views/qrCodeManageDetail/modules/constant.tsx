import { FormItemType, LabelOptionProps } from "@/framework/types/common"
import { handleValueEnum } from "@/utils/utils"
import { useState } from "react"
import Mock from "mockjs"
import { mockOptionsList } from "../../qrCodeManageList/modules/mockdata"
const mpmock = Mock.mock(mockOptionsList).list
export const useFormItems = () => {
  const [mpList, setMpList] = useState<LabelOptionProps[]>(mpmock)
  const [defaultList, setDefaultList] = useState<LabelOptionProps[]>(mpmock)
  const [clickTypeList, setClickTypeList] = useState<LabelOptionProps[]>(mpmock)

  const formItems = [
    {
      type: FormItemType.Select,
      name: "officialAccount",
      label: "Mini Program",
      valueEnum: handleValueEnum(mpList),
      placeholder: "Please select",
    },
    {
      type: FormItemType.Input,
      name: "name",
      label: "Banner Name",
      valueEnum: "",
      placeholder: "Please input",
    },
    {
      type: FormItemType.Upload,
      name: "img",
      label: "Pic Location",
      valueEnum: "",
      placeholder: "",
      action: "upload.do",
    },
    {
      type: FormItemType.Select,
      name: "clickType",
      label: "Click Type",
      valueEnum: handleValueEnum(clickTypeList),
      placeholder: "Please select",
    },
    {
      type: FormItemType.Select,
      name: "default",
      label: "Default",
      valueEnum: "handleValueEnum(defaultList)",
      placeholder: "Please select",
    },
    {
      type: FormItemType.Input,
      name: "path",
      label: "Path",
      placeholder: "Please input",
    },
    {
      type: FormItemType.Digit,
      name: "sort",
      label: "Sort",
      min: 1,
      fieldProps: { precision: 0 },
      placeholder: "",
    },
  ]
  return formItems
}
