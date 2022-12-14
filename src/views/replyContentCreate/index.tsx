import { ContentContainer, InfoContainer } from '@/components/ui'
import AssetsModal from '@/components/wechat/AssetsModal'
import { createReplyContent, getReplyContentDetail, updateReplyContent } from '@/framework/api/wechatSetting'
import { Asset } from '@/framework/types/wechat'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ADD_REPLY_CONTENT_FORM, BASE_FORM, TEXT_FORM, VIDEO_FORM } from './modules/form'
import intl from 'react-intl-universal'

const AddAccount = () => {
  const [title, setTitle] = useState<string>(intl.get('reply.Add New Reply Content'))
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [assetType, setAssetType] = useState<'image' | 'video' | 'voice' | 'news'>('image')
  const navigator = useNavigate()
  const [formItems, setFromItems] = useState(ADD_REPLY_CONTENT_FORM)
  const [form] = Form.useForm()
  const location = useLocation()

  useEffect(() => {
    const state: any = location.state
    if (state?.id) {
      getReplyDetailIfEdit(state.id)
      setTitle(intl.get('reply.Edit Reply Content'))
    }
  }, [])

  const getReplyDetailIfEdit = async (id: string) => {
    setLoading(true)
    const reply = await getReplyContentDetail(id)
    setAssetType(reply?.responseType ?? 'image')
    formValuesChange({}, { type: reply?.responseType ?? 'text' })
    form.setFieldsValue({
      assetTitle: reply?.title ?? '',
      type: reply?.responseType ?? undefined,
      description: reply?.responseDescribe ?? undefined,
      assetId: reply?.mediaId ?? undefined,
      message: reply?.messageContent ?? undefined,
    })
    setLoading(false)
  }

  const formValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues, allValues)
    let baseFormItems = ADD_REPLY_CONTENT_FORM
    switch (allValues.type) {
      case '':
      case 'image':
        setAssetType('image')
        baseFormItems = baseFormItems.concat(BASE_FORM)
        break
      case 'voice':
        setAssetType('voice')
        baseFormItems = baseFormItems.concat(BASE_FORM)
        break
      case 'text':
        baseFormItems = baseFormItems.concat(TEXT_FORM)
        break
      case 'video':
        setAssetType('video')
        baseFormItems = baseFormItems.concat(BASE_FORM, VIDEO_FORM)
        break
      case 'news':
        setAssetType('news')
        baseFormItems = baseFormItems.concat(BASE_FORM)
        break
      default:
        break
    }
    setFromItems(baseFormItems)
  }

  const searchDescription = () => {
    setModalVisible(true)
  }

  const addAccount = async (values: any) => {
    console.log(values)
    setLoading(true)
    const newReplyContent = {
      accountId: '000001',
      responseDescribe: values.description,
      responseType: values.type,
      messageContent: values.type === 'text' ? values.message : undefined,
      mediaId: values.type !== 'text' ? values.assetId : undefined,
    }
    if ((location?.state as any)?.id) {
      await updateReplyContent((location.state as any).id, newReplyContent)
    } else {
      await createReplyContent(newReplyContent)
    }
    setLoading(false)
    navigator('/reply/reply-contents')
  }

  const setAssetId = (selectAsset: Asset) => {
    form.setFieldsValue({
      assetId: selectAsset.assetId,
      assetTitle: assetType === 'video' ? selectAsset.assetTitle : undefined,
    })
    setModalVisible(false)
  }

  const handleSelectAsssetType = () => {
    form.setFieldsValue({ assetId: undefined })
  }

  return (
    <ContentContainer>
      <InfoContainer>
        <div className="text-2xl text-medium mb-4">{title}</div>
        <Form onValuesChange={formValuesChange} onFinish={addAccount} autoComplete="off" className="w-3/4" form={form}>
          {formItems.map((item) => (
            <Form.Item
              label={item.label}
              name={item.name}
              rules={item.rules}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              key={item.name}
            >
              {item.type === 'select' ? (
                <Select placeholder={item.placeholder} onChange={handleSelectAsssetType}>
                  {(item.selectList || []).map((el) => (
                    <Select.Option value={el.key}>{el.label}</Select.Option>
                  ))}
                </Select>
              ) : item.type === 'textarea' ? (
                <Input.TextArea placeholder={item.placeholder} autoSize={{ minRows: 3, maxRows: 5 }} />
              ) : item.type === 'search' ? (
                <Input
                  readOnly
                  placeholder={item.placeholder}
                  onClick={searchDescription}
                  suffix={<SearchOutlined onClick={searchDescription} className="text-gray-400" />}
                />
              ) : (
                <Input placeholder={item.placeholder} disabled={item.name === 'assetTitle'} className="bg-white" />
              )}
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="flex flex-row justify-end space-x-4">
              <Button
                danger
                onClick={() => {
                  navigator(-1)
                }}
              >
                {intl.get('public.cancel')}
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} danger>
                {intl.get('public.confirm')}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </InfoContainer>
      {modalVisible ? (
        <AssetsModal
          visible={modalVisible}
          assetType={assetType}
          onlySync={true}
          onConfirm={setAssetId}
          onCancel={() => setModalVisible(false)}
        />
      ) : null}
    </ContentContainer>
  )
}
export default AddAccount
