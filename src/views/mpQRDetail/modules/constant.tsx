import {
  FormItemType,
  IsTransparent,
  LabelOptionProps,
} from "@/framework/types/common"
import { handleValueEnum } from "@/utils/utils"
import { useState } from "react"
import Mock from "mockjs"
import { mockOptionsList } from "../../qrCodeManageList/modules/mockdata"
const mpmock = Mock.mock(mockOptionsList).list
export const useFormItems = () => {
  const [channelTypeList, setChannelTypeList] =
    useState<LabelOptionProps[]>(mpmock)
  const [qrCodeTyep, setQrCodeTyep] = useState<LabelOptionProps[]>(mpmock)
  const [scenario, setScenario] = useState<LabelOptionProps[]>(mpmock)

  const formItems = [
    {
      type: FormItemType.Select,
      name: "channel",
      label: "Channel Type",
      valueEnum: handleValueEnum(channelTypeList),
      placeholder: "Please select",
    },
    {
      type: FormItemType.Select,
      name: "qrCodeTyep",
      label: "QR Code Type",
      valueEnum: handleValueEnum(qrCodeTyep),
      placeholder: "Please select",
    },
    {
      type: FormItemType.Select,
      name: "scenario",
      label: "Scenario type",
      valueEnum: handleValueEnum(scenario),
      placeholder: "Please select",
    },
    {
      type: FormItemType.Input,
      name: "id",
      label: "二维码键值",
      placeholder: "Please input",
    },
    {
      type: FormItemType.Input,
      name: "path",
      label: "Min Program Path",
      placeholder: "Please input",
    },
    {
      type: FormItemType.Input,
      name: "qrCodeSize",
      label: "QR Code Size",
      placeholder: "最小280，最大1280",
    },

    {
      type: FormItemType.Select,
      name: "isTransparent",
      label: "Transparent background",
      valueEnum: IsTransparent,
      placeholder: "Please select",
    },
  ]
  return formItems
}
