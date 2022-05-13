import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { message } from 'antd'
import { FC, useEffect, useState } from 'react'
import './index.less'
import { createTemplateMessage, getTemplateItems } from '@/framework/api/wechatSetting'

export type Props = {
  visible: boolean
  handleVisible: (visible: boolean) => void
}

const AddTemplate: FC<Props> = ({ visible, handleVisible }) => {
  const [templateItems, setTemplateItems] = useState<any[]>([])

  const getTemplateItemList = async () => {
    const res = await getTemplateItems({})
    setTemplateItems(res.records)
  }

  const addTemplateMessage = async (value: any) => {
    console.log(11122332, value)
    const selectTemplateItem = templateItems.filter(el => el.id === value.title)[0]
    const res = await createTemplateMessage({
      accountId: '000001',
      scenario: value.useMode,
      templateId: selectTemplateItem.templateId,
      numbering: selectTemplateItem.numbering,
      isSynchronous: selectTemplateItem.isSynchronous,
    })
    return res
  }

  useEffect(() => {
    getTemplateItemList()
  }, [])

  return (
    <ModalForm
      className='add-template'
      title='Add New Template'
      visible={visible}
      onFinish={async value => {
        console.info('value', value)
        const res = await addTemplateMessage(value)
        if (res) {
          message.success('提交成功')
        }
        return true
      }}
      onVisibleChange={handleVisible}
    >
      <ProForm.Group>
        <ProFormSelect
          name='title'
          width='md'
          fieldProps={{ showSearch: true }}
          label='Select Template'
          // dependencies 的内容会注入 request 中
          dependencies={['id']}
          request={async params => {
            console.info('params', params)
            return templateItems.map(item => {
              return { label: item.title, value: item.id }
            })
          }}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width='md'
          options={[
            {
              value: 'SHIPPED',
              label: 'SHIPPED',
            },
            {
              value: 'CANCEL REMINDER',
              label: 'CANCEL REMINDER',
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
