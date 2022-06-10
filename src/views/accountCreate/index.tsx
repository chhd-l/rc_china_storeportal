import { Button, Form, Input, Select, Upload, message } from 'antd'
import { ACCOUNT_FORM, ACCOUNT_FORM_TWO } from '@/views/accountCreate/modules/form'
import { useLocation, useNavigate } from 'react-router'
import { ContentContainer, InfoContainer } from '@/components/ui'
import { createAccount, getAccountList, modifyAccount } from '@/framework/api/wechatSetting'
import { useState, useEffect } from 'react'
import { UPLOAD_API_URL } from '@/framework/api/fetcher'
import './Style.less'
import { BaseListProps } from '@/framework/types/common'

const AddAccount = () => {
  const { state }: any = useLocation()
  const navigator = useNavigate()
  const [form] = Form.useForm()
  const [ServiceAccount, setServiceAccount] = useState('ServiceAccount')
  const [qrCodePath, setQrCodePath] = useState('')
  const [pertificatePath, setPertificatePah] = useState('')
  const [list, setList] = useState([])


  const addAccount = async (values: any) => {
    if (state) {
      let val = {
        ...state,
        ...values,
        storeId: '12345678',
      }
      delete val.messageEncryptionURL
      await modifyAccount({
        account: val,
      })
    } else {
      //新增
      await createAccount({ ...values, storeId: '12345678' }).then(() => {
        navigator('/account/account-list')
      })
    }
    navigator('/account/account-list')
  }

  const onChange = (v: any) => {
    setServiceAccount(v)
  }

  const onUploadChange = (field: string, info: any) => {
    if (info.file.status === 'done') {
      form.setFieldsValue({ [field]: info.file.response.url })
      if (field === 'qrCodePath') {
        setQrCodePath(info.file.response.url)
      } else {
        setPertificatePah(info.file.response.url)
      }
    } else if (info.file.status === 'error') {
      message.error({ className: 'rc-message', content: `${info.file.name} file upload failed.` })
    }
  }
  const getlist = async () => {
    let res = await getAccountList({ offset: 0, limit: 1000, sample: { storeId: '12345678' } })
    if (res?.records.length > 0) {
      let arr = res.records.filter((item: any) => item.accountType === 'ServiceAccount').map((item: any) => {
        return {
          value: item.id,
          label: item.accountName,
        }
      })
      setList(arr)
    } else {
      setList([])
    }
  }
  useEffect(() => {
    if (state) {
      setServiceAccount(state.accountType)
      setQrCodePath(state?.qrCodePath ?? '')
      setPertificatePah(state?.certificatePath ?? '')
    }
    getlist()
  }, [])
  return (
    <ContentContainer className='addAccount'>
      <InfoContainer>
        <div className='text-2xl text-medium mb-4'>{state ? 'Edit Account' : 'Add Account'}</div>
        <Form
          initialValues={state ? state : { type: 'ServiceAccount' }}
          form={form}
          // onValuesChange={formValuesChange}
          onFinish={addAccount}
          autoComplete='off'
          className='flex flex-row flex-wrap justify-start pr-4'
        >
          {
            ServiceAccount === 'ServiceAccount' ? (
              ACCOUNT_FORM.map((item) => {
                return item.name === 'accountType' ? (
                  <Form.Item
                    label={item.label}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                    className={`${item.type === 'textarea' ? 'w-full' : 'w-1/2'}`}
                    labelCol={{ span: item.type === 'textarea' ? 4 : 8 }}
                    wrapperCol={{ span: item.type === 'textarea' ? 20 : 16 }}
                    initialValue={ServiceAccount}
                  >
                    <Select value={ServiceAccount} onChange={onChange} placeholder={item.placeholder}>
                      {(item.selectList || []).map((el) => (
                        <Select.Option value={el.key}>{el.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : (
                  <Form.Item
                    label={item.label}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                    className={`${item.type === 'textarea' ? 'w-full' : 'w-1/2'}`}
                    labelCol={{ span: item.type === 'textarea' ? 4 : 8 }}
                    wrapperCol={{ span: item.type === 'textarea' ? 20 : 16 }}
                  >
                    {item.type === 'select' ? (
                      <Select placeholder={item.placeholder}>
                        {(item.selectList || []).map((el) => (
                          <Select.Option value={el.key}>{el.label}</Select.Option>
                        ))}
                      </Select>
                    ) : item.type === 'textarea' ? (
                      <Input.TextArea
                        placeholder={item.placeholder}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    ) : item.type === 'upload' ? (
                      <Upload name='file' action={UPLOAD_API_URL} headers={{ authorization: 'authorization-text' }}
                              showUploadList={false} onChange={(info: any) => onUploadChange(item.name, info)}>
                        <Input
                          value={item.name === 'qrCodePath' ? qrCodePath : pertificatePath}
                          placeholder={item.placeholder}
                          suffix={<i className='iconfont icon-Frame3'></i>}
                          readOnly
                        />
                      </Upload>
                    ) : (
                      <Input placeholder={item.placeholder} />
                    )}
                  </Form.Item>
                )
              })
            ) : (
              ACCOUNT_FORM_TWO.map((item) => {
                return item.name === 'accountType' ? (
                  <Form.Item
                    label={item.label}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                    className={`${item.type === 'textarea' ? 'w-full' : 'w-1/2'}`}
                    labelCol={{ span: item.type === 'textarea' ? 4 : 8 }}
                    wrapperCol={{ span: item.type === 'textarea' ? 20 : 16 }}
                  >
                    <Select value={ServiceAccount} onChange={onChange} placeholder={item.placeholder}>
                      {(item.selectList || []).map((el) => (
                        <Select.Option value={el.key}>{el.label}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : (
                  <Form.Item
                    label={item.label}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                    className={`${item.type === 'textarea' ? 'w-full' : 'w-1/2'}`}
                    labelCol={{ span: item.type === 'textarea' ? 4 : 8 }}
                    wrapperCol={{ span: item.type === 'textarea' ? 20 : 16 }}
                  >
                    {item.type === 'select' ? (
                      <Select placeholder={item.placeholder}>
                        {
                          item.label === 'Associated Account' ?
                            (list || []).map((el: BaseListProps) => (
                              <Select.Option value={el.value}>{el.label}</Select.Option>
                            )) :
                            (item.selectList || []).map((el) => (
                              <Select.Option value={el.key}>{el.label}</Select.Option>
                            ))
                        }
                      </Select>
                    ) : item.type === 'textarea' ? (
                      <Input.TextArea
                        placeholder={item.placeholder}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    ) : item.type === 'upload' ? (
                      <Upload name='file' action={UPLOAD_API_URL} headers={{ authorization: 'authorization-text' }}
                              showUploadList={false} onChange={(info: any) => onUploadChange(item.name, info)}>
                        <Input
                          value={item.name === 'qrCodePath' ? qrCodePath : pertificatePath}
                          placeholder={item.placeholder}
                          suffix={<i className='iconfont icon-Frame3'></i>}
                          readOnly
                        />
                      </Upload>
                    ) : (
                      <Input placeholder={item.placeholder} />
                    )}
                  </Form.Item>
                )
              })
            )
          }
          <Form.Item
            className='w-full flex flex-row justify-end boyn'
            wrapperCol={{ span: 4 }}
          >
            <Button
              danger
              className='mr-4'
              onClick={() => {
                navigator('/account/account-list')
              }}
            >
              Cancel
            </Button>
            <Button type='primary' htmlType='submit' danger>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </InfoContainer>
    </ContentContainer>
  )
}
export default AddAccount
