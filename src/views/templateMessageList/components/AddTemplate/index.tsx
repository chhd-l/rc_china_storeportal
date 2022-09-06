import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { message } from 'antd'
import { FC, useEffect, useState } from 'react'
import './index.less'
import { createTemplateMessage, getTemplateItems } from '@/framework/api/wechatSetting'
import intl from 'react-intl-universal'

export type Props = {
  visible: boolean
  handleVisible: (visible: boolean) => void
  addSuccess: Function
}

const AddTemplate: FC<Props> = ({ visible, handleVisible, addSuccess }) => {
  const [templateItems, setTemplateItems] = useState<any[]>([])

  const getTemplateItemList = async () => {
    const res = await getTemplateItems({})
    setTemplateItems(res.records)
  }

  const addTemplateMessage = async (value: any) => {
    console.log(11122332, value)
    const selectTemplateItem = templateItems.filter((el) => el.id === value.title)[0]
    const res = await createTemplateMessage({
      accountId: '000001',
      scenario: value.useMode,
      templateId: selectTemplateItem.templateId,
      numbering: selectTemplateItem.numbering,
      isSynchronous: selectTemplateItem.isSynchronous,
    })
    if (res) {
      addSuccess && addSuccess()
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
    }
  }

  useEffect(() => {
    getTemplateItemList()
  }, [])

  return (
    <ModalForm
      className="add-template"
      title={intl.get('templateMessage.Add New Template')}
      visible={visible}
      onFinish={async (value) => {
        console.info('value', value)
        await addTemplateMessage(value)
        return true
      }}
      onVisibleChange={handleVisible}
    >
      <ProForm.Group>
        <ProFormSelect
          name="title"
          width="md"
          fieldProps={{ showSearch: true }}
          label={intl.get('templateMessage.Select Template')}
          // dependencies 的内容会注入 request 中
          dependencies={['id']}
          request={async (params) => {
            console.info('params', params)
            return templateItems.map((item) => {
              return { label: item.title, value: item.id }
            })
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="md"
          options={[
            {
              value: 'SHIPPED',
              label: intl.get('templateMessage.Shipped'),
            },
            {
              value: 'CANCEL REMINDER',
              label: intl.get('templateMessage.Cancel Reminder'),
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
