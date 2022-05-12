import { ContentContainer, InfoContainer } from '@/components/ui'
import { TemplateMessageItemProps } from '@/framework/types/wechat'
import ProForm, { ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form'
import { Button, message } from 'antd'
import Mock from 'mockjs'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { messageList, templateContent } from '../templateMessageList/modules/mockdata'
import './index.less'
import { getTemplateDetail, updateTemplateMessage } from '@/framework/api/wechatSetting'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const templateTitleList = Mock.mock(messageList).list
const templateContentMock = Mock.mock(templateContent).list
interface TemplateContentProps {
  keyword?: string
  display?: string
  keywordDefault?: string
}

const TemplateMessageDetail = () => {
  const navigation = useNavigate()
  const [templateInfo, setTemplateInfo] = useState<TemplateMessageItemProps>({})
  const [contentList, setContentList] = useState<TemplateContentProps[]>(templateContentMock)
  const formRef = useRef<ProFormInstance>()
  const params = useParams()
  const contentListTitle = ['keyword name', 'Display', 'keyword default']
  let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } }

  const getTemplateDetailInfo = async () => {
    let { id } = params
    const res = await getTemplateDetail(id || '')
    setTemplateInfo(res)
  }

  const modifyTemplateMessage = async (value: any) => {
    console.log('1111', value)
    const params=_.omit(value,['title','primaryIndustry','deputyIndustry'])
    const res = await updateTemplateMessage(Object.assign(params,{id:templateInfo.id}))
    if (res) {
     navigation('/template/template-message-list')
    }
  }

  useEffect(() => {
    getTemplateDetailInfo()
  }, [])

  return (
    <>
      <ContentContainer className="template-message-detail pr-6">
        <InfoContainer className="">
          {' '}
          {templateInfo.id ? (
            <ProForm
              className="text-right"
              grid={true}
              initialValues={templateInfo}
              layout="horizontal"
              {...formItemLayout}
              onFinish={async (values) => {
                console.log(values)
                await modifyTemplateMessage(values)
                // const val1 = await formRef.current?.validateFields()
                // console.log('validateFields:', val1)
                // const val2 = await formRef.current?.validateFieldsReturnFormatValue?.()
                // console.log('validateFieldsReturnFormatValue:', val2)
                message.success('提交成功')
              }}
              submitter={{
                render: (props, doms) => {
                  console.log(props)
                  return [
                    <Button
                      // className=' text-white'
                      // type='primary'
                      key="rest"
                      onClick={() => {
                        navigation(`/template/template-message-list`)
                      }}
                    >
                      Cancel
                    </Button>,
                    <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                      Confirm
                    </Button>,
                  ]
                },
              }}
              formRef={formRef}
              // params={{ id: '100' }}
              // dateFormatter={(value, valueType) => {
              //   console.log('---->', value, valueType)
              //   return value.format('YYYY/MM/DD HH:mm:ss')
              // }}
              request={async () => {
                return {
                  name: '蚂蚁设计有限公司',
                  useMode: 'chapter',
                }
              }}
              autoFocusFirstInput
            >
              <ProForm.Group>
                <ProFormText
                  colProps={{ span: 12 }}
                  name="templateId"
                  label="Template ID"
                  placeholder="Please input Template ID"
                  disabled 
                />
                <ProFormSelect
                  colProps={{ span: 12 }}
                  options={[
                    {
                      value: 'time',
                      label: '履行完终止',
                    },
                  ]}
                  name="scenario"
                  label="Select Scenario"
                />
              </ProForm.Group>

              <ProForm.Group>
                <ProFormText
                  colProps={{ span: 12 }}
                  name="title"
                  label="Template Name"
                  placeholder="Please input Template Name"
                  disabled 
                />
                <ProFormText
                  colProps={{ span: 12 }}
                  name="primaryIndustry"
                  label="Primary Industry"
                  placeholder="Please input Primary Industry"
                  disabled
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  colProps={{ span: 12 }}
                  name="deputyIndustry"
                  label="Secondary Industry"
                  placeholder="Please input Secondary Industry"
                  disabled
                />
                <ProFormText
                  colProps={{ span: 12 }}
                  name="url"
                  label="H5 jump path"
                  placeholder="Please input H5 jump path"
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormText
                  colProps={{ span: 12 }}
                  name="appId"
                  label="Mini Program appid"
                  placeholder="Please input Mini Program appid"
                />
                <ProFormText
                  colProps={{ span: 12 }}
                  name="pagepath"
                  label="Mini Program Jump Path"
                  placeholder="Please input Mini Program Jump Path"
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormTextArea
                  labelCol={{ span: 3 }}
                  wrapperCol={{ span: 20 }}
                  colProps={{ span: 24 }}
                  name="description"
                  label="Description"
                  placeholder="Please input Description"
                />
              </ProForm.Group>
            </ProForm>
          ) : null}
        </InfoContainer>
      </ContentContainer>
      <InfoContainer className="mb-7">
        <div className="bg-white">
          示例：
          {`${templateInfo.example}`}
        </div>
      </InfoContainer>
      {/* <div className='flex bg-gary1 mb-7'>
        <InfoContainer>
          <div className='bg-white'>
            示例：
            {`${templateInfo.example}`}
          </div>
        </InfoContainer>

        <div className='flex-1 ml-6 bg-white'>
          <InfoContainer>
            <Row className='py-3 bg-gray1  px-4'>
              {contentListTitle?.map(el => (
                <Col key={`title-${el}`} span={4}>
                  {el}
                </Col>
              ))}
            </Row>

            {contentList?.map(el => (
              <Row className='py-3  px-4'>
                <Col span={4}>{el.keyword}</Col>
                <Col span={4}>{el.display}</Col>
                <Col span={4}>{el.keywordDefault}</Col>
              </Row>
            ))}
          </InfoContainer>
        </div>
      </div> */}
    </>
  )
}

export default TemplateMessageDetail
