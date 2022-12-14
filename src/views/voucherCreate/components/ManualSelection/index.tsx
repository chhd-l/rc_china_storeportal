import { Input, Form, Select, Col, Button } from 'antd'
import { ModalForm } from '@ant-design/pro-form'
import { useState, useEffect, useRef } from 'react'
import ProTable from '@/components/common/ProTable'
import { ProColumns } from '@ant-design/pro-table'
import { getCategories, getESProducts } from '@/framework/api/get-product'
import { OptionsProps } from '@/framework/types/common'
import { getTree } from '@/framework/normalize/product'
import './index.less'
import { normaliseVoucherProduct } from '@/framework/normalize/voucher'
import { handleQueryParams } from '@/views/voucherCreate/modules/handle-get-products-params'
import intl from 'react-intl-universal'

const nameForKey: OptionsProps[] = [
  { name: intl.get('product.product_name'), value: '1' },
  { name: intl.get('voucher.SKU'), value: '2' },
  { name: intl.get('voucher.SPU'), value: '3' },
]

const ManualSelection = ({
  visible,
  selectProductChange,
  closeSelectModal,
  keys,
}: {
  visible: boolean
  selectProductChange: Function
  closeSelectModal: Function
  keys: string[]
}) => {
  const [mockOptions, setMockOptions] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([''])
  const [saveList, setSaveList] = useState([])
  const ref = useRef<any>()

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSaveList(selectedRows)
    setSelectedRowKeys(selectedRowKeys)
  }

  const getProductList = async (params: any) => {
    const data = handleQueryParams(params)
    const res = await getESProducts(data)
    return {
      records: res?.records || [],
      total: res?.total || 0,
    }
  }

  const getCategoriesList = async () => {
    let res = await getCategories()
    setMockOptions(getTree(res, null, 0))
  }

  useEffect(() => {
    getCategoriesList()
    setSelectedRowKeys([''])
    setSaveList([])
  }, [])

  useEffect(() => {
    setSelectedRowKeys(keys)
  }, [keys])

  const manualColumns: ProColumns<any>[] = [
    {
      title: intl.get('voucher.Products'),
      dataIndex: 'productName',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className="flex al-cneter">
            <img src={record?.defaultImage} alt="" style={{ width: '50px', marginRight: '10px' }} />
            <div>
              <div>{record.productName}</div>
              <div className="text-gray-400">
                {intl.get('voucher.spu:')}
                {record.spuNo}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      title: intl.get('voucher.Brand'),
      dataIndex: 'brandId',
      hideInSearch: true,
    },
    {
      title: intl.get('product.Price(s)'),
      dataIndex: 'marketingPrice',
      hideInSearch: true,
    },
    {
      title: intl.get('voucher.Stock'),
      width: 100,
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: intl.get('voucher.Product Category:'),
      hideInTable: true,
      dataIndex: 'productCategoryId',
      fieldProps: {
        options: mockOptions,
        fieldNames: {
          children: 'children',
          label: 'label',
          value: 'value',
        },
        defaultValue: intl.get('voucher.All Category'),
      },
      valueType: 'cascader',
    },
    // {
    //   title: 'Sales Category:',
    //   hideInTable: true,
    //   dataIndex: 'SalesCategoryId',
    //   fieldProps: {
    //     options: mockOptions,
    //     fieldNames: {
    //       children: 'children',
    //       label: 'label',
    //       value: 'value',
    //     },
    //     defaultValue: 'All Category',
    //   },
    //   valueType: 'cascader',
    // },
    {
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <Col>
            <Input.Group compact className="flex">
              <Form.Item name="selectName">
                <Select
                  defaultValue="1"
                  style={{ width: 140 }}
                  placeholder={intl.get('voucher.Select a option and change input text above')}
                >
                  {nameForKey.map((el: any) => (
                    <Select.Option key={el.value} value={el.value}>
                      {el.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="username" className="flex-1">
                <Input placeholder={intl.get('public.Please Input')} />
              </Form.Item>
            </Input.Group>
          </Col>
        )
      },
    },
  ]

  return (
    <ModalForm
      width="50%"
      layout="horizontal"
      title="Select Products"
      visible={visible}
      onFinish={async () => {
        selectProductChange && selectProductChange(saveList, selectedRowKeys)
      }}
      submitter={{
        searchConfig: {
          submitText: 'Confirm',
        },
      }}
      modalProps={{ onCancel: () => closeSelectModal && closeSelectModal(), destroyOnClose: true }}
    >
      <ProTable
        className="voucher-select-product"
        cardBordered
        actionRef={ref}
        columns={manualColumns}
        toolBarRender={false}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
        request={async (params, sorter, filter) => {
          console.log('test sort', params, sorter, filter)
          const tableData = await getProductList(params)
          return Promise.resolve({
            data: tableData.records.length > 0 ? normaliseVoucherProduct(tableData?.records) : [],
            total: tableData.total,
            success: true,
          })
        }}
        tableAlertRender={() => false}
        rowKey={({ id }) => id}
        dateFormatter="string"
        pagination={{
          // pageSize: 4,
          showQuickJumper: false,
          showTotal: (total: number) => ``,
        }}
        search={{
          defaultCollapsed: false,
          span: 12,
          labelWidth: 'auto',
          searchText: 'Search',
          optionRender: ({ searchText, resetText }, { form }, dom) => [
            <Button
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
          ],
        }}
      />
    </ModalForm>
  )
}

export default ManualSelection
