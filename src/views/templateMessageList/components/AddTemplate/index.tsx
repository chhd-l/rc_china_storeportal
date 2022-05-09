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
          name='addr'
          width='md'
          fieldProps={{ showSearch: true }}
          label='Select Template'
          // dependencies 的内容会注入 request 中
          dependencies={['name']}
          request={async params => {
            console.info('params', params)
            return [
              { label: params.name, value: 'all' },
              { label: 'Unresolved', value: 'open' },
              { label: 'Resolved', value: 'closed' },
              { label: 'Resolving', value: 'processing' },
            ]
          }}
        />
      </ProForm.Group>
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
      </ProForm.Group>
    </ModalForm>
  )
}

export default AddTemplate
