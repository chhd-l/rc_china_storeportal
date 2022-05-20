import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import SelectProducts from './SelectProducts'
import { Typography, Button, Image, Tooltip } from 'antd'
import { useState } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import IconFont from '@/components/common/IconFont';
const { Title } = Typography;

type ApplicableProductsType = {
    VoucherType: string;
}

const dataSource = [
    {
        id: '1',
        Products: '胡彦斌',
        Price: 32,
        Stock: 32,
        Brand: '西湖区湖底公园1号',
    },
    {
        id: '2',
        Products: 'xxxx',
        Price: 312,
        Stock: 312,
        Brand: '西湖区湖底公园1号',
    },
];

const ApplicableProducts = ({ VoucherType }: ApplicableProductsType) => {
    const [SelectProductsModal, setSelectProductsModal] = useState(false)

    const SelectProductshandleOk = () => {
        setSelectProductsModal(false)
    }
    const SelectProductshandleCancel = () => {
        setSelectProductsModal(false)
    }

    const columns: ProColumns<any, string>[] = [
        {
            title: 'Products',
            dataIndex: 'Products',
            hideInSearch: true,
            width: '42%',
            render: (text: any, recout: any) => {
                return <div className='flex'>
                    <div>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            preview={false}
                        />
                    </div>
                    <div className='pl-2 pt-4'>
                        <Title className='mb-0' level={5}>Select Products</Title>
                        <span className='text-gray-400 text-xs'>SPU: 3566</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Price(s)',
            dataIndex: 'Price',
        },
        {
            title: () => <div className='flex items-center'>Stock<QuestionCircleOutlined className='ml-1' /></div>,
            dataIndex: 'Stock',
        },
        {
            title: 'Actions',
            dataIndex: 'Actions',
            width: 80,
            render: () => <Tooltip title="Delete">
                <IconFont type='icon-delete' />
            </Tooltip>
        },
    ];

    return (
        <div className='bg-white p-4 ApplicableProducts'>
            <Title className='mt-8 mb-6' level={4}>Applicable Products</Title>
            {
                true ? (
                    <div className='flex items-center pl-12'>
                        <span className='mr-8'>Applicable Products</span>
                        {
                            VoucherType === 'Shop Voucher' ? (
                                <span>all products</span>
                            ) : (
                                <Button
                                    className='flex items-center m-0 text-white'
                                    type='primary'
                                    danger
                                    ghost
                                    icon={<PlusOutlined />}
                                    onClick={() => setSelectProductsModal(true)}
                                >Add Products
                                </Button>
                            )
                        }
                    </div>
                ) : (
                    <div className='flex'>
                        <span className='mr-8'>Applicable Products</span>
                        <ProTable
                            className='w-9/12'
                            columns={columns}
                            options={false}
                            search={false}
                            rowKey='id'
                            toolBarRender={() => [
                                <div className='text-gray-400'><span className='text-black'>1</span> Product(s) Selected</div>,
                                <Button
                                    className='flex items-center m-0 text-white'
                                    type='primary'
                                    danger
                                    ghost
                                    icon={<PlusOutlined />}
                                    onClick={() => setSelectProductsModal(true)}
                                >Add Products
                                </Button>
                            ]}
                            request={async (params) => {
                                // 表单搜索项会从 params 传入，传递给后端接口。
                                return Promise.resolve({
                                    data: dataSource,
                                    success: true,
                                })
                            }}
                        />
                    </div>
                )
            }
            {/* 选择数据弹出层 */}
            <SelectProducts
                SelectProductsModal={SelectProductsModal}
                SelectProductshandleOk={SelectProductshandleOk}
                SelectProductshandleCancel={SelectProductshandleCancel}
            />
        </div>
    )
}

export default ApplicableProducts