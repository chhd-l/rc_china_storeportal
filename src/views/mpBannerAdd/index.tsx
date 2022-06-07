import ProForm from '@ant-design/pro-form'
import { Input, Upload,message,Button } from "antd";
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

const MpBannerAdd = () => {
  const navigator = useNavigate()
  const formRef = useRef<ProFormInstance>()
  const [picUrl, setPicUrl] = useState('');
  const [clickType, setClickType] = useState();
  const [list, setList] = useState<any>([])
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

  useEffect(() => {
    getAccountName()
  }, [])
  const onUploadChange = ( info: any) => {
    if (info.file.status === 'done') {
      console.log(info.file.response.url,22222)
      formRef?.current?.setFieldsValue({ picUrl: info.file.response.url })
      setPicUrl(info.file.response.url)
    } else if (info.file.status === 'error') {
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
    <ContentContainer className='mp-banner-detail'>
      <InfoContainer title='Add New MP Banner'>
        <ProForm
          {...layout}
          formRef={formRef}
          layout='horizontal'
          onFinish={async (values) => {
            console.info(values)
            bannerCreate({
              ...values
            },'111')
            navigator('/mpbanner/mpbanner-list')
          }}
          submitter={restSearchButtons}
          className='mp-form'
        >
          <ProFormSelect
            name='accountId'
            label='Mini Program'
            options={list}
            placeholder= "Please select"
          />
          <ProFormText
            name='name'
            label='Banner Name'
            placeholder= "Please input"
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
          />
          <ProForm.Item
            label="Pic Location"
            name="picUrl"
            trigger="onValuesChange"
          >
            <Upload name="file"
                    className="my-upload"
                    action="https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload"
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
                label:'Open the WEB page',
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
          />
          {
            clickType&&clickType!=='NO_OPERATION'? <ProFormText
             name='path'
             label='Path'
             placeholder= "Please input"
           />:null
          }
          {
            clickType&&clickType!=='NO_OPERATION'&& clickType==='OPEN_OTHER_MP_PAGE'? <ProFormText
              name='mpAppId'
              label='MP ID'
              placeholder= "Please input"
            />:null
          }
          <ProFormDigit
            name='sort'
            label='Sort'
          />
        </ProForm>
      </InfoContainer>
    </ContentContainer>
  )
}

export default MpBannerAdd
