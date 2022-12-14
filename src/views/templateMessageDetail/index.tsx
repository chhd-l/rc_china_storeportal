import { ContentContainer, InfoContainer } from '@/components/ui'
import { TemplateMessageItemProps } from '@/framework/types/wechat'
import ProForm, { ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Button, message, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import './index.less'
import { getTemplateDetail, updateTemplateMessage } from '@/framework/api/wechatSetting'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import intl from 'react-intl-universal'

const TemplateMessageDetail = () => {
  const navigation = useNavigate()
  const [templateInfo, setTemplateInfo] = useState<TemplateMessageItemProps>({})
  const formRef = useRef<ProFormInstance>()
  const params = useParams()
  let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }
  const [loading, setLoading] = useState(false)

  const getTemplateDetailInfo = async () => {
    let { id } = params
    setLoading(true)
    const res = await getTemplateDetail(id || '')
    setTemplateInfo(res)
    setLoading(false)
  }

  const modifyTemplateMessage = async (value: any) => {
    console.log('1111', value)
    const params = _.omit(value, ['title', 'primaryIndustry', 'deputyIndustry'])
    const res = await updateTemplateMessage(Object.assign(params, { id: templateInfo.id }))
    if (res) {
      message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
      navigation('/template/template-message-list')
    }
  }

  useEffect(() => {
    getTemplateDetailInfo()
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spin />
        </div>
      ) : templateInfo.id ? (
        <>
          <ContentContainer className="template-message-detail pr-6">
            <InfoContainer className="">
              <ProForm
                className="text-right"
                grid={true}
                initialValues={templateInfo}
                layout="horizontal"
                {...formItemLayout}
                onFinish={async (values) => {
                  await modifyTemplateMessage(values)
                }}
                submitter={{
                  render: (props, doms) => {
                    console.log(props)
                    return [
                      <Button
                        key="rest"
                        onClick={() => {
                          navigation(`/template/template-message-list`)
                        }}
                      >
                        {intl.get('public.cancel')}
                      </Button>,
                      <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                        {intl.get('public.confirm')}
                      </Button>,
                    ]
                  },
                }}
                formRef={formRef}
                request={async () => {
                  return {
                    name: '????????????????????????',
                    useMode: 'chapter',
                  }
                }}
                autoFocusFirstInput
              >
                <ProForm.Group>
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="templateId"
                    label={intl.get('templateMessage.Template ID')}
                    placeholder={intl.get('templateMessage.Please input Template ID')}
                    disabled
                  />
                  <ProFormSelect
                    colProps={{ span: 12 }}
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
                    name="scenario"
                    label={intl.get('templateMessage.Select Scenario')}
                  />
                </ProForm.Group>

                <ProForm.Group>
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="title"
                    label={intl.get('templateMessage.Template Name')}
                    placeholder={intl.get('templateMessage.Please input Template Name')}
                    disabled
                  />
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="primaryIndustry"
                    label={intl.get('templateMessage.Primary Industry')}
                    placeholder={intl.get('templateMessage.Please input Primary Industry')}
                    disabled
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="deputyIndustry"
                    label={intl.get('templateMessage.Secondary Industry')}
                    placeholder={intl.get('templateMessage.Please input Secondary Industry')}
                    disabled
                  />
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="url"
                    label={intl.get('templateMessage.H5 Jump Path')}
                    allowClear={false}
                    placeholder={intl.get('templateMessage.Please input H5 jump path')}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="appId"
                    label={intl.get('templateMessage.Mini Program AppId')}
                    allowClear={false}
                    placeholder={intl.get('templateMessage.Please input Mini Program appid')}
                  />
                  <ProFormText
                    colProps={{ span: 12 }}
                    name="pagePath"
                    label={intl.get('templateMessage.Jump Path')}
                    allowClear={false}
                    placeholder={intl.get('templateMessage.Please input Mini Program Jump Path')}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormTextArea
                    labelCol={{ span: 3 }}
                    wrapperCol={{ span: 20 }}
                    colProps={{ span: 24 }}
                    name="description"
                    label={intl.get('templateMessage.Description')}
                    placeholder={intl.get('templateMessage.Please input Description')}
                  />
                </ProForm.Group>
              </ProForm>
            </InfoContainer>
          </ContentContainer>
          <InfoContainer className="mb-7">
            <div className="bg-white">
              ?????????
              <div dangerouslySetInnerHTML={{ __html: (templateInfo?.example ?? '').replace(/\r\n/g, '<br/>') }} />
            </div>
          </InfoContainer>
        </>
      ) : null}
    </>
  )
}

export default TemplateMessageDetail
