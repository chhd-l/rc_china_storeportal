import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { message } from 'antd'
import { FC, useState } from 'react'
import './index.less'
export type Props = {
  visible: boolean
  handleVisible: (visible: boolean) => void
}
const AddTemplate: FC<Props> = ({ visible, handleVisible }) => {
  const getFormData = (data: any) => {
    console.info(data, 'data')
  }

  return (
    <ModalForm
      className='add-template'
      title='Select Products'
      visible={visible}
      onFinish={async value => {
        console.info('value', value)
        message.success('提交成功')
        return true
      }}
      onVisibleChange={handleVisible}
    >
      <ProForm.Group>
        <ProFormSelect
          width='md'
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          name='useMode'
          label='Select Scenario'
        />
        <ProFormSelect
          width='md'
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          name='useMode'
          label='Select Scenario'
        />
      </ProForm.Group>
    </ModalForm>
  )
}

export default AddTemplate
