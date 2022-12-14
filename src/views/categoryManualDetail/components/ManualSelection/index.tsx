import './index.less'
import { message, Input, Form, Select, Col, Button } from 'antd'
import { ModalForm, ProFormMoney } from '@ant-design/pro-form'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ProTable from '@/components/common/ProTable'
import { ProColumns } from '@ant-design/pro-table'
import { addShopCategoryProductRel, getCategories, getESProducts } from '@/framework/api/get-product'
import { formatMoney, handlePageParams } from '@/utils/utils'
import { OptionsProps } from '@/framework/types/common'
import { getTree } from '@/framework/normalize/product'
import { getBrands } from '@/framework/api/get-product'
import { useLocation } from 'react-router'
import intl from 'react-intl-universal'

const { Option } = Select
export type ManualSelectionProps = {
  visible: boolean
  handleVisible: (visible: boolean) => void
  handleUpdate: (visible: boolean) => void
}
const nameForKey: OptionsProps[] = [
  { name: 'Product Name', value: '1' },
  { name: 'SKU', value: '2' },
  { name: 'SPU', value: '3' },
]
const ManualSelection = ({ visible, handleVisible, handleUpdate }: ManualSelectionProps) => {
  const { state }: any = useLocation()
  const params = useParams()
  const [brandList, setBrandList] = useState([])
  const [mockOptions, setMockOptions] = useState<Array<any>>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([''])
  const [saveList, setSaveList] = useState([])
  const ref = useRef<any>()
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows)
    let data = selectedRows.map((item: any) => {
      return {
        productId: item.id,
        shopCategoryId: state.id,
        // storeId: item.storeId,
      }
    })
    setSaveList(data)
    setSelectedRowKeys(selectedRowKeys)
  }
  const setNum = (arr: any) => {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += Number(arr[i].stock) // 点开看 有两个值
    }
    return result
  }
  const getCategoriesList = async () => {
    let res = await getCategories()
    setMockOptions(getTree(res, null, 0))
  }
  const manualColumns: ProColumns<any>[] = [
    {
      title: intl.get('product.products'),
      dataIndex: 'name',
      hideInSearch: true,
      render: (_, record) => {
        return (
          <div className='flex al-cneter'>
            <img
              src={
                record.defaultImage
                  ? record.defaultImage
                  : record.variants?.length > 0
                  ? record.variants[0].defaultImage
                  : ''
              }
              alt=''
              style={{ width: '50px', marginRight: '10px' }}
            />
            <div>
              <div>{record.name}</div>
              <div className='text-gray-400'>{record.spuNo}</div>
            </div>
          </div>
        )
      },
    },
    {
      title: intl.get('product.brand'),
      dataIndex: 'brandId',
      hideInSearch: true,
      render: (_, record) => {
        return <span>{record.brandId === 'B1' ? 'Royal Canin' : 'Eukanuba'}</span>
      },
    },
    {
      title: intl.get('product.price(s)'),
      dataIndex: 'marketingPrice',
      hideInSearch: true,
      // sorter: (a, b) => a.lowestPrice - b.lowestPrice,
      render: (_, record) => {
        if (record.variants?.length <= 1) {
          return <span>{formatMoney(record.variants[0]?.marketingPrice)}</span>
        } else if (record.variants?.length > 1) {
          let arr = record.variants.sort((a: any, b: any) => {
            return a.marketingPrice - b.marketingPrice
          })
          return (
            <span>{formatMoney(arr[0]?.marketingPrice) + '-' + formatMoney(arr[arr.length - 1]?.marketingPrice)}</span>
          )
        }
      },
    },

    {
      title: intl.get('product.category'),
      hideInTable: true,
      dataIndex: 'categoryId',
      fieldProps: {
        options: mockOptions,
        fieldNames: {
          children: 'children',
          label: 'label',
          value: 'value',
        },
      },
      valueType: 'cascader',
    },
    {
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <Col>
            <Input.Group compact className='flex'>
              <Form.Item name='selectName'>
                <Select
                  defaultValue='1'
                  style={{ width: 140 }}
                  placeholder={intl.get('product.select_opt_and_change')}
                >
                  {nameForKey.map((el: any) => (
                    <Option key={el.value} value={el.value}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name='username' className='flex-1'>
                <Input placeholder={intl.get('public.input')} />
              </Form.Item>
            </Input.Group>
          </Col>
        )
      },
    },
    {
      title: intl.get('product.brand'),
      hideInTable: true,
      dataIndex: 'brand',
      fieldProps: {
        options: brandList,
        fieldNames: {
          label: 'label',
          value: 'value',
        },
      },
      valueType: 'select',
    },
    {
      title: intl.get('product.stock'),
      width: 100,
      dataIndex: 'stock',
      hideInSearch: true,
      render: (_, record) => {
        if (record.variants?.length > 0) {
          return <span>{setNum(record.variants)}</span>
        }
      },
    },
    {
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        return (
          <div className='flex jus-space-around'>
            <ProFormMoney label={intl.get('product.market_price')} name='startPrice' customSymbol='￥' min='0' />
            <span> - </span>
            <ProFormMoney min='0' name='endPrice' customSymbol='￥' />
          </div>
        )
      },
    },
  ]
  const getBrandList = async () => {
    let list = await getBrands()
    setBrandList(list)
  }
  useEffect(() => {
    getBrandList()
    getCategoriesList()
  }, [])
  return (
    <ModalForm
      width='50%'
      className='manual-selection'
      layout='horizontal'
      title={intl.get('product.select_products')}
      visible={visible}
      onFinish={async () => {
        if (saveList.length > 0) {
          console.info('saveList', saveList)
          let ids = saveList.map((el: any) => el.productId)
          addShopCategoryProductRel(state.id, ids)
          handleUpdate(true)
          message.success({ className: 'rc-message', content: intl.get('public.operate_success') })
          return true
        } else {
          return false
        }
      }}
      submitter={{
        searchConfig: {
          submitText: intl.get('public.confirm'),
        },
      }}
      onVisibleChange={handleVisible}
    >
      <ProTable
        actionRef={ref}
        columns={manualColumns}
        toolBarRender={false}
        rowSelection={{
          // preserveSelectedRowKeys: true,
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        request={async (params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          console.log('test sort', params, sorter, filter)
          let page = handlePageParams({
            currentPage: params.current,
            pageSize: params.pageSize,
          })
          let data: any = {
            ...page,
            withTotal: true,
            sample: {},
          }
          if (params.categoryId?.length > 0) {
            data.sample.categoryId = params.categoryId[params.categoryId.length - 1]
          }
          if (params.startPrice !== '') {
            data.sample.startPrice = params.startPrice
          }
          if (params.endPrice !== '') {
            data.sample.endPrice = params.endPrice
          }
          if (params.brand) {
            data.sample.brand = params.brand
          }
          if (params.username) {
            if (params.selectName === '3') {
              data.sample.spu = params.username
            } else if (params.selectName === '2') {
              data.sample.sku = params.username
            } else {
              data.sample.name = params.username
            }
          }
          let tableData = await getESProducts(data)
          return Promise.resolve({
            data: tableData?.records || [],
            total: tableData?.total || 0,
            success: true,
          })
        }}
        tableAlertRender={() => false}
        rowKey={({ id }) => id}
        className='pt-4 bg-white'
        dateFormatter='string'
        pagination={{
          showTotal: (total: number) => ``,
        }}
        search={{
          defaultCollapsed: false,
          span: 12,
          labelWidth: 'auto',
          searchText: intl.get('public.search'),
          resetText: intl.get('public.reset'),
          className: 'my-search',
          optionRender: ({ searchText, resetText }, { form }, dom) => [
            <Button
              type='primary'
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
