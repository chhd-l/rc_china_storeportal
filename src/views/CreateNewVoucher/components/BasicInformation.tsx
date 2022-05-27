import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Typography, Form, Input, DatePicker, Upload, Image, message, Select } from 'antd'
import Finishedproductdisplay from './Finishedproductdisplay'
import { useState } from 'react'
import moment from 'moment'
import { RcFile } from 'antd/lib/upload'
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
  const day = date.getDate()
  const disDay = disDate.getDate()
  const hour = date.getHours() + 1
  const dishour = disDate.getHours()
  const minute = date.getMinutes()
  if (type === 'start') {
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

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div
          style={{ borderColor: '#51ACF5' }}
          className="rounded-full border border-solid p-1  border-primary w-full h-full justify-center flex items-center"
        >
          <PlusOutlined style={{ color: '#51ACF5' }} color="#51ACF5" />
        </div>
      )}
      {/* <div style={{ marginTop: 8 }}></div> */}
    </div>
  )

  const handleChange = (info: any) => {
    setLoading(true)
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImageUrl(info.file.response.url)
      setLoading(false)
    }
    if (info.file.status === 'error') {
      message.error({ className: 'rc-message', content: 'Picture upload failed!' })
      setLoading(false)
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isLt1M = file.size / 1024 / 1024 < 1
    if (!isLt1M) {
      setLoading(false)
      message.error({ className: 'rc-message', content: 'Image must smaller than 1M!' })
    }
    return isLt1M
  }

  return (
    <div className="bg-white px-6 pt-6 relative BasicInformation">
      <Title className="mb-8" level={4}>
        Basic Information
      </Title>
      <Form.Item label="Voucher Type" name="voucherType" className="VoucherType">
        <div className="flex items-center cursor-default">
          {/* Shop Voucher */}
          <div
            className={`flex ml-3 pl-2 pr-3 py-3 items-center ${
              VoucherType === 'SHOP_VOUCHER' ? 'VoucherTypeBoxShadow' : 'border'
            } border-gray-300 border-solid relative`}
            style={{ borderRadius: '5px' }}
            onClick={() => !Edit && setVoucherType('SHOP_VOUCHER')}
          >
            <span className="mr-1 ShopVoucherImg" />
            <span className="w-32 text-gray-500">Shop Voucher</span>
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
            onClick={() => !Edit && setVoucherType('PRODUCT_VOUCHER')}
            style={{ borderRadius: '5px' }}
          >
            <span className="mr-1 ProductVoucherImg" />
            <span className="w-32 text-gray-500">Product Voucher</span>
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
        label="Voucher Name"
        name="voucherName"
        rules={[
          {
            required: true,
            message: 'Please Input',
          },
        ]}
      >
        <Input placeholder="Input" disabled={Edit} maxLength={15} />
      </Form.Item>
      <Form.Item
        label="Voucher Description"
        name="voucherDescription"
        rules={[
          {
            required: true,
            message: 'Please Input',
          },
        ]}
      >
        <Input placeholder="Input" disabled={Edit} maxLength={35} />
      </Form.Item>
      <Form.Item label="Voucher Code" name="voucherCode">
        <Input placeholder="Input" disabled={Edit} />
      </Form.Item>
      <Form.Item
        label="Voucher Usage Period"
        required
        shouldUpdate={(prevValues, curValues) => prevValues.times !== curValues.times}
        wrapperCol={{ span: 8 }}
      >
        {({ getFieldValue }) => {
          const startTimer = getFieldValue('voucherUsageBeginningOfTime')
            ? moment(moment(getFieldValue('voucherUsageBeginningOfTime')).format('YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm')
            : ''
          const endTimer = getFieldValue('voucherUsageBeginningOfTime')
            ? moment(moment(getFieldValue('voucherUsageEndOfTime')).format('YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm')
            : ''
          return (
            <Form.Item
              name="times"
              className="m-0"
              initialValue={[startTimer || moment().add(1, 'hours'), endTimer || moment().add(2, 'hours')]}
              rules={[
                {
                  required: true,
                  message: 'Please Select',
                },
              ]}
            >
              <RangePicker
                showTime={{
                  format: 'HH:mm',
                  defaultValue: [moment().add(1, 'hours'), moment().add(2, 'hours')],
                }}
                className='w-full'
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
        label="Automatic Offer"
        name='displayOnShop'
        rules={[
          {
            required: true,
            message: 'Please Select',
          },
        ]}
      >
        <Select
          placeholder="Select"
          disabled={Edit}
          options={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
        />
      </Form.Item>
      <Form.Item label="Voucher Image" className="Uploader m-0" wrapperCol={{ span: 'auto' }} required>
        <div className="flex items-center">
          <Form.Item
            name="Image"
            className='m-0'
            wrapperCol={{ span: 'auto' }}
            rules={[
              {
                required: true,
                message: 'Please Select',
              },
            ]}
          >
            <Upload
              listType="picture-card"
              accept="image/*"
              disabled={Edit}
              beforeUpload={beforeUpload}
              showUploadList={false}
              action="https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload"
              headers={{
                authorization: 'authorization-text',
              }}
              className={imageUrl ? 'imgUploadNoBorder' : 'imgUploadBorder'}
              style={{ backgroundColor: '#51ACF5', width: '100px' }}
              onChange={handleChange}
            >
              {imageUrl ? <Image src={imageUrl} preview={false} /> : uploadButton}
            </Upload>
          </Form.Item>
          <div className="text-gray-400">
            <div>The recommended size for images is 100px * 100px.</div>
            <div className="mt-1">Image size should not exceed 1M.</div>
          </div>
        </div>
      </Form.Item>
      <Finishedproductdisplay />
    </div>
  )
}

export default BasicInformation
