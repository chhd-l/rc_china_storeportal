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
import { handleQueryParams } from '@/views/CreateNewVoucher/modules/handle-get-products-params'

const nameForKey: OptionsProps[] = [
  { name: 'Product Name', value: '1' },
  { name: 'SKU', value: '2' },
  { name: 'SPU', value: '3' },
]

const ManualSelection = ({
  visible,
  selectProductChange,
  closeSelectModal,
}: {
  visible: boolean
  selectProductChange: Function
  closeSelectModal: Function
}) => {
  const [mockOptions, setMockOptions] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([''])
  const [saveList, setSaveList] = useState([])
  const ref = useRef<any>()

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
    setSaveList(selectedRows)
    setSelectedRowKeys(selectedRowKeys)
  }

  const getProductList = async (params: any) => {
    const data = handleQueryParams(params)
    return await getESProducts(data)
  }

  const getCategoriesList = async () => {
    let res = await getCategories({ storeId: '12345678' })
    setMockOptions(getTree(res, null, 0))
  }

  useEffect(() => {
    getCategoriesList()
    setSelectedRowKeys([''])
    setSaveList([])
  }, [])

  const manualColumns: ProColumns<any>[] = [
    {
      title: 'Products',
      dataIndex: 'goodsName',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className="flex al-cneter">
            <img src={record?.defaultImage} alt="" style={{ width: '50px', marginRight: '10px' }} />
            <div>
              <div>{record.goodsName}</div>
              <div className="text-gray-400">spu:{record.spuNo}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brandId',
      hideInSearch: true,
    },
    {
      title: 'Price(s)',
      dataIndex: 'marketingPrice',
      hideInSearch: true,
    },
    {
      title: 'Stock',
      width: 100,
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: 'Product Category:',
      hideInTable: true,
      dataIndex: 'goodsCategoryId',
      fieldProps: {
        options: mockOptions,
        fieldNames: {
          children: 'children',
          label: 'label',
          value: 'value',
        },
        defaultValue: 'All Category',
      },
      valueType: 'cascader',
    },
    {
      title: 'Sales Category:',
      hideInTable: true,
      dataIndex: 'SalesCategoryId',
      fieldProps: {
        options: mockOptions,
        fieldNames: {
          children: 'children',
          label: 'label',
          value: 'value',
        },
        defaultValue: 'All Category',
      },
      valueType: 'cascader',
    },
    {
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <Col>
            <Input.Group compact className="flex">
              <Form.Item name="selectName">
                <Select
                  defaultValue="1"
                  style={{ width: 140 }}
                  placeholder="Select a option and change input text above"
                >
                  {nameForKey.map((el: any) => (
                    <Select.Option key={el.value} value={el.value}>
                      {el.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="username" className="flex-1">
                <Input placeholder={`Please Input `} />
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
            data: normaliseVoucherProduct(tableData?.records) || [],
            total: tableData?.total || 0,
            success: true,
          })
        }}
        tableAlertRender={() => false}
        rowKey={({ id }) => id}
        dateFormatter="string"
        pagination={{
          pageSize: 4,
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
