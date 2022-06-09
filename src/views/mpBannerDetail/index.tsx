import ProForm from '@ant-design/pro-form'
import { Input, Upload,message,Button,Spin } from "antd";
import './index.less'
import {
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormInstance,
} from '@ant-design/pro-form'

import { useEffect, useRef, useState } from 'react'
import { ContentContainer, InfoContainer } from '@/components/ui'
import { getAccountList } from '@/framework/api/wechatSetting'
import { bannerCreate, bannerGetDetailById, bannerUpdate } from '@/framework/api/banner'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { UPLOAD_API_URL } from '@/framework/api/fetcher'

const MpBannerDetail = () => {
  const navigator = useNavigate()
  const { state }: any = useLocation();
  const formRef = useRef<ProFormInstance>()
  const [picUrl, setPicUrl] = useState('');
  const [clickType, setClickType] = useState();
  const [list, setList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 10 },
  }
  const getAccountName = async () => {
    let res = await getAccountList({
      limit: 100,
      offset: 0,
      sample: { storeId: "12345678" },
    })
    depy(res?.records || [])
  }
  const depy = (arr: any[]) => {
    if (!arr.length) return
    const lists: any[] = []
    arr.forEach((item) => {
      if (item.accountType === 'MiniProgram')
        lists.push({
          label: item.accountName,
          value: item.id
        })
    })
    setList(lists)
  }
  const getlist = async () => {
    setLoading(true)
    let res = await bannerGetDetailById(state.id)
    formRef?.current?.setFieldsValue(res?.bannerGetDetailById)
    setClickType(res?.bannerGetDetailById?.clickType)
    setPicUrl(res?.bannerGetDetailById?.picUrl)
    setLoading(false)
  }
  useEffect(() => {
    getAccountName()
    getlist()
  }, [])
  const onUploadChange = ( info: any) => {
    if (info.file.status === 'done') {
      console.log(1)
      formRef?.current?.setFieldsValue({ picUrl: info.file.response.url })
      setPicUrl(info.file.response.url)
    } else if (info.file.status === 'error') {
      console.log(2)
      message.error({ className: "rc-message", content: `${info.file.name} file upload failed.`})
    }
  }
  const restSearchButtons = {
    render: (props: any) => {
      const { submit, resetFields } = props.form
      return [
        <Button key='rest' onClick={() => {
          resetFields()
          navigator('/mpbanner/mpbanner-list')
        }}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={() => {
          submit?.()
        }}>
          Confirm
        </Button>,
      ]
    },
  }
  return (
    <Spin spinning={loading}>
    <ContentContainer className='mp-banner-detail'>
      <InfoContainer title='Edit MP Banner' className="pt-0">
        <ProForm
          {...layout}
          formRef={formRef}
          layout='horizontal'
          onFinish={async (values) => {
            console.info(values)
          let res = await bannerUpdate({
              id:state.id,
              ...values
            },'111')
            if(res.bannerUpdate){
              navigator('/mpbanner/mpbanner-list')
            }
          }}
          submitter={restSearchButtons}
          className='mp-form'
        >
          <ProFormSelect
            allowClear={false}
            name='accountId'
            label='Mini Program'
            options={list}
            placeholder= "Please select"
            rules={[{ required: true,message: 'Please select' }]}
          />
          <ProFormText
            allowClear={false}
            name='name'
            label='Banner Name'
            placeholder= "Please input"
            rules={[{ required: true, message: 'Please input' }]}
          />
          <ProFormSelect
            name='page'
            label='Page'
            options={[
              {
                label:'Home Page',
                value:'Home Page'
              },
              {
                label: 'Shop Page',
                value: 'Shop Page'
              }
            ]}
            placeholder= "Please select"
            rules={[{ required: true, message: 'Please select' }]}
          />
          <ProForm.Item
            label="Pic Location"
            name="picUrl"
            trigger="onValuesChange"
            rules={[{ required: true, message: 'Please upload' }]}
          >
            <Upload name="file"
                    className="my-upload"
                    action={UPLOAD_API_URL}
                    headers={{authorization: 'authorization-text'}}
                    showUploadList={false}
                    onChange={(info: any) => onUploadChange(info)}>
              <Input
                value={picUrl}
                placeholder='Click to select'
                suffix={<i className="iconfont icon-Frame3"></i>}
                readOnly
              />
            </Upload>
          </ProForm.Item>
          <ProFormSelect
            name='clickType'
            label='Click Type'
            options={[
              {
                label:'No operation',
                value:'NO_OPERATION'
              } ,{
                label:'Open the web page',
                value:'OPEN_THE_WEB_PAGE'
              }, {
                label:'Open the MP page',
                value:'OPEN_THE_MP_PAGE'
              } ,{
                label:'Open other MP page',
                value:'OPEN_OTHER_MP_PAGE'
              }
            ]}
            placeholder= "Please select"
            fieldProps={{
              onChange:(value)=>{
                setClickType(value)
              }
            }}
            rules={[{ required: true, message: 'Please select' }]}
          />
          {
            clickType&&clickType!=='NO_OPERATION'? <ProFormText
             name='path'
             label='Path'
             placeholder= "Please input"
             rules={[{ required: true, message: 'Please input' }]}
           />:null
          }
          {
            clickType&&clickType!=='NO_OPERATION'&& clickType==='OPEN_OTHER_MP_PAGE'? <ProFormText
              name='mpAppId'
              label='MP ID'
              placeholder= "Please input"
              rules={[{ required: true, message: 'Please input' }]}
            />:null
          }
          <ProFormDigit
            name='sort'
            label='Sort'
            rules={[{ required: true, message: 'Please input' }]}
          />
        </ProForm>
      </InfoContainer>
    </ContentContainer>
    </Spin>
  )
}

export default MpBannerDetail
