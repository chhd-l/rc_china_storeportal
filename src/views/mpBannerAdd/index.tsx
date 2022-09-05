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
import { bannerCreate } from '@/framework/api/banner'
import { useNavigate } from 'react-router-dom'
import { UPLOAD_API_URL } from '@/framework/api/fetcher'
import intl from 'react-intl-universal'

const MpBannerAdd = () => {
  const navigator = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const [picUrl, setPicUrl] = useState('');
  const [clickType, setClickType] = useState();
  const [list, setList] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
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
      if ((item.type === 'WxMiniProgram' || item.type === 'AliMiniProgram') && item.isActive)
        lists.push({
          label: item.name,
          value: item.id
        })
    })
    console.log(lists)
    setList(lists)
  }

  useEffect(() => {
    getAccountName()
  }, [])
  const onUploadChange = ( info: any) => {
    setLoading(true)
    if (info.file.status === 'done') {
      console.log(info.file.response.url,22222)
      formRef?.current?.setFieldsValue({ picUrl: info.file.response.url })
      setPicUrl(info.file.response.url)
      setLoading(false)
    } else if (info.file.status === 'error') {
      message.error({ className: "rc-message", content: `${info.file.name} ${intl.get('public.file_upload_failed')}`})
      setLoading(false)
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
          {intl.get('public.cancel')}
        </Button>,
        <Button key='submit' type='primary' onClick={() => {
          submit?.()
        }}>
          {intl.get('public.confirm')}
        </Button>,
      ]
    },
  }
  return (
    <Spin spinning={loading}>
    <ContentContainer className='mp-banner-detail'>
      <InfoContainer title={intl.get('wx.add_new_banner')}>
        <ProForm
          {...layout}
          formRef={formRef}
          layout='horizontal'
          onFinish={async (values) => {
            console.info(values)
            bannerCreate({
              ...values
            })
            navigator('/mpbanner/mpbanner-list')
          }}
          submitter={restSearchButtons}
          className='mp-form'
        >
          <ProFormSelect
            allowClear={false}
            name='accountId'
            label={intl.get('wx.mini_program')}
            options={list}
            placeholder={intl.get('public.select')}
            rules={[{ required: true, message: intl.get('public.field_required') }]}
          />
          <ProFormText
            name='name'
            label={intl.get('wx.banner_name')}
            placeholder={intl.get('public.input')}
            allowClear={false}
            rules={[{ required: true, message: intl.get('public.field_required') }]}
          />
          <ProFormSelect
            name='page'
            label={intl.get('wx.page')}
            options={[
              {
                label: intl.get('wx.home_page'),
                value:'Home Page'
              },
              {
                label: intl.get('wx.shop_page'),
                value: 'Shop Page'
              }
            ]}
            placeholder={intl.get('public.select')}
            rules={[{ required: true, message: intl.get('public.field_required') }]}
          />
          <ProForm.Item
            label={intl.get('wx.pic_location')}
            name="picUrl"
            trigger="onValuesChange"
            rules={[{ required: true, message: intl.get('public.field_required') }]}
          >
            <Upload name="file"
                    className="my-upload"
                    action={UPLOAD_API_URL}
                    headers={{authorization: 'authorization-text'}}
                    showUploadList={false}
                    onChange={(info: any) => onUploadChange(info)}>
              <Input
                value={picUrl}
                placeholder={intl.get('public.select')}
                suffix={<i className="iconfont icon-Frame3"></i>}
                readOnly
              />
            </Upload>
          </ProForm.Item>
          <ProFormSelect
            name='clickType'
            label={intl.get('wx.click_type')}
            options={[
              {
                label: intl.get('wx.no_operation'),
                value:'NO_OPERATION'
              } ,{
                label: intl.get('wx.open_web_page'),
                value:'OPEN_THE_WEB_PAGE'
              }, {
                label: intl.get('wx.open_mp_page'),
                value:'OPEN_THE_MP_PAGE'
              } ,{
                label: intl.get('wx.open_other_mp_page'),
                value:'OPEN_OTHER_MP_PAGE'
              }
            ]}
            placeholder={intl.get('public.select')}
            fieldProps={{
              onChange:(value)=>{
                setClickType(value)
              }
            }}
            rules={[{ required: true, message: intl.get('public.field_required') }]}
          />
          {
            clickType&&clickType!=='NO_OPERATION'? <ProFormText
             name='path'
             label={intl.get('wx.page_path')}
             placeholder={intl.get('public.input')}
             rules={[{ required: true, message: intl.get('public.field_required') }]}
           />:null
          }
          {
            clickType&&clickType!=='NO_OPERATION'&& clickType==='OPEN_OTHER_MP_PAGE'? <ProFormText
              name='mpAppId'
              label={intl.get('wx.mini_program_id')}
              placeholder={intl.get('public.input')}
              rules={[{ required: true, message: intl.get('public.field_required') }]}
            />:null
          }
          <ProFormDigit
            initialValue={0}
            name='sort'
            label={intl.get('wx.sort')}
            rules={[{ required: true, message: intl.get('public.field_required') }]}
          />
        </ProForm>
      </InfoContainer>
    </ContentContainer>
    </Spin>
  )
}

export default MpBannerAdd
