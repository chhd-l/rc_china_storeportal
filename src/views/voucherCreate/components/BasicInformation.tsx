import { UPLOAD_API_URL } from '@/framework/api/fetcher'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { DatePicker, Form, Image, Input, message, Select, Typography, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import moment from 'moment'
import { useState } from 'react'
import { useLocation } from 'react-router'
import Finishedproductdisplay from './Finishedproductdisplay'
import intl from 'react-intl-universal'
const { Title } = Typography
const { RangePicker } = DatePicker

type BasicInformationType = {
  VoucherType: string
  setVoucherType: Function
  imageUrl: string
  setImageUrl: Function
  Edit: boolean | undefined
}

const disabledDate = (current: any) => {
  return current && current < moment().startOf('day')
}
const range = (start: number, end: number) => {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
const disabledTime = (current: any, type: string) => {
  const date = new Date()
  const disDate = new Date(current)
  // const year = date.getFullYear()
  // const disYear = disDate.getFullYear()
  // const MM = date.getMonth()
  // const disMM = disDate.getMonth()
  const day = date.getDate()
  const disDay = disDate.getDate()
  const hour = date.getHours()
  const dishour = disDate.getHours()
  const minute = date.getMinutes()
  // const bool = ((disYear < year) || (disMM < MM) || (disDay < day))
  if (type !== 'end') {
    return {
      disabledHours: () => {
        if (day === disDay) {
          return range(0, 24).splice(0, hour)
        } else {
          return range(0, 0)
        }
      },
      disabledMinutes: () => {
        if (day === disDay && hour === dishour) {
          return range(0, minute)
        } else {
          return range(0, 0)
        }
      },
    }
  } else {
    return {
      disabledHours: () => {
        if (day === disDay) {
          return range(0, 24).splice(0, hour + 1)
        } else {
          return range(0, 0)
        }
      },
      disabledMinutes: () => {
        if (day === disDay && hour + 1 === dishour) {
          return range(0, minute)
        } else {
          return range(0, 0)
        }
      },
    }
  }
}

const BasicInformation = ({ VoucherType, setVoucherType, imageUrl, setImageUrl, Edit }: BasicInformationType) => {
  const [loading, setLoading] = useState(false)
  const { state }: any = useLocation()

  const uploadButton = (
    <div>
      <div
        style={{ borderColor: '#51ACF5' }}
        className="rounded-full border border-solid p-1  border-primary w-full h-full justify-center flex items-center"
      >
        <PlusOutlined style={{ color: '#51ACF5' }} color="#51ACF5" />
      </div>
    </div>
  )

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImageUrl(info.file.response.url)
      setLoading(false)
    }
    if (info.file.status === 'error') {
      message.error({ className: 'rc-message', content: intl.get('voucher.Picture upload failed!') })
      setLoading(false)
    }
    if (!info.file.status) {
      setLoading(false)
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      message.error({ className: 'rc-message', content: intl.get('voucher.Image must smaller than 1M!') })
    }
    return isLt1M
  }

  return (
    <div className="bg-white px-6 pt-6 relative BasicInformation">
      <Title className="mb-8" level={4}>
        {intl.get('voucher.Basic Information')}
      </Title>
      <Form.Item label={intl.get('voucher.Voucher Type')} name="voucherType" className="VoucherType">
        <div className="flex items-center cursor-default">
          {/* Shop Voucher */}
          <div
            className={`flex ml-3 pl-2 pr-3 py-3 items-center ${
              VoucherType === 'SHOP_VOUCHER' ? 'VoucherTypeBoxShadow' : 'border'
            } border-gray-300 border-solid relative`}
            style={{ borderRadius: '5px' }}
            onClick={() => !state && setVoucherType('SHOP_VOUCHER')}
          >
            <span className="mr-1 ShopVoucherImg" />
            <span className="w-32 text-gray-500">{intl.get('voucher.Shop Voucher')}</span>
            <span
              className={`iconfont absolute top-0 right-0 ${
                VoucherType === 'SHOP_VOUCHER' ? 'VoucherUncheckedtImg' : 'VoucherSelectImg'
              }`}
              style={{ fontSize: '24px' }}
            />
          </div>
          {/* Product Voucher */}
          <div
            className={`flex ml-5 pl-2 pr-3 py-3 items-center ${
              VoucherType === 'PRODUCT_VOUCHER' ? 'VoucherTypeBoxShadow' : 'border'
            } border-gray-300 border-solid relative`}
            onClick={() => !state && setVoucherType('PRODUCT_VOUCHER')}
            style={{ borderRadius: '5px' }}
          >
            <span className="mr-1 ProductVoucherImg" />
            <span className="w-32 text-gray-500">{intl.get('voucher.Shop Voucher')}</span>
            <span
              className={`absolute top-0 right-0 ${
                VoucherType === 'PRODUCT_VOUCHER' ? 'VoucherUncheckedtImg' : 'VoucherSelectImg'
              }`}
              style={{ fontSize: '24px' }}
            />
          </div>
        </div>
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Voucher Name')}
        name="voucherName"
        rules={[
          {
            required: true,
            message: intl.get('public.Please Input'),
          },
        ]}
      >
        <Input placeholder={intl.get('public.input')} disabled={Edit} maxLength={15} />
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Voucher Description')}
        name="voucherDescription"
        rules={[
          {
            required: true,
            message: intl.get('public.Please Input'),
          },
        ]}
      >
        <Input placeholder={intl.get('public.input')} disabled={Edit} maxLength={35} />
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Voucher Code')}
        rules={[
          {
            required: true,
            message: intl.get('public.Please Input'),
          },
        ]}
        name="voucherCode"
      >
        <Input placeholder={intl.get('public.input')} disabled={Edit} />
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Valid Period')}
        required
        shouldUpdate={(prevValues, curValues) => prevValues.times !== curValues.times}
        wrapperCol={{ span: 8 }}
      >
        {({ getFieldValue }) => {
          const startTimer = getFieldValue('voucherUsageBeginningOfTime')
            ? moment(
                moment(getFieldValue('voucherUsageBeginningOfTime')).format('YYYY-MM-DD HH:mm'),
                'YYYY-MM-DD HH:mm',
              )
            : ''
          const endTimer = getFieldValue('voucherUsageBeginningOfTime')
            ? moment(moment(getFieldValue('voucherUsageEndOfTime')).format('YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm')
            : ''
          return (
            <Form.Item
              name="times"
              className="m-0"
              initialValue={[startTimer || moment().add(0, 'hours'), endTimer || moment().add(1, 'hours')]}
              rules={[
                {
                  required: true,
                  message: intl.get('public.Please Select'),
                },
              ]}
            >
              <RangePicker
                showTime={{
                  format: 'HH:mm',
                  defaultValue: [startTimer || moment().add(0, 'hours'), endTimer || moment().add(1, 'hours')],
                }}
                className="w-full"
                disabled={Edit}
                disabledDate={disabledDate}
                disabledTime={disabledTime}
                format="YYYY-MM-DD HH:mm"
              />
            </Form.Item>
          )
        }}
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Automatic Offer')}
        name="displayOnShop"
        rules={[
          {
            required: true,
            message: intl.get('public.Please Select'),
          },
        ]}
      >
        <Select
          placeholder={intl.get('public.select')}
          disabled={Edit}
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
        />
      </Form.Item>
      <Form.Item
        label={intl.get('voucher.Voucher Image')}
        className="Uploader m-0"
        wrapperCol={{ span: 'auto' }}
        shouldUpdate={(prevValues, curValues) => prevValues.Image !== curValues.Image}
      >
        {({ setFieldsValue }) => (
          <div className="flex items-center">
            <Form.Item name="Image" className="m-0" wrapperCol={{ span: 'auto' }}>
              <Upload
                listType="picture-card"
                accept="image/*"
                disabled={Edit}
                beforeUpload={beforeUpload}
                showUploadList={false}
                action={UPLOAD_API_URL}
                headers={{
                  authorization: 'authorization-text',
                }}
                className={imageUrl ? 'imgUploadNoBorder' : 'imgUploadBorder'}
                style={{ backgroundColor: '#51ACF5', width: '100px' }}
                onChange={handleChange}
              >
                {loading ? (
                  <LoadingOutlined />
                ) : imageUrl ? (
                  <div className="relative h-full imgHoverMeDelet overflow-hidden">
                    <Image src={imageUrl} preview={false} />
                    <div
                      className="w-full absolute flex items-center justify-center imgDelete"
                      onClick={(e) => {
                        e.stopPropagation()
                        setImageUrl('')
                        setFieldsValue({ Image: '' })
                      }}
                    >
                      <i className="iconfont icon-shanchu1 text-white" />
                    </div>
                  </div>
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <div className="text-gray-400">
              <div>{intl.get('voucher.The recommended size for images is 100px * 100px.')}</div>
              <div className="mt-1">{intl.get('voucher.Image size should not exceed 1M.')}</div>
            </div>
          </div>
        )}
      </Form.Item>
      <Finishedproductdisplay />
    </div>
  )
}

export default BasicInformation
