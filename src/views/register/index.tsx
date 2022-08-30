import React, { useState, useEffect } from 'react'
import { Input, Button, Form, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  SellerLogoPanel,
  SuccessPanel,
  CustomPanelTitle,
} from '@/components/auth'
import { REGISTER_FORM } from './modules/form'
import { FormItemProps } from '@/framework/types/common'
import { register, verifyMesssage } from '@/framework/api/login-user'
import { brandFind, storeFind } from '@/framework/api/banner'
import intl from 'react-intl-universal'

const { Option } = Select

const title = intl.get('login.signup')
const formItems: FormItemProps[] = REGISTER_FORM

enum REGISTERSTEPENUM {
  REGISTERINFOR = 'registerInfo',
  VERIFYCODE = 'verifyCode',
  SUCCESS = 'success',
}

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(
    REGISTERSTEPENUM['REGISTERINFOR'],
  )
  const [barndList, setBarndList] = useState([])
  const [storeList, setStoreList] = useState([])
  const [stores, setStores] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [errVerifyCode, setErrVerifyCode] = useState(false)
  const [getVerifyCodeErr, setGetVerifyCodeErr] = useState('')
  const [tempUserId, setTempUserId] = useState('')

  const navigate = useNavigate()
  const [form] = Form.useForm()

  //获取验证码
  const getVerifyCode = () => {
  }

  const registerToNext = () => {
    try {
      setLoading(true)
      getVerifyCode()
      setCurrentStep(REGISTERSTEPENUM['VERIFYCODE'])
      setGetVerifyCodeErr('')
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  const verifyCodeToConfirm = async () => {
    if (verifyCode === '') return
    if (await verifyMesssage({ userId: tempUserId, code: verifyCode })) {
      setCurrentStep(REGISTERSTEPENUM['SUCCESS'])
    } else {
      setErrVerifyCode(true)
    }
  }
  const getBarnd = async () => {
    let res = await brandFind('98da256e-9562-40a3-b359-6d59d0dd24cc')
    setBarndList(res)
  }
  useEffect(() => {
    getBarnd()
  }, [])
  const handleChange = async(value:any, option:any) => {
    let res = await storeFind('98da256e-9562-40a3-b359-6d59d0dd24cc',value)
    setStoreList(res)
  }
  const handleChangeTwo = async(value:any, option:any) => {
    let arr = option.length>0&&option.map((item: { id: any; companyId: any, brandId: any })=>{
      return{
        id:item.id,
        companyId:item.companyId,
        brandId:item.brandId
      }
    })
    setStores(arr)
  }
  return (
    <div className='h-screen bg-gray1 flex justify-center items-center'>
      <div className='flex flex-row  justify-center'>
        <SellerLogoPanel />
        {currentStep === REGISTERSTEPENUM['REGISTERINFOR'] ? (
          <div className='bg-white w-80 border p-6'>
            <CustomPanelTitle
              backArrow={() => {
                navigate('/login')
              }}
              showBackArrow={true}
              title={title}
            />
            <Form
              form={form}
              wrapperCol={{ span: 24 }}
              onFinish={(values) => {
                console.log(values,stores)
                if (values.confirmPassword !== values.password) {
                  return
                }
                register({
                  username: values.username,
                  phone: values.phone,
                  password: values.password,
                  stores
                }).then(id => {
                  if (id) {
                    setTempUserId(id)
                    setPhoneNumber(values.phone)
                    registerToNext()
                  }
                })
              }}
              autoComplete='off'
            >
              {formItems.map((item: FormItemProps) => (
                <Form.Item
                  colon={false}
                  name={item.name}
                  rules={item.rules}
                  key={item.name}
                  dependencies={item.dependencies ?? []}
                >
                  <Input placeholder={item.placeholder} type={item.type} />
                </Form.Item>
              ))}
              <Form.Item name='barnd' rules={[{ required: true, message: intl.get('login.please_select_brand') }]}>
                <Select placeholder={intl.get('login.select_brand')} mode="multiple" onChange={handleChange}>
                  {
                    barndList.length > 0 && barndList.map((item: any) => {
                      return(
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item name='store' rules={[{ required: true, message: intl.get('login.please_select_store') }]}>
                <Select placeholder={intl.get('login.select_store')} disabled={storeList.length<=0} mode="multiple" onChange={handleChangeTwo}>
                  {
                    storeList.length > 0 && storeList.map((item: any) => {
                      return(
                        <Option
                          id={item.id}
                          brandId={item.brandId}
                          companyId={item.companyId}
                          key={item.id}
                          value={item.id}
                        >{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }} className='text-center'>
                <Button
                  className='px-8'
                  danger
                  onClick={() => navigate('/login')}
                >
                  {intl.get('public.back')}
                </Button>
                <Button
                  className='px-8 ml-10'
                  type='primary'
                  danger
                  htmlType='submit'
                >
                  {intl.get('public.next')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : null}
        {currentStep === REGISTERSTEPENUM['VERIFYCODE'] ? (
          <div className='bg-white w-80 h-80 border p-6'>
            <CustomPanelTitle
              showBackArrow={true}
              backArrow={() => {
                setCurrentStep(REGISTERSTEPENUM['REGISTERINFOR'])
              }}
              title={title}
            />
            <p className='mb-0'>{intl.get('login.verify_sent_to')}</p>
            <p className='mb-0'>(+86) {phoneNumber}</p>
            <div className='mt-8'>
              <Input
                value={verifyCode}
                size='large'
                placeholder={intl.get('login.enter_verify_code')}
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              <p className='text-left mt-2'>
                {errVerifyCode
                  ? intl.get('login.incorrect_code')
                  : intl.get('login.did_your_receive')}
                &nbsp;
                <span className='primary-color cursor-pointer' onClick={() => getVerifyCode()}>
                  {errVerifyCode ? intl.get('login.resend_code') : intl.get('login.resend')}
                </span>
              </p>
              {getVerifyCodeErr ? (
                <p className='mb-2 text-left primary-color'>
                  {getVerifyCodeErr}
                </p>
              ) : null}
              <div className='text-center'>
                <Button
                  className='px-8'
                  danger
                  onClick={() => setCurrentStep(REGISTERSTEPENUM['REGISTERINFOR'])}
                >
                  {intl.get('public.back')}
                </Button>
                <Button
                  className='px-8 ml-8'
                  type='primary'
                  loading={loading}
                  // disabled={}
                  onClick={() => verifyCodeToConfirm()}
                >
                  {intl.get('public.confirm')}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        {currentStep === REGISTERSTEPENUM['SUCCESS'] ? <SuccessPanel /> : null}
      </div>
    </div>
  )
}
export default Register
