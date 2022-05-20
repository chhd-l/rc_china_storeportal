import { QuestionCircleOutlined } from '@ant-design/icons';
import { ParamsType } from '@ant-design/pro-provider';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Modal, Typography, Form, Select, Input, Image, Button, Tooltip } from 'antd';
const { Title } = Typography;

type SelectProductsType = {
    SelectProductsModal: boolean;
    SelectProductshandleOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    SelectProductshandleCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
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

const SelectProducts = ({ SelectProductsModal, SelectProductshandleOk, SelectProductshandleCancel }: SelectProductsType) => {

    const columns: ProColumns<any, string>[] = [
        {
            title: 'Products',
            dataIndex: 'Products',
            hideInSearch: true,
            width: '38%',
            render: (text, recout) => {
                return <div className='flex'>
                    <div>
                        <Image
                            width={100}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            preview={false}
                        />
                    </div>
                    <div className='pl-2'>
                        <Title className='mb-0' level={5}>Select Products</Title>
                        <span className='text-gray-400 text-xs'>SPU: 3566</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Product Category',
            dataIndex: 'Product Category',
            valueType: 'Select',
            hideInTable: true
        },
        {
            title: 'Sales Category',
            dataIndex: 'Sales Category',
            valueType: 'Select',
            hideInTable: true
        },
        {
            title: '',
            valueType: 'Select',
            hideInTable: true,
            renderFormItem: () => {
                return (
                    <Input.Group compact className='flex'>
                        <Form.Item initialValue='Product Name' className='m-0' name='ProductType'>
                            <Select className='z-10' options={[
                                { lable: 'Product Name', value: 'Product Name' },
                                { lable: 'aaa', value: 'aaaa' },
                            ]} />
                        </Form.Item>
                        <Form.Item className='border-0 m-0' name='ProductZhi'>
                            <Input placeholder='Please Input' className='border-l-0 -m-px rounded-l-none' />
                        </Form.Item>
                    </Input.Group>
                )
            }
        },
        {
            title: 'Brand',
            dataIndex: 'Brand',
            hideInSearch: true,
        },
        {
            title: 'Price(s)',
            dataIndex: 'Price',
            hideInSearch: true,
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: () => <div className='flex items-center'>
                Stock
                <Tooltip title="prompt text">
                    <QuestionCircleOutlined className='ml-1' />
                </Tooltip>
            </div>,
            dataIndex: 'Stock',
            hideInSearch: true
        },
    ];

    const onSeach = (param: Partial<ParamsType>) => {
        param[param.ProductType] = param.ProductZhi
        delete param.ProductType
        delete param.ProductZhi
        return param
    }

    return (
        <Modal className='SelectProducts' width='60%' closable={false} visible={SelectProductsModal} onOk={SelectProductshandleOk} onCancel={SelectProductshandleCancel}>
            <Title className='mb-0' level={4}>Select Products</Title>
            <ProTable
                columns={columns}
                rowKey='id'
                beforeSearchSubmit={onSeach}
                options={false}
                request={(parma) => {
                    return Promise.resolve({
                        success: true,
                        data: dataSource,
                    })
                }}
                search={{
                    labelWidth: 'auto',
                    searchText: 'Search',
                    collapsed: false,
                    defaultCollapsed: false,
                    span: 12,
                    collapseRender: () => <></>,
                    optionRender: (searchConfig,formProps,dom) => {
                      return dom.map((item: any) => {
                        return (
                          <Button {...item.props} loading={false} />
                        )
                      }).reverse()
                    }
                }}
                rowSelection={{}}
                tableAlertRender={({ selectedRows }) => {
                    console.log('selectedRows', selectedRows)
                    return false;
                }}
            />
        </Modal>
    )
}

export default SelectProducts