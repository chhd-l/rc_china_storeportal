import { Button, Form, Input, Select } from 'antd'
import { ADD_VIDEO_FORM } from './modules/form'
import { useNavigate } from 'react-router'
import { ContentContainer, InfoContainer } from '@/components/ui'

const AddAccount = () => {
  const navigator = useNavigate()
  const [form] = Form.useForm()

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues)
  }

  const addAccount = (values: any) => {
    console.log(values)
  }

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">add Video</div>
        <Form onValuesChange={formValuesChange} onFinish={addAccount} autoComplete="off" className="w-3/4" form={form}>
          {ADD_VIDEO_FORM.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={item.rules}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              key={item.name}
            >
              {item.type === 'select' ? (
                <Select placeholder={item.placeholder}>
                  {(item.selectList || []).map((el) => (
                    <Select.Option value={el.key}>{el.label}</Select.Option>
                  ))}
                </Select>
              ) : (
                <Input placeholder={item.placeholder} />
              )}
            </Form.Item>
          ))}
          <Form.Item className="w-full flex flex-row justify-end" wrapperCol={{ span: 8 }}>
            <Button
              danger
              className="mr-4"
              onClick={() => {
                navigator('/account-list')
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" danger>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}
export default AddAccount
