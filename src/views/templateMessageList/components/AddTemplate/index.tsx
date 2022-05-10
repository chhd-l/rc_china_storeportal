import ProForm, { ModalForm, ProFormSelect } from '@ant-design/pro-form'
import { message } from 'antd'
import { FC, useEffect, useState } from 'react'
import './index.less'
import { getTemplateItems } from '@/framework/api/wechatSetting'

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

  useEffect(() => {
    getTemplateItemList()
  }, [])

  return (
    <ModalForm
      className="add-template"
      title="Select Products"
      visible={visible}
      onFinish={async (value) => {
        console.info('value', value)
        message.success('提交成功')
        return true
      }}
      onVisibleChange={handleVisible}
    >
      <ProForm.Group>
        <ProFormSelect
          name="title"
          width="md"
          fieldProps={{ showSearch: true }}
          label="Select Template"
          // dependencies 的内容会注入 request 中
          dependencies={['title']}
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
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          name="useMode"
          label="Select Scenario"
        />
      </ProForm.Group>
    </ModalForm>
  )
}

export default AddTemplate
