import React, { useState, useEffect } from 'react'
import { Input, Button, Form, message, Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  SellerLogoPanel,
  SuccessPanel,
  CustomPanelTitle,
} from '@/components/auth'
import { REGISTER_FORM } from './modules/form'
import { FormItemProps } from '@/framework/types/common'
import { register, verifyMesssage } from '@/framework/api/login-user'
import { brandFind } from '@/framework/api/banner'

const { Option } = Select

const title = 'Sign up'
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
                console.log(values)
                if (values.confirmPassword !== values.password) {
                  message.error('Password verification failed')
                  return
                }
                register({ ...values }).then(id => {
                  if (id) {
                    setTempUserId(id)
                    setPhoneNumber(values.phone)
                    registerToNext()
                  } else {
                    message.error('Register failed！')
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
                >
                  <Input placeholder={item.placeholder} type={item.type} />
                </Form.Item>
              ))}
              <Form.Item name='barnd' rules={[{ required: true, message: 'Please Select brand!' }]}>
                <Select placeholder='Select brand'>
                  {
                    barndList.length > 0 && barndList.map((item: any) => {
                      return(
                        <Option value={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
              <Form.Item name='store' rules={[{ required: true, message: 'Please Select store!' }]}>
                <Select placeholder='Select store' disabled>
                  <Option value='jack'>Jack</Option>
                </Select>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 24 }} className='text-center'>
                <Button
                  className='px-8'
                  danger
                  onClick={() => navigate('/login')}
                >
                  Back
                </Button>
                <Button
                  className='px-8 ml-10'
                  type='primary'
                  danger
                  htmlType='submit'
                >
                  Next
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
            <p className='mb-0'>Your verification code is sent to</p>
            <p className='mb-0'>(+86) {phoneNumber}</p>
            <div className='mt-8'>
              <Input
                value={verifyCode}
                size='large'
                placeholder='Enter verification code'
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              <p className='text-left mt-2'>
                {errVerifyCode
                  ? 'Incorrect code!'
                  : 'Did not receive the code?'}
                &nbsp;
                <span className='primary-color cursor-pointer' onClick={() => getVerifyCode()}>
                  {errVerifyCode ? 'Resend code' : 'Resend'}
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
                  Back
                </Button>
                <Button
                  className='px-8 ml-8'
                  type='primary'
                  loading={loading}
                  // disabled={}
                  onClick={() => verifyCodeToConfirm()}
                >
                  Confirm
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
