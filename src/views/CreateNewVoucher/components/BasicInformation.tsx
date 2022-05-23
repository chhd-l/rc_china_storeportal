import IconFont from '@/components/common/IconFont';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography, Form, Input, DatePicker, Upload, Image } from 'antd'
import Finishedproductdisplay from './Finishedproductdisplay';
import { useState } from 'react';
import moment from 'moment';
const { Title } = Typography;
const { RangePicker } = DatePicker;

type BasicInformationType = {
    VoucherType: string;
    setVoucherType: Function;
}

const disabledDate = (current: any) => {
    return current && current < moment().endOf('day');
  }

const BasicInformation = ({ VoucherType, setVoucherType }: BasicInformationType) => {
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadButton = (
        <div>
            {loading ? (
                <LoadingOutlined />
            ) : (
                <div
                    style={{ borderColor: '#51ACF5' }}
                    className='rounded-full border border-solid p-1  border-primary w-full h-full justify-center flex items-center'
                >
                    <PlusOutlined style={{ color: '#51ACF5' }} color='#51ACF5' />
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
    }

    return (
        <div className='bg-white p-4 relative BasicInformation'>
            <Title className='mb-8' level={4}>Basic Information</Title>
            <Form.Item label='Voucher Type' name='Vouchertype' className='VoucherType'>
                <div className='flex items-center cursor-default'>
                    {/* Shop Voucher */}
                    <div
                        className={`flex ml-2 pl-2 pr-3 py-3 items-center ${VoucherType === 'Shop Voucher' ? '' : 'border'} border-gray-300 border-solid relative`}
                        onClick={() => setVoucherType('Shop Voucher')}
                    >
                        <IconFont className='mr-1' type='icon-a-ShopVoucher' style={{ fontSize: '36px' }} />
                        <span className='w-32 text-gray-500'>Shop Voucher</span>
                        <IconFont className='absolute top-0 right-0' style={{ fontSize: '24px' }} type={`${VoucherType === 'Shop Voucher' ? 'icon-a-bianzu2' : 'icon-a-bianzu2beifen'}`} />
                    </div>
                    {/* Product Voucher */}
                    <div
                        className={`flex ml-2 pl-2 pr-3 py-3 items-center ${VoucherType === 'Product Voucher' ? '' : 'border'} border-gray-300 border-solid relative`}
                        onClick={() => setVoucherType('Product Voucher')}
                    >
                        <IconFont className='mr-1' type='icon-a-ProductVoucher' style={{ fontSize: '36px' }} />
                        <span className='w-32 text-gray-500'>Product Voucher</span>
                        <IconFont className='absolute top-0 right-0' style={{ fontSize: '24px' }} type={`${VoucherType === 'Product Voucher' ? 'icon-a-bianzu2' : 'icon-a-bianzu2beifen'}`} />
                    </div>
                </div>
            </Form.Item>
            <Form.Item label='Voucher Name' name='Name' rules={[{
                required: true,
                message: 'Pless Input'
            }]}>
                <Input placeholder='Input' maxLength={20} />
            </Form.Item>
            <Form.Item label='Voucher Description' name='Description' rules={[{
                required: true,
                message: 'Pless Input'
            }]}>
                <Input placeholder='Input' maxLength={35} />
            </Form.Item>
            <Form.Item label='Voucher Code' name='Code'>
                <Input placeholder='Input' />
            </Form.Item>
            <Form.Item label='Voucher Usage Period' name='Usage' rules={[{
                required: true,
                message: 'Pless Select'
            }]}>
                <RangePicker disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item
                className='Uploader'
                label='Voucher Image'
                name='Image' 
                rules={[{
                    required: true,
                    message: 'Pless Select'
                }]}
            >
                <Upload
                    listType="picture-card"
                    accept='image/*'
                    showUploadList={false}
                    action="https://dtc-faas-dtc-plaform-dev-woyuxzgfcv.cn-shanghai.fcapp.run/upload"
                    headers={{
                        authorization: 'authorization-text',
                    }}
                    style={{ backgroundColor: '#51ACF5' }}
                    onChange={handleChange}
                >
                    {
                        imageUrl ?
                            <Image
                                src={imageUrl}
                                preview={false}
                            />
                            : uploadButton
                    }
                </Upload>
            </Form.Item>
            <Finishedproductdisplay />
        </div>
    )
}

export default BasicInformation