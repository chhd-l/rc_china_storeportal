import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { message } from 'antd'
import { FC } from 'react'
import './index.less'
import intl from 'react-intl-universal'

export type Props = {
  visible: boolean
  handleVisible: (visible: boolean) => void
}

const AddTemplate: FC<Props> = ({ visible, handleVisible }) => {
  return (
    <ModalForm
      className="add-template"
      title={intl.get('templateMessage.Select Products')}
      visible={visible}
      onFinish={async (value) => {
        message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
        return true
      }}
      onVisibleChange={handleVisible}
    >
      <ProForm.Group>
        <ProFormSelect
          width="md"
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          name="useMode"
          label={intl.get('templateMessage.Select Scenario')}
        />
        <ProFormSelect
          width="md"
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          name="useMode"
          label={intl.get('templateMessage.Select Scenario')}
        />
      </ProForm.Group>
    </ModalForm>
  )
}

export default AddTemplate
