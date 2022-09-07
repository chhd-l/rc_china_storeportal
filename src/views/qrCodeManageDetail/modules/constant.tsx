import { FormItemType, LabelOptionProps } from '@/framework/types/common'
import { handleValueEnum } from '@/utils/utils'
import { useState } from 'react'
import Mock from 'mockjs'
import { mockOptionsList } from '../../qrCodeManageList/modules/mockdata'
import intl from 'react-intl-universal'

const mpmock = Mock.mock(mockOptionsList).list

export const useFormItems = () => {
  const [mpList] = useState<LabelOptionProps[]>(mpmock)
  const [clickTypeList] = useState<LabelOptionProps[]>(mpmock)

  const formItems = [
    {
      type: FormItemType.Select,
      name: 'officialAccount',
      label: intl.get('qrCode.Mini Program'),
      valueEnum: handleValueEnum(mpList),
      placeholder: 'Please select',
    },
    {
      type: FormItemType.Input,
      name: 'name',
      label: intl.get('qrCode.Banner Name'),
      valueEnum: '',
      placeholder: 'Please input',
    },
    {
      type: FormItemType.Upload,
      name: 'img',
      label: intl.get('qrCode.Pic Location'),
      valueEnum: '',
      placeholder: '',
      action: 'upload.do',
    },
    {
      type: FormItemType.Select,
      name: 'clickType',
      label: intl.get('qrCode.Click Type'),
      valueEnum: handleValueEnum(clickTypeList),
      placeholder: 'Please select',
    },
    {
      type: FormItemType.Select,
      name: 'default',
      label: intl.get('qrCode.Default'),
      valueEnum: 'handleValueEnum(defaultList)',
      placeholder: 'Please select',
    },
    {
      type: FormItemType.Input,
      name: 'path',
      label: intl.get('qrCode.Path'),
      placeholder: 'Please input',
    },
    {
      type: FormItemType.Digit,
      name: 'sort',
      label: intl.get('qrCode.Sort'),
      min: 1,
      fieldProps: { precision: 0 },
      placeholder: '',
    },
  ]
  return formItems
}
